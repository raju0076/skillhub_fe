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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
}
