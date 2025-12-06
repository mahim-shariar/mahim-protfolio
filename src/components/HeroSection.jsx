import React, { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
// Import React Icons
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiDocker,
} from "react-icons/si";

const HeroSection = () => {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: "output",
      text: "Welcome to my digital space. Type 'help' to see available commands.",
    },
    { type: "input", text: "visitor@portfolio:~$ " },
  ]);
  const canvasRef = useRef(null);
  const terminalEndRef = useRef(null);
  const [isHovered, setIsHovered] = useState({});
  const [hoverState, setHoverState] = useState({}); // Track hover states for transitions

  const commands = {
    help: "Show available commands",
    about: "Learn about me",
    skills: "View my technical skills",
    projects: "See my recent work",
    contact: "Get in touch",
    clear: "Clear terminal",
    resume: "Download my resume",
  };

  // Fix scroll position on load
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";

    // Remove overflow hidden after page loads
    const timer = setTimeout(() => {
      document.documentElement.style.overflow = "auto";
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Auto-scroll to bottom when terminal history updates
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
        // Hover in
        setHoverState((prev) => ({ ...prev, [key]: true }));
      } else if (!value && hoverState[key]) {
        // Hover out with delay for smooth transition
        const timeoutId = setTimeout(() => {
          setHoverState((prev) => ({ ...prev, [key]: false }));
        }, 200); // Delay to allow transition to complete
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
            text: "I'm a passionate Full Stack Developer with 3+ years of experience.",
          },
          {
            type: "output",
            text: "I specialize in building modern web applications with React, Node.js, and cloud technologies.",
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
            text: "  Backend: Node.js, Python, GraphQL, REST APIs",
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
            text: "  1. E-commerce Platform - React + Node.js",
          },
          { type: "output", text: "  2. AI Dashboard - Next.js + Python" },
          { type: "output", text: "  3. Mobile App - React Native" },
          { type: "output", text: "Type 'view portfolio' to see details." },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "contact") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Get in touch:" },
          { type: "output", text: "  Email: hello@example.com" },
          { type: "output", text: "  LinkedIn: linkedin.com/in/yourname" },
          { type: "output", text: "  GitHub: github.com/yourusername" },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "clear") {
        setTerminalHistory([
          {
            type: "output",
            text: "Welcome to my digital space. Type 'help' to see available commands.",
          },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "resume") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Opening resume download..." },
          { type: "output", text: "Resume download started!" },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
      } else if (cmd === "view portfolio") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Opening portfolio in new tab..." },
          { type: "output", text: "Let's build something amazing together!" },
          { type: "input", text: "visitor@portfolio:~$ " },
        ]);
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

  // Enhanced Black and White Matrix Digital Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // Dudle-style characters - only ASCII for classic look
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~ 加入一些中文词语 你好 世界 北京 上海 中国文化 中文学习 字符示例 人工智能 技术发展 美好的一天 欢迎使用";

    const fontSize = 14;
    const columns = Math.floor(canvas.width / dpr / fontSize);

    // Rain drops
    const rainDrops = Array(columns).fill(1);

    // Dudle-style color palette - strictly black, white, and grayscale
    const colors = {
      primary: "#FFFFFF", // Pure white
      secondary: "#F0F0F0", // Light gray
      tertiary: "#A0A0A0", // Medium gray
      dark: "#202020", // Dark gray
      background: "#000000", // Pure black
    };

    function draw() {
      // Get current canvas size
      const currentWidth = canvas.width / dpr;
      const currentHeight = canvas.height / dpr;

      // Semi-transparent black for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      // Set font - monospace for classic terminal look
      ctx.font = `500 ${fontSize}px 'Courier New', 'Monaco', monospace`;
      ctx.textAlign = "center";

      // Draw rain drops
      for (let i = 0; i < rainDrops.length; i++) {
        // Ensure we don't draw outside current columns
        if (i * fontSize > currentWidth) continue;

        // Random character
        const char = characters[Math.floor(Math.random() * characters.length)];

        // Determine color based on position - more subtle transitions
        let color;
        const position = rainDrops[i] * fontSize;
        const maxHeight = currentHeight;

        if (position < maxHeight * 0.2) {
          // Head character - bright white
          color = colors.primary;
          ctx.globalAlpha = 1.0;
        } else if (position < maxHeight * 0.5) {
          // Middle section - light gray
          color = colors.secondary;
          ctx.globalAlpha = 0.8;
        } else if (position < maxHeight * 0.8) {
          // Middle-lower section - medium gray
          color = colors.tertiary;
          ctx.globalAlpha = 0.6;
        } else {
          // Tail - dark gray
          color = colors.dark;
          ctx.globalAlpha = 0.4;
        }

        // Draw character with subtle shadow for depth
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);
        ctx.shadowBlur = 0;

        // Move drop down with variable speed for natural look
        rainDrops[i] += 0.8 + Math.random() * 0.4;

        // Reset drop randomly
        if (rainDrops[i] * fontSize > currentHeight && Math.random() > 0.97) {
          rainDrops[i] = 0;
        }
      }

      // Reset alpha
      ctx.globalAlpha = 1.0;
    }

    // Animation loop
    let animationId;
    let lastTime = 0;
    const interval = 1000 / 24; // 24 FPS for classic film look

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime > interval) {
        draw();
        lastTime = timestamp - (deltaTime % interval);
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      const { dpr: newDpr } = setCanvasSize();

      // Recalculate columns
      const newColumns = Math.floor(canvas.width / newDpr / fontSize);
      const newRainDrops = Array(newColumns).fill(1);

      // Copy existing values if any
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
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

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

  // Hand-drawn line component with smooth transitions
  const HandDrawnBorder = ({ isActive, color = "white" }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top border with hand-drawn effect */}
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
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
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );

  // Hand-drawn corner accents with smooth transitions
  const HandDrawnCorners = ({ isActive, size = "sm" }) => (
    <>
      {/* Top-left corner */}
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
      {/* Top-right corner */}
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
      {/* Bottom-left corner */}
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
      {/* Bottom-right corner */}
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

  // Hand-drawn underline effect for text with smooth transitions
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

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Dudle-style Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-15 transition-opacity duration-1000 ease-in-out"
        style={{ position: "fixed" }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black transition-all duration-1000 ease-in-out" />

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
            {/* Interactive Terminal - Dudle Style with Hand-drawn Effect */}
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
              {/* Hand-drawn border effect */}
              <HandDrawnBorder isActive={hoverState.terminal} />
              <HandDrawnCorners isActive={hoverState.terminal} />

              {/* Terminal Header - Minimalist */}
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

              {/* Terminal Content */}
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
                        {/* Hand-drawn cursor effect for current input */}
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
                    {/* Hand-drawn arrow indicator */}
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

                {/* Quick Commands - Minimalist with hand-drawn effects */}
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
                      {/* Hand-drawn squiggle underline on hover */}
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

            {/* Quick Info Cards - Dudle Style with Hand-drawn Effects */}
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
                  {/* Hand-drawn corner accents */}
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

          {/* Right Column - Profile & Details - Dudle Style */}
          <div className="space-y-6 lg:space-y-8 transition-all duration-300 ease-in-out">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {/* Status Badge - Minimalist with hand-drawn effect */}
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

              {/* Name & Title - Dudle Typography with hand-drawn underline */}
              <div className="relative transition-all duration-300 ease-in-out">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight transition-all duration-300 ease-in-out">
                  <span className="block text-white relative inline-block transition-all duration-300 ease-in-out">
                    ALEX JOHNSON
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
                    FULL STACK DEVELOPER
                  </span>
                </h1>
              </div>

              <p className="text-white/70 text-base sm:text-lg mb-6 leading-relaxed font-light tracking-wide transition-all duration-300 ease-in-out">
                Building scalable web applications with modern technologies.
                Passionate about clean code, user experience, and solving
                complex problems with elegant solutions.
              </p>
            </motion.div>

            {/* Profile Photo & Tech Stack - Minimalist with hand-drawn border */}
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
                {/* Profile Photo - Dudle Style with hand-drawn circle */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group/photo transition-all duration-500 ease-in-out"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center group-hover/photo:border-white/40 transition-all duration-500 ease-in-out">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 group-hover/photo:text-white transition-colors duration-500 ease-in-out" />
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
                  {/* Hand-drawn circle around profile photo */}
                  <svg
                    className="absolute inset-0 w-full h-full transition-all duration-300 ease-in-out"
                    viewBox="0 0 100 100"
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="49"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      strokeOpacity="0.3"
                      strokeDasharray="5,3"
                      animate={{ rotate: hoverState.profile ? 360 : 0 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>
                </motion.div>

                {/* Tech Icons - Minimalist Grid with hand-drawn effects */}
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
                        Icon: SiGraphql,
                        color: "text-white/80",
                        name: "GraphQL",
                      },
                      {
                        Icon: SiDocker,
                        color: "text-white/60",
                        name: "Docker",
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
                          {/* Hand-drawn squiggle around tech icon on hover */}
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
                            {/* Hand-drawn arrow pointing to icon */}
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

            {/* CTA Buttons - Dudle Style with hand-drawn effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3 sm:gap-4 transition-all duration-300 ease-in-out"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black rounded-xl font-bold overflow-hidden transition-all duration-500 ease-in-out flex-1 min-w-[140px] hover:bg-white/90"
                onMouseEnter={() => {
                  setIsHovered((prev) => ({ ...prev, portfolioBtn: true }));
                }}
                onMouseLeave={() => {
                  setIsHovered((prev) => ({ ...prev, portfolioBtn: false }));
                }}
              >
                {/* Hand-drawn scribble effect on hover */}
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

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-white/30 rounded-xl font-bold text-white overflow-hidden transition-all duration-500 ease-in-out hover:border-white hover:bg-white/5 flex-1 min-w-[140px]"
                onMouseEnter={() => {
                  setIsHovered((prev) => ({ ...prev, contactBtn: true }));
                }}
                onMouseLeave={() => {
                  setIsHovered((prev) => ({ ...prev, contactBtn: false }));
                }}
              >
                {/* Hand-drawn border animation on hover */}
                <HandDrawnBorder
                  isActive={hoverState.contactBtn}
                  color="rgba(255,255,255,0.8)"
                />
                <span className="flex items-center justify-center gap-2 tracking-wide transition-all duration-300 ease-in-out">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  CONTACT ME
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links - Minimalist with hand-drawn circles */}
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
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                { icon: Mail, label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
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
                  {/* Hand-drawn circle animation */}
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

            {/* Stats - Dudle Style with hand-drawn dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10 relative transition-all duration-300 ease-in-out"
            >
              {/* Hand-drawn vertical dividers */}
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
                  value: "50+",
                  label: "PROJECTS",
                  icon: FileCode,
                  color: "text-white/90",
                },
                {
                  value: "3+",
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
                    {/* Hand-drawn circle around icon */}
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

      {/* Scroll Indicator - Minimalist with hand-drawn arrow */}
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
            {/* Hand-drawn arrow with squiggle tail */}
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
            {/* Hand-drawn circle around arrow */}
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
