"use client";
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // استيراد مكتبة Framer Motion

const Page = ({ params }) => {
  const { id } = React.use(params); // استخدام React.use() لفك تفكيك params
  const [data, setData] = useState(null);

  const fetchBlog = async () => {
    try {
      if (!id) return;
      const response = await axios.get("/api/blog", { params: { id } });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  // تعريف إعدادات الأنيميشن
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return data ? (
    <>
      <motion.div
        className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="Logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <motion.button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <Image src={assets.arrow} alt="Arrow" />
          </motion.button>
        </div>
        <motion.div
          className="text-center my-24"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            alt="Author Image"
            src={assets.profile_icon}
            width={60}
            height={60}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <Image
          className="rounded-lg border-4 border-white"
          src={data.image}
          alt="Blog Image"
          width={1280}
          height={720}
        />
        <div
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: data.decription }}
        ></div>
        <motion.div
          className="my-24"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <p>Social Media</p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} width={50} alt="Facebook" />
            <Image src={assets.twitter_icon} width={50} alt="Twitter" />
            <Image src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-2xl">Loading...</p>
    </div>
  );
};

export default Page;
