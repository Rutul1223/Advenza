"use client";
import { packagesData, TravelPackage } from "@/types/packages";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  FunnelIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import RecommendedPackages from "@/components/pages/recommended/Recommended";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PackageDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = packagesData.find((p) => p.id === parseInt(id as string));
    setPkg(found || null);

    // GSAP animations
    if (heroRef.current && contentRef.current) {
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

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-300 bg-gray-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                {pkg.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
                {pkg.description}
              </p>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-medium">{pkg.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <FunnelIcon className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 text-sm font-medium">{pkg.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <ClockIcon className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 text-sm font-medium">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-400/90 text-gray-900 rounded-full px-4 py-2">
                <CurrencyRupeeIcon className="w-5 h-5" />
                <span className="font-bold">₹{pkg.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] group">
              <Image
                src={pkg.image}
                alt={pkg.title}
                width={800}
                height={500}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 space-y-8">
            {/* About & Lists */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  About <em className="italic text-gray-400">This</em> Package
                </h2>
                <p className="text-gray-300 leading-relaxed">{pkg.details}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Itinerary</h3>
                    <ul className="space-y-3">
                      {pkg.itinerary.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Inclusions</h3>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Exclusions</h3>
                    <ul className="space-y-3">
                      {pkg.exclusions.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">✗</span>
                          <span className="text-gray-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.readyToPickup && pkg.readyToPickup.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Ready to Pickup</h3>
                    <ul className="space-y-3">
                      {pkg.readyToPickup.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">📍</span>
                          <span className="text-gray-300 text-sm">
                            <span className="font-medium">{item.city}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/packages/${id}/book`}>
                <button className="bg-white/90 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-white transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Book This Adventure
                </button>
              </Link>
              <Link href="/packages">
                <button className="bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                  Explore More Packages
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Packages */}
        <div className="mt-16">
          <RecommendedPackages
            currentId={pkg.id}
            category={pkg.category || "default-category"}
            allPackages={packagesData}
          />
        </div>
      </div>
    </div>
  );
}