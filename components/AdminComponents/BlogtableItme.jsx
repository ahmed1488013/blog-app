import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogtableItme = ({ authorImg,title,author,date,deletBlogs,mongoId }) => {
  const blogDate= new Date(date);
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className=" items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
        <Image alt="" src={authorImg ? authorImg : assets.profile_icon} width={40} height={40}/>
        <p>{author?author:""}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "no title"}</td>
      <td className="px-6 py-4">{blogDate.toDateString()}</td>
      <td className="px-6 py-4 cursor-pointer" onClick={()=>deletBlogs(mongoId)}>x</td>
    </tr>
  );
};

export default BlogtableItme;
