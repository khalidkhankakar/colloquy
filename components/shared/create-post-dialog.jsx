"use client";
import Image from "next/image";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImFilePicture } from "react-icons/im";
import {Form,FormControl,FormField,FormItem,FormMessage,
} from "@/components/ui/form";
import { Dropzone, Giphy, Loader, SelectInput } from ".";
import { PostStatus } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FaUserPlus } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import { MdOutlineGifBox, MdVideoCameraBack } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { useState } from "react";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";
import { postFormDefaultValues, postFormSchema } from "@/lib/validations";
import { FaArrowLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
const Createpostdialog = () => {
  const [showDropzone, setShowDropzone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giphy, setGiphy] = useState({
    showGiphy: false,
    giphyUrl: "",
  });

  const form = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: postFormDefaultValues,
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const userId = await getDataFromToken();
      if (!userId.id) return;
      const formData = new FormData();
      if (values.files.length > 0) {
        values.files.forEach((file) => {
          formData.append("files", file); // Assuming 'files' is the key for file upload
        });
      }
      formData.append("status", values.status);
      formData.append("content", values.content);
      formData.append("userId", userId.id);
      const response = await fetch(`/api/post`, {
        method: "POST",
        body: formData,
      });
      const parseRes = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <DialogContent className="max-w-md rounded-lg font-poppins overflow-y-auto">
        <DialogHeader>
        {giphy.showGiphy && <FaArrowLeft onClick={() => setGiphy({ ...giphy, showGiphy: false })} />}
          <DialogTitle className="text-center base-semibold sm:h3-semibold">
            {!giphy.showGiphy ? "Create Post" : "Trending Giphy"}
          </DialogTitle>
        </DialogHeader>
        <Separator />

        {!giphy.showGiphy ? (
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {(showDropzone && giphy.giphyUrl.length <= 0)  && (
              <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Dropzone fieldChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <div className="relative">
  {giphy.giphyUrl.length > 0 && (
    <div className="relative">
      <Image src={giphy.giphyUrl} width={300} height={400} alt="gif" className="w-full h-44"/>
      <div className="absolute top-0 right-0 m-2">
        <RxCross2 className="h-7 w-7 text-black cursor-pointer" onClick={()=>{setGiphy({...giphy, giphyUrl:''})}} />
      </div>
    </div>
  )}
</div>

            {/* {giphy.giphyUrl.length > 0 &&  <Image src={giphy.giphyUrl} width={300} height={400} alt="gif" className="w-full h-44"/>} */}

            <div className="border border-gray-400 flex-between py-1 px-3 rounded-md">
              <p className="small-medium ">Add to Post</p>
              <div className="flex-center space-x-3 ">
                <ImFilePicture className="h-5 w-5 cursor-pointer text-green-600" onClick={() => setShowDropzone((prev) => !prev)}                />
                <FaUserPlus className="h-5 w-5 cursor-pointer text-blue-600" />
                <FaFaceSmile className="h-5 w-5 cursor-pointer text-yellow-600" />
                <IoLocation className="h-5 w-5 cursor-pointer text-red-600" />
                <MdOutlineGifBox
                  className="h-5 w-5 cursor-pointer text-green-600"
                  onClick={() => setGiphy({ ...giphy, showGiphy: true })}
                />
                <MdVideoCameraBack className="h-5 w-5 cursor-pointer text-red-600" />
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
                {loading ? <Loader wid={40} hei={40} /> : "Create"}
              </Button>
            </div>
          </form>
        ) : (
          <Giphy giphy={giphy} setGiphy={setGiphy} />
        )}
      </DialogContent>
    </Form>
  );
};

export default Createpostdialog;
