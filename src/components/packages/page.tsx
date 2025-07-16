'use client';
import Link from "next/link";
import Navbar from "../../components/layouts/navbar/page";
import { packagesData } from "@/types/packages";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaSearch } from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // State for filters
  const [selectedDays, setSelectedDays] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !heroRef.current) return;

    // Hero section animation
    gsap.fromTo(
      heroRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      }
    );

    // Section animation
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

  // Extract unique categories and max price for dynamic rendering
  const categories = useMemo(() => {
    const cats = new Set(packagesData.map((pkg) => pkg.category));
    return ["all", ...cats];
  }, []);

  // Filter packages based on selected filters
  const filteredPackages = useMemo(() => {
    return packagesData.filter((pkg) => {
      const match = pkg.duration.match(/\d+/);
      const days = match ? parseInt(match[0]) : 0;

      const isDaysMatch =
        selectedDays === "all" ||
        (selectedDays === "1-3" && days <= 3) ||
        (selectedDays === "4-7" && days >= 4 && days <= 7) ||
        (selectedDays === "8+" && days >= 8);
      const isCategoryMatch = selectedCategory === "all" || pkg.category === selectedCategory;
      return isDaysMatch && isCategoryMatch;
    });
  }, [selectedDays, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white"
      >
        <Navbar textColor="text-white" />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Our <em className="italic text-gray-400">Exclusive</em> Packages
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Embark on unforgettable journeys with our curated travel experiences.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section 
        ref={sectionRef}
        className="py-16 px-4 md:px-16 bg-transparent relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] p-6 mb-12 border border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Find Your <em className="italic text-gray-400">Perfect</em> Journey
                </h2>
                <p className="text-sm text-gray-300">
                  Filter our packages to find the adventure that matches your dreams
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <FaSearch className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">
                  {filteredPackages.length} packages found
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Days Filter */}
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Duration</label>
                <select
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="all">All Durations</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8+">8+ Days</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-800/50 border border-white/20 rounded-lg p-3 text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="relative group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={400}
                    height={224}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {pkg.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-white">{pkg.title}</h2>
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {pkg.duration}
                    </span>
                    <span className="font-medium text-white">₹{pkg.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {pkg.description || "Experience a memorable journey with this package."}
                  </p>
                  <Link href={`/packages/${pkg.id}`}>
                    <button className="w-full bg-white/10 text-white py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors duration-200 border border-white/20">
                      Explore Package
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}