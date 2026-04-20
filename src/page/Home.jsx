import React, { useEffect, Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import CustomCursor from "../components/CustomCursor";
import CommandPalette from "../components/CommandPalette";

const SkillsSection = lazy(() => import("../components/SkillsSection"));
const FeaturedProjects = lazy(() => import("../components/FeaturedProjects"));
const AboutMeSection = lazy(() => import("../components/AboutMeSection"));
const ProcessSection = lazy(() => import("../components/ProcessSection"));
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const TestimonialsSection = lazy(
  () => import("../components/TestimonialsSection"),
);
const ContactSection = lazy(() => import("../components/ContactSection"));
const FooterSection = lazy(() => import("../components/FooterSection"));

const SectionFallback = () => (
  <div className="w-full py-20 flex items-center justify-center bg-black">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
  </div>
);

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <CommandPalette />
      <section id="home" className="scroll-mt-16">
        <HeroSection />
      </section>

      <div className="bg-black">
        <Suspense fallback={<SectionFallback />}>
          <section className="scroll-mt-16">
            <SkillsSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section id="projects" className="scroll-mt-16">
            <FeaturedProjects />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section id="about" className="scroll-mt-16">
            <AboutMeSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section className="scroll-mt-16">
            <ProcessSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section id="services" className="scroll-mt-16">
            <ServicesSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section id="testimonials" className="scroll-mt-16">
            <TestimonialsSection />
          </section>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <section id="contact" className="scroll-mt-16">
            <ContactSection />
          </section>
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
