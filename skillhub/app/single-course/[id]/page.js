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
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-gray-600">{course.description}</p>
      
      <div className="flex gap-4 text-gray-700">
        <p><strong>Category:</strong> {course.category}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Language:</strong> {course.metadata?.language || "N/A"}</p>
      </div>

      <p className="text-blue-700 font-semibold text-lg">
        Price: ₹{course.price} {course.currency}
      </p>

      <div className="space-y-1">
        <p><strong>Instructor:</strong> {course.instructorName}</p>
        <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated At:</strong> {new Date(course.updatedAt).toLocaleDateString()}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md space-y-2 text-black">
        <h2 className="font-semibold text-lg">Stats:</h2>
        <p><strong>Total Enrollments:</strong> {course.stats?.totalEnrollments || 0}</p>
        <p><strong>Total Reviews:</strong> {course.stats?.totalReviews || 0}</p>
        <p><strong>Average Rating:</strong> {course.stats?.averageRating || 0}</p>
        <p><strong>Average Duration:</strong> {course.stats?.averageDuration || 0} hours</p>
        <p><strong>Completion Rate:</strong> {course.stats?.completionRate || 0}%</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md space-y-1 text-black">
        <h2 className="font-semibold text-lg">Metadata:</h2>
        <p><strong>Estimated Hours:</strong> {course.metadata?.estimatedHours || 0}</p>
        <p><strong>Language:</strong> {course.metadata?.language || "N/A"}</p>
      </div>

      <button
        onClick={handleEnroll}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Enroll Now
      </button>
    </div>
  );
}
