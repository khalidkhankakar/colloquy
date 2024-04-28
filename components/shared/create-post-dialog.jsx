'use client'
import Image from "next/image"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImFilePicture } from "react-icons/im";
import {Form,FormControl, FormField,FormItem,} from "@/components/ui/form"
import { SelectInput, Tooltiphover } from "."
import { PostStatus } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { FaUserPlus } from "react-icons/fa"
import { FaFaceSmile } from "react-icons/fa6";
import { MdOutlineGifBox, MdVideoCameraBack } from "react-icons/md"
import { IoLocation } from "react-icons/io5"
import Dropzone from "./drop-zone"
import { useState } from "react"


const formSchema = z.object({
  status:z.string(),
  content:z.string()
})


const Createpostdialog = () => {
  const [showDropzone, setShowDropzone] = useState(false)
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      status: "",
      content:""
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
<DialogContent className="max-w-md rounded-lg font-poppins overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center base-semibold sm:h3-semibold">Create Post</DialogTitle>
        </DialogHeader>
<Separator />

<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

    <div className="flex-start ">
    <Image
            src={"/assets/user.png"}
            width={50}
            height={50}
            alt="logo"
            className="w-7 h-7 sm:h-8 sm:w-8  cursor-pointer"
          />
          <div>
            
    <p className="small-medium sm:base-regular ">Khalid kakar</p>
    <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <SelectInput
                    onValueChange={field.onChange}
                    data={PostStatus}
                    placeholder={"Public"}
                    className="text-sm py-0.5 outline-none bg-gray-600"
                  />
                )}
              />
          </div>

    </div>


<FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What's on your mind, Khalid?"
                  className="resize-y border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
{showDropzone && <Dropzone />}

        <div className="border border-gray-400 flex-between py-1 px-3 rounded-md">
        <p className="small-medium ">Add to Post</p>
          <div className="flex-center space-x-3 ">
            <Tooltiphover iconButton={<ImFilePicture className="h-5 w-5 cursor-pointer text-green-600" onClick={()=>setShowDropzone((prev)=>!prev)} />} tooltipText="Photo/Video" />
            <Tooltiphover iconButton={<FaUserPlus className="h-5 w-5 cursor-pointer text-blue-600" />} tooltipText="Tag people" />
            <Tooltiphover iconButton={ <FaFaceSmile className="h-5 w-5 cursor-pointer text-yellow-600" />} tooltipText="Feeling/Activity" />
            <Tooltiphover iconButton={<IoLocation className="h-5 w-5 cursor-pointer text-red-600" />} tooltipText="Location" />
            <Tooltiphover iconButton={<MdOutlineGifBox className="h-5 w-5 cursor-pointer text-green-600" />} tooltipText="Gif" />
            <Tooltiphover iconButton={<MdVideoCameraBack className="h-5 w-5 cursor-pointer text-red-600" />} tooltipText="Live" />
          </div>
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
              className="mt-3 bg-color-1 hover:bg-color-2 font-rubik"
            >
              Create
            </Button>
          </div>
      </form>
        <DialogFooter className="sm:justify-start">
        </DialogFooter>
      </DialogContent>
      </Form>
  )
}

export default Createpostdialog