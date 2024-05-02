"use client";
import Image from "next/image";
import Link from "next/link";
import { Loader, SelectInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateOfBirthYears, DateOfBrithDays, DateOfBrithMonths, formGender} from "@/lib/utils";
import { signUpFormDefaultValues, signUpFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "@/database/actions/user.actions";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { EmailContext } from "@/context/emailContext/EmailContext";
import { Separator } from "@/components/ui/separator";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { setUserEmail } = useContext(EmailContext);
  const inputRef = useRef(null);

  // useEffect hook to focus the input element when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaultValues,
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      // Taking the birth and joining like this DD/MM/YYYY
      const joinBrith = [values.day, values.month, values.year];
      const newBirth = joinBrith.join("/");
      const newValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        birth: newBirth,
        password: values.password,
        cpassword: values.cpassword,
      };
      // Creating the user in Database using NextJS Server Actions
      const resp = await createUser(newValues);
      console.log(resp);
      if (resp.status == 201) {
        setUserEmail(values.email);
        router.push("/otp");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
        <h3 className="mb-2 h3-bold font-rubik">
          Create an account to get started
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95vw] md:w-[80vw] lg:w-[70vw] space-y-2"
        >
          <div className="grid grid-cols-2 gap-1 md:gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-rubik font-normal">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="outline-none"
                      {...field}
                      required
                      ref={inputRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-rubik font-normal">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input className="outline-none" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid items-end  grid-cols-2 gap-1 md:gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-rubik font-normal">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input className="outline-none" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="space-y-1">
              <FormLabel className="font-rubik font-normal">Gender</FormLabel>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <SelectInput
                    onValueChange={field.onChange}
                    data={formGender}
                    placeholder={"Gender"}
                  />
                )}
              />
            </div>
          </div>
          <FormLabel className="font-rubik font-normal">
            Date of birth
          </FormLabel>
          <div className="grid grid-cols-3 gap-1 md:gap-3">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <SelectInput
                  onValueChange={field.onChange}
                  data={DateOfBrithDays}
                  placeholder={"Day"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <SelectInput
                  onValueChange={field.onChange}
                  data={DateOfBrithMonths}
                  placeholder={"Month"}
                />
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <SelectInput
                  onValueChange={field.onChange}
                  data={DateOfBirthYears}
                  placeholder={"Year"}
                />
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 md:gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-rubik font-normal">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input className="outline-none" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-rubik font-normal">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input className="outline-none" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              className="bg-gray-300 dark:bg-light-2 dark:text-black text-black border-black mt-3 font-rubik hover:bg-gray-200  "
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="mt-3 dark:text-white bg-color-1 hover:bg-color-2 font-rubik"
            >
              {loading ? <Loader wid={40} hei={40} /> : "Create account"}
            </Button>
          </div>
          <Separator className="w-1/2  m-auto" />
          <p className="small-regular text-center ">
            Already have an account?
            <Link href="/login" className="text-yellow-500  ">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Signup;
