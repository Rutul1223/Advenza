"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { packagesData, TravelPackage } from "@/types/packages";
import { MapPinIcon, CalendarIcon, TicketIcon } from "@heroicons/react/24/solid";
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
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSpot, setSelectedSpot] = useState<{ location: string; timing: string } | null>(null);

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
    if (found?.readyToPickup && found.readyToPickup.length > 0) {
      const defaultCity = found.readyToPickup[0].city;
      setSelectedCity(defaultCity);
      if (found.readyToPickup[0].spots.length > 0) {
        setSelectedSpot(found.readyToPickup[0].spots[0]);
      } else {
        setSelectedSpot(null);
      }
    } else {
      setSelectedCity("");
      setSelectedSpot(null);
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
    // Reset city and spot to ensure valid selection when date changes
    if (pkg?.readyToPickup && pkg.readyToPickup.length > 0) {
      const defaultCity = pkg.readyToPickup[0].city;
      setSelectedCity(defaultCity);
      const cityData = pkg.readyToPickup.find(c => c.city === defaultCity);
      setSelectedSpot(cityData?.spots[0] || null);
    } else {
      setSelectedCity("");
      setSelectedSpot(null);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const cityData = pkg?.readyToPickup?.find(c => c.city === city);
    if (cityData?.spots && cityData.spots.length > 0) {
      setSelectedSpot(cityData.spots[0]);
    } else {
      setSelectedSpot(null);
    }
  };

  const handleSpotChange = (location: string) => {
    const cityData = pkg?.readyToPickup?.find(c => c.city === selectedCity);
    const spot = cityData?.spots.find(s => s.location === location) || null;
    setSelectedSpot(spot);
  };

  const handleNumTravelersChange = (delta: number) => {
    const newValue = Math.max(1, Math.min(
      numTravelers + delta,
      selectedAvailability?.availableTickets ?? 1
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{pkg.title}</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl">{pkg.description}</p>
            </div>
            <div className="flex flex-col gap-4">
              {selectedAvailability && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {formatDate(selectedDate)} ({selectedAvailability.duration})
                  </span>
                </div>
              )}
              {selectedCity && selectedSpot && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {selectedSpot.location}, {selectedCity} at {selectedSpot.timing}
                  </span>
                </div>
              )}
              {!selectedAvailability && !selectedCity && !selectedSpot && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Select a date and pickup location below</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Left Column: Date and Pickup Selection */}
        <div className="space-y-12">
          {/* Date Selection Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Select Your Travel Date</h2>
            {pkg.availability && pkg.availability.length > 0 ? (
              pkg.availability.some(avail => avail.availableTickets && avail.availableTickets > 0) ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="date-select" className="text-sm font-medium text-gray-700">
                      Select Date
                    </label>
                    <div className="relative">
                      <select
                        id="date-select"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:border-black appearance-none"
                      >
                        {pkg.availability
                          .filter(avail => avail.availableTickets && avail.availableTickets > 0)
                          .map((avail) => (
                            <option key={avail.startDate} value={avail.startDate}>
                              {formatDate(avail.startDate)} ({avail.duration})
                            </option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {selectedAvailability && (
                    <div className="bg-black p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-white" />
                        <p className="text-sm font-medium text-white">
                          <strong>Selected:</strong> {formatDate(selectedDate)} ({selectedAvailability.duration})
                        </p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                          Total: {selectedAvailability.totalTickets}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                          Booked: {selectedAvailability.bookedTickets}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          (selectedAvailability.availableTickets ?? 0) <= 5
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          Available: {selectedAvailability.availableTickets}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              (selectedAvailability.availableTickets ?? 0) <= 5
                                ? "bg-orange-600"
                                : "bg-green-600"
                            }`}
                            style={{ width: `${(selectedAvailability.bookedTickets / selectedAvailability.totalTickets) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium mt-1 text-white">
                          {(selectedAvailability.bookedTickets / selectedAvailability.totalTickets * 100).toFixed(0)}% Booked
                        </p>
                      </div>
                    </div>
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

          {/* City and Spot Selection Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Select Pickup Location</h2>
            {pkg.readyToPickup && pkg.readyToPickup.length > 0 ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* City Selection */}
                  <div className="flex-1 space-y-2">
                    <label htmlFor="city-select" className="text-sm font-medium text-gray-700">
                      Select City
                    </label>
                    <div className="relative">
                      <select
                        id="city-select"
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:border-black appearance-none"
                      >
                        {pkg.readyToPickup.map((cityData) => (
                          <option key={cityData.city} value={cityData.city}>
                            {cityData.city}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Spot Selection */}
                  {selectedCity && (
                    <div className="flex-1 space-y-2">
                      <label htmlFor="spot-select" className="text-sm font-medium text-gray-700">
                        Select Pickup Spot
                      </label>
                      <div className="relative">
                        <select
                          id="spot-select"
                          value={selectedSpot?.location || ""}
                          onChange={(e) => handleSpotChange(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:border-black appearance-none"
                        >
                          {pkg.readyToPickup
                            .find((c) => c.city === selectedCity)
                            ?.spots.map((spot) => (
                              <option key={spot.location} value={spot.location}>
                                {spot.location} at {spot.timing}
                              </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {selectedCity && selectedSpot && (
                  <div className="bg-black p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-white" aria-hidden="true" />
                      <p className="text-sm font-medium text-white">
                        <strong>Selected:</strong> {selectedSpot.location}, {selectedCity} at {selectedSpot.timing}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No pickup locations available.</p>
            )}
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
                <p><strong>Start Date:</strong> {formatDate(selectedDate)}</p>
                <p><strong>Duration:</strong> {selectedAvailability?.duration}</p>
                <p><strong>Pickup Location:</strong> {selectedSpot ? `${selectedSpot.location}, ${selectedCity} at ${selectedSpot.timing}` : "Not selected"}</p>
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
                  {selectedCity && selectedSpot && (
                    <p className="text-sm font-medium text-gray-700">
                      <strong>Pickup:</strong> {selectedSpot.location}, {selectedCity} at {selectedSpot.timing}
                    </p>
                  )}
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
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      numTravelers === 1
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
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      numTravelers >= (selectedAvailability?.availableTickets || Infinity)
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
                disabled={!selectedAvailability || !selectedCity || !selectedSpot}
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