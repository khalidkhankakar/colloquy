import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import { MdSlowMotionVideo,MdEventAvailable,MdGroups,MdOutlineEmojiEvents    } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
const Menupopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-gray-200 p-2 md:p-3 rounded-full">
          <Image
            src={"/assets/menu.png"}
            width={50}
            height={50}
            alt="logo"
            className="w-3.5 h-3.5 sm:h-5 sm:w-5  cursor-pointer"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex-start flex-col space-y-1">
      <h2 className="h3-bold">Create</h2>

        <div className="flex-start create-posts-menu">
        <IoCreateOutline className="h-7 w-7" />
          <p className="base-semibold">Post</p>
        </div>

        <div className="flex-start create-posts-menu ">
        <MdSlowMotionVideo className="h-7 w-7" />
          <p className="base-semibold">Reel</p>
        </div>

        <div className="flex-start create-posts-menu ">
        <FaBookOpen className="h-7 w-7" />
          <p className="base-semibold">Story</p>
        </div>

        <div className="flex-start create-posts-menu ">
        <MdOutlineEmojiEvents  className="h-7 w-7" />
          <p className="base-semibold">Life Event</p>
        </div>

        {/* <Separator /> */}

        <div className="flex-start create-posts-menu ">
        <MdGroups   className="h-7 w-7" />
          <p className="base-semibold">Group</p>
        </div>
        <div className="flex-start create-posts-menu ">
        <MdEventAvailable   className="h-7 w-7" />
          <p className="base-semibold">Event</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Menupopover;
