"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToMongoDB } from "../dbConnect";
import User from "../models/user.model";
import otpGenerator from 'otp-generator'
import { sendEmail } from "@/lib/helpers";

export const createUser = async (fromData) => {
  try {
    const { firstName,lastName, email, birth, gender, password, cpassword } = fromData;
    console.log(firstName,
      lastName,
      email,
      birth,
      gender,
      password,
      cpassword);
    if (password != cpassword) {
      return { status: 401, message: "Passwords doesn't match" };
    }
    const dbConnection = await connectToMongoDB();
    if (!dbConnection) {
      return { status: 500, message: "Database is not connected" };
    }

    const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false })
    const existingUser = await User.findOne({ email });

    const mailSender =await sendEmail(email, otp)
    if(mailSender.success){
      console.log('email send successfully',mailSender);
    }else{
      console.log('email send not successfully', mailSender);

    }
    if (existingUser) {
      return { status: 400, message: "Email already exists" };
    }

    //TODO:- OTP VERIFICATION


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

    return { status: 200, message: "User is created successfully" };
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
