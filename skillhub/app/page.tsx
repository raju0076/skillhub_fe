"use client";

import Image from "next/image";
import Link from "next/link";
import AutoBanner from "../components/AutoBanner"
import ScrollingTicker from "../components/Scrolling"
import {Explore} from  "../components/Explore"
import TechReel from "../components/Techreal"
import StatsSection from "../components/StatsSection"
import TestimonialReel from "../components/Testimonial"
import Footer from "../components/Footer"
export default function Home() {
  return (
    <div className="min-h-screen w-full text-gray-900  dark:text-white">
       <AutoBanner/>
       <ScrollingTicker/>
       <Explore/>
       <TechReel/>


    <StatsSection/>

  <TestimonialReel/>
  <Footer/>
  
    </div>
  );
}