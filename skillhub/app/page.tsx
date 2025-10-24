"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center text-center px-6 py-20 sm:px-12 max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/next.svg"
            alt="SkillHub Logo"
            width={80}
            height={20}
            className="dark:invert"
            priority
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            SkillHub
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Empower Your Learning Journey 🚀
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
          Join thousands of students and instructors sharing knowledge.
          Explore new skills, learn from experts, and grow your career — all in
          one platform.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/courses"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Explore Courses
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            Login / Register
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} SkillHub. All rights reserved.
        </p>
      </main>
    </div>
  );
}
