import { useState, useRef, useEffect } from "react";
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
  Cpu,
  Shield,
  Globe,
  Clock,
  Users,
  ChevronRight,
  CheckCircle,
  X,
  ExternalLink,
  Heart,
  Target,
  BookOpen,
  Trophy,
  Award,
  Calendar,
} from "lucide-react";

const ServicesSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [activeService, setActiveService] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Modal handlers
  const openServiceModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedService) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedService]);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const services = [
    {
      id: "web-dev",
      title: "Web Development",
      description:
        "Modern, performant websites built with cutting-edge technologies. I create fast, scalable, and maintainable web applications that deliver exceptional user experiences.",
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
      color: "from-blue-500/20 to-cyan-500/20",
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
        "Intuitive interfaces that enhance user experience and engagement. I combine aesthetics with functionality to create designs that users love.",
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
      color: "from-purple-500/20 to-pink-500/20",
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
        "Engaging animations that bring your digital products to life. From subtle micro-interactions to complex 3D experiences.",
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
      color: "from-yellow-500/20 to-orange-500/20",
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
      description:
        "End-to-end solutions from database design to deployment. Complete digital products built from scratch.",
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
      color: "from-green-500/20 to-emerald-500/20",
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
        "Modernizing existing websites for all devices and screen sizes. Breathing new life into outdated interfaces.",
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
      color: "from-indigo-500/20 to-blue-500/20",
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
        "Strategic guidance for digital transformation and innovation. Expert advice to optimize your technology stack.",
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
      color: "from-red-500/20 to-pink-500/20",
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
  ];

  const stats = [
    {
      value: "100+",
      label: "Projects Delivered",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      icon: Shield,
      color: "text-blue-400",
    },
    {
      value: "< 2s",
      label: "Load Time",
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      value: "50+",
      label: "Happy Clients",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  // Hand-drawn border component (from About Me)
  const HandDrawnBorder = ({ isActive, color = "white", className = "" }) => (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <svg
        className="absolute top-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0.5 Q10,0.2 20,0.5 T40,0.3 T60,0.6 T80,0.4 T100,0.5"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute top-0 right-0 w-1 h-full transition-all duration-700 ease-in-out"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5,0 Q0.8,10 0.5,20 T0.7,40 T0.4,60 T0.6,80 T0.5,100"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0.5 Q15,0.7 30,0.4 T50,0.6 T70,0.3 T90,0.7 T100,0.5"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-1 h-full transition-all duration-700 ease-in-out"
        viewBox="0 0 1 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0.5,0 Q0.3,15 0.5,30 T0.3,50 T0.6,70 T0.4,90 T0.5,100"
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
    </div>
  );

  // Floating particles (from About Me)
  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["-100px", "100vh"],
              opacity: [0, 0.3, 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
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
  );

  // Subtle gradient background (from About Me)
  const SubtleGradient = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <SubtleGradient />
      <FloatingParticles />

      {/* Main Container with Smooth Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 container mx-auto px-4 py-20"
      >
        {/* Section Header with About Me styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/60 transition-all duration-700"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, header: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, header: false }))
            }
          >
            <HandDrawnBorder isActive={isHovered.header} />

            {/* Terminal Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex gap-1.5 mb-6 justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-white/40"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-white/60"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-white/80"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              MY SERVICES
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <Terminal className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ services --list --detailed
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Services Grid with About Me card styling - FIXED BUTTON ALIGNMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="relative flex flex-col"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div
                  className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col group hover:bg-black/60 hover:border-white/30 transition-all duration-700"
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({
                      ...prev,
                      [`service-${service.id}`]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({
                      ...prev,
                      [`service-${service.id}`]: false,
                    }))
                  }
                >
                  <HandDrawnBorder
                    isActive={isHovered[`service-${service.id}`]}
                  />

                  {/* Service Icon */}
                  <motion.div
                    animate={
                      activeService === service.id
                        ? { rotate: 5, scale: 1.1 }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-all duration-500"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Service Title & Description - Fixed height */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/60 line-clamp-3 min-h-[72px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Features List - Fixed height */}
                  <div className="space-y-3 mb-6 min-h-[180px]">
                    {service.features.slice(0, 4).map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span className="text-white/60 text-sm line-clamp-2">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack - Fixed height */}
                  <div className="mb-8 min-h-[100px]">
                    <h4 className="text-sm font-semibold text-white/40 mb-3">
                      TECHNOLOGIES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.tech.slice(0, 5).map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white/70 hover:bg-white/5 transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button - Pushed to bottom with consistent spacing */}
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <motion.button
                      onClick={() => openServiceModal(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative group"
                    >
                      <div className="relative p-4 border border-white/30 rounded-xl bg-white backdrop-blur-sm group-hover:bg-white/95 transition-all duration-500">
                        <HandDrawnBorder
                          isActive={isHovered[`service-btn-${service.id}`]}
                          color="#000000"
                        />

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-black" />
                            <div className="text-left">
                              <h3 className="font-bold text-black text-sm">
                                View Details
                              </h3>
                              <p className="text-gray-600 text-xs">
                                See full service breakdown
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </motion.button>
                  </div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ rotate: activeService === service.id ? 360 : 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-white/40" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section with About Me styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="inline-block mb-6"
            >
              <div
                className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3 group hover:bg-black/60 transition-all duration-700"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, statsHeader: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, statsHeader: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.statsHeader} />
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/80 font-medium">
                    Performance Metrics
                  </span>
                </div>
              </div>
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Consistent Excellence
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Proven results across hundreds of successful projects
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative"
                >
                  <div
                    className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-black/60 hover:border-white/30 transition-all duration-700"
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`stat-${index}`]: true,
                      }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`stat-${index}`]: false,
                      }))
                    }
                  >
                    <HandDrawnBorder isActive={isHovered[`stat-${index}`]} />

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={handleBackdropClick}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                key="modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl bg-black/95 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <HandDrawnBorder isActive={true} />

                {/* Modal Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4 flex-1 pr-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
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
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-500 flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Details */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <span>SERVICE OVERVIEW</span>
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
                          <div className="space-y-3">
                            {selectedService.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-white/60">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">
                            Technology Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedService.tech.map((tech, index) => (
                              <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Timeline & Deliverables */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-400" />
                          <span>PROJECT TIMELINE</span>
                        </h3>

                        <div className="space-y-6">
                          {selectedService.details.timeline.map(
                            (phase, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 rounded-xl bg-gradient-to-br ${selectedService.color} backdrop-blur-sm border border-white/10`}
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-sm font-semibold text-blue-300">
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
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <span>DELIVERABLES</span>
                        </h3>

                        <div className="space-y-3">
                          {selectedService.details.deliverables.map(
                            (item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                                <span className="text-white/70">{item}</span>
                              </motion.div>
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
                    >
                      <span>Start This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesSection;
