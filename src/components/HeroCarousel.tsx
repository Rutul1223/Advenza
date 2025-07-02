'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';

const images = [
  'https://freerangestock.com/sample/155394/a-green-hills-with-mountains-in-the-background.jpg',
  'https://www.polo-safari.in/wp-content/uploads/2020/03/img_2176d0091220f9999df75102b948d43c_1530262398556_processed_original.jpg?%3E',
  'https://clubmahindra.gumlet.io/blog/images/Matheran-during-Monsoon-resized.jpg?w=800&dpr=1.0',
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        next();
      }, 5000); // Change slide every 5 seconds
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Pause on hover, resume on leave
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      next();
    }, 5000);
  };

  // Reset timer on manual navigation
  const handleNavigation = (action: () => void) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    action();
    intervalRef.current = setInterval(() => {
      next();
    }, 5000);
  };

  return (
    <div
      className="relative w-full h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-16 inset-x-0 flex justify-center z-10">
        <Navbar />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
        <div
          className="px-5 py-2 rounded-full font-semibold mb-6 text-white bg-black/20 backdrop-blur-md"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          The Best Place to Start Your Adventure
        </div>

        <h1 className="max-w-3xl text-3xl sm:text-5xl md:text-6xl leading-tight font-light">
          Embark on{' '}
          <span className="italic font-serif font-semibold">Journey</span>
          <br />
          not <span className="italic font-serif">just</span> destinations
          <br />
          with <span className="italic font-serif">our trips.</span>
        </h1>
      </div>

      {/* Controls */}
      <button
        onClick={() => handleNavigation(prev)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
      >
        ‹
      </button>
      <button
        onClick={() => handleNavigation(next)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
      >
        ›
      </button>

      <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === i ? 'bg-white' : 'bg-gray-500'
            }`}
            onClick={() => handleNavigation(() => setCurrent(i))}
          />
        ))}
      </div>
    </div>
  );
}