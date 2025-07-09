'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  '/myImages/carousel1.jpg',
  '/myImages/carousel2.jpg',
  '/myImages/carousel3.avif',
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // GSAP-powered slide transition
  const transitionSlide = useCallback((newIndex: number) => {
    const currentImage = imageRefs.current[current];
    const nextImage = imageRefs.current[newIndex];

    if (!currentImage || !nextImage) return;

    gsap.killTweensOf([currentImage, nextImage]);

    gsap.timeline()
      .to(currentImage, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      })
      .fromTo(nextImage,
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut"
        },
        0
      );

    setCurrent(newIndex);
  }, [current]);

  const next = useCallback(() => {
    transitionSlide((current + 1) % images.length);
  }, [current, transitionSlide]);

  const prev = useCallback(() => {
    transitionSlide((current - 1 + images.length) % images.length);
  }, [current, transitionSlide]);

  // GSAP animations initialization
  useEffect(() => {
    const currentImageRefs = imageRefs.current;
    
    // Set initial states
    gsap.set(currentImageRefs, { opacity: 0 });
    if (currentImageRefs[current]) {
      gsap.set(currentImageRefs[current], { opacity: 1 });
    }
    
    // Text animation
    if (textRef.current) {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out"
      });
    }

    // Controls animation
    const controls = [prevButtonRef.current, nextButtonRef.current, ...dotsRef.current].filter(Boolean);
    if (controls.length > 0) {
      gsap.from(controls, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "back.out(1.7)",
        stagger: 0.1
      });
    }

    // Parallax effect
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    return () => {
      gsap.killTweensOf(currentImageRefs);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [current]);

  // Auto-scroll effect
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        next();
      }, 5000);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [next]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const controls = [prevButtonRef.current, nextButtonRef.current, ...dotsRef.current].filter(Boolean);
    if (controls.length > 0) {
      gsap.to(controls, {
        opacity: 1,
        duration: 0.3
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    intervalRef.current = setInterval(() => {
      next();
    }, 5000);
  }, [next]);

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((src, index) => (
        <div
          key={index}
          ref={(el) => {imageRefs.current[index] = el}}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={src}
            alt={`Travel destination ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40" />
      
      <div ref={textRef} className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
        <div className="px-5 py-2 rounded-full font-semibold mb-6 text-white bg-black/20 backdrop-blur-md border border-amber-400/20">
          The Best Place to Start Your Adventure
        </div>

        <h1 className="max-w-3xl text-3xl sm:text-5xl md:text-6xl leading-tight font-light">
          Embark on{' '}
          <span className="italic font-serif font-semibold text-amber-300">Journey</span>
          <br />
          not <span className="italic font-serif">just</span> destinations
          <br />
          with <span className="italic font-serif text-amber-300">our trips.</span>
        </h1>
      </div>

      {/* Controls */}
      <div className="absolute inset-0 z-20">
        <button
          ref={prevButtonRef}
          onClick={prev}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-amber-500/80 transition-all duration-300 backdrop-blur-sm"
        >
          ‹
        </button>
        <button
          ref={nextButtonRef}
          onClick={next}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-amber-500/80 transition-all duration-300 backdrop-blur-sm"
        >
          ›
        </button>

        <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              ref={(el) => {dotsRef.current[i] = el}}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                current === i ? 'bg-amber-400 scale-125' : 'bg-gray-500/80'
              }`}
              onClick={() => transitionSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}