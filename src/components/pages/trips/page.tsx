"use client";
import React, { useState, useRef, useId, useEffect } from "react";
import { packagesData } from "../../../types/packages";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlideProps {
  pkg: (typeof packagesData)[0];
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ pkg, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[20rem] h-[18rem] mx-4 z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-xl overflow-hidden transition-all duration-150 ease-out shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/20"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div
            className="h-72 bg-cover bg-center flex items-center justify-center p-4 text-white"
            style={{ backgroundImage: `url(${pkg.image})` }}
          >
            <article
              className={`relative p-2 w-full max-w-[80%] bg-black/50 rounded transition-opacity duration-1000 ease-in-out ${
                current === index ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <h3
                className="font-bold text-lg text-white"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
              >
                {pkg.title}
              </h3>
              <p
                className="text-sm text-gray-200"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
              >
                {pkg.duration}
              </p>
              <p
                className="text-sm text-white font-semibold"
                style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.7)" }}
              >
                ₹{pkg.price}
              </p>
            </article>
          </div>
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-gray-800 border-2 border-white/20 rounded-full focus:border-white focus:outline-none hover:bg-white hover:text-gray-900 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-white" />
    </button>
  );
};

export default function TripsSection() {
  const [current, setCurrent] = useState(0);
  const id = useId();
  const sectionRef = useRef<HTMLElement>(null);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? packagesData.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === packagesData.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP animation for section entrance
    gsap.fromTo(
      sectionRef.current,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="trips"
      ref={sectionRef}
      className="py-30 px-4 md:px-16 bg-transparent overflow-hidden relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-semibold text-white">
              Must <em className="italic text-gray-200">experience</em> packages
            </h2>
            <p className="text-sm text-gray-200">
              Indulge in our carefully crafted packages to immerse you in the most
              captivating and transformative travel adventures.
            </p>
          </div>
          <div>
            <Link
              href="/packages"
              className="font-semibold text-white hover:text-gray-200 transition"
            >
              See All Packages
            </Link>
          </div>
        </div>

        <div
          className="relative mx-auto w-full shadow-[0_0_20px_rgba(255,255,255,0.1)] rounded-xl"
          style={{ height: "18rem" }}
          aria-labelledby={`carousel-heading-${id}`}
        >
          <div className="relative h-full overflow-hidden">
            <Link href={`/packages/${packagesData[current].id}`}>
              <ul
                className="absolute flex mx-[-1rem] transition-transform duration-1000 ease-in-out"
                style={{
                  transform: `translateX(-${current * (100 / packagesData.length)}%)`,
                }}
              >
                {packagesData.map((pkg, index) => (
                  <Slide
                    key={index}
                    pkg={pkg}
                    index={index}
                    current={current}
                    handleSlideClick={handleSlideClick}
                  />
                ))}
              </ul>
            </Link>
          </div>

          <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
            <CarouselControl
              type="previous"
              title="Go to previous slide"
              handleClick={handlePreviousClick}
            />
            <CarouselControl
              type="next"
              title="Go to next slide"
              handleClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
}