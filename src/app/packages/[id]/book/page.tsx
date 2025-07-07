"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { packagesData, TravelPackage } from "@/types/packages";
import { MapPinIcon, CalendarIcon, TicketIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface Availability {
    startDate: string;
    duration: string;
    totalTickets: number;
    bookedTickets: number;
    availableTickets?: number;
}

interface Traveler {
    name: string;
    phone: string;
}

interface MainContact {
    name: string;
    email: string;
    phone: string;
}

export default function BookAdventurePage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const [pkg, setPkg] = useState<TravelPackage | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [numTravelers, setNumTravelers] = useState(1);
    const [mainContact, setMainContact] = useState<MainContact>({ name: "", email: "", phone: "" });
    const [travelers, setTravelers] = useState<Traveler[]>([{ name: "", phone: "" }]);
    const [message, setMessage] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedAvailability, setSelectedAvailability] = useState<Availability | null>(null);

    useEffect(() => {
        const found = packagesData.find((p) => p.id === parseInt(id as string));
        setPkg(found || null);
        if (found?.availability && found.availability.length > 0) {
            const startDateFromQuery = searchParams.get("startDate");
            const availableDates = found.availability.filter(avail => avail.availableTickets && avail.availableTickets > 0);
            if (availableDates.length > 0) {
                const initialDate = startDateFromQuery && availableDates.some(avail =>
                    (avail.availableTickets ?? 0) > 0)
                    ? startDateFromQuery
                    : availableDates[0].startDate;
                setSelectedDate(initialDate);
                setSelectedAvailability(found.availability.find(avail => avail.startDate === initialDate) || null);
            } else {
                setSelectedDate("");
                setSelectedAvailability(null);
            }
        }
    }, [id, searchParams]);

    useEffect(() => {
        setTravelers((prev) => {
            if (numTravelers > prev.length) {
                return [...prev, ...Array(numTravelers - prev.length).fill({ name: "", phone: "" })];
            } else {
                return prev.slice(0, numTravelers);
            }
        });
    }, [numTravelers]);

    const handleTravelerChange = (idx: number, field: keyof Traveler, value: string) => {
        setTravelers((prev) => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], [field]: value };
            return updated;
        });
    };

    const handleDateChange = (newDate: string) => {
        if (!pkg) return;

        setSelectedDate(newDate);
        const newAvailability = pkg.availability?.find((avail) => avail.startDate === newDate) || null;
        setSelectedAvailability(newAvailability);
        if (newAvailability && numTravelers > (newAvailability.availableTickets ?? 1)) {
            setNumTravelers(newAvailability.availableTickets ?? 1);
        }
    };

    const handleNumTravelersChange = (delta: number) => {
        const newValue = Math.max(1, Math.min(
            numTravelers + delta,
            selectedAvailability?.availableTickets ?? 1  // Add nullish coalescing
        ));
        setNumTravelers(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const getNumericPrice = (price: string) => Number(price.replace(/[^\d.]/g, ""));
    const getCurrencySymbol = (price: string) => (price.includes("₹") ? "₹" : price.includes("$") ? "$" : "");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700 bg-gray-50">
                Loading...
            </div>
        );
    }

    const unitPrice = getNumericPrice(pkg.price);
    const currency = getCurrencySymbol(pkg.price);
    const totalPrice = unitPrice * numTravelers;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-black to-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{pkg.title}</h1>
                            <p className="text-lg md:text-xl text-gray-100 max-w-2xl">{pkg.description}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5" />
                                <span className="text-sm font-medium">{pkg.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
                {/* Date Selection Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Select Your Travel Date</h2>
                    {pkg.availability && pkg.availability.length > 0 ? (
                        pkg.availability.some(avail => avail.availableTickets && avail.availableTickets > 0) ? (
                            <div className="space-y-4">
                                <div className="grid gap-3">
                                    {pkg.availability.map((avail) => {
                                        const isLowAvailability = (avail.availableTickets ?? 0) <= 5 && (avail.availableTickets ?? 0) > 0;;
                                        const isSoldOut = (avail.availableTickets ?? 0) === 0;
                                        const bookedPercentage = (avail.bookedTickets / avail.totalTickets) * 100;
                                        return (
                                            <label
                                                key={avail.startDate}
                                                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 relative ${selectedDate === avail.startDate
                                                    ? "bg-black text-white border-2 border-black"
                                                    : isSoldOut
                                                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                        : "bg-white border-gray-200 hover:bg-gray-100"
                                                    }`}
                                                aria-label={`${isSoldOut ? 'Sold out: ' : ''}${formatDate(avail.startDate)} for ${avail.duration}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="startDate"
                                                    value={avail.startDate}
                                                    checked={selectedDate === avail.startDate}
                                                    onChange={() => !isSoldOut && handleDateChange(avail.startDate)}
                                                    disabled={isSoldOut}
                                                    className="hidden"
                                                    aria-checked={selectedDate === avail.startDate}
                                                    aria-disabled={isSoldOut}
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon className="w-5 h-5" />
                                                        <span className="font-medium">
                                                            {formatDate(avail.startDate)} ({avail.duration})
                                                        </span>
                                                        {isSoldOut && (
                                                            <span className="text-xs font-semibold text-red-600">Sold Out</span>
                                                        )}
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span
                                                            className={`text-xs font-medium px-2 py-1 rounded-full ${selectedDate === avail.startDate
                                                                ? "bg-white/20 text-white"
                                                                : isSoldOut
                                                                    ? "bg-gray-200 text-gray-400"
                                                                    : "bg-gray-100 text-gray-700"
                                                                }`}
                                                        >
                                                            Total: {avail.totalTickets}
                                                        </span>
                                                        <span
                                                            className={`text-xs font-medium px-2 py-1 rounded-full ${selectedDate === avail.startDate
                                                                ? "bg-white/20 text-white"
                                                                : isSoldOut
                                                                    ? "bg-gray-200 text-gray-400"
                                                                    : "bg-gray-100 text-gray-700"
                                                                }`}
                                                        >
                                                            Booked: {avail.bookedTickets}
                                                        </span>
                                                        <span
                                                            className={`text-xs font-medium px-2 py-1 rounded-full ${isSoldOut
                                                                ? "bg-red-100 text-red-700"
                                                                : isLowAvailability
                                                                    ? "bg-orange-100 text-orange-700"
                                                                    : "bg-green-100 text-green-700"
                                                                }`}
                                                        >
                                                            Available: {avail.availableTickets}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                            <div
                                                                className={`h-2.5 rounded-full ${isSoldOut ? "bg-red-600" : isLowAvailability ? "bg-orange-600" : "bg-green-600"
                                                                    }`}
                                                                style={{ width: `${bookedPercentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <p
                                                            className={`text-sm font-medium mt-1 ${selectedDate === avail.startDate ? "text-white" : "text-gray-500"
                                                                }`}
                                                        >
                                                            {bookedPercentage.toFixed(0)}% Booked
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedDate === avail.startDate && (
                                                    <CheckCircleIcon className="w-6 h-6 absolute top-2 right-2 text-green-400" />
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>
                                {selectedAvailability && (
                                    <p className="text-sm text-gray-700">
                                        <strong>You have selected:</strong> {formatDate(selectedDate)} for {selectedAvailability.duration}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <TicketIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">
                                            This adventure is currently sold out for all available dates. Please check back later or contact us for alternative options.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        <p className="text-gray-600">No availability information available.</p>
                    )}
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
                                <p><strong>Start Date:</strong> {formatDate(selectedDate)}</p>
                                <p><strong>Duration:</strong> {selectedAvailability?.duration}</p>
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
                            {selectedAvailability && (
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700">
                                        <strong>Selected Date:</strong> {formatDate(selectedDate)} ({selectedAvailability.duration})
                                    </p>
                                </div>
                            )}
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    value={mainContact.name}
                                    onChange={e => setMainContact({ ...mainContact, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="Email Address"
                                    value={mainContact.email}
                                    onChange={e => setMainContact({ ...mainContact, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    placeholder="Phone Number"
                                    value={mainContact.phone}
                                    onChange={e => setMainContact({ ...mainContact, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="numTravelers" className="text-sm font-medium text-gray-700">
                                    Number of Travelers {selectedAvailability && `(Max: ${selectedAvailability.availableTickets} tickets)`}
                                </label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleNumTravelersChange(-1)}
                                        disabled={numTravelers === 1}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${numTravelers === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                            }`}
                                        aria-label="Decrease number of travelers"
                                    >
                                        −
                                    </button>
                                    <div className="relative flex-1">
                                        <input
                                            id="numTravelers"
                                            type="number"
                                            min="1"
                                            max={selectedAvailability?.availableTickets ?? undefined}
                                            value={numTravelers}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (!isNaN(value)) {
                                                    const max = selectedAvailability?.availableTickets || Infinity;
                                                    const clampedValue = Math.max(1, Math.min(value, max));
                                                    setNumTravelers(clampedValue);
                                                }
                                            }}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 text-center focus:outline-none focus:border-black focus:ring-2 focus:ring-black"
                                            aria-live="polite"
                                            aria-atomic="true"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleNumTravelersChange(1)}
                                        disabled={numTravelers >= (selectedAvailability?.availableTickets ?? Infinity)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${numTravelers >= (selectedAvailability?.availableTickets || Infinity)
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                            }`}
                                        aria-label="Increase number of travelers"
                                    >
                                        +
                                    </button>
                                </div>
                                {selectedAvailability && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {(selectedAvailability?.availableTickets ?? 0) - numTravelers} tickets remaining
                                    </p>
                                )}
                            </div>
                            {travelers.map((trav, idx) => (
                                <div className="flex gap-3" key={idx}>
                                    <div className="w-1/2">
                                        <label htmlFor={`traveler-name-${idx}`} className="text-sm font-medium text-gray-700">
                                            Traveler {idx + 1} Name
                                        </label>
                                        <input
                                            id={`traveler-name-${idx}`}
                                            type="text"
                                            placeholder={`Traveler ${idx + 1} Name`}
                                            required
                                            value={trav.name}
                                            onChange={e => handleTravelerChange(idx, "name", e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label htmlFor={`traveler-phone-${idx}`} className="text-sm font-medium text-gray-700">
                                            Traveler {idx + 1} Phone
                                        </label>
                                        <input
                                            id={`traveler-phone-${idx}`}
                                            type="tel"
                                            placeholder={`Traveler ${idx + 1} Phone`}
                                            required
                                            value={trav.phone}
                                            onChange={e => handleTravelerChange(idx, "phone", e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                            ))}
                            <div>
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    placeholder="Additional Notes (Optional)"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-black"
                                />
                            </div>
                            <div className="flex items-center justify-between bg-gray-100 border border-gray-200 px-4 py-3 rounded-lg">
                                <span className="text-lg font-medium text-gray-700">Total Payable</span>
                                <span className="text-xl font-bold text-black">{currency}{totalPrice.toLocaleString()}</span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
                                disabled={!selectedAvailability}
                            >
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