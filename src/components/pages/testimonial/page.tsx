"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Priya Marcella",
    country: "India",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    text: "Xplore’s commitment to customer satisfaction is truly commendable. If you want a travel experience that goes beyond the ordinary, highly recommend Xplore.",
  },
  {
    name: "Jose Miguel",
    country: "Spain",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "They provided an amazing adventure that I’ll never forget. The accommodations were top-notch, and the itinerary was a perfect trip of relaxation and excitement.",
  },
  {
    name: "Angellina Diana",
    country: "Italy",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Their diverse range of destinations and unwavering commitment to customer satisfaction make them my go-to choice for future adventures.",
  },
];

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP animation for section entrance
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="px-4 md:px-16 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-white">
              Real <em className="italic text-gray-400">stories</em>
            </h1>
            <h1 className="text-4xl font-semibold text-white">from travelers</h1>
          </div>
          <svg
            className="w-10 h-10 mt-6 md:mt-0 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="border border-white/20 rounded-xl p-6 shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gray-900/50 backdrop-blur-sm flex flex-col justify-between h-full"
            >
              <p className="text-gray-200 text-sm mb-4">{t.text}</p>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <p className="font-semibold text-sm text-white">{t.name}</p>
                  <p className="text-xs text-gray-200">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-white"></span>
          <span className="w-2 h-2 rounded-full bg-white/30"></span>
          <span className="w-2 h-2 rounded-full bg-white/30"></span>
        </div>
      </div>
    </section>
  );
}