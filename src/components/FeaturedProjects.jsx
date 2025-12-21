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
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  XCircle,
  Star,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import { BsViewList } from "react-icons/bs";

const FeaturedProjects = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const modalRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  // Use API hook for fetching categories and projects
  const {
    get: getCategories,
    data: categoriesData,
    loading: categoriesLoading,
  } = useApi();

  const {
    get: getProjects,
    data: projectsData,
    loading: projectsLoading,
    reset: resetProjects,
  } = useApi();

  // Default tabs (will be overridden by API data)
  const defaultTabs = [
    { id: "all", label: "ALL", icon: Terminal, count: 8 },
    { id: "portfolio", label: "PORTFOLIO", icon: Globe, count: 3 },
    { id: "ecommerce", label: "ECOMMERCE", icon: ShoppingBag, count: 2 },
    { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard, count: 2 },
    { id: "management", label: "MANAGEMENT", icon: Building, count: 1 },
  ];

  // State for tabs (will be populated from API)
  const [tabs, setTabs] = useState(defaultTabs);
  const [projects, setProjects] = useState([]);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);

  // Category filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories("/categories/dropdown");

        if (result?.data) {
          // Map API categories to tab format
          const apiTabs = result.data.map((category) => {
            // Find appropriate icon based on category name/slug
            let icon;
            const slug = category.slug.toLowerCase();
            switch (slug) {
              case "portfolio":
              case "portfolios":
                icon = Globe;
                break;
              case "ecommerce":
              case "e-commerce":
                icon = ShoppingBag;
                break;
              case "dashboard":
              case "dashboards":
                icon = LayoutDashboard;
                break;
              case "management":
              case "management-systems":
                icon = Building;
                break;
              case "web-app":
              case "web-applications":
                icon = Server;
                break;
              case "mobile-app":
              case "mobile-applications":
                icon = Cpu;
                break;
              case "design":
              case "design-systems":
                icon = Palette;
                break;
              case "api":
              case "apis":
                icon = Cloud;
                break;
              case "database":
              case "databases":
                icon = Database;
                break;
              case "ai":
              case "artificial-intelligence":
                icon = Sparkles;
                break;
              case "cloud":
              case "cloud-services":
                icon = Cloud;
                break;
              case "security":
              case "security-systems":
                icon = Shield;
                break;
              default:
                icon = Terminal; // Default icon
            }

            return {
              id: category._id, // Use MongoDB _id for filtering
              label: category.name.toUpperCase(),
              icon: icon,
              count: category.projectCount || 0,
              color: category.color || "#FFFFFF",
              _id: category._id, // MongoDB ObjectId
              slug: category.slug,
              originalData: category,
            };
          });

          // Add "ALL" tab at the beginning
          const totalProjects = apiTabs.reduce(
            (sum, tab) => sum + (tab.count || 0),
            0
          );
          const allTab = {
            id: "all",
            label: "ALL",
            icon: Terminal,
            count: totalProjects,
            _id: "all", // Special identifier for "all" tab
          };

          setTabs([allTab, ...apiTabs]);
          setTotalProjectsCount(totalProjects);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Keep default tabs if API fails
        setTabs(defaultTabs);
      }
    };

    fetchCategories();
  }, []);

  // Fetch projects whenever activeTab or selectedCategory changes
  useEffect(() => {
    const fetchProjects = async () => {
      resetProjects(); // Reset previous projects data

      try {
        // Build filters object
        const filters = {};

        // Add category filter using category ID
        if (selectedCategory && selectedCategory !== "all") {
          filters.category = selectedCategory;
        }

        // Add search filter
        if (searchQuery) {
          filters.search = searchQuery;
        }

        // Convert to query string
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = `/projects?${queryParams}`;

        console.log("Fetching projects from:", endpoint); // Debug log

        const result = await getProjects(endpoint);

        if (result?.data) {
          setProjects(result.data);
          console.log("Projects fetched:", result.data.length); // Debug log
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // Clear projects on error
      }
    };

    fetchProjects();
  }, [selectedCategory, searchQuery]);

  // Handle tab click
  const handleTabClick = async (index) => {
    setActiveTab(index);
    const selectedTab = tabs[index];

    // Update selected category based on tab selection
    if (selectedTab.id === "all") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedTab.id); // This is now the category _id
    }
  };

  // Handle category filter selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId);
    setCategoryFilterOpen(false);

    // Update active tab based on selection
    const tabIndex = tabs.findIndex(
      (tab) => tab.id === (categoryId === "all" ? "all" : categoryId)
    );
    if (tabIndex !== -1) {
      setActiveTab(tabIndex);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setActiveTab(0); // Reset to ALL tab
  };

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

  // Determine visible tabs based on showAllCategories state
  const visibleTabs = showAllCategories ? tabs : tabs.slice(0, 5);

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
          animate={isInView ? { opacity: 1 } : {}}
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
                  FEATURED PROJECTS
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
              Showcasing featured web applications across different domains
            </motion.p>
          </motion.div>

          {/* Search and Filter Section - Updated with Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-auto md:flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category Filter Dropdown */}
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                  className="w-full md:w-auto px-6 py-3 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-black/80 hover:border-white/30 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">
                    {selectedCategory
                      ? tabs.find((t) => t.id === selectedCategory)?.label ||
                        "Filter"
                      : "All Categories"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      categoryFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Category Filter Dropdown Menu */}
                <AnimatePresence>
                  {categoryFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-full md:w-64 bg-black/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden"
                    >
                      <div className="p-2">
                        {/* All Categories Option */}
                        <button
                          onClick={() => handleCategorySelect("all")}
                          className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all duration-300 ${
                            !selectedCategory
                              ? "bg-white/20 text-white"
                              : "text-white/60 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Terminal className="w-4 h-4" />
                            <span className="font-medium">All Categories</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                            {totalProjectsCount}
                          </span>
                        </button>

                        {/* Divider */}
                        <div className="h-px bg-white/10 my-2" />

                        {/* Category List */}
                        {tabs.slice(1).map((category) => (
                          <button
                            key={category._id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`w-full px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all duration-300 ${
                              selectedCategory === category.id
                                ? "bg-white/20 text-white"
                                : "text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <category.icon className="w-4 h-4" />
                              <span className="font-medium">
                                {category.label}
                              </span>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                              {category.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear Filters Button */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="w-full md:w-auto px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  <X className="w-5 h-5" />
                  <span className="font-medium">Clear Filters</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Active Filters Display */}
          {(selectedCategory || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/60 text-sm">Active filters:</span>

                {selectedCategory && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                    <span className="text-white/80 text-sm">
                      Category:{" "}
                      {tabs.find((t) => t.id === selectedCategory)?.label ||
                        selectedCategory}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {searchQuery && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5">
                    <span className="text-white/80 text-sm">
                      Search: "{searchQuery}"
                    </span>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-white/40 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Tabs with staggered animation - UPDATED FOR API DATA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categoriesLoading ? (
              // Loading skeleton for tabs
              [...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="relative px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10 animate-pulse bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white/20 rounded"></div>
                    <div className="w-16 h-4 bg-white/20 rounded"></div>
                    <div className="w-6 h-4 bg-white/20 rounded-full"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                {/* Render visible tabs */}
                {visibleTabs.map((tab, index) => {
                  const Icon = tab.icon;
                  const isActive =
                    (tab.id === "all" && !selectedCategory) ||
                    selectedCategory === tab.id;
                  const tabKey = `tab-${tab.id}`;

                  return (
                    <motion.button
                      key={tab.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      onClick={() => handleTabClick(index)}
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
                      <HandDrawnBorder
                        isActive={isHovered[tabKey] || isActive}
                      />

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

                {/* Show "View All" button if there are more than 5 categories */}
                {tabs.length > 5 && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 * visibleTabs.length,
                    }}
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className={`relative px-4 py-3 rounded-xl backdrop-blur-sm border flex items-center gap-2 transition-all duration-300 ${
                      showAllCategories
                        ? "bg-white/20 border-white/30 text-white"
                        : "bg-black/60 border-white/10 text-white/60 hover:bg-black/80 hover:border-white/30 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({ ...prev, "view-all": true }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({ ...prev, "view-all": false }))
                    }
                  >
                    <HandDrawnBorder
                      isActive={isHovered["view-all"] || showAllCategories}
                    />

                    {showAllCategories ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <BsViewList className="w-4 h-4" />
                    )}
                    <span className="font-medium text-sm tracking-wider">
                      {showAllCategories
                        ? "SHOW LESS"
                        : `VIEW ALL (${tabs.length - 5})`}
                    </span>
                  </motion.button>
                )}
              </>
            )}
          </motion.div>

          {/* Projects Grid with staggered animation */}
          <AnimatePresence mode="wait">
            {categoriesLoading || projectsLoading ? (
              // Loading skeleton for projects grid
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative h-96 bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl animate-pulse"
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative group"
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      onMouseEnter={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`project-${project._id}`]: true,
                        }))
                      }
                      onMouseLeave={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`project-${project._id}`]: false,
                        }))
                      }
                    >
                      {/* Project Card with normal background */}
                      <div className="relative h-full overflow-hidden rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 group-hover:border-white/30 group-hover:bg-black/80 transition-all duration-500">
                        {/* Hand-drawn border */}
                        <HandDrawnBorder
                          isActive={isHovered[`project-${project._id}`]}
                        />

                        {/* Thumbnail */}
                        <div className="relative h-40 overflow-hidden">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1 + 0.2,
                            }}
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

                          {/* Featured badge */}
                          {project.isFeatured && (
                            <div className="absolute top-4 right-4">
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="relative px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30"
                              >
                                <span className="text-xs text-yellow-300 font-medium tracking-wider flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  Featured
                                </span>
                              </motion.div>
                            </div>
                          )}

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
                                {project.complexity || "Intermediate"}
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
                                {project.security || "Medium"}
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
                                {project.performance || "90%"}
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
                            {project.technologies
                              ?.slice(0, 4)
                              .map((tech, techIndex) => (
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
                            {project.technologies?.length > 4 && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.9 }}
                                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40"
                              >
                                +{project.technologies.length - 4} more
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
                                <span className="text-sm font-medium">
                                  Details
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                              </motion.button>

                              {/* Quick Actions */}
                              <div className="flex gap-2">
                                {/* Preview Button */}
                                {project.liveUrl && (
                                  <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                                    title="Live Preview"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                                  </motion.a>
                                )}

                                {/* Code Button */}
                                {project.githubUrl && (
                                  <motion.a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center overflow-hidden"
                                    title="View Code"
                                  >
                                    <Code className="w-4 h-4" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                                  </motion.a>
                                )}

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
                  ))
                ) : (
                  <div className="col-span-3 text-center py-16">
                    <div className="inline-block bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                      <Terminal className="w-12 h-12 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white/80 mb-2">
                        No Featured Projects Found
                      </h3>
                      <p className="text-white/40">
                        {searchQuery
                          ? `No featured projects match "${searchQuery}"`
                          : selectedCategory
                          ? "There are no featured projects in this category yet."
                          : "There are no featured projects available yet."}
                      </p>
                      {(selectedCategory || searchQuery) && (
                        <button
                          onClick={clearFilters}
                          className="mt-4 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

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
                $ ls featured_projects/ | wc -l
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

      {/* Modal Component - Updated for API data */}
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
                            {selectedProject.categoryDisplay ||
                              selectedProject.category}
                          </span>
                        </div>
                        {selectedProject.isFeatured && (
                          <div className="px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-lg border border-yellow-500/30">
                            <span className="text-xs font-medium text-yellow-300 uppercase tracking-wider flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          </div>
                        )}
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
                            {selectedProject.complexity || "Intermediate"}
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
                        {selectedProject.timeline || "Not specified"}
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white/60">Team Size</span>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        {selectedProject.teamSize || "Not specified"}
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
                        {selectedProject.performance || "90%"}
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
                      {selectedProject.technologies?.map((tech, index) => (
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
                        {selectedProject.features?.map((feature, index) => (
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
                        {selectedProject.challenges?.map((challenge, index) => (
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
                          {selectedProject.security || "Medium"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Preview
                        </motion.a>
                      )}
                      {selectedProject.githubUrl && (
                        <motion.a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
                        >
                          <Code className="w-4 h-4" />
                          View Code
                        </motion.a>
                      )}
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
