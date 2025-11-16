"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import CourseCard from "@/components/CourseCard";
import Loader from "@/components/Loader";
import Cookies from "js-cookie";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses/getAll");
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();

    const token = Cookies.get("token");
    if (token) setIsLoggedIn(true);
  }, []);

  if (!courses.length) return <Loader />;

  return (
  <div className="p-8  bg-gray-50 dark:bg-red-50 mt-16 rounded-xl shadow-lg">
  <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center">
    Available Courses
  </h1>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {courses.map((course) => (
      <div
        key={course._id}
        className="transform hover:-translate-y-2 transition-all duration-300"
      >
        <CourseCard course={course} isLoggedIn={isLoggedIn} />
      </div>
    ))}
  </div>
</div>

  );
}
