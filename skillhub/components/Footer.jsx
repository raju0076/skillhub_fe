"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-gray-300 py-14 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white">SkillHub</h2>
          <p className="text-gray-400 mt-3 leading-relaxed">
            Empowering learners with real skills.  
            Join thousands of students upgrading their career.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-zinc-800 hover:bg-red-600 transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Courses</h3>
          <ul className="space-y-3">
            {["Full Stack Development", "Frontend Development", "Backend Development", "Data Structures", "DevOps"].map((item, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-red-500 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3">
            {["About Us", "Careers", "Contact", "Blog", "Support"].map((item, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-red-500 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>

          <p className="text-gray-400 mb-3">support@skillhub.com</p>
          <p className="text-gray-400 mb-3">+91 98765 43210</p>
          <p className="text-gray-400">Hyderabad, India</p>
        </div>
      </div>

      <div className="border-t border-zinc-700 mt-12 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} SkillHub. All rights reserved.
      </div>
    </footer>
  );
}
