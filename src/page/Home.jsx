import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import FeaturedProjects from "../components/FeaturedProjects";
import AboutMeSection from "../components/AboutMeSection";
import ProcessSection from "../components/ProcessSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";
import Navbar from "../components/Navbar";

const Home = () => {
  // Fix scroll position on initial load
  useEffect(() => {
    // Force scroll to top on initial load
    window.scrollTo(0, 0);

    // Prevent any body overflow during initial render
    document.body.style.overflow = "hidden";

    // Wait for everything to load, then restore overflow
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <div className="bg-black">
        <SkillsSection />
        <FeaturedProjects />
        <AboutMeSection />
        <ProcessSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Home;
