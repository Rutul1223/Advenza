"use client";
import { packagesData } from "@/types/packages";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function PackageDetailsPage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<any>(null);

  useEffect(() => {
    const found = packagesData.find((p) => p.id === parseInt(id as string));
    setPkg(found);
  }, [id]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Elegant Text Header with Meta Info */}
      <div className="max-w-7xl mx-auto px-4 lg:px-10 pt-16 pb-10 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{pkg.title}</h1>
            <p className="text-sm text-gray-600 mt-2 italic">{pkg.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6 items-start">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <FunnelIcon className="w-4 h-4 text-black" />
              <span className="text-sm font-medium">{pkg.category}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
              <ClockIcon className="w-4 h-4 text-black" />
              <span className="text-sm font-medium">{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
              <CurrencyRupeeIcon className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{pkg.price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 flex flex-col lg:flex-row gap-12">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
          />
        </div>

        {/* Details */}
        <div className="lg:w-1/2 space-y-6">
          {/* About & Lists */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">About This Package</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{pkg.details}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pkg.itinerary?.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold mb-1 text-gray-800">Itinerary</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {pkg.itinerary.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.inclusions?.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold mb-1 text-gray-800">Inclusions</h3>
                  <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
                    {pkg.inclusions.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.exclusions?.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold mb-1 text-gray-800">Exclusions</h3>
                  <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                    {pkg.exclusions.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.readyToPickup?.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold mb-1 text-gray-800">Ready to Pickup</h3>
                  <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                    {pkg.readyToPickup.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Seat Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner">
            <div>
              <span className="font-semibold text-gray-800">Total Seats:</span>{" "}
              {pkg.totalSeats ?? "-"}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Booked:</span>{" "}
              {pkg.bookedSeats ?? "-"}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Available:</span>{" "}
              <span className="text-green-700 font-bold">
                {pkg.availableSeats ?? "-"}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href={`/packages/${id}/book`}>
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-md">
                Book This Adventure
              </button>
            </Link>
            <Link href="/packages">
              <button className="bg-white text-black border border-gray-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-md">
                Back to Packages
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}