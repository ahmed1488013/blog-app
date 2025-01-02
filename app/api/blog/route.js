import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//api EndPiont to get blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//api Endpoint to uploding blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    console.log("Received formData:", Array.from(formData.entries()));

    const timestamp = Date.now();

    // معالجة الصورة
    const image = formData.get("image");
    if (!image) {
      console.error("Image field is missing");
      return NextResponse.json({
        success: false,
        msg: "Image field is required",
      });
    }
    if (!(image instanceof File)) {
      console.error("Invalid image type");
      return NextResponse.json({ success: false, msg: "Invalid image file" });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgURl = `/${timestamp}_${image.name}`;
    console.log("Image saved at:", imgURl);

    // إعداد البيانات
    const blogData = {
      title: formData.get("title"),
      decription: formData.get("decription"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgURl,
      authorImg: formData.get("authorImg"),
    };

    console.log("Blog data to save:", blogData);

    // حفظ البيانات
    await BlogModel.create(blogData);
    console.log("Blog saved successfully");

    return NextResponse.json({ success: true, msg: "Blog added successfully" });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

//api Endpiont to delete blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "blog Deleted" });
}
