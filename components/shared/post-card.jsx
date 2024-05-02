import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa6";
import { PiShareFatThin } from "react-icons/pi";
import { Separator } from "../ui/separator";
const PostCard = () => {
  return (
    <div className="dark:bg-dark-1 rounded-md flex-col space-y-2  m-auto my-2 bg-white  w-[95%] flex-start">
      {/* user details */}
      <div className="w-full flex-between font-rubik px-3 py-1">
        <div className="flex-center space-x-2">
          <Image
            src={"/assets/user.png"}
            alt="user pic"
            width={50}
            height={50}
            className="h-10 w-10 rounded-full "
          />
          <div>
            <p className="base-medium   text-gray-700 dark:text-white ">
              Khalid Kakar
            </p>
            <p className="small-regular dark:text-slate-100 text-gray-500">
              14 hr
            </p>
          </div>
        </div>
        <div className="space-x-3 flex-center">
          <BsThreeDots className="w-5 h-5 cursor-pointer" />
          <RxCross2 className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* content */}
      <div className="base-regular font-rubik w-full px-3">
        <p className="w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod vitae
          quidem dolorem dolorum. At distinctio maiores, officia repellendus
          sint assumenda id explicabo, odio saepe asperiores hic voluptatum
          incidunt itaque sit.
        </p>
      </div>
      {/* image */}
      <div className="w-full h-full">
        <Image
          src={"/2.jpg"}
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          alt="post-pic"
        />
      </div>
      <Separator className="my-1" />

      <Separator className="my-1" />
      {/* reactions */}
      <div className="w-full md:w-2/3 flex-between py-2 font-poppins ">
        <div className="flex-center space-x-1 md:space-x-2 cursor-pointer">
          <SlLike className="w-5 h-5 " />
          <p className="base-semibold ">Like</p>
        </div>
        <div className="flex-center space-x-1 md:space-x-2 cursor-pointer">
          <FaRegComment className="w-5 h-5 " />
          <p className="base-semibold">Comment</p>
        </div>
        <div className="flex-center space-x-1 md:space-x-2 cursor-pointer">
          <PiShareFatThin className="w-5 h-5 " />
          <p className="base-semibold">Share</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
