import AboutSection from "@/components/About";
import ContactSection from "@/components/Contact";
import TestimonialSection from "@/components/Testimonial";
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import TripsSection from "@/components/Trips";
import VideoSection from "@/components/Video";

export default function Home() {
  return (
     <div className="font-sans">
      <Navbar />
      <HeroCarousel />

      <main className="px-6 sm:px-8 md:px-12 lg:px-24 space-y-24 max-w-7xl mx-auto mt-[-4vh]">
        <TripsSection />
        <AboutSection />
        <VideoSection />
        <TestimonialSection />
        <ContactSection />
      </main>
    </div>
  );
}
