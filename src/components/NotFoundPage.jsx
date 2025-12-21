import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Home,
  Search,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  FileX,
  Compass,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Matrix Background Component (reused from your HeroSection)
const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  const initMatrix = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      return { dpr, rect };
    };

    const { dpr } = setCanvasSize();
    const ctx = canvas.getContext("2d");
    const characters =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / dpr / fontSize);
    const rainDrops = Array(columns).fill(1);

    const colors = {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      tertiary: "#A0A0A0",
      dark: "#202020",
    };

    function draw() {
      const currentWidth = canvas.width / dpr;
      const currentHeight = canvas.height / dpr;

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, currentWidth, currentHeight);
      ctx.font = `500 ${fontSize}px 'Courier New', 'Monaco', monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < rainDrops.length; i++) {
        if (i * fontSize > currentWidth) continue;

        const char = characters[Math.floor(Math.random() * characters.length)];
        let color;
        const position = rainDrops[i] * fontSize;

        if (position < currentHeight * 0.2) {
          color = colors.primary;
          ctx.globalAlpha = 1.0;
        } else if (position < currentHeight * 0.5) {
          color = colors.secondary;
          ctx.globalAlpha = 0.8;
        } else if (position < currentHeight * 0.8) {
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

    animationIdRef.current = requestAnimationFrame(animate);

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

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  };

  useEffect(() => {
    const timer = setTimeout(initMatrix, 100);
    return () => {
      clearTimeout(timer);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-15 transition-opacity duration-1000 ease-in-out"
      style={{
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

// Hand-drawn components (reused from your HeroSection)
const HandDrawnBorder = ({ isActive, color = "white" }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {["top", "right", "bottom", "left"].map((side, idx) => (
      <svg
        key={side}
        className={`absolute ${
          side === "top"
            ? "top-0 left-0 w-full h-1"
            : side === "right"
            ? "top-0 right-0 w-1 h-full"
            : side === "bottom"
            ? "bottom-0 left-0 w-full h-1"
            : "top-0 left-0 w-1 h-full"
        } transition-all duration-500 ease-in-out`}
        viewBox={
          side === "top" || side === "bottom" ? "0 0 100 1" : "0 0 1 100"
        }
        preserveAspectRatio="none"
      >
        <path
          d={
            side === "top"
              ? "M0,0.5 Q10,0.2 20,0.5 T40,0.3 T60,0.6 T80,0.4 T100,0.5"
              : side === "right"
              ? "M0.5,0 Q0.8,10 0.5,20 T0.7,40 T0.4,60 T0.6,80 T0.5,100"
              : side === "bottom"
              ? "M0,0.5 Q15,0.7 30,0.4 T50,0.6 T70,0.3 T90,0.7 T100,0.5"
              : "M0.5,0 Q0.3,15 0.5,30 T0.3,50 T0.6,70 T0.4,90 T0.5,100"
          }
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity={isActive ? 0.8 : 0.4}
          strokeLinecap="round"
          strokeDasharray={isActive ? "none" : "2,3"}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    ))}
  </div>
);

const HandDrawnCorners = ({ isActive, size = "sm" }) => (
  <>
    {[
      { pos: "top-1 left-1", d: "M0,12 Q0,0 12,0" },
      { pos: "top-1 right-1", d: "M0,0 Q12,0 12,12" },
      { pos: "bottom-1 left-1", d: "M0,0 Q0,12 12,12" },
      { pos: "bottom-1 right-1", d: "M12,0 Q12,12 0,12" },
    ].map((corner, idx) => (
      <div
        key={idx}
        className={`absolute ${corner.pos} transition-all duration-500 ease-in-out`}
      >
        <svg
          width={size === "sm" ? "12" : "16"}
          height={size === "sm" ? "12" : "16"}
          className={`transition-all duration-500 ease-in-out ${
            isActive ? "text-white" : "text-white/40"
          }`}
        >
          <path
            d={corner.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>
    ))}
  </>
);

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState({});
  const [hoverState, setHoverState] = useState({});
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "output", text: "ERROR 404: PAGE NOT FOUND" },
    {
      type: "output",
      text: "Location: /" + window.location.pathname.split("/").pop(),
    },
    { type: "output", text: "Type 'help' for navigation commands" },
    { type: "input", text: "visitor@404:~$ " },
  ]);
  const terminalEndRef = useRef(null);

  const commands = {
    home: "Return to homepage",
    back: "Go back to previous page",
    explore: "Browse available pages",
    refresh: "Refresh current page",
    help: "Show all commands",
  };

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

      setTerminalHistory((prev) => [
        ...prev,
        { type: "input", text: `visitor@404:~$ ${terminalInput}` },
      ]);

      if (cmd === "help") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Available navigation commands:" },
          ...Object.entries(commands).map(([cmd, desc]) => ({
            type: "output",
            text: `  ${cmd} - ${desc}`,
          })),
          { type: "input", text: "visitor@404:~$ " },
        ]);
      } else if (cmd === "home") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Navigating to homepage..." },
          { type: "input", text: "visitor@404:~$ " },
        ]);
        setTimeout(() => navigate("/"), 1000);
      } else if (cmd === "back") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Going back..." },
          { type: "input", text: "visitor@404:~$ " },
        ]);
        setTimeout(() => navigate(-1), 1000);
      } else if (cmd === "explore") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Available routes:" },
          { type: "output", text: "  / - Homepage" },
          { type: "output", text: "  /projects - Projects showcase" },
          { type: "output", text: "  /about - About me" },
          { type: "output", text: "  /contact - Get in touch" },
          { type: "input", text: "visitor@404:~$ " },
        ]);
      } else if (cmd === "refresh") {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "output", text: "Refreshing..." },
          { type: "input", text: "visitor@404:~$ " },
        ]);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setTerminalHistory((prev) => [
          ...prev,
          {
            type: "output",
            text: `Command not found: ${cmd}. Type 'help' for available commands.`,
          },
          { type: "input", text: "visitor@404:~$ " },
        ]);
      }

      setTerminalInput("");
    }
  };

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

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <MatrixBackground />

      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/30 to-black transition-all duration-1000 ease-in-out z-1" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto">
          {/* Error Code Display */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/5 rounded-full blur-xl"
              />
              <h1 className="text-8xl sm:text-9xl font-bold text-white relative z-10">
                4<span className="text-white/40">0</span>4
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-6"
              />
            </div>
            <p className="text-white/70 text-lg sm:text-xl mt-6 max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the
              digital void.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-white/5 relative group transition-all duration-500 ease-in-out"
              onMouseEnter={() =>
                setIsHovered((prev) => ({ ...prev, terminal: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prev) => ({ ...prev, terminal: false }))
              }
            >
              <HandDrawnBorder isActive={hoverState.terminal} />
              <HandDrawnCorners isActive={hoverState.terminal} />

              <div className="px-6 py-4 border-b border-white/10 bg-black/80 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: hoverState.terminal ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="w-2.5 h-2.5 bg-white/40 rounded-full"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-white/80" />
                      <span className="text-sm font-medium text-white/90 tracking-wide">
                        NAVIGATION TERMINAL
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <AlertCircle className="w-4 h-4 text-red-400/60" />
                    </motion.div>
                    <span className="text-xs text-white/40 font-mono">
                      ERROR
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 font-mono">
                <div className="h-48 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <div className="space-y-1">
                    {terminalHistory.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          item.type === "input"
                            ? "text-white/90"
                            : "text-white/60"
                        } ${
                          item.text.includes("ERROR") ? "text-red-400/80" : ""
                        }`}
                      >
                        {item.text}
                        {item.type === "input" &&
                          index === terminalHistory.length - 1 && (
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="ml-1 inline-block w-2 h-4 bg-white/80"
                            />
                          )}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                </div>

                <div className="flex items-center border-t border-white/10 pt-4">
                  <span className="text-white/80 font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalSubmit}
                    className="flex-1 bg-transparent border-none outline-none text-white px-3 font-mono text-sm placeholder-white/30"
                    placeholder="Type navigation command..."
                    autoFocus
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {["home", "back", "explore", "refresh"].map((cmd) => (
                    <motion.button
                      key={cmd}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickCommand(cmd)}
                      className="px-3 py-1.5 bg-white/5 text-white/70 rounded-lg text-xs border border-white/10 hover:border-white/30 hover:text-white transition-all duration-500"
                      onMouseEnter={() =>
                        setIsHovered((prev) => ({ ...prev, [cmd]: true }))
                      }
                      onMouseLeave={() =>
                        setIsHovered((prev) => ({ ...prev, [cmd]: false }))
                      }
                    >
                      {cmd}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Navigation Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Main Navigation Card */}
              <div
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 relative group"
                onMouseEnter={() =>
                  setIsHovered((prev) => ({ ...prev, navCard: true }))
                }
                onMouseLeave={() =>
                  setIsHovered((prev) => ({ ...prev, navCard: false }))
                }
              >
                <HandDrawnBorder isActive={hoverState.navCard} />

                <div className="flex items-center gap-3 mb-6">
                  <FileX className="w-6 h-6 text-white/80" />
                  <h2 className="text-xl font-bold text-white">
                    Navigation Options
                  </h2>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      icon: Home,
                      title: "Return Home",
                      desc: "Go back to the main portfolio",
                      action: () => navigate("/"),
                      color: "from-white/10 to-white/5",
                      border: "border-white/10",
                    },
                    {
                      icon: ArrowLeft,
                      title: "Go Back",
                      desc: "Return to previous page",
                      action: () => navigate(-1),
                      color: "from-white/5 to-black",
                      border: "border-white/10",
                    },
                    {
                      icon: Search,
                      title: "Explore Portfolio",
                      desc: "Browse available sections",
                      action: () => navigate("/#projects"),
                      color: "from-white/5 to-black",
                      border: "border-white/10",
                    },
                  ].map((option, index) => (
                    <motion.button
                      key={option.title}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={option.action}
                      className={`p-4 rounded-xl border ${option.border} bg-gradient-to-r ${option.color} text-left group/option hover:border-white/30 transition-all duration-500 relative overflow-hidden`}
                      onMouseEnter={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`option${index}`]: true,
                        }))
                      }
                      onMouseLeave={() =>
                        setIsHovered((prev) => ({
                          ...prev,
                          [`option${index}`]: false,
                        }))
                      }
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover/option:border-white/30 transition-all duration-500">
                          <option.icon className="w-5 h-5 text-white/80 group-hover/option:text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white group-hover/option:text-white/90">
                            {option.title}
                          </h3>
                          <p className="text-sm text-white/60 group-hover/option:text-white/80">
                            {option.desc}
                          </p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: hoverState[`option${index}`] ? 90 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-white/40 group-hover/option:text-white/60"
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Status & Search Card */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-500 relative group"
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({ ...prev, status: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({ ...prev, status: false }))
                  }
                >
                  <HandDrawnCorners isActive={hoverState.status} size="sm" />
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400/60" />
                    <span className="text-sm font-bold text-white/90">
                      STATUS
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">404</div>
                  <div className="text-xs text-white/40 mt-1">
                    PAGE NOT FOUND
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-500 relative group"
                  onMouseEnter={() =>
                    setIsHovered((prev) => ({ ...prev, search: true }))
                  }
                  onMouseLeave={() =>
                    setIsHovered((prev) => ({ ...prev, search: false }))
                  }
                >
                  <HandDrawnCorners isActive={hoverState.search} size="sm" />
                  <div className="flex items-center gap-3 mb-2">
                    <Compass className="w-4 h-4 text-blue-400/60" />
                    <span className="text-sm font-bold text-white/90">
                      SEARCH
                    </span>
                  </div>
                  <div className="text-xs text-white/60">
                    Try using the terminal to navigate
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-white/10 text-center"
          >
            <div className="inline-flex items-center gap-2 text-white/30 text-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-3 h-3" />
              </motion.div>
              <span>Digital void exploration in progress</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
