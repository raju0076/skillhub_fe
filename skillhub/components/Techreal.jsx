"use client";
import { useRef, useEffect } from "react";

export default function TechReel() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let index = 0;

    const autoSlide = () => {
      const itemWidth = scroller.clientWidth / 3; // 3 items visible
      index++;
      if (index >= scroller.children.length) index = 0;

      scroller.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    };

    const interval = setInterval(autoSlide, 2500);
    return () => clearInterval(interval);
  }, []);

  const images = [
    "https://www.designyourway.net/blog/wp-content/uploads/2025/01/MongoDB-featured-1.jpg",
    "https://media.geeksforgeeks.org/wp-content/uploads/20230331172641/NodeJS-copy.webp",
    "https://nimishprabhu.com/wp-content/uploads/2021/07/react-logo.png",
    "https://s3.ap-south-1.amazonaws.com/webasha-blog/uploads/gallery/202504/image_1920x_6804d56077252.webp",
    "https://d1e5wbyhbs6zy6.cloudfront.net/production/articles/63a0dd05bac79dc8c99a1263/article-image/1671543307052",
    "https://cdn.dribbble.com/userupload/15718791/file/original-5613f2ae9441c154c7f51b1c3adc36f0.jpg?resize=752x&vertical=center",
    "https://www.shutterstock.com/image-vector/cyber-security-logo-abstract-shield-260nw-2294230663.jpg",
  ];

  return (
    <div className="w-full bg-white py-16 relative overflow-hidden">
      <div className="relative w-full">
        
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 px-5 no-scrollbar"
          style={{
            scrollBehavior: "smooth",
            whiteSpace: "nowrap",
            scrollSnapType: "x mandatory",
          }}
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="min-w-[33%] rounded-2xl overflow-hidden shadow-md"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={src}
                alt="tech"
                className="w-full p-2 h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-[-40px] left-0 right-0 h-[120px] rounded-t-[50%] bg-gradient-to-b from-pink-200 to-white"></div>
      </div>
    </div>
  );
}
