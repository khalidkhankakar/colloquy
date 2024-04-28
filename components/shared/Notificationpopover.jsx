import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
const Notificationpopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="bg-gray-200 p-2 sm:p-3 dark:bg-dark-3 rounded-full">
          <IoMdNotifications className="w-3.5 h-3.5 sm:h-5 sm:w-5 cursor-pointer text-black dark:text-white" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <p>Create post </p>
        <p>create reel</p>
        <p>create story</p>
        <p>live video</p>
      </PopoverContent>
    </Popover>
  );
};

export default Notificationpopover;
