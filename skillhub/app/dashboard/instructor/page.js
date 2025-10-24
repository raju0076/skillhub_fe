"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Loader from "@/components/Loader";

export default function InstructorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await api.get("/analytics/instructor/68f84fa6b7bb62cda38ee399"); // example ID
      setData(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">Total Courses: {data.totalCourses}</div>
        <div className="bg-white shadow rounded p-4">Total Students: {data.totalStudents}</div>
        <div className="bg-white shadow rounded p-4">Revenue: ₹{data.revenue}</div>
      </div>
    </div>
  );
}
