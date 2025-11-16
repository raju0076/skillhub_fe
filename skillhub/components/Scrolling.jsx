import React from "react";

export default function ScrollingTicker() {
  const data = [
"50+ expert instructors from top universities & industry",
"4.7 average learner rating",
"30+ courses across tech, design & business",
"1:1 mentorship with industry professionals",
"Hands-on projects to build real-world skills",
"Lifetime access to course materials & updates"  ];

  return (
 <div className="w-full overflow-hidden bg-gray-900 text-white py-4">
  <div className="flex animate-marquee whitespace-nowrap">
    {data.map((item, index) => (
      <span key={index} className="mx-8">
        {item}
      </span>
    ))}
    {data.map((item, index) => (
      <span key={index + data.length} className="mx-8">
        {item}
      </span>
    ))}
  </div>
  <style jsx>{`
    @keyframes marquee {
      0% { transform: translateX(0%); }       
      100% { transform: translateX(-50%); }   
    }
    .animate-marquee {
      display: inline-flex;
      animation: marquee 40s linear infinite;
    }
  `}</style>
</div>

  );
}
