import React from "react";
import Link from "next/link";

export default function StatsSection() {
 const courses = [
  {
    title: "Full Stack Web Development (MERN)",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Data Science & Machine Learning",
    img: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2",
  },
  {
    title: "Cloud Computing with AWS",
    img: "https://images.unsplash.com/photo-1493217465235-252dd9c0d632",
  },
  {
    title: "UI/UX Design & Product Prototyping",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  },
  {
    title: "Python Programming & Automation",
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
  },
  {
    title: "Cybersecurity & Ethical Hacking",
    img: "https://images.unsplash.com/photo-1493217465235-252dd9c0d632",
  },
];


  return (
    <div id="stats-section" className="bg-white ">

 
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: "20,000+", label: "Students Enrolled" },
          { value: "10+", label: "Institute Partners" },
          { value: "4.5★", label: "Learner Rating" },
          { value: "25+", label: "Courses" },
        ].map((item) => (
          <div
            key={item.label}
            className="text-white bg-red-900 rounded-4xl p-5"
          >
            <h3 className="text-4xl font-extrabold tracking-tight">
              {item.value}
            </h3>
            <p className="text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </section>

      {/* COURSES */}
      <section id="courses" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl text-red-600 md:text-4xl font-bold mb-10">
          Popular & Trending Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {courses.map((course) => (
            <div
              key={course.title}
              className="
                group 
                border 
                rounded-xl 
                bg-white 
                shadow-md
                p-6 
                relative 
                overflow-hidden 
                transition-all 
                duration-300 
                hover:-translate-y-2 
                cursor-pointer
              "
            >
              {/* 🔥 Smooth bottom-to-top snake animation */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t from-red-700 to-transparent
                  translate-y-full
                  group-hover:translate-y-0
                  transition-all duration-[900ms] ease-out
                  pointer-events-none
                "
              ></div>

              {/* CONTENT */}
              <div className="relative z-10">
                <div className="w-full h-40 rounded-md overflow-hidden mb-5 shadow-sm">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="
                      w-full h-full object-cover
                      transition-all duration-500
                    "
                  />
                </div>

                <h3
                  className="
                    font-semibold text-black 
                    text-xl transition-all duration-300 
                    group-hover:text-white
                  "
                >
                  {course.title}
                </h3>

                <p
                  className="
                    text-sm text-gray-600 mt-2 
                    transition-all duration-300 
                    group-hover:text-gray-100
                  "
                >
                  6 months • Online
                </p>

                <a
                  href="#"
                  className="
                    text-blue-600 text-sm font-medium mt-4 inline-block 
                    transition-all duration-300 group-hover:text-white
                  "
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
}
