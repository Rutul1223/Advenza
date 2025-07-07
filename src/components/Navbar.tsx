"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "Trips", link: "#trips" },
  { name: "Testimonial", link: "#testimonials" },
  { name: "About", link: "#about" },
  { name: "Contact", link: "#contact" },
];

export default function Navbar({
  textColor = "text-white",
}: {
  textColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (pathname === "/") {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <motion.nav
      ref={ref}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] rounded-full px-6 py-3 shadow-md border border-gray-200 ${
        visible ? "backdrop-blur bg-black/20" : ""
      }`}
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
      animate={{
        backgroundColor: visible ? "rgba(0, 0, 0, 0.2)" : "transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
    >
      <div className="w-full max-w-4xl flex justify-between items-center text-white font-light">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl italic font-serif tracking-wide ${textColor}`}
        >
          Advenza
        </Link>

        {/* Desktop Nav */}
        <motion.div
          className="hidden lg:flex items-center space-x-6 text-sm tracking-wide"
          animate={{
            y: visible ? 10 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
        >
          <div
            className="flex flex-row items-center justify-center space-x-2"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`relative px-3 py-2 transition duration-300 ${textColor}`}
                onMouseEnter={() => setHovered(idx)}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 rounded-full bg-white/20"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            Book Now
          </Link>
        </motion.div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <IconX className="text-white w-6 h-6" />
            ) : (
              <IconMenu2 className="text-white w-6 h-6" />
            )}
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 top-[60px] z-50 flex flex-col items-start gap-3 rounded-lg bg-black/20 backdrop-blur-md px-4 py-6 mx-auto max-w-[90%] sm:max-w-[80%]"
              >
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className={`${textColor} text-base font-medium w-full py-2 transition duration-300`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md bg-black text-white text-base font-semibold w-full text-center hover:bg-gray-800 transition"
                >
                  Book Now
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
