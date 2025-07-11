"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !formContainerRef.current) return;

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

    // GSAP hover effect for form container
    formContainerRef.current.addEventListener("mouseenter", () => {
      gsap.to(formContainerRef.current, {
        scale: 1.02,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
    formContainerRef.current.addEventListener("mouseleave", () => {
      gsap.to(formContainerRef.current, {
        scale: 1,
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
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
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 bg-transparent relative z-10"
    >
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <svg
          className="w-12 h-12 text-white mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-4xl md:text-5xl font-semibold text-white">
          Ready to <em className="italic text-gray-400">embark</em><br />
          on a <em className="italic text-gray-400">new</em> journey?
        </h2>
        <p
          className="mt-6 text-sm md:text-base text-gray-200 max-w-xl mx-auto"
          style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          Don’t let your dream getaway remain a dream any longer. Take action now
          and let us craft your next unforgettable adventure. Join us in turning
          your travel fantasies into unforgettable realities.
        </p>
      </div>

      {/* Form */}
      <div
        ref={formContainerRef}
        className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.2)] border border-white/20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 bg-gray-900/80 border border-white/20 rounded-full focus:outline-none focus:border-white text-white placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-200 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="p-3 bg-gray-900/80 border border-white/20 rounded-full focus:outline-none focus:border-white text-white placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 bg-gray-900/80 border border-white/20 rounded-full focus:outline-none focus:border-white text-white placeholder-gray-400"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-white text-gray-900 py-3 rounded-full font-semibold hover:bg-gray-200 transition hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}