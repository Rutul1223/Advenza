"use client";
import { packagesData } from "@/types/packages";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClockIcon, CurrencyRupeeIcon, FunnelIcon } from "@heroicons/react/24/solid";
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
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 flex flex-col lg:flex-row gap-12">
                {/* Image Section */}
                <div className="lg:w-1/2">
                    <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                    />
                </div>

                {/* Details Section */}
                <div className="lg:w-1/2 space-y-6">
                    <h1 className="text-4xl font-bold leading-snug">{pkg.name}</h1>
                    <p className="text-md text-gray-600 italic">{pkg.description}</p>

                    <div className="flex gap-4 text-sm text-gray-700 font-medium">
                        <div className="flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5 text-black" />
                            <span>{pkg.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-indigo-500" />
                            <span>{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CurrencyRupeeIcon className="w-5 h-5 text-green-600" />
                            <span>{pkg.price}</span>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200 space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2 text-gray-800">
                                About This Package
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {pkg.details}
                            </p>
                        </div>

                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <div>
                                <h3 className="text-md font-semibold mb-1 text-gray-800">
                                    Itinerary
                                </h3>
                                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                                    {pkg.itinerary.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                            <div>
                                <h3 className="text-md font-semibold mb-1 text-gray-800">
                                    Inclusions
                                </h3>
                                <ul className="list-disc pl-6 text-sm text-green-700 space-y-1">
                                    {pkg.inclusions.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pkg.exclusions && pkg.exclusions.length > 0 && (
                            <div>
                                <h3 className="text-md font-semibold mb-1 text-gray-800">
                                    Exclusions
                                </h3>
                                <ul className="list-disc pl-6 text-sm text-red-700 space-y-1">
                                    {pkg.exclusions.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <button className="bg-black text-white rounded-md hover:bg-gray-800 px-6 py-3 mt-4 font-semibold transition-all shadow-lg w-fit">
                        Book This Adventure
                    </button>
                    <Link href="/packages">
                        <button className="bg-black text-white hover:bg-gray-800  px-6 py-3 mt-4 ml-2 rounded-lg font-semibold transition-all shadow-lg w-fit">
                            Back to Packages
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
