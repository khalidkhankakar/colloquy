'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage ,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { OtpFormSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const Otp = () => {

  const form = useForm({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center flex-col dark:text-white text-black ">
      <Image src='/colloquy.svg' width={200} height={100} alt={'logo'} className='mt-5 mb-3' />
      <h3 className='mb-2 h3-bold font-rubik w-[90vw] md:w-full text-center'>Enter the 6 digits Otp to verfiy your account</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[95vw] md:w-[80vw] lg:w-[70vw] space-y-2" >

          <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='small-medium' >Otp - (6 digits)</FormLabel >
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
          <div className="grid grid-cols-2 gap-4">
        <Button type="button" className="bg-gray-300 text-black border-black mt-3 font-rubik hover:bg-gray-200 dark:bg-slate-200 dark:hover:bg-slate-200 dark:text-white">Cancel</Button>
        <Button type="submit" className="mt-3 bg-color-1 hover:bg-color-2 font-rubik">Verfiy</Button>
          </div>
      <div className='line w-40 my-3 m-auto' />
      <p className='small-regular font-rubik text-center '>Do not have account? <Link href="/signup" className="text-yellow-700  ">Register</Link></p>
      </form>
      </div>
    </Form>
  )
}

export default Otp