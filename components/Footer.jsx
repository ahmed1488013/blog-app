import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="" width={120} />
      <p className='text-white text-sm'>All right reserved. copyright @blogger</p>
      <div className='flex'>
        <Image width={40} src={assets.facebook_icon} alt=''/> 
        <Image width={40} src={assets.twitter_icon} alt=''/> 
        <Image width={40} src={assets.googleplus_icon} alt=''/> 
      </div>
    </div>
  );
};

export default Footer;
