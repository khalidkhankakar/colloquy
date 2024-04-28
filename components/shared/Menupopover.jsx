import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import { MdSlowMotionVideo,MdEventAvailable,MdGroups,MdOutlineEmojiEvents } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import Iconbutton from "./Iconbutton";
import { Createpostdialog, Dialogbox } from ".";
const Menupopover = () => {
  return (
    <Popover className="dark:bg">
      <PopoverTrigger>
        <div className="bg-gray-200 p-2 md:p-3 dark:bg-dark-1 rounded-full">
          <Image
            src={"/assets/menu.png"}
            width={50}
            height={50}
            alt="logo"
            className="w-3.5 h-3.5 sm:h-5 sm:w-5  cursor-pointer"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex-start dark:bg-dark-1 flex-col space-y-1">
      <h2 className="h3-bold">Create</h2>
      <Dialogbox iconButton={<Iconbutton icon={<IoCreateOutline className="h-7 w-7" />} text={'Post'} />} dialogBody={<Createpostdialog />} />
        <Iconbutton icon={<MdSlowMotionVideo className="h-7 w-7" />} text={'Reel'} />
        <Iconbutton icon={<FaBookOpen className="h-7 w-7" />} text={'Story'} />
        <Iconbutton icon={<MdOutlineEmojiEvents className="h-7 w-7" />} text={'Life Event'} />
        <Separator />
        <Iconbutton icon={<MdGroups className="h-7 w-7" />} text={'Group'} />
        <Iconbutton icon={<MdEventAvailable className="h-7 w-7" />} text={'Event'} />
      </PopoverContent>
    </Popover>
  );
};

export default Menupopover;
