"use client";
import Link from "next/link";

export default function CourseCard({ course }) {
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
      <Link
        href={`/single-course/${course._id}`}
        className="inline-block bg-blue-600 text-white mt-3 px-4 py-2 rounded"
      >
        View Course
      </Link>
    </div>
  );
}
