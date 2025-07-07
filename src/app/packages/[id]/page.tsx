"use client";
import { packagesData, TravelPackage } from "@/types/packages";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  FunnelIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import RecommendedPackages from "@/components/Recommended";
import Image from "next/image";

export default function PackageDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [pkg, setPkg] = useState<TravelPackage | null>(null);

  useEffect(() => {
    const found = packagesData.find((p) => p.id === parseInt(id as string));
    setPkg(found || null);
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700 bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{pkg.title}</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl">{pkg.description}</p>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{pkg.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                <FunnelIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{pkg.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{pkg.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 rounded-full px-4 py-2">
                <CurrencyRupeeIcon className="w-5 h-5" />
                <span className="text-sm font-bold">{pkg.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <Image
              src={pkg.image}
              alt={pkg.title}
              width={800}
              height={500}
              className="rounded-2xl shadow-lg w-full h-[400px] md:h-[500px] object-cover transform hover:scale-[1.02] transition-transform duration-300"
              priority
            />
          </div>

          {/* Details */}
          <div className="lg:w-1/2 space-y-8">
            {/* About & Lists */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">About This Package</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">{pkg.details}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Itinerary</h3>
                    <ul className="mt-2 list-disc pl-5 text-gray-600 space-y-2">
                      {pkg.itinerary.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.inclusions && pkg.inclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Inclusions</h3>
                    <ul className="mt-2 list-disc pl-5 text-green-600 space-y-2">
                      {pkg.inclusions.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Exclusions</h3>
                    <ul className="mt-2 list-disc pl-5 text-red-600 space-y-2">
                      {pkg.exclusions.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.readyToPickup && pkg.readyToPickup.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Ready to Pickup</h3>
                    <ul className="mt-2 list-disc pl-5 text-blue-600 space-y-2">
                      {pkg.readyToPickup.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-medium">{item.city}</span>
                          <ul className="list-disc pl-5 mt-1">
                            {item.spots.map((spot, spotIdx) => (
                              <li key={spotIdx} className="text-sm">
                                {spot.location} at {spot.timing}
                              </li>
                            ))}
                          </ul>
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
                <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-md">
                  Book This Adventure
                </button>
              </Link>
              <Link href="/packages">
                <button className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md">
                  Explore More Packages
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Packages */}
        <div className="mt-12">
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