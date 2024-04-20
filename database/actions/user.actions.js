"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToMongoDB } from "../dbConnect";
import User from "../models/user.model";
import otpGenerator from 'otp-generator'
import { sendEmail } from "@/lib/helpers";
import { NextResponse } from "next/server";

export const createUser = async (fromData) => {
  try {
    const { firstName,lastName, email, birth, gender, password, cpassword } = fromData;
    if (password != cpassword) {
      return { status: 401, message: "Passwords doesn't match" };
    }
    const dbConnection = await connectToMongoDB();
    if (!dbConnection) {
      return { status: 500, message: "Database is not connected" };
    }


    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, message: "Email already exists" };
    }

    // OTP VERIFICATION
    const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })
    const mailSender = await sendEmail(email, otp, firstName, lastName)
    if(!mailSender.success){
      console.log('email send not successfully',mailSender);
      return { status: 400, message: "OTP isn't sent successfully" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName: firstName,
      lastName:lastName,
      email: email,
      gender: gender.toLowerCase(),
      birth: birth,
      otp:otp,
      password: hashPassword,
      verify:false,
    });
    return { status: 201, message: "User is created successfully" };

  } catch (error) {
    return { status: 500, message: "Interal server error occured" };
  }
};

export const loginUser = async (user) => {
  try {
    const { email, password } = user;

    const dbConnection = await connectToMongoDB();
    if (!dbConnection) {
      return { status: 500, message: "Database is not connected" };
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return { status: 401, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return { status: 401, message: "Invalid credentials" };
    }

    const tokenData = {
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      birth: findUser.birth,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    cookies().set("token", token,{
      
        httpOnly: true, 
  
    });
    return { status: 200, message: "User logged in successfully" };
  } catch (error) {
    return { status: 500, message: "Interal server error occured" };
  }
};

export const fillUserOTPFieldInDatabase = async (email,type)=>{
  try {
    const dbConnection = await connectToMongoDB();
    if (!dbConnection) {
      return { status: 500, message: "Database is not connected" };
    }
    let newOtp = '';
    if(type=='resend'){
      newOtp = otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })
      console.log(newOtp);
      const mailSender = await sendEmail(email, newOtp)
      if(!mailSender.success){
        return {status:400, message:"Email isn't sent successfully"}
      }
    }
    const findUserByEmail = await User.findOneAndUpdate({email},{otp:newOtp})
    if(!findUserByEmail){
      console.log(`User with email "${email}" not found.`);
      return {status:404, message: "User not found the this email id"};
    }

    return { status: 200, message: "OTP is updated successfully" };
  } catch (error) {
    return { status: 500, message: "Interal server error occured" };
  }

}

export const verifyOTP = async (email, newOtp) => {
  try {
    const user = await User.findOne({ email });
    if(!user){
      return {status:404, message: "User not found the this email id"};
    }
    if(user && user.otp != newOtp){
      return {status:400, message: "OTP is not valid"};
    }
    await User.findOneAndUpdate({email},{verify:true})
    return {status:200, message: "verifed successfully"}
  } catch (error) {
    return { status: 500, message: "Interal server error occured" };
  }


}