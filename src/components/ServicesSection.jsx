import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  Layers,
  Smartphone,
  Rocket,
  Terminal,
  ArrowRight,
  Clock,
  X,
  CheckCircle,
} from "lucide-react";

const SERVICES = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Modern, performant websites built with cutting-edge technologies and clean architecture.",
    icon: Code2,
    features: [
      "React / Next.js Applications",
      "TypeScript Development",
      "Performance Optimization",
      "API Integrations",
      "Server-Side Rendering",
      "State Management",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL"],
    timeline: [
      { phase: "Planning", description: "Requirements analysis and architecture design" },
      { phase: "Development", description: "Agile development with weekly iterations" },
      { phase: "Testing", description: "Comprehensive testing and quality assurance" },
      { phase: "Deployment", description: "CI/CD pipeline setup and production deployment" },
    ],
    deliverables: [
      "Fully functional web application",
      "Responsive design for all devices",
      "Performance optimization report",
      "Documentation and training",
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description:
      "Intuitive interfaces that enhance user experience, engagement, and conversion rates.",
    icon: Palette,
    features: [
      "User Research & Analysis",
      "Interactive Prototypes",
      "Design Systems",
      "User Testing",
      "Accessibility Compliance",
      "Wireframing",
    ],
    tech: ["Figma", "Framer", "Adobe XD", "Prototyping", "Webflow"],
    timeline: [
      { phase: "Research", description: "User interviews and market analysis" },
      { phase: "Wireframing", description: "Low-fidelity prototypes and user flows" },
      { phase: "Design", description: "High-fidelity mockups and design system" },
      { phase: "Testing", description: "Usability testing and refinement" },
    ],
    deliverables: [
      "Complete design system",
      "Interactive prototypes",
      "User research report",
      "Style guide and assets",
    ],
  },
  {
    id: "animation",
    title: "Web Animation",
    description:
      "Engaging micro-interactions and animations that bring your product to life.",
    icon: Zap,
    features: [
      "Micro-interactions",
      "Scroll Animations",
      "SVG Animations",
      "3D WebGL Effects",
      "Performance-focused",
      "Lottie Animations",
    ],
    tech: ["Framer Motion", "GSAP", "Three.js", "Lottie", "WebGL"],
    timeline: [
      { phase: "Concept", description: "Animation storyboarding and planning" },
      { phase: "Prototyping", description: "Interactive animation prototypes" },
      { phase: "Implementation", description: "Code integration and optimization" },
      { phase: "Polishing", description: "Performance tuning and refinement" },
    ],
    deliverables: [
      "Animation library",
      "Performance report",
      "Reusable components",
      "Integration guide",
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack Projects",
    description:
      "End-to-end MERN solutions — from database design and API to cloud deployment.",
    icon: Layers,
    features: [
      "Full Architecture Design",
      "Database Optimization",
      "Cloud Deployment",
      "DevOps & CI/CD",
      "Scalable Solutions",
      "Security Implementation",
    ],
    tech: ["MongoDB", "PostgreSQL", "AWS", "Docker", "Redis"],
    timeline: [
      { phase: "Discovery", description: "Project scoping and technology selection" },
      { phase: "Development", description: "Full-stack development sprints" },
      { phase: "Integration", description: "System integration and testing" },
      { phase: "Launch", description: "Production deployment and monitoring" },
    ],
    deliverables: [
      "Complete web application",
      "Database schema",
      "API documentation",
      "Deployment scripts",
    ],
  },
  {
    id: "responsive",
    title: "Responsive Redesign",
    description:
      "Modernizing existing sites for all devices — mobile-first, fast, and accessible.",
    icon: Smartphone,
    features: [
      "Mobile-First Approach",
      "Cross-browser Testing",
      "Performance Audits",
      "SEO Optimization",
      "Accessibility Audit",
      "Progressive Enhancement",
    ],
    tech: ["Tailwind CSS", "CSS Grid", "PWA", "SEO", "Web Vitals"],
    timeline: [
      { phase: "Audit", description: "Current site analysis and pain points" },
      { phase: "Strategy", description: "Redesign approach and mobile-first plan" },
      { phase: "Implementation", description: "Responsive implementation" },
      { phase: "Optimization", description: "Performance and SEO optimization" },
    ],
    deliverables: [
      "Responsive website",
      "Performance audit report",
      "SEO improvement plan",
      "Cross-browser compatibility",
    ],
  },
  {
    id: "consulting",
    title: "Tech Consulting",
    description:
      "Strategic guidance for digital transformation, architecture decisions, and team growth.",
    icon: Rocket,
    features: [
      "Technology Strategy",
      "Architecture Review",
      "Code Audits",
      "Team Mentoring",
      "Technical Roadmapping",
      "Best Practices",
    ],
    tech: ["Strategy", "Architecture", "Mentoring", "Audits", "Workshops"],
    timeline: [
      { phase: "Assessment", description: "Current state analysis and gap identification" },
      { phase: "Recommendation", description: "Strategic recommendations and roadmap" },
      { phase: "Implementation", description: "Guidance during implementation" },
      { phase: "Review", description: "Performance review and adjustments" },
    ],
    deliverables: [
      "Technical audit report",
      "Strategic roadmap",
      "Architecture diagrams",
      "Team training materials",
    ],
  },
];

const ServiceCard = memo(({ service, index, onOpen }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => onOpen(service)}
      className="group relative p-6 rounded-2xl bg-white/2.5 border border-white/[0.07] hover:border-white/20 hover:bg-white/4 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[10px] text-white/20 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
          <Icon className="w-4.5 h-4.5 text-white/60 group-hover:text-white/90 transition-colors duration-300" style={{ width: 18, height: 18 }} />
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-2 group-hover:text-white transition-colors">
        {service.title}
      </h3>

      <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-2">
        {service.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.tech.slice(0, 3).map((t, i) => (
          <span
            key={i}
            className="text-[10px] text-white/35 bg-white/4 px-2 py-0.5 rounded-md border border-white/6 font-mono"
          >
            {t}
          </span>
        ))}
        {service.tech.length > 3 && (
          <span className="text-[10px] text-white/20 font-mono">
            +{service.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-white/25 group-hover:text-white/65 transition-colors duration-200">
        <span className="text-xs font-medium">View Details</span>
        <ArrowRight
          className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/10 transition-all duration-500" />
    </motion.div>
  );
});

const ServiceModal = memo(({ service, onClose, modalRef }) => {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={modalRef}
          key="modal"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.07] shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-white/70" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-lg leading-tight">
                {service.title}
              </h2>
              <p className="text-white/35 text-xs mt-0.5">{service.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/6 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/6">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-[11px] font-mono text-white/30 tracking-widest uppercase mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-3.5 h-3.5 text-white/40 mt-0.5 shrink-0" />
                        <span className="text-white/60 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[11px] font-mono text-white/30 tracking-widest uppercase mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/4 border border-white/8 rounded-lg text-xs text-white/55 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-[11px] font-mono text-white/30 tracking-widest uppercase mb-3">
                    Process Timeline
                  </h3>
                  <div className="space-y-2.5">
                    {service.timeline.map((phase, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-3 rounded-xl bg-white/2 border border-white/6"
                      >
                        <span className="font-mono text-[10px] text-white/20 tracking-wider mt-0.5 shrink-0 w-4">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="text-white/70 text-xs font-semibold mb-0.5">
                            {phase.phase}
                          </div>
                          <div className="text-white/40 text-xs">
                            {phase.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-mono text-white/30 tracking-widest uppercase mb-3">
                    Deliverables
                  </h3>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/55 text-sm">
                        <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.07] shrink-0">
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Average timeline: 4–8 weeks</span>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              Start Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: false });

  const openService = useCallback((service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedService) closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedService, closeModal]);

  return (
    <div ref={sectionRef} className="relative py-20 bg-black overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/3 mb-5">
            <Terminal className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">
              services
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                What I Build
              </h2>
              <p className="text-white/35 text-sm mt-2 font-mono">
                <span className="text-white/15">{"// "}</span>
                click any service to see full details
              </p>
            </div>
            <span className="text-white/20 font-mono text-sm shrink-0">
              {SERVICES.length} services
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              onOpen={openService}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={closeModal}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default ServicesSection;
