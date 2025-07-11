"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoContainerRef.current || !textRef.current) return;

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

    // GSAP animation for text
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    // GSAP hover effect for video container
    videoContainerRef.current.addEventListener("mouseenter", () => {
      gsap.to(videoContainerRef.current, {
        scale: 1.02,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
    videoContainerRef.current.addEventListener("mouseleave", () => {
      gsap.to(videoContainerRef.current, {
        scale: 1,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    // Parallax effect for video
    gsap.to(videoContainerRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] overflow-hidden bg-transparent z-10"
    >
      <div
        ref={videoContainerRef}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20"
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Text and SVG */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4"
        >
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="px-5 py-2 rounded-full font-semibold text-gray-200 bg-gray-900/50 backdrop-blur-md border border-white/20 mb-6">
            The Best Place to Start Your Adventure
          </div>
          <h1
            className="max-w-3xl text-3xl sm:text-5xl md:text-6xl leading-tight font-light"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            Embark on{" "}
            <span className="italic font-serif font-semibold text-gray-400">
              Journey
            </span>
            <br />
            not <span className="italic font-serif">just</span> destinations
            <br />
            with <span className="italic font-serif text-gray-400">our trips.</span>
          </h1>
        </div>

        {/* Play/Pause Toggle */}
        <div className="absolute bottom-8 right-8 z-20">
          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-gray-900 transition duration-300"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>
      </div>
    </section>
  );
}