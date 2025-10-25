"use client";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function CourseCard({ course, isLoggedIn }) {
  const handleEnroll = async () => {
    console.log(course._id,"id")
    try {
      const res = await api.post(`/courses/${course._id}/enroll`);
      toast.success(res.data.message || "Enrolled successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Enrollment failed!");
    }
  };
  

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 transition">
      <img
        src={course.thumbnail || "/placeholder.jpg"}
        alt={course.title}
        className="rounded-md w-full h-40 object-cover mb-3"
      />
      <h2 className="text-lg font-semibold text-black">{course.title}</h2>
      <p className="text-sm text-black">{course.category}</p>
      <p className="text-blue-700 font-semibold mt-2">₹{course.price}</p>

      <div className="flex gap-2 mt-3">
        <Link
          href={`/single-course/${course._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Course
        </Link>

        {isLoggedIn && (
          <button
            onClick={handleEnroll}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );
}
