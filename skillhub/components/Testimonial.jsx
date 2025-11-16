"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    id: 1,
    text:
      "Mayuri comes from Navsari, a small town near Surat. She joined SkillHub with zero technical background but with strong discipline. Over 4 months she consistently ranked among the top students in every weekly test. Her dedication to revising concepts, building small projects, and asking the right questions helped her land her first role. Today, she works as an SDE1 at LogWinTech Pvt. Ltd. and continues to inspire new learners with her journey.",
    author: "Mayuri Samanta",
    role: "Fresher to SDE1 at LogWinTech Pvt. Ltd.",
  },
  {
    id: 2,
    text:
      "Karthik transitioned from a completely non-tech field. Before joining, he was unsure whether he could even understand programming. But he slowly mastered HTML, CSS, JavaScript, and then Full Stack Development. He built three full projects, contributed to team presentations, and practiced interviews daily. His journey proves that consistency is more important than background.",
    author: "Karthik R",
    role: "Full Stack Developer",
  },
  {
    id: 3,
    text:
      "Anu balanced a full-time job and learning front-end development. She dedicated two hours every night to learning React, improving her design sense, and practicing UI challenges. Her discipline helped her transform her career within 5 months. She now works as a Frontend Engineer and often mentors junior developers entering the industry for the first time.",
    author: "Anu Reddy",
    role: "Frontend Engineer",
  },
  {
    id: 4,
    text:
      "Rahul started as a mechanical engineer but wanted to switch to software. He struggled initially with logic building, but after consistent practice and building 5 mini-projects, he became strong in JavaScript and APIs. His final portfolio project impressed interviewers and he secured a developer role in a fast-growing startup.",
    author: "Rahul Kumar",
    role: "Junior JavaScript Developer",
  },
  {
    id: 5,
    text:
      "Sneha had taken a career break for 2 years. She feared interviews and felt disconnected from the tech world. But with structured learning, interview mock sessions, and real project exposure, she rebuilt her confidence. Today she works remotely as a React Developer and manages both family and career beautifully.",
    author: "Sneha Patil",
    role: "React Developer",
  },
];

export default function TestimonialStack() {
  const layers = Array.from({ length: 7 });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % data.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + data.length) % data.length);
  };

  return (
    <div id="stories" className="w-full flex flex-col items-center bg-gradient-to-b from-white to-pink-100 py-20 relative overflow-hidden select-none">

      <div className="relative w-full flex justify-center [perspective:2000px]">
        {layers.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[75%] h-[330px] bg-white rounded-3xl shadow-xl border border-gray-200"
            style={{
              top: `${-i * 22}px`,             // Steps height
              scale: `${1 - i * 0.04}`,        // Smaller when far
              opacity: 1 - i * 0.1,
              rotateX: `${i * 3.2}deg`,        // Strong curve like screenshot
              filter: "blur(0.4px)",
            }}
            animate={{
              y: direction === 1 ? -10 : 10,   // whole stack moves!
              rotateX: `${i * 3.2 + (direction === 1 ? 0.6 : -0.6)}deg`
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          ></motion.div>
        ))}
      </div>

      <div className="relative w-[75%] min-h-[330px] z-[10] [perspective:2000px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={data[index].id}
            custom={direction}
            initial={{
              opacity: 0,
              y: direction === 1 ? -120 : 120,
              scale: 0.85,
              rotateX: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }}
            exit={{
              opacity: 0,
              y: direction === 1 ? 120 : -120,
              scale: 0.85,
              rotateX: -20,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-10"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              “{data[index].text}”
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-pink-300"></div>
              <div>
                <h3 className="text-pink-600 font-semibold text-lg">
                  {data[index].author}
                </h3>
                <p className="text-gray-500 text-sm">{data[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-8 mt-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[black] shadow hover:bg-pink-300 transition"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {data.map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all ${
                index === i ? "w-6 bg-pink-500" : "w-3 bg-pink-300"
              }`}
            ></div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[black] shadow hover:bg-pink-300 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
