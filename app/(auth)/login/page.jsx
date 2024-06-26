"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logInFormDefaultValues, logInFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/shared";
import { useState } from "react";
import { loginUser } from "@/database/actions/user.actions";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(logInFormSchema),
    defaultValues: logInFormDefaultValues,
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      console.log(values);
      const resp = await loginUser(values);
      console.log(JSON.parse(JSON.stringify(resp)));
      if (resp.status == 200) {
        toast({
          title: "Login successfully",
          description: resp.message,
        });
        router.push("/");
        return;
      }
      if (resp.status == 310) {
        toast({
          title: "Not verified user",
          description: resp.message,
        });
        router.push("/otp");
        return;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Server error",
        description: resp.message,
      });
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
          Welcome back login to your account
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95vw] md:w-[80vw] lg:w-[70vw] space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-rubik font-normal">Email</FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-rubik font-normal">
                  Password
                </FormLabel>
                <FormControl>
                  <Input className="outline-none" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
              className="mt-3 bg-color-1 hover:bg-color-2 font-rubik"
            >
              {loading ? <Loader wid={40} hei={40} /> : "Login"}{" "}
            </Button>
          </div>
          <Separator className="w-1/2  m-auto" />
          <p className="small-regular font-rubik text-center ">
            Do not have account?{" "}
            <Link href="/signup" className="text-yellow-500  ">
              Register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Login;
