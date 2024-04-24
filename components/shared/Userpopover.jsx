import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

const Userpopover = () => {
  return (
<Popover>
  <PopoverTrigger><div  className="bg-gray-200 p-3 rounded-full">
              <Image
                src={'/assets/user.png'}
                width={50}
                height={50}
                alt="logo"
                className="w-5 h-5  cursor-pointer"
              />
            </div></PopoverTrigger>
  <PopoverContent>
    <p>Create post </p>
    <p>create reel</p>
    <p>create story</p>
    <p>live video</p>
  </PopoverContent>
</Popover>

  )
}

export default Userpopover