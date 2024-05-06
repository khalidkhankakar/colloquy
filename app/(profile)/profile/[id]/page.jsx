'use client'
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { profileNavigationBar } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
const Profile = ({ params }) => {
  const [activeNav, setActiveNav] = useState(profileNavigationBar[0]); // Initially, no active nav

  const handleClick = (nav) => {
    setActiveNav(nav); // Update active nav state on click
  };

  return (
    <div className="flex-center font-poppins flex-col ">
      {/* profile and profile cover */}
      <div className="w-full lg:w-2/3 h-56 md:h-72 lg:h-96 relative">
        <Image
          src={"/2.jpg"}
          width={1000}
          height={1000}
          alt="cover pic"
          className="object-cover  w-full  h-full  rounded-bl-2xl rounded-br-2xl "
        />
        <div className="absolute bottom-3 right-3">
          <Button className="px-3">
            <IoCameraSharp className="w-6 h-6 px-1" />
            Edit cover photo
          </Button>
        </div>
        <div className="absolute bottom-[-200px] md:bottom-[-110px] flex-between md:flex-row flex-col  md:left-3 xsm:left-26 w-full    ">
          <div className="flex-center flex-col md:flex-row">
            <Image
              src={"/assets/user.png"}
              width={400}
              height={400}
              alt="cover pic"
              className="h-32 w-32 border-2 rounded-full p-1 border-white "
            />
            <div className="flex-center flex-col mx-2">
              <p className="md:h1-semibold h2-semibold  font-poppins">
                Khalid Kakar
              </p>
              <p className="small-regular self-center md:self-start">
                225 friends
              </p>
              {/* friends */}
              <div className="flex-center self-center md:self-start space-x-2 ">
                <Image
                  src={"/assets/user.png"}
                  width={40}
                  height={40}
                  alt="cover pic"
                  className="h-8 w-8 border-2 rounded-full "
                />
                <Image
                  src={"/assets/user.png"}
                  width={40}
                  height={40}
                  alt="cover pic"
                  className="h-8 w-8 border-2 rounded-full "
                />{" "}
                <Image
                  src={"/assets/user.png"}
                  width={40}
                  height={40}
                  alt="cover pic"
                  className="h-8 w-8 border-2 rounded-full "
                />
              </div>
            </div>
          </div>

<div className="mr-0 md:mr-10 space-x-3 my-1 md:my-0">
  <Button>Add to story</Button>
  <Button>Edit profile</Button>
</div>

        </div>
      </div>

      <div className="h-52 md:h-32" />
      {/* user posts */}
      <div className="w-full lg:w-2/3 ">
        <Separator className='my-1'  />
        <div className="flex-center gap-1 md:flex-between flex-wrap">
          {
            profileNavigationBar.map((nav)=>(
              <Button onClick={() => handleClick(nav)} variant='outline'  className={`py-1 h-8  ${activeNav.text === nav.text ? 'bg-color-1':''}`} key={nav.text}>{nav.text}</Button>
            ))
          }
        </div>
        <Separator className='my-1'  />
      </div>
      <div>
      {activeNav.component()}
        
      </div>
    </div>
  );
};

export default Profile;
