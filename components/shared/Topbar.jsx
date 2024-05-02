"use client";
import { navLinks, topbarNavigations } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {
  Menupopover,
  Messengerpopover,
  Notificationpopover,
  Userpopover,
} from ".";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Topbar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  return (
    <div className="py-3 px-3 sticky z-50 top-0 dark:bg-dark-1 bg-white  shadow-md  flex-between">
      {/* logo and search bar */}
      <div className="flex-center space-x-4">
        <Image
          src={"/colloquy.svg"}
          width={200}
          height={80}
          alt="logo"
          className="w-36 "
        />
        <div className="bg-gray-200 dark:bg-dark-3 p-2 rounded-full block lg:hidden">
          <Image
            src={"/assets/search.png"}
            width={50}
            height={50}
            alt="logo"
            className="w-3.5 h-3.5 sm:h-5 sm:w-5   rounded-full cursor-pointer"
          />
        </div>
        <div className="hidden lg:flex items-center justify-center dark:bg-dark-3  space-x-2 bg-gray-100 py-2 px-3 rounded-full">
          <Image
            src={"/assets/search.png"}
            width={50}
            height={50}
            alt="logo"
            className="w-5 h-5 "
          />
          <input
            type="text"
            name="search"
            className="outline-none dark:bg-dark-3 dark:text-slate-300 dark:placeholder:text-slate-300 bg-gray-100 placeholder:text-black"
            placeholder="Search Colloquy"
          />
        </div>
      </div>
      {/* hidden of xsm  */}
      {/* navigations */}
      <div className="hidden md:flex space-x-10 ">

        {topbarNavigations.map((nav) => {
          return <Link className="hidden md:block " key={nav.link} href={nav.link}>
            {
            pathname === nav.link
              ?
               React.cloneElement(nav.fillComponent, {
                  style: { height: "30px", width: "30px",  },
                })
              : 
              React.cloneElement(nav.outlineComponent, {
                  style: { height: "30px", width: "30px", },
                })
              
            }
          </Link>;
        })}
      </div>
      {/* create post messenger */}
      <div className="flex-center space-x-2  ">
        <Menupopover />
        <Messengerpopover />
        <Notificationpopover />
        <Userpopover />
      </div>
    </div>
  );
};

export default Topbar;
