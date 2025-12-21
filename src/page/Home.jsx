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
      {/* Hero Section with id for navigation */}
      <section id="home" className="scroll-mt-16">
        <HeroSection />
      </section>

      <div className="bg-black">
        {/* Skills Section */}
        <section className="scroll-mt-16">
          <SkillsSection />
        </section>

        {/* Featured Projects */}
        <section className="scroll-mt-16">
          <FeaturedProjects />
        </section>

        {/* About Section with id for navigation */}
        <section id="about" className="scroll-mt-16">
          <AboutMeSection />
        </section>

        {/* Process Section */}
        <section className="scroll-mt-16">
          <ProcessSection />
        </section>

        {/* Services Section with id for navigation */}
        <section id="services" className="scroll-mt-16">
          <ServicesSection />
        </section>

        {/* Testimonials Section with id for navigation */}
        <section id="testimonials" className="scroll-mt-16">
          <TestimonialsSection />
        </section>

        {/* Contact Section with id for navigation */}
        <section id="contact" className="scroll-mt-16">
          <ContactSection />
        </section>

        {/* Footer Section */}
        <section className="scroll-mt-16">
          <FooterSection />
        </section>
      </div>
    </div>
  );
};

export default Home;
