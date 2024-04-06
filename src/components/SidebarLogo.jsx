import { BsTwitter } from "react-icons/bs";

function SidebarLogo() {
  return (
    <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-gray-800 hover-bg-opacity-10 cursor-pointer transition">
      <BsTwitter size={28} color="white" />
    </div>
  );
}

export default SidebarLogo;
