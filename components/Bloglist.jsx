import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import { motion } from "framer-motion"; // Importing framer-motion for powerful animations
import { Fade } from "react-awesome-reveal";

const Bloglist = () => {
  const [menu, setmenu] = useState("All");
  const [blogs, setBlogs] = useState([]); 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      alert("Failed to load blogs. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setmenu("All")}
          className={menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          All
        </button>
        <button
          onClick={() => setmenu("Technology")}
          className={menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Technology
        </button>
        <button
          onClick={() => setmenu("Startup")}
          className={menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Startup
        </button>
        <button
          onClick={() => setmenu("Lifestyle")}
          className={menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm" : ""}
        >
          Lifestyle
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-3 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -100, rotate: 45 }} // Initial state with off-screen and rotation
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  transition: { duration: 1, ease: "easeOut" }, // Animate to final state with smooth transition
                }}
                exit={{ opacity: 0, x: 100, rotate: -45 }} // Exit state with movement in the opposite direction
              >
               <Fade key={index} duration={1000} triggerOnce>
                <BlogItem
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  description={item.decription}
                  category={item.category}
                />
                </Fade>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Bloglist;
