"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const banners = [
  "https://png.pngtree.com/thumb_back/fw800/background/20250726/pngtree-kid-studying-online-with-laptop-and-notebook-on-desk-image_17665172.webp",
  "https://img.freepik.com/free-photo/group-collaboration-around-laptop-creative-workspace_24972-2944.jpg?semt=ais_hybrid&w=740&q=80",
  "https://static.vecteezy.com/system/resources/previews/054/638/780/non_2x/a-thoughtful-asian-female-college-student-studying-and-preparing-for-the-exam-in-a-coffee-shop-photo.jpg",
  "https://thumbs.dreamstime.com/b/group-international-people-using-laptop-smiling-communication-technology-lifestyle-concept-diverse-students-employees-200194661.jpg",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="w-[95%]  m-auto mt-10 h-96 sm:h-96 relative overflow-hidden rounded-xl shadow-lg">

      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((src, i) => (
          <div key={i} className="min-w-full h-full">
            <img src={src} alt="Banner" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
      >
        <ArrowLeft />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/60"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
