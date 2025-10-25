"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [analytics, setAnalytics] = useState(null);
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

    const fetchAnalytics = async () => {
      try {
        const res = await api.get(`/analytics/student/${studentId}`);
        if (res.data.success) {
          setAnalytics(res.data.data);
        } else {
          setError("Failed to load analytics data.");
        }
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError("Something went wrong while fetching analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [studentId]);

  if (loading) {
    return (
      <ProtectedRoute role="student">
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-lg font-semibold text-gray-600">Loading dashboard...</p>
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

  if (!analytics) {
    return (
      <ProtectedRoute role="student">
        <div className="p-8 text-gray-700">No analytics data available.</div>
      </ProtectedRoute>
    );
  }

  const {
    learningStats = {},
    performanceMetrics = {},
    recommendations = [],
  } = analytics;

  return (
    <ProtectedRoute role="student">
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800 tracking-wide">
           Student Dashboard
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 border-b-2 border-blue-200 pb-2">
             Learning Stats
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => router.push("/enrolled-courses")}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 hover:bg-blue-50"
            >
              <p className="text-gray-600 text-sm">Total Courses Enrolled</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.totalCoursesEnrolled ?? 0}
              </p>
              <p className="text-blue-600 text-sm mt-2">View Enrolled Courses →</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Courses Completed</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.coursesCompleted ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Courses In Progress</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.coursesInProgress ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Courses Abandoned</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.coursesAbandoned ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Average Completion Time (hrs)</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.averageCompletionTime ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Total Hours Learned (hrs)</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.totalHoursLearned ?? 0}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
              <p className="text-gray-600 text-sm">Streak Days</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {learningStats.streakDays ?? 0}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 border-b-2 border-blue-200 pb-2">
            📊 Performance Metrics
          </h2>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <ul className="space-y-3 text-gray-800">
              <li>
                <span className="font-medium text-gray-600">Average Quiz Score:</span>{" "}
                <span className="font-semibold text-blue-800">{performanceMetrics.averageQuizScore ?? 0}</span>
              </li>
              <li>
                <span className="font-medium text-gray-600">Strong Categories:</span>{" "}
                {performanceMetrics.strongCategories?.length ? (
                  <span className="text-green-600 font-medium">
                    {performanceMetrics.strongCategories.join(", ")}
                  </span>
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </li>
              <li>
                <span className="font-medium text-gray-600">Weak Categories:</span>{" "}
                {performanceMetrics.weakCategories?.length ? (
                  <span className="text-red-600 font-medium">
                    {performanceMetrics.weakCategories.join(", ")}
                  </span>
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </li>
              <li>
                <span className="font-medium text-gray-600">Improvement Rate:</span>{" "}
                <span className="font-semibold text-blue-800">{performanceMetrics.improvementRate ?? 0}%</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 border-b-2 border-blue-200 pb-2">
            💡 Recommendations
          </h2>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            {recommendations.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-800 space-y-2">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="leading-relaxed">{rec}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center py-2">
                No recommendations available right now.
              </p>
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
