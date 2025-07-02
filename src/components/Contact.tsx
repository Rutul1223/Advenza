'use client';
import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-100 px-4">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-black">
          Ready to <em className="italic">embark</em><br />
          on a <em className="italic">new</em> journey?
        </h2>
        <p className="mt-6 text-gray-600 text-sm md:text-base">
          Don’t let your dream getaway remain a dream any longer. Take action now and<br />
          let us craft your next unforgettable adventure. Join us in turning your travel<br />
          fantasies into unforgettable realities.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="p-3 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
