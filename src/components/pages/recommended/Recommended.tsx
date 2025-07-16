"use client";
import { TravelPackage } from "@/types/packages";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RecommendedPackagesProps {
  currentId: number;
  category: string;
  allPackages: TravelPackage[];
}

export default function RecommendedPackages({
  currentId,
  category,
  allPackages,
}: RecommendedPackagesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const recommended = allPackages
    .filter((pkg) => pkg.category === category && pkg.id !== currentId)
    .slice(0, 3); // limit to 3 recommendations

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll("a"),
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
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

  if (recommended.length === 0) return null;

  return (
    <div 
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 lg:px-10 pb-16"
    >
      <h2 className="text-2xl font-semibold text-white mb-8">
        You Might <em className="italic text-gray-400">Also Like</em>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((rec) => (
          <Link
            href={`/packages/${rec.id}`}
            key={rec.id}
            className="block bg-gray-900/50 backdrop-blur-sm border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={rec.image}
                alt={rec.title}
                width={400}
                height={224}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70"></div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {rec.title}
              </h3>
              <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                {rec.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">
                  {rec.category}
                </span>
                <span className="text-white font-semibold text-sm bg-yellow-400/90 px-3 py-1 rounded-full">
                  ₹{rec.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}