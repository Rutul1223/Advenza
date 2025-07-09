'use client';
import Link from "next/link";
import Navbar from "../../components/layouts/navbar/page";
import { packagesData } from "@/types/packages";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function Packages() {
  // State for filters
  const [selectedDays, setSelectedDays] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black to-gray-800 text-white">
        <Navbar textColor="text-white" />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Our Exclusive Packages</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Embark on unforgettable journeys with our curated travel experiences.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Days Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700">Duration</label>
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(e.target.value)}
                className="mt-1 w-full border rounded-md p-2 bg-white text-gray-800"
              >
                <option value="all">All Durations</option>
                <option value="1-3">1-3 Days</option>
                <option value="4-7">4-7 Days</option>
                <option value="8+">8+ Days</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 w-full border rounded-md p-2 bg-white text-gray-800"
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
              className="relative group bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={224}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{pkg.title}</h2>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration}
                  </span>
                  <span className="font-medium text-black">₹{pkg.price}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2">{pkg.description || "Experience a memorable journey with this package."}</p>
                <Link href={`/packages/${pkg.id}`}>
                  <button className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                    Explore Package
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