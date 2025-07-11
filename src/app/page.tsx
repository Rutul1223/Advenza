'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutSection from "@/components/pages/about/page";
import ContactSection from "@/components/pages/contact/page";
import TestimonialSection from "@/components/pages/testimonial/page";
import HeroVideo from "@/components/layouts/carousel/HeroCarousel";
import Navbar from "@/components/layouts/navbar/page";
import TripsSection from "@/components/pages/trips/page";
import VideoSection from "@/components/pages/video/page";
import Footer from "@/components/layouts/footer/page";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add to refs array
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Set initial styles for animation
    gsap.set(sectionRefs.current, { 
      autoAlpha: 0, 
      y: 50 
    });

    // Create scroll animations for each section
    sectionRefs.current.forEach((section) => {
      gsap.to(section, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
          markers: false // Set to true for debugging
        }
      });

      // Add parallax effect to background elements
      const bgElements = section.querySelectorAll('.adventure-bg-element');
      if (bgElements.length > 0) {
        gsap.fromTo(bgElements, 
          { y: 50 },
          {
            y: -50,
            scrollTrigger: {
              trigger: section,
              scrub: true
            }
          }
        );
      }
    });

    // Adventure-themed cursor effect
    const cursor = document.querySelector('.adventure-cursor');
    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }

    // Mountain parallax effect
    const mountains = document.querySelectorAll('.mountain-layer');
    mountains.forEach((layer, i) => {
      gsap.to(layer, {
        y: `${(i + 1) * 15}%`,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-white adventure-theme">
      {/* Adventure-themed cursor */}
      <div className="adventure-cursor fixed w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
      
      {/* Star background (unchanged) */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 opacity-90"></div>
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Mountain layers for parallax (unchanged) */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div className="mountain-layer absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-800 to-transparent"></div>
        <div className="mountain-layer absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-gray-700 to-transparent"></div>
        <div className="mountain-layer absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-gray-600 to-transparent"></div>
      </div>

      <div ref={mainRef} className="relative z-10">
        <Navbar />
        <HeroVideo />

        <main className="px-6 sm:px-8 md:px-12 lg:px-24 space-y-24 max-w-7xl mx-auto mt-[-4vh]">
          <div ref={addToRefs} className="adventure-section adventure-bg-element">
            <TripsSection />
          </div>
          
          <div ref={addToRefs} className="adventure-section adventure-bg-element relative">
            <div className="absolute -inset-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] -z-10"></div>
            <AboutSection />
          </div>
          
          <div ref={addToRefs} className="adventure-section">
            <VideoSection />
          </div>
          
          <div ref={addToRefs} className="adventure-section adventure-bg-element relative">
            <div className="absolute -inset-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] -z-10"></div>
            <TestimonialSection />
          </div>
          
          <div ref={addToRefs} className="adventure-section">
            <ContactSection />
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Campfire animation in corner */}
      <div className="fixed bottom-4 left-4 z-20 opacity-70 hover:opacity-100 transition-opacity duration-300">
        <div className="relative w-16 h-16">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute inset-0 rounded-full bg-white filter blur-sm animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                transform: `scale(${1 - i * 0.1})`,
                opacity: 1 - i * 0.2
              }}
            ></div>
          ))}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-900 rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
}