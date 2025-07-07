"use client";

import { TravelPackage } from "@/types/packages";
import Image from "next/image";
import Link from "next/link";

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
  const recommended = allPackages
    .filter((pkg) => pkg.category === category && pkg.id !== currentId)
    .slice(0, 3); // limit to 3 recommendations

  if (recommended.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-10 pb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
        Recommended Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommended.map((rec) => (
          <Link
            href={`/packages/${rec.id}`}
            key={rec.id}
            className="block bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Image
              src={rec.image}
              alt={rec.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {rec.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {rec.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                  {rec.category}
                </span>
                <span className="text-black font-semibold text-sm">
                  {rec.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
