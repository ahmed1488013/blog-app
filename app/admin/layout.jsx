import { assets } from "@/Assets/assets";
import Sidebar from "../../components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
      <ToastContainer theme="dark"/> 
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 px-12 max-h-[60px] border-b border-black">
            <h3 className="font-medium">Admin panal</h3>
            <Image src={assets.profile_icon} alt="" width={40} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
