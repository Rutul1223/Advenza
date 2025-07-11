"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoContainerRef.current) return;

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

    // GSAP hover effect for video container
    videoContainerRef.current.addEventListener("mouseenter", () => {
      gsap.to(videoContainerRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    videoContainerRef.current.addEventListener("mouseleave", () => {
      gsap.to(videoContainerRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="px-4 md:px-16 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={videoContainerRef}
          className="relative rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20"
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[400px] md:h-[500px] object-cover"
          >
            <source
              src="https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd90/675fdb38b60bc5242af8cdf0_6981302-sd_960_540_25fps-transcode.mp4"
              type="video/mp4"
            />
            <source
              src="https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd90/675fdb38b60bc5242af8cdf0_6981302-sd_960_540_25fps-transcode.webm"
              type="video/webm"
            />
          </video>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-black/40 backdrop-blur-sm">
            {/* Decorative SVG Icon */}
            <svg
              className="w-12 h-12 text-white mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
              Our <em className="italic text-gray-400">Journey</em> in pictures
            </h2>
            <p
              className="mt-4 text-sm md:text-base max-w-xl text-gray-200"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
            >
              See what makes each experience with our trips exceptional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}