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
  <header className="w-[90%] sticky top-0 z-50 mt-5 mx-auto rounded-4xl border-b bg-gradient-to-b from-black/90 via-black/80 to-black/90 py-3 px-6 flex items-center justify-between shadow-md backdrop-blur-sm">
  {/* Logo */}
  <Link href='/' className="text-2xl font-roboto font-bold text-blue-600 dark:text-white">
    AIschool
  </Link>

  {/* Navigation */}
  <nav className="hidden md:flex items-center gap-6 font-roboto text-sm font-medium text-gray-200 dark:text-gray-300">
    <Link href="/courses" className="hover:text-blue-500 transition-colors duration-300">
      Courses
    </Link>

    {/* Smooth scroll links */}
    <a href="#stats-section" className="hover:text-blue-500 transition-colors duration-300">
      Programs
    </a>

    <a href="#stories" className="hover:text-blue-500 transition-colors duration-300">
      Success Stories
    </a>
  </nav>

  <div className="flex items-center gap-4">
    {token ? (
      <>
        <Link href={dashboardPath} className="hover:text-blue-500 text-[white] transition-colors duration-300">
          Dashboard
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </>
    ) : (
      <div className="bg-red-700 p-2 rounded-2xl flex gap-2 text-white font-medium">
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <span>/</span>
        <Link href="/register" className="hover:underline">
          Sign up
        </Link>
      </div>
    )}
  </div>
</header>

  );
}
