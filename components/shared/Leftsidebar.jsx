
import { leftSideBarLinks } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Themetoggle } from ".";

const Leftsidebar = () => {
  return (
    <div className="hide-scroll-bar shadow-md hidden dark:bg-dark-1 md:flex items-start px-5 py-4 justify-start space-y-2 flex-col col-span-4 lg:col-span-3 max-h-screen h-screen overflow-y-scroll">
      <Link href={"/"} className="flex-center space-x-3">
        <Image
          src={"/assets/user.png"}
          width={50}
          height={50}
          alt="logo"
          className="w-8 h-8 cursor-pointer"
        />
        <p className="base-semibold  text-gray-700 dark:text-white ">Khalid Kakar</p>
      </Link>
      {leftSideBarLinks.map((nav) => {
        return (
          <Link
            href={nav.link}
            key={nav.linkText}
            className="flex mt-5 items-center space-x-3 rounded-lg px-3 hover:bg-gray-200 dark:hover:bg-dark-3 py-2 w-full "
          >
            <Image
              src={nav.icon}
              width={50}
              height={50}
              alt="logo"
              className="w-5 h-5 cursor-pointer"
            />
            <p className="base-semibold  text-gray-700 dark:text-white">{nav.linkText}</p>
          </Link>
        );
      })}
      <Themetoggle />
    </div>
  );
};

export default Leftsidebar;
