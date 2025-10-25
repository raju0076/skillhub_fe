"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (role === "student") router.push("/dashboard/student");
    else if (role === "instructor") router.push("/dashboard/instructor");
    else if (role === "admin") router.push("/dashboard/admin");
    else router.push("/login"); 
  }, [router]);

  return <p>Redirecting...</p>;
}
