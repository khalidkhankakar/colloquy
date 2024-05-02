import { Button } from "@/components/ui/button"
import Image from "next/image"
import { IoCameraSharp } from "react-icons/io5";
const Profile = ({params}) => {
    return (
      <div className="flex-center font-poppins flex-col">
        {/* profile and profile cover */}
        <div className="w-full lg:w-2/3 h-56 md:h-72 lg:h-96 relative">
            <Image src={'/2.jpg'} width={1000} height={1000} alt="cover pic" className="object-cover  w-full h-full " />
            <div className="absolute bottom-3 right-3">
            
                <Button className="px-3"><IoCameraSharp className="w-6 h-6 px-1" />Edit cover photo</Button>
            </div>
            <div className="absolute bottom-[-100px] flex-center md:flex-row flex-col  md:left-3 left-36  ">
            <Image src={'/assets/user.png'} width={400} height={400} alt="cover pic" className="h-32 w-32 border-2 rounded-full p-1 border-white" />
            <p className="h1-semibold font-poppins">Khalid Kakar</p>
            <p className="small-regular">225 friends</p>
            </div>
        </div>

{/* user posts */}
<p>haldifasdfj</p>
      </div>
    )
  }
  
  export default Profile