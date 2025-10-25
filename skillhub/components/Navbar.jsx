"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); 
      } catch (error) {
        console.error("Invalid token");
        Cookies.remove("token");
        router.push("/login");
      }
    }
  }, [token, router]);

  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const dashboardPath =
    role === "student"
      ? "/dashboard/student"
      : role === "instructor"
      ? "/dashboard/instructor"
      : role === "admin"
      ? "/dashboard/admin"
      : "/login"; 

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold">
        SkillHub
      </Link>
      <div className="space-x-6">
        <Link href="/courses">Courses</Link>
        {token ? (
          <>
            {/* <Link href="/profile">Profile</Link> */}
            <Link href={dashboardPath}>Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
