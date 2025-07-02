"use client";

import Link from "next/link";
import Navbar from "./Navbar";
import { packagesData } from "@/types/packages";

export default function Packages() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div>
        <Navbar textColor="text-gray-700" />
      </div>
      <div className="max-w-7xl mx-auto mt-12 px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Packages</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-xl shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{pkg.title}</h2>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{pkg.duration}</span>
                  <span>{pkg.price}</span>
                </div>
                <Link href={`/packages/${pkg.id}`}>
                  <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
