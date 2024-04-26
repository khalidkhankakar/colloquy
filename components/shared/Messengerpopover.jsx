import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"

const Messengerpopover = () => {
  return (
<Popover>
  <PopoverTrigger><div  className="bg-gray-200 p-2  sm:p-3 rounded-full">
    
              <Image
                src={'/assets/messenger.png'}
                width={50}
                height={50}
                alt="logo"
                className="w-3.5 h-3.5 sm:h-5 sm:w-5  cursor-pointer"
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

export default Messengerpopover;