'use client';
import Link from 'next/link';
import React from 'react';
import { FaUser, FaLeaf, FaPlaneDeparture, FaStar } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 md:px-16 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-4xl font-semibold text-black">
              Our true <em className="italic text-gray-600">beliefs</em> for <em className="italic text-gray-600">your</em> benefits
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-600 mb-1">
              Our beliefs aren’t just words; they are the foundation of every adventure we offer. With high commitment to sustainability,
            </p>
            <Link href="/packages" className="font-semibold text-black hover:underline">
              See All Packages
            </Link>
          </div>
        </div>

        {/* Belief Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="flex items-start p-6 border rounded-xl shadow-sm bg-white">
            <div className="text-black text-xl mr-4">
              <FaUser />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Customer-Centric</h4>
              <p className="text-sm text-gray-600">
                Being customer-centric is the compass that guides our travel services. We prioritize our customers' needs.
              </p>
            </div>
          </div>

          {/* Card 2 (Black Background) */}
          <div className="flex items-start p-6 border rounded-xl shadow-sm bg-black text-white">
            <div className="text-white text-xl mr-4">
              <FaLeaf />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Sustainable Travel</h4>
              <p className="text-sm text-gray-300">
                Committed to responsible and eco-conscious journeys, traveling the world with minimal footprints and pollutions.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start p-6 border rounded-xl shadow-sm bg-white">
            <div className="text-black text-xl mr-4">
              <FaPlaneDeparture />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Authentic Experiences</h4>
              <p className="text-sm text-gray-600">
                We deliver journeys that immerse you in unforgettable encounters with the world’s diverse cultures & landscapes.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-start p-6 border rounded-xl shadow-sm bg-black text-white">
            <div className="text-white text-xl mr-4">
              <FaStar />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Quality Guides</h4>
              <p className="text-sm text-gray-300">
                Our expert guides ensure a smooth, enriching journey with professional insights and personal care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
