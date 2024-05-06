import { clsx } from "clsx"
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5"
import { MdGroupAdd, MdOutlineGroupAdd } from "react-icons/md";
import { PiVideoLight,PiVideoFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge"
import { TiGroupOutline,TiGroup } from "react-icons/ti";
import UserAbout from "@/components/shared/forms/user-about";
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const DateOfBirthYears =['1992', '1993', '1994', '1995', '1996', '2000', '2001','2002']
export const DateOfBrithMonths =['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
export const DateOfBrithDays =['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
export const PostStatus =['private', 'public', 'friends']

export const formGender =['Male', 'Female','Other']

export const navLinks = [
  {
    outlineIcon:'/assets/home.png',
    fillIcon: '/assets/homeFill.png',
    link:'/'
  },
  {
    outlineIcon:'/assets/video.png',
    fillIcon: '/assets/videoFill.png',
    link:'/'
  },
  {
    outlineIcon:'/assets/gaming.png',
    fillIcon: '/assets/gamingFill.png',
    link:'/'
  },
  {
    outlineIcon:'/assets/marketplace.png',
    fillIcon: '/assets/marketplaceFill.png',
    link:'/'
  }
]

export const navLinks2 = [
  {
    outlineIcon:'/assets/menu.png',
  },
  {
    outlineIcon:'/assets/messenger.png',
  },
  {
    outlineIcon:'/assets/home.png',
  },
  {
    outlineIcon:'/assets/user.png',
  }
]

export const leftSideBarLinks = [
  {
    linkText:'Friends',
    link:'/',
    icon:'/assets/friend.png',
  },
  {
    linkText:'Saved',
    link:'/',
    icon:'/assets/save.png',
  },
  {
    linkText:'Videos',
    link:'/',
    icon:'/assets/videoGra.png',
  },
  {
    linkText:'Groups',
    link:'/',
    icon:'/assets/group.png',
  },
  {
    linkText:'Feed',
    link:'/',
    icon:'/assets/feed.png',
  },
  {
    linkText:'Messenger',
    link:'/',
    icon:'/assets/messenger.png',
  },
  {
    linkText:'Events',
    link:'/',
    icon:'/assets/event.png',
  },
  {
    linkText:'Order and Payments',
    link:'/',
    icon:'/assets/payment.png',
  },
]


export const topbarNavigations = [
  {
    outlineComponent:<IoHomeOutline />,
    fillComponent:<IoHomeSharp />,
    link:'/',
  },
  {
    outlineComponent:<PiVideoLight />,
    fillComponent:<PiVideoFill />,
    link:'/video',
  },
  {
    outlineComponent:<MdOutlineGroupAdd />,
    fillComponent:<MdGroupAdd />,
    link:'/friend',
  },
  {
    outlineComponent:<TiGroupOutline />,
    fillComponent:<TiGroup />,
    link:'/group',
  }
]

export const profileNavigationBar = [
  {
    text:'Post',
    component:() => <p>Post</p>
  },
  {
    text:'About',
    component:()=>{ return <UserAbout />}
  },
  {
    text:'Friend',
    component:()=>{
      return <p>Friends</p>
    }
  },
  {
    text:'Group',
    component:()=>{
      return <p>Groups</p>
    }
  },
  {
    text:'Video',
    component:()=>{
      return <p>Videos</p>
    }
  },
  {
    text:'Reel',
    component:()=>{
      return <p>Reels</p>
    }
  },
    {
    text:'Like',
    component:()=>{
      return <p>Likes</p>
    }
  },
  {
    text:'Event',
    component:()=>{
      return <p>Events</p>
    }
  }

]