import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  Layers,
  Smartphone,
  Rocket,
  Terminal,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Users,
  X,
  BookOpen,
  Trophy,
  Calendar,
  CheckCircle,
} from "lucide-react";

const ServicesSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  // Use framer-motion's optimized useInView hook
  const isInView = useInView(sectionRef, {
    amount: 0.1,
    once: false,
  });

  // Memoized services data
  const services = useMemo(
    () => [
      {
        id: "web-dev",
        title: "Web Development",
        description:
          "Modern, performant websites built with cutting-edge technologies.",
        icon: Code2,
        features: [
          "React/Next.js Applications",
          "TypeScript Development",
          "Performance Optimization",
          "API Integrations",
          "Modern JavaScript ES6+",
          "State Management",
          "Server-Side Rendering",
        ],
        tech: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "GraphQL",
          "Redux",
          "Vite",
        ],
        details: {
          timeline: [
            {
              phase: "Planning",
              description: "Requirements analysis and architecture design",
            },
            {
              phase: "Development",
              description: "Agile development with weekly iterations",
            },
            {
              phase: "Testing",
              description: "Comprehensive testing and quality assurance",
            },
            {
              phase: "Deployment",
              description: "CI/CD pipeline setup and production deployment",
            },
          ],
          deliverables: [
            "Fully functional web application",
            "Responsive design for all devices",
            "Performance optimization report",
            "Documentation and training",
            "Ongoing support package",
          ],
        },
      },
      {
        id: "ui-ux",
        title: "UI/UX Design",
        description:
          "Intuitive interfaces that enhance user experience and engagement.",
        icon: Palette,
        features: [
          "User Research & Analysis",
          "Interactive Prototypes",
          "Design Systems",
          "User Testing",
          "Accessibility Compliance",
          "Wireframing",
          "Visual Design",
        ],
        tech: [
          "Figma",
          "Framer",
          "Adobe XD",
          "Webflow",
          "Prototyping",
          "Sketch",
          "Adobe Creative Suite",
        ],
        details: {
          timeline: [
            {
              phase: "Research",
              description: "User interviews and market analysis",
            },
            {
              phase: "Wireframing",
              description: "Low-fidelity prototypes and user flows",
            },
            {
              phase: "Design",
              description: "High-fidelity mockups and design system",
            },
            {
              phase: "Testing",
              description: "Usability testing and refinement",
            },
          ],
          deliverables: [
            "Complete design system",
            "Interactive prototypes",
            "User research report",
            "Style guide and assets",
            "Implementation handoff",
          ],
        },
      },
      {
        id: "animation",
        title: "Web Animation",
        description:
          "Engaging animations that bring your digital products to life.",
        icon: Zap,
        features: [
          "Micro-interactions",
          "Scroll Animations",
          "3D WebGL Effects",
          "SVG Animations",
          "Performance-focused",
          "Lottie Animations",
          "Canvas Animations",
        ],
        tech: [
          "Framer Motion",
          "GSAP",
          "Three.js",
          "Lottie",
          "Canvas",
          "WebGL",
          "SVG",
        ],
        details: {
          timeline: [
            {
              phase: "Concept",
              description: "Animation storyboarding and planning",
            },
            {
              phase: "Prototyping",
              description: "Interactive animation prototypes",
            },
            {
              phase: "Implementation",
              description: "Code integration and optimization",
            },
            {
              phase: "Polishing",
              description: "Performance tuning and refinement",
            },
          ],
          deliverables: [
            "Animation library",
            "Performance report",
            "Reusable components",
            "Documentation",
            "Integration guide",
          ],
        },
      },
      {
        id: "fullstack",
        title: "Full-Stack Projects",
        description: "End-to-end solutions from database design to deployment.",
        icon: Layers,
        features: [
          "Full Architecture Design",
          "Database Optimization",
          "Cloud Deployment",
          "DevOps & CI/CD",
          "Scalable Solutions",
          "API Design",
          "Security Implementation",
        ],
        tech: [
          "MongoDB",
          "PostgreSQL",
          "AWS",
          "Docker",
          "Redis",
          "Express",
          "NestJS",
        ],
        details: {
          timeline: [
            {
              phase: "Discovery",
              description: "Project scoping and technology selection",
            },
            {
              phase: "Development",
              description: "Full-stack development sprints",
            },
            {
              phase: "Integration",
              description: "System integration and testing",
            },
            {
              phase: "Launch",
              description: "Production deployment and monitoring",
            },
          ],
          deliverables: [
            "Complete web application",
            "Database schema",
            "API documentation",
            "Deployment scripts",
            "Maintenance plan",
          ],
        },
      },
      {
        id: "responsive",
        title: "Responsive Redesign",
        description:
          "Modernizing existing websites for all devices and screen sizes.",
        icon: Smartphone,
        features: [
          "Mobile-First Approach",
          "Cross-browser Testing",
          "Performance Audits",
          "SEO Optimization",
          "Progressive Enhancement",
          "Accessibility Audit",
          "Content Strategy",
        ],
        tech: [
          "Tailwind CSS",
          "CSS Grid",
          "Flexbox",
          "PWA",
          "SEO",
          "Web Vitals",
          "Core Web Vitals",
        ],
        details: {
          timeline: [
            {
              phase: "Audit",
              description: "Current site analysis and pain points",
            },
            {
              phase: "Strategy",
              description: "Redesign approach and mobile-first plan",
            },
            {
              phase: "Implementation",
              description: "Responsive implementation",
            },
            {
              phase: "Optimization",
              description: "Performance and SEO optimization",
            },
          ],
          deliverables: [
            "Responsive website",
            "Performance audit report",
            "SEO improvement plan",
            "Mobile optimization",
            "Cross-browser compatibility",
          ],
        },
      },
      {
        id: "consulting",
        title: "Tech Consulting",
        description:
          "Strategic guidance for digital transformation and innovation.",
        icon: Rocket,
        features: [
          "Technology Strategy",
          "Architecture Review",
          "Team Mentoring",
          "Code Audits",
          "Best Practices",
          "Technical Roadmapping",
          "Team Training",
        ],
        tech: [
          "Strategy",
          "Architecture",
          "Mentoring",
          "Audits",
          "Planning",
          "Documentation",
          "Workshops",
        ],
        details: {
          timeline: [
            {
              phase: "Assessment",
              description: "Current state analysis and gap identification",
            },
            {
              phase: "Recommendation",
              description: "Strategic recommendations and roadmap",
            },
            {
              phase: "Implementation",
              description: "Guidance during implementation",
            },
            {
              phase: "Review",
              description: "Performance review and adjustments",
            },
          ],
          deliverables: [
            "Technical audit report",
            "Strategic roadmap",
            "Architecture diagrams",
            "Team training materials",
            "Implementation guide",
          ],
        },
      },
    ],
    []
  );

  // Optimized marquee services - only duplicate once for performance
  const marqueeServices = useMemo(() => [...services, ...services], [services]);

  // Modal handlers
  const openServiceModal = useCallback((service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedService) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedService, closeModal]);

  // Handle click outside modal
  const handleBackdropClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    },
    [closeModal]
  );

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Optimized HandDrawnBorder component
  const HandDrawnBorder = useMemo(
    () =>
      ({ isActive, className = "" }) =>
        (
          <div
            className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
          >
            <svg
              className="absolute top-0 left-0 w-full h-1"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0.5 Q10,0.2 20,0.5 T40,0.3 T60,0.6 T80,0.4 T100,0.5"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={isActive ? 0.8 : 0.3}
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute top-0 right-0 w-1 h-full"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5,0 Q0.8,10 0.5,20 T0.7,40 T0.4,60 T0.6,80 T0.5,100"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={isActive ? 0.8 : 0.3}
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full h-1"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0.5 Q15,0.7 30,0.4 T50,0.6 T70,0.3 T90,0.7 T100,0.5"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={isActive ? 0.8 : 0.3}
                strokeLinecap="round"
              />
            </svg>
            <svg
              className="absolute top-0 left-0 w-1 h-full"
              viewBox="0 0 1 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5,0 Q0.3,15 0.5,30 T0.3,50 T0.6,70 T0.4,90 T0.5,100"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity={isActive ? 0.8 : 0.3}
                strokeLinecap="round"
              />
            </svg>
          </div>
        ),
    []
  );

  // Optimized FloatingParticles component
  const FloatingParticles = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => {
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: "-20px",
                }}
                animate={{
                  y: ["-20px", "calc(100vh + 20px)"],
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>
      ),
    []
  );

  // Optimized SubtleGradient component
  const SubtleGradient = useMemo(
    () => () =>
      (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/3 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-white/3 to-transparent blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
        </div>
      ),
    []
  );

  // Optimized ServiceCard component for Marquee
  const ServiceCard = useMemo(
    () =>
      ({ service, index }) => {
        const Icon = service.icon;
        const cardId = `marquee-card-${service.id}-${index}`;

        return (
          <motion.div
            key={cardId}
            whileHover={{
              scale: 1.03,
              y: -3,
              transition: { duration: 0.2 },
            }}
            onClick={() => openServiceModal(service)}
            className="relative flex-shrink-0 w-64 mx-4 cursor-pointer group"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, [cardId]: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, [cardId]: false }))
            }
          >
            <div className="relative h-48 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col transition-all duration-300 group-hover:border-white/30 group-hover:bg-black/60">
              <HandDrawnBorder isActive={isHovered[cardId]} />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-white/20 transition-all duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm line-clamp-3 flex-grow">
                {service.description}
              </p>

              {/* View Details Button */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">View Details</span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      },
    [openServiceModal, setIsHovered]
  );

  // Optimized Marquee Section Component
  const MarqueeSection = useMemo(
    () =>
      ({ direction = "right", services }) => {
        const animationDuration = 60; // Slower duration for smoother animation

        return (
          <div className="relative overflow-hidden py-4">
            <motion.div
              className="flex"
              animate={{
                x: direction === "right" ? [0, -1280] : [-1280, 0],
              }}
              transition={{
                x: {
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {services.map((service, index) => (
                <ServiceCard
                  key={`${direction}-${index}`}
                  service={service}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
          </div>
        );
      },
    [ServiceCard]
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <SubtleGradient />
      <FloatingParticles />

      {/* Main Container with Optimized Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 container mx-auto px-4 py-10"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/60 transition-all duration-500"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, header: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, header: false }))
            }
          >
            <HandDrawnBorder isActive={isHovered.header} />

            {/* Terminal Dots */}
            <div className="flex gap-1.5 mb-6 justify-center">
              {[0, 0.2, 0.4].map((delay, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/40"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay,
                  }}
                />
              ))}
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              MY SERVICES
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Terminal className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ services --marquee --minimalist
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Marquee Section */}
        <div className="relative mb-8">
          {/* Top Marquee (Right to Left) */}
          <MarqueeSection direction="right" services={marqueeServices} />

          {/* Bottom Marquee (Left to Right) */}
          <MarqueeSection direction="left" services={marqueeServices} />
        </div>
      </motion.div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            selectedService={selectedService}
            closeModal={closeModal}
            modalRef={modalRef}
            handleBackdropClick={handleBackdropClick}
            HandDrawnBorder={HandDrawnBorder}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted ServiceModal component for better performance
const ServiceModal = memo(
  ({
    selectedService,
    closeModal,
    modalRef,
    handleBackdropClick,
    HandDrawnBorder,
  }) => {
    const modalVariants = {
      hidden: { opacity: 0, scale: 0.95, y: 10 },
      visible: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
    };

    return (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          onClick={handleBackdropClick}
        />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            ref={modalRef}
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-black/95 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <HandDrawnBorder isActive={true} />

            {/* Modal Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1 pr-8">
                  <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center">
                    {selectedService.icon && (
                      <selectedService.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {selectedService.title}
                    </h2>
                    <p className="text-white/60 text-sm">
                      Complete service details and process
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-300 flex-shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Details */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    SERVICE OVERVIEW
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Description
                      </h4>
                      <p className="text-white/70 leading-relaxed">
                        {selectedService.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {selectedService.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                            <span className="text-white/60">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Timeline & Deliverables */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      PROJECT TIMELINE
                    </h3>

                    <div className="space-y-4">
                      {selectedService.details.timeline.map((phase, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-white/40">
                              Phase {index + 1}
                            </span>
                            <span className="text-white/40">•</span>
                            <span className="text-lg font-semibold text-white">
                              {phase.phase}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm">
                            {phase.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6">
                      DELIVERABLES
                    </h3>

                    <div className="space-y-2">
                      {selectedService.details.deliverables.map(
                        (item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                            <span className="text-white/70">{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative p-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/40" />
                  <span className="text-white/60 text-sm">
                    Average project duration: 4-8 weeks
                  </span>
                </div>
                <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2">
                  <span>Start This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
);

export default ServicesSection;
