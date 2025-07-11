"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaUser, FaLeaf, FaPlaneDeparture, FaStar } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardContainerRef.current) return;

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

    // GSAP hover effect for cards
    const cards = cardContainerRef.current.querySelectorAll(".belief-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.03,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 px-4 md:px-16 bg-transparent relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
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
            <h2 className="text-4xl font-semibold text-white">
              Our true <em className="italic text-gray-400">beliefs</em> for{" "}
              <em className="italic text-gray-400">your</em> benefits
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <p
              className="text-sm text-gray-200 mb-1"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
            >
              Our beliefs aren’t just words; they are the foundation of every
              adventure we offer. With high commitment to sustainability,
            </p>
            <Link
              href="/packages"
              className="font-semibold text-white hover:text-gray-200 transition"
            >
              See All Packages
            </Link>
          </div>
        </div>

        {/* Belief Cards */}
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative bg-gradient-to-r from-gray-900/20 to-gray-900/20 rounded-xl p-4"
        >
          {/* Card 1 */}
          <div className="flex items-start p-6 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gray-900/50 backdrop-blur-sm belief-card">
            <div className="text-white text-xl mr-4">
              <FaUser />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-1">
                Customer-Centric
              </h4>
              <p
                className="text-sm text-gray-200"
                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                Being customer-centric is the compass that guides our travel
                services. We prioritize our customers needs.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start p-6 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gray-900/50 backdrop-blur-sm belief-card">
            <div className="text-white text-xl mr-4">
              <FaLeaf />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-1">
                Sustainable Travel
              </h4>
              <p
                className="text-sm text-gray-200"
                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                Committed to responsible and eco-conscious journeys, traveling the
                world with minimal footprints and pollutions.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start p-6 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gray-900/50 backdrop-blur-sm belief-card">
            <div className="text-white text-xl mr-4">
              <FaPlaneDeparture />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-1">
                Authentic Experiences
              </h4>
              <p
                className="text-sm text-gray-200"
                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                We deliver journeys that immerse you in unforgettable encounters
                with the world’s diverse cultures & landscapes.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-start p-6 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-gray-900/50 backdrop-blur-sm belief-card">
            <div className="text-white text-xl mr-4">
              <FaStar />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white mb-1">
                Quality Guides
              </h4>
              <p
                className="text-sm text-gray-200"
                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                Our expert guides ensure a smooth, enriching journey with
                professional insights and personal care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}