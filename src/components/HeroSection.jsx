import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Zap,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Code2,
  Cpu,
  Globe,
  Server,
  Database,
  FileCode,
  GitBranch,
  User,
  Briefcase,
  Award,
  Coffee,
  PenTool,
  Download,
} from "lucide-react";
// Import React Icons
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiDocker,
  SiMongodb,
  SiJavascript,
} from "react-icons/si";
import { useApi } from "../hooks/useApi";
import logo from "../assets/my-profile.png";

// Create a separate component for the Matrix background
const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  // Initialize Matrix animation
  const initMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas ref is null, retrying...");
      return false;
    }

    console.log("Initializing Matrix animation on canvas:", canvas);

    // Function to properly set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // Set canvas dimensions to exactly match displayed size
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      return { dpr, rect };
    };

    // Initial size setup
    const { dpr } = setCanvasSize();
    const ctx = canvas.getContext("2d");

    // Dudle-style characters
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~ 你好世界北京上海中国文化";

    const fontSize = 14;
    const columns = Math.floor(canvas.width / dpr / fontSize);

    // Rain drops
    const rainDrops = Array(columns).fill(1);

    // Dudle-style color palette
    const colors = {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      tertiary: "#A0A0A0",
      dark: "#202020",
      background: "#000000",
    };

    function draw() {
      const currentWidth = canvas.width / dpr;
      const currentHeight = canvas.height / dpr;

      // Semi-transparent black for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      // Set font
      ctx.font = `500 ${fontSize}px 'Courier New', 'Monaco', monospace`;
      ctx.textAlign = "center";

      // Draw rain drops
      for (let i = 0; i < rainDrops.length; i++) {
        if (i * fontSize > currentWidth) continue;

        const char = characters[Math.floor(Math.random() * characters.length)];

        let color;
        const position = rainDrops[i] * fontSize;
        const maxHeight = currentHeight;

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
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);
        ctx.shadowBlur = 0;

        rainDrops[i] += 0.8 + Math.random() * 0.4;

        if (rainDrops[i] * fontSize > currentHeight && Math.random() > 0.97) {
          rainDrops[i] = 0;
        }
      }

      ctx.globalAlpha = 1.0;
    }

    // Animation loop
    let lastTime = 0;
    const interval = 1000 / 24;

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime > interval) {
        draw();
        lastTime = timestamp - (deltaTime % interval);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationIdRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      const { dpr: newDpr } = setCanvasSize();
      const newColumns = Math.floor(canvas.width / newDpr / fontSize);
      const newRainDrops = Array(newColumns).fill(1);

      for (let i = 0; i < Math.min(rainDrops.length, newColumns); i++) {
        newRainDrops[i] = rainDrops[i];
      }

      rainDrops.length = newColumns;
      for (let i = 0; i < newColumns; i++) {
        rainDrops[i] = newRainDrops[i] || 1;
      }
    };

    // Initialize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Wait a bit for DOM to be ready
    const timer = setTimeout(() => {
      const cleanup = initMatrix();
      if (cleanup) {
        return cleanup;
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [initMatrix]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-20 transition-opacity duration-1000 ease-in-out"
      style={{
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

const HeroSection = () => {
  const api = useApi();
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: "output",
      text: "Welcome to my digital space. Type 'help' to see available commands.",
    },
    { type: "input", text: "visitor@portfolio:~$ " },
  ]);
  const terminalEndRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const [hoverState, setHoverState] = useState({});

  // State for dynamic content
  const [content, setContent] = useState({
    name: "ALEX JOHNSON",
    title: "FULL STACK DEVELOPER",
    description:
      "Building scalable web applications with modern technologies. Passionate about clean code, user experience, and solving complex problems with elegant solutions.",
    resume: "",
    social: {
      github: "",
      linkedin: "",
      email: "",
    },
    projectCount: "50+",
    experienceYears: "3+",
  });
  const [loading, setLoading] = useState(true);

  // Commands updated with dynamic content
  const commands = {
    help: "Show available commands",
    about: "Learn about me",
    skills: "View my technical skills",
    projects: "See my recent work",
    contact: "Get in touch",
    clear: "Clear terminal",
    resume: "Download my resume",
  };

  // Fetch content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await api.get("/content");
        if (data.data) {
          setContent({
            name: data.data.name || "ALEX JOHNSON",
            title: data.data.title || "FULL STACK DEVELOPER",
            description:
              data.data.description ||
              "Building scalable web applications with modern technologies. Passionate about clean code, user experience, and solving complex problems with elegant solutions.",
            resume: data.data.resume || "",
            social: {
              github: data.data.social?.github || "",
              linkedin: data.data.social?.linkedin || "",
              email: data.data.social?.email || "hello@example.com",
            },
            projectCount: data.data.projectCount?.toString() || "50+",
            experienceYears: data.data.experienceYears?.toString() || "3+",
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        // Use default content if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fix scroll position on load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.documentElement.style.overflow = "auto";
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate the offset considering the fixed navbar
      const navbarHeight = 64; // Height of your navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll to bottom of TERMINAL SECTION ONLY when terminal history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  // Smooth hover state transitions
  useEffect(() => {
    const entries = Object.entries(isHovered);
    entries.forEach(([key, value]) => {
      if (value && !hoverState[key]) {
        setHoverState((prev) => ({ ...prev, [key]: true }));
      } else if (!value && hoverState[key]) {
        const timeoutId = setTimeout(() => {
          setHoverState((prev) => ({ ...prev, [key]: false }));
        }, 200);
        return () => clearTimeout(timeoutId);
      }
    });
  }, [isHovered]);

  const handleTerminalSubmit = (e) => {
    if (e.key === "Enter" && terminalInput.trim()) {
      const cmd = terminalInput.toLowerCase().trim();

      // Add command to history
      setTerminalHistory((prev) => [
        ...prev,
        { type: "input", text: `visitor@portfolio:~$ ${terminalInput}` },
      ]);

      // Process command
      if (cmd === "help") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Available commands:" },
          ...Object.entries(commands).map(([cmd, desc]) => ({
            type: "output",
            text: `  ${cmd} - ${desc}`,
          })),
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "about") {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `I'm ${content.name}, a passionate ${content.title}.`,
          },
          {
            type: "output",
            text: content.description,
          },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "skills") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Core Technologies:" },
          {
            type: "output",
            text: "  Frontend: React, TypeScript, Next.js, Tailwind",
          },
          {
            type: "output",
            text: "  Backend: Node.js, Express, REST APIs, MongoDB",
          },
          { type: "output", text: "  DevOps: Docker, AWS, CI/CD, Git" },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "projects") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Recent Projects:" },
          {
            type: "output",
            text: "Nexora Studio – Video Editing Agency Landing Page",
          },
          {
            type: "output",
            text: "  2. Jayed Talukder – Video Editor Protfolio",
          },
          {
            type: "output",
            text: "  3. The Zone One – Video Editing Agency Website",
          },
          { type: "output", text: "Type 'view portfolio' to see details." },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
        // Auto scroll to projects section when user types "projects"
        setTimeout(() => {
          scrollToSection("projects");
        }, 500);
      } else if (cmd === "contact") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Get in touch:" },
          { type: "output", text: `  Email: ${content.social.email}` },
          { type: "output", text: `  LinkedIn: ${content.social.linkedin}` },
          { type: "output", text: `  GitHub: ${content.social.github}` },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
        // Auto scroll to contact section
        setTimeout(() => {
          scrollToSection("contact");
        }, 500);
      } else if (cmd === "clear") {
        setTerminalHistory([
          {
            type: "output",
            text: "Welcome to my digital space. Type 'help' to see available commands.",
          },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "resume") {
        if (content.resume) {
          setTerminalHistory((prev) => [
            ...prev,
            { type: "output", text: "Opening resume download..." },
            { type: "output", text: "Resume download started!" },
            { type: "input", text: "visitor@portfolio:~$ " },
          ]);
          window.open(content.resume, "_blank");
        } else {
          setTerminalHistory((prev) => [
            ...prev,
            { type: "output", text: "Resume not available at the moment." },
            { type: "input", text: "visitor@portfolio:~$ " },
          ]);
        }
      } else if (cmd === "view portfolio") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Scrolling to portfolio..." },
          { type: "output", text: "Let's build something amazing together!" },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
        // Scroll to projects section
        scrollToSection("projects");
      } else {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `Command not found: ${cmd}. Type 'help' for available commands.`,
          },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      }

      setTerminalInput("");
    }
  };

  // Handle quick command click
  const handleQuickCommand = (cmd) => {
    setTerminalInput(cmd);
    setTimeout(() => {
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
      });
      document.activeElement.dispatchEvent(event);
    }, 10);
  };

  // Handle resume download
  const handleResumeDownload = () => {
    if (content.resume) {
      window.open(content.resume, "_blank");
    }
  };

  // Handle portfolio button click
  const handlePortfolioClick = (e) => {
    e.preventDefault();
    scrollToSection("projects");
  };

  // Hand-drawn line component
  const HandDrawnBorder = ({ isActive, color = "white" }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );

  // Hand-drawn corner accents
  const HandDrawnCorners = ({ isActive, size = "sm" }) => (
    <>
      <div className="absolute top-1 left-1 transition-all duration-500 ease-in-out">
        <svg
          width={size === "sm" ? "12" : "16"}
          height={size === "sm" ? "12" : "16"}
          className={`transition-all duration-500 ease-in-out ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <path
            d="M0,12 Q0,0 12,0"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
      <div className="absolute top-1 right-1 transition-all duration-500 ease-in-out">
        <svg
          width={size === "sm" ? "12" : "16"}
          height={size === "sm" ? "12" : "16"}
          className={`transition-all duration-500 ease-in-out ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <path
            d="M0,0 Q12,0 12,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
      <div className="absolute bottom-1 left-1 transition-all duration-500 ease-in-out">
        <svg
          width={size === "sm" ? "12" : "16"}
          height={size === "sm" ? "12" : "16"}
          className={`transition-all duration-500 ease-in-out ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <path
            d="M0,0 Q0,12 12,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
      <div className="absolute bottom-1 right-1 transition-all duration-500 ease-in-out">
        <svg
          width={size === "sm" ? "12" : "16"}
          height={size === "sm" ? "12" : "16"}
          className={`transition-all duration-500 ease-in-out ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <path
            d="M12,0 Q12,12 0,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
    </>
  );

  // Hand-drawn underline effect
  const HandDrawnUnderline = ({ isActive, showTransition = true }) => (
    <motion.div
      className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{
        duration: showTransition ? 0.3 : 0,
        ease: "easeInOut",
      }}
    >
      <svg width="100%" height="2" className="overflow-visible">
        <path
          d="M0,1 Q10,0 20,1 T40,0.5 T60,1.5 T80,0.8 T100,1"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3,2"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </motion.div>
  );

  // Render loading state
  if (loading) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden">
      {/* Matrix Background as separate component */}
      <MatrixBackground />

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/30 to-black transition-all duration-1000 ease-in-out z-1" />

      {/* Pen Tool Floating Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute top-8 right-8 z-30 hidden lg:block"
      >
        <PenTool className="w-6 h-6 text-white/30 animate-pulse transition-all duration-500 ease-in-out" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column - Interactive Terminal & Info */}
          <div className="space-y-6 lg:space-y-8">
            {/* Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-white/5 relative group transition-all duration-500 ease-in-out"
              onMouseEnter={() => {
                setIsHovered((prev) => ({ ...prev, terminal: true }));
              }}
              onMouseLeave={() => {
                setIsHovered((prev) => ({ ...prev, terminal: false }));
              }}
            >
              <HandDrawnBorder isActive={hoverState.terminal} />
              <HandDrawnCorners isActive={hoverState.terminal} />

              {/* Terminal Header */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/80 relative transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex gap-1.5">
                      <motion.div
                        animate={{
                          scale: hoverState.terminal ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/20 rounded-full transition-all duration-300 ease-in-out"
                      />
                      <motion.div
                        animate={{
                          scale: hoverState.terminal ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/40 rounded-full transition-all duration-300 ease-in-out"
                      />
                      <motion.div
                        animate={{
                          scale: hoverState.terminal ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                          ease: "easeInOut",
                        }}
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/60 rounded-full transition-all duration-300 ease-in-out"
                      />
                    </div>
                    <div className="flex items-center gap-2 relative">
                      <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 transition-colors duration-300 ease-in-out" />
                      <span className="text-sm font-medium text-white/90 tracking-wide relative inline-block transition-all duration-300 ease-in-out">
                        TERMINAL
                        <HandDrawnUnderline isActive={hoverState.terminal} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        opacity: [1, 0.5, 1],
                        rotate: hoverState.terminal ? [0, 10, 0] : 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 transition-colors duration-300 ease-in-out" />
                    </motion.div>
                    <span className="text-xs text-white/40 font-mono transition-all duration-300 ease-in-out">
                      READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Terminal Content with auto-scroll */}
              <div className="p-4 sm:p-6 font-mono transition-all duration-300 ease-in-out">
                <div className="h-48 sm:h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent transition-all duration-300 ease-in-out">
                  <div className="space-y-1 transition-all duration-300 ease-in-out">
                    {terminalHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-300 ease-in-out ${
                          item.type === "input"
                            ? "text-white/90 relative"
                            : "text-white/60"
                        }`}
                      >
                        {item.text}
                        {item.type === "input" &&
                          index === terminalHistory.length - 1 && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="ml-1 inline-block w-2 h-4 bg-white/80 transition-all duration-300 ease-in-out"
                            />
                          )}
                      </div>
                    ))}
                    {/* This div triggers the auto-scroll */}
                    <div ref={terminalEndRef} />
                  </div>
                </div>

                {/* Terminal Input */}
                <div className="flex items-center border-t border-white/10 pt-3 sm:pt-4 relative transition-all duration-300 ease-in-out">
                  <span className="text-white/80 font-bold relative transition-all duration-300 ease-in-out">
                    $
                    <motion.div
                      animate={{ scale: hoverState.terminal ? [1, 1.5, 1] : 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-1 -right-1 w-1 h-1 bg-white/60 rounded-full transition-all duration-300 ease-in-out"
                    />
                  </span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalSubmit}
                    className="flex-1 bg-transparent border-none outline-none text-white px-2 sm:px-3 font-mono text-sm sm:text-base placeholder-white/30 transition-all duration-300 ease-in-out"
                    placeholder="Type a command..."
                    autoFocus
                  />
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1],
                      rotate: hoverState.terminal ? [0, 180, 0] : 0,
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1 h-4 sm:w-2 sm:h-5 bg-white/60 relative transition-all duration-300 ease-in-out"
                  >
                    <svg
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out"
                      width="8"
                      height="4"
                      viewBox="0 0 8 4"
                    >
                      <path
                        d="M4,0 L8,4 L0,4 Z"
                        fill="white"
                        fillOpacity="0.6"
                        className="transition-all duration-300 ease-in-out"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Quick Commands */}
                <div className="flex flex-wrap gap-2 mt-4 transition-all duration-300 ease-in-out">
                  {["help", "about", "skills", "projects"].map((cmd) => (
                    <motion.button
                      key={cmd}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickCommand(cmd)}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 text-white/70 rounded-lg text-xs border border-white/10 hover:border-white/30 hover:text-white transition-all duration-500 ease-in-out font-medium tracking-wide relative group/button"
                      onMouseEnter={() => {
                        setIsHovered((prev) => ({ ...prev, [cmd]: true }));
                      }}
                      onMouseLeave={() => {
                        setIsHovered((prev) => ({ ...prev, [cmd]: false }));
                      }}
                    >
                      {cmd}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-px overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoverState[cmd] ? 1 : 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          width="100%"
                          height="2"
                          className="transition-all duration-300 ease-in-out"
                        >
                          <path
                            d="M0,1 Q5,0 10,1 T20,0.5 T30,1.5"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeDasharray="2,2"
                            className="transition-all duration-300 ease-in-out"
                          />
                        </svg>
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-300 ease-in-out"
            >
              {[
                {
                  icon: Code2,
                  title: "FULL STACK",
                  desc: "React • Node.js • TypeScript",
                  bg: "bg-black/40",
                  border: "border-white/10",
                  iconColor: "text-white/80",
                },
                {
                  icon: Globe,
                  title: "REMOTE",
                  desc: "Available Worldwide",
                  bg: "bg-black/40",
                  border: "border-white/10",
                  iconColor: "text-white/80",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${card.bg} backdrop-blur-sm border ${card.border} rounded-xl p-3 sm:p-4 group hover:border-white/20 transition-all duration-500 ease-in-out relative`}
                  onMouseEnter={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [`card${index}`]: true,
                    }));
                  }}
                  onMouseLeave={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [`card${index}`]: false,
                    }));
                  }}
                >
                  <HandDrawnCorners
                    isActive={hoverState[`card${index}`]}
                    size="sm"
                  />

                  <div className="flex items-center gap-2 mb-2 relative transition-all duration-300 ease-in-out">
                    <card.icon
                      className={`w-4 h-4 ${card.iconColor} group-hover:text-white transition-colors duration-500 ease-in-out`}
                    />
                    <span className="text-sm font-bold text-white/90 tracking-wide group-hover:text-white transition-colors duration-500 ease-in-out relative inline-block">
                      {card.title}
                      <HandDrawnUnderline
                        isActive={hoverState[`card${index}`]}
                      />
                    </span>
                  </div>
                  <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-500 ease-in-out">
                    {card.desc}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Profile & Details */}
          <div className="space-y-6 lg:space-y-8 transition-all duration-300 ease-in-out">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {/* Status Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6 group hover:border-white/20 transition-all duration-500 ease-in-out relative"
                onMouseEnter={() => {
                  setIsHovered((prev) => ({ ...prev, status: true }));
                }}
                onMouseLeave={() => {
                  setIsHovered((prev) => ({ ...prev, status: false }));
                }}
              >
                <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white transition-colors duration-500 ease-in-out" />
                <span className="text-sm font-bold text-white/90 group-hover:text-white tracking-wide relative transition-all duration-500 ease-in-out">
                  AVAILABLE FOR WORK
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoverState.status ? 1 : 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      width="100%"
                      height="2"
                      className="transition-all duration-300 ease-in-out"
                    >
                      <path
                        d="M0,1 Q10,0 20,1 T40,0.8 T60,1.2 T80,0.9 T100,1"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeDasharray="3,2"
                        className="transition-all duration-300 ease-in-out"
                      />
                    </svg>
                  </motion.div>
                </span>
              </motion.div>

              {/* Name & Title */}
              <div className="relative transition-all duration-300 ease-in-out">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight transition-all duration-300 ease-in-out">
                  <span className="block text-white relative inline-block transition-all duration-300 ease-in-out">
                    {content.name}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 transition-all duration-300 ease-in-out"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        delay: 0.8,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        width="100%"
                        height="3"
                        className="transition-all duration-300 ease-in-out"
                      >
                        <path
                          d="M0,1.5 Q25,0.5 50,1.5 T100,1"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray="4,3"
                          className="transition-all duration-300 ease-in-out"
                        />
                      </svg>
                    </motion.div>
                  </span>
                  <span className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl mt-6 font-normal tracking-wider transition-all duration-300 ease-in-out">
                    {content.title}
                  </span>
                </h1>
              </div>

              <p className="text-white/70 text-base sm:text-lg mb-6 leading-relaxed font-light tracking-wide transition-all duration-300 ease-in-out">
                {content.description}
              </p>
            </motion.div>

            {/* Profile Photo & Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-all duration-500 ease-in-out relative group"
              onMouseEnter={() => {
                setIsHovered((prev) => ({ ...prev, profile: true }));
              }}
              onMouseLeave={() => {
                setIsHovered((prev) => ({ ...prev, profile: false }));
              }}
            >
              <HandDrawnBorder isActive={hoverState.profile} />

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all duration-300 ease-in-out">
                {/* Profile Photo with Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/photo transition-all duration-500 ease-in-out"
                >
                  <div className="w-16 h-16 sm:w-30 sm:h-24 rounded-lg overflow-hidden border-2 border-white/20 bg-black flex items-center justify-center group-hover/photo:border-white/40 transition-all duration-500 ease-in-out ">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-full h-full object-contain filter brightness-0 invert group-hover/photo:scale-110 transition-all duration-500 ease-in-out"
                    />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white/60 rounded-full border-2 border-black transition-all duration-300 ease-in-out"
                  />
                </motion.div>

                {/* Tech Icons */}
                <div className="flex-1 w-full transition-all duration-300 ease-in-out">
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4 justify-center sm:justify-start transition-all duration-300 ease-in-out">
                    {[
                      { Icon: FaReact, color: "text-white/80", name: "React" },
                      {
                        Icon: SiTypescript,
                        color: "text-white/60",
                        name: "TypeScript",
                      },
                      {
                        Icon: FaNodeJs,
                        color: "text-white/80",
                        name: "Node.js",
                      },
                      {
                        Icon: SiTailwindcss,
                        color: "text-white/60",
                        name: "Tailwind",
                      },
                      {
                        Icon: SiMongodb,
                        color: "text-white/80",
                        name: "MongoDB",
                      },
                      {
                        Icon: SiJavascript,
                        color: "text-white/60",
                        name: "JavaScript",
                      },
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="group/tech relative transition-all duration-500 ease-in-out"
                        onMouseEnter={() => {
                          setIsHovered((prev) => ({
                            ...prev,
                            [`tech${index}`]: true,
                          }));
                        }}
                        onMouseLeave={() => {
                          setIsHovered((prev) => ({
                            ...prev,
                            [`tech${index}`]: false,
                          }));
                        }}
                      >
                        <div className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition-all duration-500 ease-in-out relative">
                          <tech.Icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${tech.color} group-hover/tech:text-white transition-colors duration-500 ease-in-out`}
                          />
                          <motion.svg
                            className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
                            viewBox="0 0 100 100"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: hoverState[`tech${index}`] ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeInOut",
                            }}
                          >
                            <path
                              d="M10,10 Q30,5 50,10 T90,15 T90,90 T10,90 T10,10"
                              fill="none"
                              stroke="white"
                              strokeWidth="1"
                              strokeOpacity="0.5"
                              strokeLinecap="round"
                              strokeDasharray="3,2"
                              className="transition-all duration-300 ease-in-out"
                            />
                          </motion.svg>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/tech:opacity-100 transition-all duration-500 ease-in-out pointer-events-none">
                          <span className="text-xs bg-black text-white/90 px-2 py-1 rounded border border-white/10 whitespace-nowrap relative transition-all duration-300 ease-in-out">
                            {tech.name}
                            <svg
                              className="absolute -top-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out"
                              width="8"
                              height="4"
                              viewBox="0 0 8 4"
                            >
                              <path
                                d="M4,0 L8,4 L0,4 Z"
                                fill="black"
                                stroke="white"
                                strokeWidth="0.5"
                                className="transition-all duration-300 ease-in-out"
                              />
                            </svg>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3 sm:gap-4 transition-all duration-300 ease-in-out"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePortfolioClick}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-xl font-bold overflow-hidden transition-all duration-500 ease-in-out flex-1 min-w-[140px] hover:bg-white/90"
                onMouseEnter={() => {
                  setIsHovered((prev) => ({ ...prev, portfolioBtn: true }));
                }}
                onMouseLeave={() => {
                  setIsHovered((prev) => ({ ...prev, portfolioBtn: false }));
                }}
              >
                <motion.div
                  className="absolute inset-0 transition-all duration-500 ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoverState.portfolioBtn ? 0.1 : 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    width="100%"
                    height="100%"
                    className="absolute inset-0 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M10,20 Q30,15 50,25 T90,15 M15,40 Q40,35 70,45 T85,35"
                      fill="none"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>
                </motion.div>
                <span className="relative flex items-center justify-center gap-2 tracking-wide transition-all duration-300 ease-in-out">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  VIEW PORTFOLIO
                </span>
              </motion.button>

              {/* Resume Button - Added */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-white/30 rounded-xl font-bold text-white overflow-hidden transition-all duration-500 ease-in-out hover:border-white hover:bg-white/5 flex-1 min-w-[140px]"
                onMouseEnter={() => {
                  setIsHovered((prev) => ({ ...prev, resumeBtn: true }));
                }}
                onMouseLeave={() => {
                  setIsHovered((prev) => ({ ...prev, resumeBtn: false }));
                }}
              >
                <HandDrawnBorder
                  isActive={hoverState.resumeBtn}
                  color="rgba(255,255,255,0.8)"
                />
                <span className="flex items-center justify-center gap-2 tracking-wide transition-all duration-300 ease-in-out">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  RESUME
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex gap-3 sm:gap-4 transition-all duration-300 ease-in-out"
            >
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  href: content.social.github,
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: content.social.linkedin,
                },
                {
                  icon: Mail,
                  label: "Email",
                  href: `mailto:${content.social.email}`,
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 sm:p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/30 transition-all duration-500 ease-in-out hover:bg-white/10 relative group/social"
                  onMouseEnter={() => {
                    setIsHovered((prev) => ({ ...prev, [social.label]: true }));
                  }}
                  onMouseLeave={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [social.label]: false,
                    }));
                  }}
                >
                  <social.icon className="w-5 h-5 transition-all duration-300 ease-in-out" />
                  <motion.svg
                    className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
                    viewBox="0 0 100 100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoverState[social.label] ? 1 : 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeOpacity="0.5"
                      strokeDasharray="3,3"
                      className="transition-all duration-300 ease-in-out"
                    />
                  </motion.svg>
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 relative transition-all duration-300 ease-in-out"
            >
              <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 h-8 w-px bg-white/10 transition-all duration-300 ease-in-out">
                <svg
                  width="1"
                  height="100%"
                  className="overflow-visible transition-all duration-300 ease-in-out"
                >
                  <path
                    d="M0,0 Q0.5,5 0,10 T0,20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    strokeDasharray="1,2"
                    className="transition-all duration-300 ease-in-out"
                  />
                </svg>
              </div>
              <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 h-8 w-px bg-white/10 transition-all duration-300 ease-in-out">
                <svg
                  width="1"
                  height="100%"
                  className="overflow-visible transition-all duration-300 ease-in-out"
                >
                  <path
                    d="M0,0 Q0.5,5 0,10 T0,20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    strokeDasharray="1,2"
                    className="transition-all duration-300 ease-in-out"
                  />
                </svg>
              </div>

              {[
                {
                  value: content.projectCount,
                  label: "PROJECTS",
                  icon: FileCode,
                  color: "text-white/90",
                },
                {
                  value: content.experienceYears,
                  label: "YEARS",
                  icon: Briefcase,
                  color: "text-white/70",
                },
                {
                  value: "∞",
                  label: "PASSION",
                  icon: Coffee,
                  color: "text-white/90",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group/stat relative transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [`stat${index}`]: true,
                    }));
                  }}
                  onMouseLeave={() => {
                    setIsHovered((prev) => ({
                      ...prev,
                      [`stat${index}`]: false,
                    }));
                  }}
                >
                  <div className="flex justify-center mb-2 relative transition-all duration-300 ease-in-out">
                    <stat.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color} group-hover/stat:text-white relative z-10 transition-colors duration-500 ease-in-out`}
                    />
                    <motion.div
                      className="absolute inset-0 transition-all duration-300 ease-in-out"
                      animate={{
                        scale: hoverState[`stat${index}`] ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        className="transition-all duration-300 ease-in-out"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke="white"
                          strokeWidth="1"
                          strokeOpacity="0.2"
                          strokeDasharray="2,4"
                          className="transition-all duration-300 ease-in-out"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-white group-hover/stat:text-white/90 relative transition-all duration-500 ease-in-out">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 group-hover/stat:text-white/60 tracking-wide transition-colors duration-500 ease-in-out">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col items-center transition-all duration-300 ease-in-out">
          <span className="text-xs sm:text-sm text-white/30 mb-2 tracking-wider transition-all duration-300 ease-in-out">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center relative transition-all duration-300 ease-in-out"
          >
            <svg
              width="40"
              height="40"
              className="absolute -top-5 transition-all duration-300 ease-in-out"
              viewBox="0 0 40 40"
            >
              <path
                d="M20,5 Q20,15 20,20"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.3"
                strokeLinecap="round"
                strokeDasharray="2,2"
                className="transition-all duration-300 ease-in-out"
              />
            </svg>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 rotate-90 relative z-10 transition-all duration-300 ease-in-out" />
            <svg
              className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out"
              viewBox="0 0 40 40"
            >
              <motion.circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                strokeDasharray="3,3"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="transition-all duration-300 ease-in-out"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
