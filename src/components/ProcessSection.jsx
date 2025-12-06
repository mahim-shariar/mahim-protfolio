import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Search,
  Palette,
  Code2,
  TestTube,
  Rocket,
  Settings,
  Target,
  Clock,
  Users,
  Shield,
  ArrowRight,
  Terminal,
  ChevronRight,
  Zap,
  Cpu,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";

const ProcessSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for section entrance
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

  const steps = [
    {
      number: "01",
      title: "Discovery & Analysis",
      description:
        "Deep dive into your business needs, goals, and target audience.",
      icon: Search,
      highlights: ["Research", "Strategy", "Planning"],
      tech: ["User Research", "Market Analysis", "Requirement Gathering"],
    },
    {
      number: "02",
      title: "UI/UX Design",
      description:
        "Crafting intuitive interfaces and seamless user experiences.",
      icon: Palette,
      highlights: ["Wireframes", "Prototypes", "User Testing"],
      tech: ["Figma", "Adobe XD", "User Flows"],
    },
    {
      number: "03",
      title: "Development",
      description:
        "Building robust, scalable solutions with modern technologies.",
      icon: Code2,
      highlights: ["Frontend", "Backend", "DevOps"],
      tech: ["React", "Node.js", "AWS"],
    },
    {
      number: "04",
      title: "Quality Assurance",
      description:
        "Rigorous testing to ensure flawless performance and security.",
      icon: TestTube,
      highlights: ["Testing", "Security", "Performance"],
      tech: ["Jest", "Cypress", "Security Audits"],
    },
    {
      number: "05",
      title: "Deployment",
      description: "Seamless launch and optimization for maximum impact.",
      icon: Rocket,
      highlights: ["CI/CD", "Monitoring", "Analytics"],
      tech: ["Docker", "Kubernetes", "Google Analytics"],
    },
    {
      number: "06",
      title: "Support & Evolution",
      description: "Continuous improvement, updates, and scaling solutions.",
      icon: Settings,
      highlights: ["Maintenance", "Updates", "Scaling"],
      tech: ["Monitoring", "Updates", "Performance Tuning"],
    },
  ];

  const principles = [
    {
      icon: Zap,
      title: "Fast",
      description: "Rapid development without sacrificing quality",
    },
    {
      icon: Cpu,
      title: "Scalable",
      description: "Built to grow with your business needs",
    },
    {
      icon: Database,
      title: "Reliable",
      description: "99.9% uptime and robust architecture",
    },
    {
      icon: Cloud,
      title: "Modern",
      description: "Latest technologies and best practices",
    },
  ];

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stepProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, steps.length - 1]
  );

  // Scroll-based opacity for sections
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const principlesOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  useEffect(() => {
    const unsubscribe = stepProgress.on("change", (latest) => {
      setActiveStep(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [stepProgress]);

  // Hand-drawn border component for individual cards
  const HandDrawnBorder = ({ isActive }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <svg
        className="absolute top-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0.5 Q10,0.2 20,0.5 T40,0.3 T60,0.6 T80,0.4 T100,0.5"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.6 : 0.1}
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
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.6 : 0.1}
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
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.6 : 0.1}
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
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.6 : 0.1}
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
    </div>
  );

  // Hand-drawn corner accents
  const HandDrawnCornerAccents = () => (
    <>
      {/* Top-left corner */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M20,10 Q10,10 10,20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Top-right corner */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M80,10 Q90,10 90,20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom-left corner */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M20,90 Q10,90 10,80"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom-right corner */}
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M80,90 Q90,90 90,80"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );

  // Floating hand-drawn lines
  const FloatingHandDrawnLines = () => {
    const lines = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      length: Math.random() * 60 + 40,
      duration: Math.random() * 20 + 30,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.04 + 0.02,
    }));

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute"
            style={{
              left: `${line.x}%`,
              top: "-100px",
              width: line.length,
              height: 1,
            }}
            animate={{
              y: ["-100px", "120vh"],
              x: [
                `${line.x}%`,
                `${line.x + (Math.random() - 0.5) * 15}%`,
                `${line.x}%`,
              ],
              opacity: [line.opacity, line.opacity * 2, line.opacity],
            }}
            transition={{
              y: {
                duration: line.duration,
                repeat: Infinity,
                ease: "linear",
                delay: line.delay,
              },
              x: {
                duration: line.duration / 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <svg
              width="100%"
              height="1"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0.5 Q20,0.2 40,0.5 T60,0.3 T80,0.7 T100,0.5"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    );
  };

  // Hand-drawn dot particles
  const HandDrawnDots = () => {
    const dots = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.03 + 0.01,
    }));

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, (Math.random() - 0.5) * 10, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          >
            <div className="w-full h-full rounded-full bg-white" />
          </motion.div>
        ))}
      </div>
    );
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Animation for principles cards
  const principleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Background Effects */}
      <HandDrawnCornerAccents />
      <FloatingHandDrawnLines />
      <HandDrawnDots />

      {/* Scroll-based Container */}
      <div ref={containerRef} className="relative z-10">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="container mx-auto px-4 py-20"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            {/* Badge with hand-drawn border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative inline-block mb-8"
            >
              <div
                className="relative bg-black border border-white/10 rounded-2xl px-8 py-4 group hover:border-white/20 transition-all duration-700"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, header: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, header: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.header} />

                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-500" />
                  <span className="text-white/80 font-medium group-hover:text-white transition-colors duration-500">
                    Development Process
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Build. Test. Deploy.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-white/60 max-w-3xl mx-auto"
            >
              A comprehensive 6-step methodology to transform your ideas into
              production-ready digital solutions
            </motion.p>

            {/* Terminal-style progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <Terminal className="w-5 h-5 text-white/40" />
              <div className="h-1 w-48 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
                  className="h-full bg-white"
                />
              </div>
              <span className="text-white/40 font-mono text-sm">
                Loading Process...
              </span>
            </motion.div>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line with scroll animation */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full hidden md:block">
              <motion.div
                className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Steps with scroll animations */}
            <div className="space-y-24">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={step.number}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={cardVariants}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Step Content */}
                    <div
                      className={`md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}
                    >
                      <div
                        className="relative bg-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-700 group"
                        onMouseEnter={() =>
                          setIsHovered((prev) => ({
                            ...prev,
                            [`step-${index}`]: true,
                          }))
                        }
                        onMouseLeave={() =>
                          setIsHovered((prev) => ({
                            ...prev,
                            [`step-${index}`]: false,
                          }))
                        }
                      >
                        <HandDrawnBorder
                          isActive={isHovered[`step-${index}`]}
                        />

                        {/* Step header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/5 rounded-xl blur-sm" />
                            <motion.div
                              className="relative w-14 h-14 bg-black border border-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                              whileHover={{ rotate: 5 }}
                            >
                              <span className="text-xl font-bold text-white">
                                {step.number}
                              </span>
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {step.title}
                            </h3>
                            <p className="text-white/60">{step.description}</p>
                          </div>
                        </div>

                        {/* Tech stack */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-white/40 mb-3">
                            TECH STACK
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {step.tech.map((tech, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-3 py-1.5 bg-black border border-white/10 rounded-lg text-sm text-white/70 hover:bg-white/5 transition-all duration-300"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {step.highlights.map((highlight, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-4 py-2 bg-black border border-white/10 rounded-full text-sm text-white/80 hover:bg-white/5 transition-all duration-300"
                            >
                              {highlight}
                            </motion.span>
                          ))}
                        </div>

                        {/* Hover indicator */}
                        <motion.div
                          className="absolute -right-3 top-1/2 transform -translate-y-1/2"
                          animate={{
                            x: isHovered[`step-${index}`]
                              ? isEven
                                ? -5
                                : 5
                              : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight
                            className={`w-6 h-6 text-white/60 ${
                              isEven ? "rotate-180" : ""
                            }`}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Timeline Node with scroll animation */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.2 }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          activeStep >= index
                            ? "border-white bg-white"
                            : "border-white/20 bg-black"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeStep >= index ? "bg-black" : "bg-white/20"
                          }`}
                        />
                      </motion.div>
                    </div>

                    {/* Step Icon with scroll animation */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                      <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        whileInView={{ rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`p-3 rounded-xl border transition-all duration-500 ${
                          activeStep >= index
                            ? "border-white bg-white/10"
                            : "border-white/10 bg-black"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-all duration-500 ${
                            activeStep >= index ? "text-white" : "text-white/40"
                          }`}
                        />
                      </motion.div>
                    </div>

                    {/* Empty spacer */}
                    <div className="md:w-1/2 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="relative inline-block">
                <div
                  className="inline-flex items-center gap-4 px-6 py-3 bg-black border border-white/10 rounded-full group hover:border-white/20 transition-all duration-700"
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({ ...prev, progress: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({ ...prev, progress: false }))
                  }
                >
                  <HandDrawnBorder isActive={isHovered.progress} />

                  <span className="text-white/60 text-sm">Progress</span>
                  <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        width: `${((activeStep + 1) / steps.length) * 100}%`,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="h-full bg-white"
                    />
                  </div>
                  <span className="text-white/80 font-mono text-sm">
                    {activeStep + 1}/{steps.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Principles Section with scroll opacity */}
        <motion.div
          style={{ opacity: principlesOpacity }}
          className="container mx-auto px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Development Principles
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                The core values that guide every project from concept to
                completion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={principleVariants}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className="relative bg-black border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-700"
                      onMouseEnter={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`principle-${index}`]: true,
                        }))
                      }
                      onMouseLeave={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`principle-${index}`]: false,
                        }))
                      }
                    >
                      <HandDrawnBorder
                        isActive={isHovered[`principle-${index}`]}
                      />

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 ">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-15 text-center"
          >
            <div className="relative max-w-3xl mx-auto">
              <div
                className="bg-black border border-white/10 rounded-2xl p-8 group hover:border-white/20 transition-all duration-700"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, cta: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, cta: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.cta} />

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left">
                    <h3 className="text-2xl font-bold mb-3">
                      Ready to Build Together?
                    </h3>
                    <p className="text-white/60">
                      Let's discuss your project and create something
                      extraordinary
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-2 group border border-white"
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({ ...prev, button: true }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({ ...prev, button: false }))
                    }
                  >
                    <HandDrawnBorder
                      isActive={isHovered.button}
                      color="#000000"
                    />
                    <span className="relative">Start Your Project</span>
                    <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/10"
                >
                  {[
                    { label: "Projects", value: "50+" },
                    { label: "Clients", value: "30+" },
                    { label: "Years", value: "5+" },
                    { label: "Success Rate", value: "100%" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 bg-black border border-white/10 rounded-full group hover:border-white/20 transition-all duration-700"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, footer: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, footer: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered.footer} />

              <Terminal className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              <span className="text-white/40 font-mono text-sm group-hover:text-white/60 transition-colors duration-500">
                $ echo "Process loaded successfully" && echo "Awaiting next
                command..."
              </span>
              <motion.div
                className="w-2 h-4 bg-white/60 ml-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
