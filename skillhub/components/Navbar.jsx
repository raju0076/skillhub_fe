"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const token = Cookies.get("token");

  const logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold">
        SkillHub
      </Link>
      <div className="space-x-6">
        <Link href="/courses">Courses</Link>
        {token ? (
          <>
            <Link href="/profile">Profile</Link>
            <Link href="/dashboard">Dashboard</Link>
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
