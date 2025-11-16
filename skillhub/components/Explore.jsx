import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Explore = () => {
  return (
    <section className="w-full bg-white relative overflow-hidden py-24 px-6">
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full opacity-30 animate-pulse mix-blend-multiply"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight animate-fadeIn">
            Transform Your Career with SkillHub
          </h2>

          <p className="mt-6 text-gray-700 text-lg sm:text-xl animate-fadeIn delay-200">
            Gain hands-on experience with top IITs, IIMs, and industry mentors. Build real-world projects, master AI, Web Development, Data Science, and launch your tech career faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-lg bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
            >
              Explore Programs
            </Link>

            <Link
              href="#test"
              className="px-8 py-4 rounded-lg bg-gray-100 text-red-600 font-semibold shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
            >
              Take Entrance Test
            </Link>
          </div>
        </div>

        <div className="flex-1 relative animate-fadeIn delay-400">
          <Image
            src="https://www.skillhubcourses.com/wp-content/uploads/2023/04/SKILL_HUB__2_.pdf-removebg-preview.png"
            alt="SkillHub Illustration"
            width={600}
            height={400}
            className="w-full h-auto rounded-xl "
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
};
