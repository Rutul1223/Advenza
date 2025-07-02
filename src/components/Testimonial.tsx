'use client';
import React from "react";

const testimonials = [
  {
    name: "Priya Marcella",
    country: "India",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    text: "Xplore’s commitment to customer satisfaction is truly commendable. If you want a travel experience that goes beyond the ordinary, highly recommend Xplore.",
  },
  {
    name: "Jose Miguel",
    country: "Spain",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "They provided an amazing adventure that I’ll never forget. The accommodations were top-notch, and the itinerary was a perfect trip of relaxation and excitement.",
  },
  {
    name: "Angellina Diana",
    country: "Italy",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Their diverse range of destinations and unwavering commitment to customer satisfaction make them my go-to choice for future adventures.",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="px-4 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-semibold text-black">
              Real <em className="italic text-gray-700">stories</em>
            </h1>
            <h1 className="text-4xl font-semibold text-black">
              from travelers
            </h1>
          </div>
          <img
            src="https://cdn.prod.website-files.com/675fdb38b60bc5242af8cd90/675fdb38b60bc5242af8cdc1_double-quotes.png"
            alt="quotes"
            className="w-10 h-10 mt-6 md:mt-0"
          />
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 shadow-md bg-white flex flex-col justify-between h-full"
            >
              <p className="text-gray-700 text-sm mb-4">{t.text}</p>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Static placeholder) */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        </div>
      </div>
    </section>
  );
}
