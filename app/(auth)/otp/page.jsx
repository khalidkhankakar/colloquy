"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OtpFormSchema, otpFormDefaultValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { EmailContext } from "@/context/emailContext/EmailContext";
import { fillUserOTPFieldInDatabase, verifyOTP} from "@/database/actions/user.actions";
import { Loader } from "@/components/shared";


const Otp = () => {
  const [loading, setLoading] = useState(false)
  const { userEmail } = useContext(EmailContext);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds == 0 && minutes == 0) {
        // when timer is finished it clear the OTP field in database
        console.log("EMPTY OTP IN DATABASE");
        const emptyOTPField = async () => {
          const resp = await fillUserOTPFieldInDatabase(userEmail, "clearOTP");
          console.log(resp);
        };
        emptyOTPField();
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else {
        clearInterval(intervalRef.current);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [minutes, seconds]);

  const handleResendOtp = async () => {
    // Implementing the resend OTP
    console.log("API CALL TO FILL OTP FEILD AND RESEND EMAIL");
    const resp = await fillUserOTPFieldInDatabase(userEmail, "resend");
    console.log(resp);
    if (resp.status == 200) {
      setMinutes(1);
      setSeconds(0);
    }
  };

  const form = useForm({
    resolver: zodResolver(OtpFormSchema),
    defaultValues:otpFormDefaultValues,
  });

  async function onSubmit(values) {
    try {
      setLoading(true)
    // verify the OTP
    const resp = await verifyOTP(userEmail, values.otp);
  } catch (error) {
      console.log(error);
  }finally{
    setLoading(false)
  }
  }
  //
  return (
    <Form {...form}>
      <div className="flex items-center justify-center flex-col dark:text-white text-black ">
        <Image
          src="/colloquy.svg"
          width={200}
          height={100}
          alt={"logo"}
          className="mt-5 mb-3"
        />
        <h3 className="mb-2 h3-bold font-rubik w-[90vw] md:w-full text-center">
          Enter the 6 digits Otp to verfiy your account
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95vw] md:w-[80vw] lg:w-[70vw] space-y-2"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="small-medium">
                    Otp - (6 digits)
                  </FormLabel>
                  <div className="flex justify-end space-x-3 font-rubik  items-center">
                    <p>
                      Time Remaining:{" "}
                      <span
                        className={`base-medium ${
                          minutes == 0 && seconds < 10 ? "text-red-600" : ""
                        }`}
                      >
                        {minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                      </span>
                    </p>
                    <Button
                      type="button"
                      className="py-0.5 px-3 bg-color-1 hover:bg-color-2 font-rubik"
                      disabled={minutes > 0 || seconds > 0}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </Button>
                  </div>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <Button
              type="button"
              onClick={()=>{ form.reset()}}
              className="bg-gray-300 dark:bg-light-2 dark:text-black text-black border-black mt-3 font-rubik hover:bg-gray-200  "
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={minutes < 0 || seconds <= 0}
              className="mt-3 bg-color-1 hover:bg-color-2 font-rubik"
            >
              {loading? <Loader wid={40} hei={40} /> :'Verfiy'} 
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default Otp;
