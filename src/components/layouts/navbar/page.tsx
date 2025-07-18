'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu2, IconX, IconUser, IconLogout } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { useAuth } from '@/context/AuthContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const navItems = [
  { name: 'Trips', link: '#trips' },
  { name: 'Testimonial', link: '#testimonials' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
];

export default function Navbar({
  textColor = 'text-white',
}: {
  textColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!navRef.current) return;

    // Set initial styles to prevent flash
    gsap.set(navRef.current, { opacity: 0, y: -100 });
    gsap.set(logoRef.current, { opacity: 0, x: -50 });
    gsap.set(menuItemsRef.current.filter((el) => el !== null), {
      opacity: 0,
      x: 50,
    });

    // GSAP animations for navbar entrance
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
    });

    gsap.to(logoRef.current, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.8,
    });

    gsap.to(menuItemsRef.current.filter((el) => el !== null), {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 1,
    });

    // Scroll effect with GSAP
    gsap.to(navRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(10px)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
    });

    // Handle clicks outside dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      gsap.to('.mobile-menu', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
      gsap.fromTo(
        '.mobile-menu',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (pathname === '/') {
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 70 },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }
    } else {
      router.push(`/${href}`);
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    toggleMenu();
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] rounded-full px-6 py-3 shadow-lg border border-white/20`}
      style={{
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="w-full max-w-4xl flex justify-between items-center font-light">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className={`text-2xl italic font-serif tracking-wide ${textColor} drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]`}
        >
          Advenza
        </Link>

        {/* Desktop Nav */}
        <motion.div
          className="hidden lg:flex items-center space-x-6 text-sm tracking-wide"
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                ref={(el) => {
                  menuItemsRef.current[idx] = el;
                }}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`relative px-3 py-2 transition duration-300 ${textColor} hover:text-gray-200`}
                onMouseEnter={() => {
                  setHovered(idx);
                  if (menuItemsRef.current[idx]) {
                    gsap.to(menuItemsRef.current[idx], {
                      scale: 1.1,
                      duration: 0.3,
                    });
                  }
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  if (menuItemsRef.current[idx]) {
                    gsap.to(menuItemsRef.current[idx], {
                      scale: 1,
                      duration: 0.3,
                    });
                  }
                }}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 rounded-full bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </div>
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`p-2 rounded-full ${textColor} hover:bg-white/20 transition`}
              >
                <IconUser className="w-6 h-6" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-white/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/20 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <IconUser className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/20 transition w-full text-left"
                    >
                      <IconLogout className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-white text-gray-900 text-sm font-semibold hover:bg-gray-200 transition hover:shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            >
              Book Now
            </Link>
          )}
        </motion.div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className={`p-1 rounded-full ${textColor} hover:bg-white/20 transition`}
          >
            {isOpen ? (
              <IconX className="w-6 h-6" />
            ) : (
              <IconMenu2 className="w-6 h-6" />
            )}
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-menu absolute inset-x-0 top-[60px] z-50 flex flex-col items-start gap-3 rounded-lg bg-gray-900/95 backdrop-blur-md border border-white/20 px-4 py-6 mx-auto max-w-[90%] sm:max-w-[80%] shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className={`${textColor} text-base font-medium w-full py-2 transition duration-300 hover:text-gray-200`}
                    onClick={(e) => {
                      handleNavClick(e, item.link);
                      toggleMenu();
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className={`${textColor} text-base font-medium w-full py-2 transition duration-300 hover:text-gray-200`}
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`${textColor} text-base font-medium w-full py-2 transition duration-300 hover:text-gray-200 text-left`}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-md bg-white text-gray-900 text-base font-semibold w-full text-center hover:bg-gray-200 transition mt-2"
                    onClick={toggleMenu}
                  >
                    Book Now
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}