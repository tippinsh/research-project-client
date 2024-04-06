import SidebarLogo from "./SidebarLogo";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import {
  FaUser,
  FaEnvelope,
  FaRegListAlt,
  FaRegBookmark,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaMagnifyingGlass, FaUserGroup } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-36">
              <IoMdHome size={28} color="white" />
              <p className="text-xl font-bold text-offwhite">Home</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-40">
              <FaMagnifyingGlass size={28} color="white" />
              <p className="text-xl text-offwhite">Explore</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-48">
              <BsBellFill size={28} color="white" />
              <p className="text-xl text-offwhite">Notifications</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-44">
              <FaEnvelope size={28} color="white" />
              <p className="text-xl text-offwhite">Messages</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-32">
              <FaRegListAlt size={28} color="white" />
              <p className="text-xl text-offwhite">Lists</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-44">
              <FaRegBookmark size={28} color="white" />
              <p className="text-xl text-offwhite">Bookmarks</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-48">
              <FaUserGroup size={28} color="white" />
              <p className="text-xl text-offwhite">Communities</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-32">
              <FaUser size={28} color="white" />
              <p className="text-xl text-offwhite">Profile</p>
            </div>
          </div>
          <div className="h-14 w-full">
            <div className="rounded-full gap-3 p-3 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer flex justify-start items-center w-32">
              <CiCircleMore size={28} color="white" />
              <p className="text-xl text-offwhite">More</p>
            </div>
          </div>
          <button className="bg-twitterblue px-5 py-4 text-sm md:text-lg rounded-full text-white font-bold w-full hover:opacity-90">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
