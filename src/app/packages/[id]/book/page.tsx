"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { packagesData } from "@/types/packages";
import { ClockIcon, CurrencyRupeeIcon, FunnelIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function BookAdventurePage() {
    const { id } = useParams();
    const [pkg, setPkg] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [numTravelers, setNumTravelers] = useState(1);
    const [mainContact, setMainContact] = useState({ name: "", email: "", phone: "" });
    const [travelers, setTravelers] = useState([{ name: "", phone: "" }]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const found = packagesData.find((p) => p.id === parseInt(id as string));
        setPkg(found);
    }, [id]);

    useEffect(() => {
        setTravelers((prev) => {
            if (numTravelers > prev.length) {
                return [...prev, ...Array(numTravelers - prev.length).fill({ name: "", phone: "" })];
            } else {
                return prev.slice(0, numTravelers);
            }
        });
    }, [numTravelers]);

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading...
            </div>
        );
    }

    const handleTravelerChange = (idx: number, field: string, value: string) => {
        setTravelers((prev) => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [field]: value };
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const getNumericPrice = (price: string) => Number(price.replace(/[^\d.]/g, ""));
    const getCurrencySymbol = (price: string) => (price.includes("₹") ? "₹" : price.includes("$") ? "$" : "");

    const unitPrice = getNumericPrice(pkg.price);
    const currency = getCurrencySymbol(pkg.price);
    const totalPrice = unitPrice * numTravelers;

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
                {/* Package Info */}
                <div className="space-y-6">
                    <img src={pkg.image} alt={pkg.title} className="rounded-xl shadow-lg w-full h-[400px] object-cover" />
                    <h1 className="text-3xl font-bold text-gray-800">{pkg.title}</h1>
                    <p className="text-gray-600 italic">{pkg.description}</p>
                    <div className="flex flex-wrap gap-4 text-gray-700 font-medium">
                        <div className="flex items-center gap-2">
                            <FunnelIcon className="w-5 h-5 text-blue-600" />
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
                </div>

                {/* Booking Section */}
                <div className="bg-gray-50 p-8 rounded-xl shadow-xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Your Booking</h2>

                    {submitted ? (
                        <div className="space-y-4">
                            <div className="text-green-600 font-semibold text-lg text-center">Booking Confirmed!</div>
                            <div className="bg-white p-4 rounded border border-gray-200">
                                <h3 className="font-semibold mb-2">Booking Summary</h3>
                                <p><strong>Name:</strong> {mainContact.name}</p>
                                <p><strong>Email:</strong> {mainContact.email}</p>
                                <p><strong>Phone:</strong> {mainContact.phone}</p>
                                <p><strong>Travelers:</strong></p>
                                <ul className="list-disc pl-6">
                                    {travelers.map((t, i) => (
                                        <li key={i}>{t.name} ({t.phone})</li>
                                    ))}
                                </ul>
                                <p className="mt-2 font-bold text-green-700">Total: {currency}{totalPrice.toLocaleString()}</p>
                                {message && <p><strong>Note:</strong> {message}</p>}
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input type="text" required placeholder="Your Name" value={mainContact.name} onChange={e => setMainContact({ ...mainContact, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300" />
                            <input type="email" required placeholder="Email Address" value={mainContact.email} onChange={e => setMainContact({ ...mainContact, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300" />
                            <input type="tel" required placeholder="Phone Number" value={mainContact.phone} onChange={e => setMainContact({ ...mainContact, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300" />
                            <input type="number" min={1} value={numTravelers} onChange={e => setNumTravelers(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300" placeholder="No. of Travelers" />
                            {travelers.map((trav, idx) => (
                                <div className="flex gap-3" key={idx}>
                                    <input
                                        type="text"
                                        placeholder={`Traveler ${idx + 1} Name`}
                                        required
                                        value={trav.name}
                                        onChange={e => handleTravelerChange(idx, "name", e.target.value)}
                                        className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                                    />
                                    <input
                                        type="tel"
                                        placeholder={`Traveler ${idx + 1} Phone`}
                                        required
                                        value={trav.phone}
                                        onChange={e => handleTravelerChange(idx, "phone", e.target.value)}
                                        className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                                    />
                                </div>
                            ))}
                            <textarea
                                rows={3}
                                placeholder="Additional Notes (Optional)"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-indigo-300 focus:ring-2 focus:ring-indigo-600"
                            />
                            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 px-4 py-3 rounded-lg">
                                <span className="text-lg font-medium text-gray-700">Total Payable</span>
                                <span className="text-xl font-bold text-indigo-700">{currency}{totalPrice.toLocaleString()}</span>
                            </div>
                            <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-lg transition-all">
                                Proceed to Payment
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link href={`/packages/${id}`} className="text-black hover:underline font-semibold">
                            ← Back to Package Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
