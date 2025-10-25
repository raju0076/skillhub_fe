"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Enrolled = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const token = Cookies.get("token");
  const studentId = token
    ? (() => {
        try {
          return jwtDecode(token).userId;
        } catch {
          return null;
        }
      })()
    : null;

  useEffect(() => {
    if (!studentId) {
      setError("Invalid or missing student ID.");
      setLoading(false);
      return;
    }

    const fetchEnrolledCourses = async () => {
      try {
        const res = await api.get(`/students/getEnrolledcourses`);
        if (res.data.courses) {
          setCourses(res.data.courses);
        } else {
          setError("No enrolled courses found.");
        }
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err);
        setError("Something went wrong while fetching enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

  if (loading) {
    return (
      <ProtectedRoute role="student">
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-lg font-semibold text-gray-600">Loading courses...</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute role="student">
        <div className="p-8 text-red-600 font-medium">{error}</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute role="student">
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800 tracking-wide">
          🏫 Enrolled Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-600">You have not enrolled in any courses yet.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-1">{course.description}</p>
                  <p className="text-gray-700 mt-2 font-medium">Instructor: {course.instructorName}</p>
                  <p className="text-blue-700 mt-2 font-bold">₹{course.price}</p>
                  <p className="text-sm text-gray-500 mt-1">Level: {course.level}</p>
                </div>
                <button
                  onClick={() => router.push(`/single-course/${course._id}`)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Enrolled;
