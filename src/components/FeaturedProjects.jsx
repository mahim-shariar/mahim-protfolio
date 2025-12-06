import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
  Code2,
  Globe,
  ShoppingBag,
  Server,
  Palette,
  Database,
  Cpu,
  FolderOpen,
  LayoutDashboard,
  Building,
  Eye,
  Code,
  ChevronRight,
  X,
  Users,
  Clock,
  Calendar,
  GitBranch,
  Layers,
  Cloud,
  Shield,
  PenTool,
} from "lucide-react";

const FeaturedProjects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for smooth scroll animation
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

  const tabs = [
    { id: "all", label: "ALL", icon: Terminal, count: 8 },
    { id: "portfolio", label: "PORTFOLIO", icon: Globe, count: 3 },
    { id: "ecommerce", label: "ECOMMERCE", icon: ShoppingBag, count: 2 },
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard, count: 2 },
    { id: "management", label: "MANAGEMENT", icon: Building, count: 1 },
  ];

  const projects = [
    // ... (same projects array as before)
    {
      id: 1,
      title: "NEXUS PORTFOLIO",
      category: "portfolio",
      description:
        "Modern portfolio with interactive 3D elements and smooth animations. Built with React and Three.js for an immersive experience.",
      fullDescription:
        "A cutting-edge portfolio website featuring real-time 3D visualizations, interactive animations, and a fully responsive design. This project showcases advanced WebGL techniques combined with modern React patterns for optimal performance and user engagement.",
      tech: [
        "React",
        "Three.js",
        "Framer Motion",
        "GSAP",
        "Tailwind CSS",
        "WebGL",
      ],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "portfolio",
      color: "from-blue-400/10 to-cyan-400/10",
      complexity: "Advanced",
      security: "High",
      performance: "95%",
      timeline: "3 months",
      teamSize: "2 developers",
      features: [
        "Interactive 3D scene rendering",
        "Real-time animations",
        "Responsive design",
        "Performance optimization",
        "Cross-browser compatibility",
      ],
      challenges: [
        "Optimizing 3D rendering for mobile devices",
        "Synchronizing animations across components",
        "Implementing smooth transitions",
      ],
    },
    {
      id: 2,
      title: "URBAN COMMERCE",
      category: "ecommerce",
      description:
        "Premium e-commerce platform with AR product visualization and real-time inventory management.",
      fullDescription:
        "Enterprise-grade e-commerce solution featuring augmented reality product previews, real-time inventory tracking, and advanced analytics. Built with microservices architecture for scalability and reliability.",
      tech: ["Next.js", "Stripe", "AR.js", "Redis", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "ecommerce",
      color: "from-purple-400/10 to-pink-400/10",
      complexity: "Enterprise",
      security: "Maximum",
      performance: "98%",
      timeline: "6 months",
      teamSize: "5 developers",
      features: [
        "AR product visualization",
        "Real-time inventory management",
        "Secure payment processing",
        "Advanced analytics dashboard",
        "Mobile-first design",
      ],
      challenges: [
        "Implementing AR compatibility across devices",
        "Real-time inventory synchronization",
        "Payment gateway integration",
      ],
    },
    {
      id: 3,
      title: "ANALYTICS HUB",
      category: "dashboard",
      description:
        "Real-time data visualization dashboard with interactive charts and team collaboration features.",
      fullDescription:
        "Comprehensive analytics platform for visualizing complex datasets in real-time. Features include interactive charts, team collaboration tools, and automated report generation with customizable dashboards.",
      tech: [
        "Vue.js",
        "D3.js",
        "WebSocket",
        "PostgreSQL",
        "Express",
        "Socket.io",
      ],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "dashboard",
      color: "from-green-400/10 to-emerald-400/10",
      complexity: "Intermediate",
      security: "Medium",
      performance: "92%",
      timeline: "4 months",
      teamSize: "3 developers",
      features: [
        "Real-time data visualization",
        "Interactive charts & graphs",
        "Team collaboration tools",
        "Automated reporting",
        "Customizable dashboards",
      ],
      challenges: [
        "Handling large datasets in real-time",
        "Optimizing WebSocket connections",
        "Creating responsive data visualizations",
      ],
    },
    {
      id: 4,
      title: "TEAM FLOW",
      category: "management",
      description:
        "Project management platform with real-time collaboration, task tracking, and reporting.",
      fullDescription:
        "Collaborative project management tool designed for modern teams. Features real-time task updates, document sharing, time tracking, and comprehensive reporting to streamline workflow and boost productivity.",
      tech: ["React", "Socket.io", "MongoDB", "Docker", "Express", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "management",
      color: "from-orange-400/10 to-red-400/10",
      complexity: "Advanced",
      security: "High",
      performance: "90%",
      timeline: "5 months",
      teamSize: "4 developers",
      features: [
        "Real-time task management",
        "Document sharing & collaboration",
        "Time tracking & reporting",
        "Team communication tools",
        "Integration with popular tools",
      ],
      challenges: [
        "Real-time synchronization across users",
        "Scalable WebSocket architecture",
        "Secure document handling",
      ],
    },
    {
      id: 5,
      title: "DESIGN STUDIO",
      category: "portfolio",
      description:
        "Creative agency portfolio with interactive design showcase and client portal.",
      fullDescription:
        "Dynamic portfolio platform for creative agencies featuring interactive design galleries, client portals, and project management tools. Built with performance and aesthetics in mind.",
      tech: [
        "Next.js",
        "Three.js",
        "Tailwind",
        "Framer Motion",
        "Node.js",
        "PostgreSQL",
      ],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "design",
      color: "from-pink-400/10 to-rose-400/10",
      complexity: "Intermediate",
      security: "Medium",
      performance: "94%",
      timeline: "3 months",
      teamSize: "2 developers",
      features: [
        "Interactive design galleries",
        "Client portal & dashboard",
        "Project showcase system",
        "Contact & inquiry forms",
        "SEO optimized pages",
      ],
      challenges: [
        "Creating engaging animations without performance issues",
        "Building intuitive client portal",
        "Optimizing for various screen sizes",
      ],
    },
    {
      id: 6,
      title: "MARKET PRO",
      category: "ecommerce",
      description:
        "Enterprise e-commerce solution with inventory management and AI-powered recommendations.",
      fullDescription:
        "Full-featured e-commerce platform with AI-driven product recommendations, advanced inventory management, and comprehensive analytics. Designed for scalability and enterprise-level performance.",
      tech: ["React", "Node.js", "PostgreSQL", "AWS", "TensorFlow.js", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      thumbnail: "market",
      color: "from-indigo-400/10 to-blue-400/10",
      complexity: "Enterprise",
      security: "Maximum",
      performance: "97%",
      timeline: "8 months",
      teamSize: "6 developers",
      features: [
        "AI-powered recommendations",
        "Advanced inventory management",
        "Multi-vendor support",
        "Real-time analytics",
        "Scalable architecture",
      ],
      challenges: [
        "Implementing AI recommendations",
        "Scalable inventory management",
        "Multi-vendor architecture",
      ],
    },
  ];

  const filteredProjects =
    tabs[activeTab].id === "all"
      ? projects
      : projects.filter((project) => project.category === tabs[activeTab].id);

  // Clean modal open handler
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Clean modal close handler
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      document.body.style.overflow = "auto";
    }, 300);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  // Handle click outside
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  // Smooth hand-drawn border component
  const HandDrawnBorder = ({ isActive, color = "white" }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top border */}
      <svg
        className="absolute top-0 left-0 w-full h-1 transition-all duration-500 ease-in-out"
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Right border */}
      <svg
        className="absolute top-0 right-0 w-1 h-full transition-all duration-500 ease-in-out"
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Bottom border */}
      <svg
        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 ease-in-out"
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Left border */}
      <svg
        className="absolute top-0 left-0 w-1 h-full transition-all duration-500 ease-in-out"
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );

  // Animated Matrix Digital Rain Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = Math.floor(canvas.clientWidth / fontSize);
    const drops = Array(columns).fill(1);

    const colors = {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      tertiary: "#A0A0A0",
      dark: "#202020",
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      ctx.font = `500 ${fontSize}px 'Courier New', 'Monaco', monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const position = drops[i] * fontSize;
        const maxHeight = canvas.clientHeight;

        let color;
        if (position < maxHeight * 0.2) {
          color = colors.primary;
          ctx.globalAlpha = 1.0;
        } else if (position < maxHeight * 0.5) {
          color = colors.secondary;
          ctx.globalAlpha = 0.8;
        } else if (position < maxHeight * 0.8) {
          color = colors.tertiary;
          ctx.globalAlpha = 0.6;
        } else {
          color = colors.dark;
          ctx.globalAlpha = 0.4;
        }

        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        ctx.shadowBlur = 0;

        drops[i] += 0.8 + Math.random() * 0.4;

        if (drops[i] * fontSize > canvas.clientHeight && Math.random() > 0.97) {
          drops[i] = 0;
        }
      }

      ctx.globalAlpha = 1.0;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // Floating Binary Particles
  const FloatingBinaryParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute text-white/30 font-mono"
            style={{
              fontSize: `${size}px`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["-100px", "100vh"],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 100, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        );
      })}
    </div>
  );

  // Animated Circuit Lines
  const CircuitLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
      {[...Array(8)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        const duration = Math.random() * 10 + 5;

        return (
          <svg key={i} className="absolute w-full h-full">
            <motion.path
              d={`M${startX}% ${startY}% Q${(startX + endX) / 2}% ${
                (startY + endY) / 2
              }% ${endX}% ${endY}%`}
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              strokeDasharray="4,4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          </svg>
        );
      })}
    </div>
  );

  // Pulsating Orbs
  const PulsatingOrbs = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => {
        const size = Math.random() * 300 + 200;
        const duration = Math.random() * 8 + 4;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.08, 0.02],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );

  // Animated Scan Lines
  const AnimatedScanLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.05) 2px,
            rgba(255,255,255,0.05) 4px
          )`,
        }}
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Main container with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1], // Smooth ease out
          staggerChildren: 0.2,
        }}
        className="py-20"
      >
        {/* Background Animations */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-15"
        />

        <FloatingBinaryParticles />
        <CircuitLines />
        <PulsatingOrbs />
        <AnimatedScanLines />

        {/* Subtle gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"
        />

        {/* Pen Tool Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className="absolute top-8 right-8 z-30 hidden lg:block"
        >
          <PenTool className="w-6 h-6 text-white/30 animate-pulse transition-all duration-500 ease-in-out" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header with clean design - staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/80 transition-all duration-500"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, header: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, header: false }))
                }
              >
                <HandDrawnBorder isActive={isHovered.header} />

                {/* Clean terminal dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="flex gap-1.5 mb-6 justify-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 rounded-full bg-white/40"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-white/60"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-white/80"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                >
                  PROJECTS
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-3 mt-6"
                >
                  <Terminal className="w-5 h-5 text-white/60" />
                  <span className="text-white/40 font-mono text-sm">
                    $ cat featured_work.md
                  </span>
                </motion.div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-white/60 text-lg max-w-2xl mx-auto font-light"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Showcasing modern web applications across different domains
            </motion.p>
          </motion.div>

          {/* Tabs with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === index;
              const tabKey = `tab-${tab.id}`;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-6 py-3 rounded-xl backdrop-blur-sm border flex items-center gap-3 transition-all duration-300 group ${
                    isActive
                      ? "bg-white/20 border-white/30 text-white"
                      : "bg-black/60 border-white/10 text-white/60 hover:bg-black/80 hover:border-white/30 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({ ...prev, [tabKey]: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({ ...prev, [tabKey]: false }))
                  }
                >
                  <HandDrawnBorder isActive={isHovered[tabKey] || isActive} />

                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  />
                  <span className="font-medium text-sm tracking-wider">
                    {tab.label}
                  </span>
                  <motion.span
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      isActive ? "bg-white/30" : "bg-white/10"
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {tab.count}
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid with staggered animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative group"
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({
                      ...prev,
                      [`project-${project.id}`]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({
                      ...prev,
                      [`project-${project.id}`]: false,
                    }))
                  }
                >
                  {/* Project Card with normal background */}
                  <div className="relative h-full overflow-hidden rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 group-hover:border-white/30 group-hover:bg-black/80 transition-all duration-500">
                    {/* Hand-drawn border */}
                    <HandDrawnBorder
                      isActive={isHovered[`project-${project.id}`]}
                    />

                    {/* Thumbnail */}
                    <div className="relative h-40 overflow-hidden">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="relative px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 group-hover:bg-black/90 group-hover:border-white/30 transition-all duration-300"
                        >
                          <span className="text-xs text-white/80 font-medium tracking-wider group-hover:text-white">
                            {project.category}
                          </span>
                        </motion.div>
                      </div>

                      {/* Project stats overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg group-hover:bg-black/80"
                        >
                          <Cpu className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-white/70 group-hover:text-white">
                            {project.complexity}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg group-hover:bg-black/80"
                        >
                          <Shield className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-white/70 group-hover:text-white">
                            {project.security}
                          </span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg group-hover:bg-black/80"
                        >
                          <Zap className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-white/70 group-hover:text-white">
                            {project.performance}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 relative">
                      {/* Title */}
                      <div className="relative mb-3 overflow-hidden">
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                          className="text-lg font-bold text-white group-hover:text-white/90 transition-colors duration-300"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="text-white/50 text-sm mb-4 leading-relaxed group-hover:text-white/70 transition-colors duration-300"
                      >
                        {project.description}
                      </motion.p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + 0.6 + techIndex * 0.05,
                            }}
                            className="relative px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 group-hover:text-white/80 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden"
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                          >
                            <span className="relative z-10">{tech}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          </motion.span>
                        ))}
                        {project.tech.length > 4 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.9 }}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40"
                          >
                            +{project.tech.length - 4} more
                          </motion.span>
                        )}
                      </div>

                      {/* Bottom Button Section */}
                      <div className="pt-4 border-t border-white/10 group-hover:border-white/20 transition-all duration-300">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                          className="flex items-center justify-between"
                        >
                          {/* View Details Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openModal(project)}
                            className="relative px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2 overflow-hidden"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="text-sm font-medium">Details</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                          </motion.button>

                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            {/* Preview Button */}
                            <motion.a
                              href={project.liveUrl}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                              title="Live Preview"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                            </motion.a>

                            {/* Code Button */}
                            <motion.a
                              href={project.githubUrl}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                              title="View Code"
                            >
                              <Code className="w-4 h-4" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                            </motion.a>

                            {/* More Options */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                              title="More Options"
                            >
                              <ChevronRight className="w-4 h-4" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:via-white/5 group-hover:to-white/10 blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 pointer-events-none -z-10" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Stats Section with smooth reveal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 pt-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "8+", label: "PROJECTS", icon: FolderOpen, delay: 0 },
                { value: "15+", label: "TECHNOLOGIES", icon: Cpu, delay: 0.1 },
                {
                  value: "5",
                  label: "CATEGORIES",
                  icon: LayoutDashboard,
                  delay: 0.2,
                },
                {
                  value: "100%",
                  label: "DEDICATION",
                  icon: Sparkles,
                  delay: 0.3,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 + stat.delay }}
                  viewport={{ once: true }}
                  className="relative text-center p-6 bg-black/60 border border-white/10 rounded-xl group hover:bg-black/80 hover:border-white/20 transition-all duration-300"
                  whileHover={{ y: -5 }}
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

                  <motion.div
                    initial={{ rotate: -90 }}
                    animate={isInView ? { rotate: 0 } : {}}
                    transition={{ delay: 1 + stat.delay, type: "spring" }}
                    className="relative flex justify-center mb-3"
                  >
                    <stat.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 group-hover:scale-110" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 1.1 + stat.delay, type: "spring" }}
                    className="relative text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors duration-300"
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 + stat.delay }}
                    className="relative text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terminal Footer with fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 bg-black/60 border border-white/10 rounded-xl relative group hover:bg-black/80 hover:border-white/20 transition-all duration-300"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, footer: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, footer: false }))
              }
            >
              <HandDrawnBorder isActive={isHovered["footer"]} />

              <Terminal className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300" />
              <span className="text-white/40 font-mono text-sm group-hover:text-white/60 transition-colors duration-300">
                $ ls projects/ | wc -l
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.7 }}
                className="w-2 h-4 bg-white/60"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal Component - Completely reworked */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="relative w-full max-w-4xl rounded-2xl bg-black/95 backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <HandDrawnBorder isActive={true} />

                {/* Modal Header */}
                <div className="relative p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
                          <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                            {selectedProject.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              selectedProject.complexity === "Enterprise"
                                ? "bg-red-500"
                                : selectedProject.complexity === "Advanced"
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                          />
                          <span className="text-xs text-white/60">
                            {selectedProject.complexity}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedProject.title}
                      </h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-all duration-300 flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  {/* Project Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-white/60">Timeline</span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {selectedProject.timeline}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white/60">Team Size</span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {selectedProject.teamSize}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white/60">
                          Performance
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {selectedProject.performance}
                      </p>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-white/40" />
                      Project Overview
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-white/40" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:text-white hover:border-white/20 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features & Challenges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-green-400" />
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-white/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-orange-400" />
                        Challenges Solved
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map((challenge, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-white/70"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="relative p-6 border-t border-white/10 bg-black/60">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white/60">Security:</span>
                        <span className="text-sm font-medium text-white">
                          {selectedProject.security}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <motion.a
                        href={selectedProject.liveUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Preview
                      </motion.a>
                      <motion.a
                        href={selectedProject.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
                      >
                        <Code className="w-4 h-4" />
                        View Code
                      </motion.a>
                    </div>
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

export default FeaturedProjects;
