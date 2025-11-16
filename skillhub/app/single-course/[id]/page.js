"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get("/courses/getAll");
        const foundCourse = res.data.courses.find((c) => c._id === id);
        if (!foundCourse) {
          toast.error("Course not found");
          return;
        }
        setCourse(foundCourse);
      } catch (err) {
        toast.error("Failed to fetch course");
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`);
      toast.success("Enrolled successfully!");
    } catch {
      toast.error("Enrollment failed!");
    }
  };

  if (!course) return <Loader />;

  return (
     <div className="min-h-screen w-full flex items-center justify-center p-8">
  <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-4 border-blue-600 dark:border-blue-400 p-10 space-y-6">
    
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 dark:text-blue-400">
      {course.title}
    </h1>

    <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
      {course.description}
    </p>

    <div className="flex flex-wrap justify-center gap-6 text-gray-800 dark:text-gray-200 font-medium text-center">
      <p><strong>Category:</strong> {course.category}</p>
      <p><strong>Level:</strong> {course.level}</p>
      <p><strong>Language:</strong> {course.metadata?.language || "N/A"}</p>
    </div>

    <p className="text-center text-green-600 dark:text-green-400 font-semibold text-xl md:text-2xl">
      Price: ₹{course.price} {course.currency}
    </p>

    <div className="flex flex-col md:flex-row justify-around items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner gap-2 text-gray-800 dark:text-gray-200">
      <p><strong>Instructor:</strong> {course.instructorName}</p>
      <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
      <p><strong>Updated At:</strong> {new Date(course.updatedAt).toLocaleDateString()}</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-2xl shadow-md text-gray-900 dark:text-white">
      <div>
        <p className="font-semibold">Total Enrollments</p>
        <p className="text-2xl font-bold">{course.stats?.totalEnrollments || 0}</p>
      </div>
      <div>
        <p className="font-semibold">Total Reviews</p>
        <p className="text-2xl font-bold">{course.stats?.totalReviews || 0}</p>
      </div>
      <div>
        <p className="font-semibold">Average Rating</p>
        <p className="text-2xl font-bold">{course.stats?.averageRating || 0}</p>
      </div>
    </div>


    <div className="text-center bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl shadow-sm text-gray-900 dark:text-white space-y-1">
      <p><strong>Estimated Hours:</strong> {course.metadata?.estimatedHours || 0}</p>
      <p><strong>Language:</strong> {course.metadata?.language || "N/A"}</p>
    </div>

    <div className="text-center">
      <button
        onClick={handleEnroll}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
      >
        Enroll Now
      </button>
    </div>
  </div>
</div>
  );
}
