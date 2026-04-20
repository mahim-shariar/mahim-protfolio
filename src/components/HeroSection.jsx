import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Zap,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Download,
  MapPin,
  Code2,
  Sparkles,
} from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiDocker,
} from "react-icons/si";
import { useApi } from "../hooks/useApi";
import logo from "../assets/my-profile.png";

/* ─── Matrix background (unchanged) ─── */
const MatrixBackground = memo(() => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  const initMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      return { dpr };
    };

    const { dpr } = setCanvasSize();
    const ctx = canvas.getContext("2d");
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~ 你好世界北京上海中国文化";
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
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `500 ${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = "center";
      for (let i = 0; i < rainDrops.length; i++) {
        if (i * fontSize > w) continue;
        const char = characters[Math.floor(Math.random() * characters.length)];
        const pos = rainDrops[i] * fontSize;
        let color;
        if (pos < h * 0.2) { color = colors.primary; ctx.globalAlpha = 1.0; }
        else if (pos < h * 0.5) { color = colors.secondary; ctx.globalAlpha = 0.8; }
        else if (pos < h * 0.8) { color = colors.tertiary; ctx.globalAlpha = 0.6; }
        else { color = colors.dark; ctx.globalAlpha = 0.4; }
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);
        ctx.shadowBlur = 0;
        rainDrops[i] += 0.8 + Math.random() * 0.4;
        if (rainDrops[i] * fontSize > h && Math.random() > 0.97) rainDrops[i] = 0;
      }
      ctx.globalAlpha = 1.0;
    }

    let lastTime = 0;
    const interval = 1000 / 24;
    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      if (delta > interval) { draw(); lastTime = timestamp - (delta % interval); }
      animationIdRef.current = requestAnimationFrame(animate);
    }
    animationIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const { dpr: newDpr } = setCanvasSize();
      const newCols = Math.floor(canvas.width / newDpr / fontSize);
      const newDrops = Array(newCols).fill(1);
      for (let i = 0; i < Math.min(rainDrops.length, newCols); i++) newDrops[i] = rainDrops[i];
      rainDrops.length = newCols;
      for (let i = 0; i < newCols; i++) rainDrops[i] = newDrops[i] || 1;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanup = initMatrix();
      if (cleanup) return cleanup;
    }, 100);
    return () => {
      clearTimeout(timer);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [initMatrix]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-[0.15] pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
});

/* ─── Typewriter hook ─── */
const useTypewriter = (texts, speed = 75, pauseMs = 2200) => {
  const [display, setDisplay] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[ti];
    const id = setTimeout(() => {
      if (!deleting) {
        if (ci < current.length) {
          setDisplay(current.slice(0, ci + 1));
          setCi((v) => v + 1);
        } else {
          setTimeout(() => setDeleting(true), pauseMs);
        }
      } else {
        if (ci > 0) {
          setDisplay(current.slice(0, ci - 1));
          setCi((v) => v - 1);
        } else {
          setDeleting(false);
          setTi((v) => (v + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [ci, deleting, ti, texts, speed, pauseMs]);

  return display;
};

/* ─── Floating skill chips (desktop only) ─── */
const CHIPS = [
  { name: "React", Icon: FaReact,      x: "-left-20", y: "top-10"         },
  { name: "TypeScript", Icon: SiTypescript, x: "-right-20", y: "top-16"   },
  { name: "Node.js", Icon: FaNodeJs,   x: "-left-24", y: "top-1/2"        },
  { name: "Next.js", Icon: SiNextdotjs,x: "-right-24", y: "top-1/2"       },
  { name: "MongoDB", Icon: SiMongodb,  x: "-left-20", y: "bottom-16"      },
  { name: "Tailwind", Icon: SiTailwindcss, x: "-right-20", y: "bottom-10" },
];

/* ─── Stagger animation helper ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" },
});

/* ─── Main component ─── */
const HeroSection = () => {
  const api = useApi();
  const [content, setContent] = useState({
    name: "Md. Mahim Shariar",
    title: "MERN Stack Developer",
    description:
      "Building scalable web applications with modern technologies. Passionate about clean code, user experience, and solving complex problems with elegant solutions.",
    resume: "",
    social: { github: "", linkedin: "", email: "" },
    projectCount: "50+",
    experienceYears: "3+",
  });

  useEffect(() => {
    api.get("/content").then((res) => {
      if (res?.data) {
        setContent({
          name: res.data.name || "Md. Mahim Shariar",
          title: res.data.title || "MERN Stack Developer",
          description: res.data.description || "Building scalable web applications with modern technologies. Passionate about clean code, user experience, and solving complex problems with elegant solutions.",
          resume: res.data.resume || "",
          social: {
            github: res.data.social?.github || "",
            linkedin: res.data.social?.linkedin || "",
            email: res.data.social?.email || "",
          },
          projectCount: res.data.projectCount?.toString() || "50+",
          experienceYears: res.data.experienceYears?.toString() || "3+",
        });
      }
    }).catch(() => {});
  }, [api]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => { document.documentElement.style.overflow = "auto"; }, 100);
    return () => { clearTimeout(t); document.documentElement.style.overflow = "auto"; };
  }, []);

  const roleText = useTypewriter([
    "MERN Stack Developer",
    "Full Stack Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Split name: first part + last name
  const nameParts = content.name.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const firstName = nameParts.slice(0, -1).join(" ");

  return (
    <div id="home" className="relative min-h-screen bg-black overflow-hidden flex items-center">
      <MatrixBackground />

      {/* Radial top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.04), transparent)",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full container mx-auto px-6 lg:px-8 pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">

          {/* ─── LEFT: Text ─── */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Available badge */}
            <motion.div {...fadeUp(0.05)} className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
                </span>
                <span className="text-[11px] font-mono text-white/45 tracking-[0.18em] uppercase">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Name — big editorial */}
            <motion.div {...fadeUp(0.12)} className="mb-5">
              <h1 className="font-bold text-white leading-[0.88] tracking-tight select-none">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white">
                  {firstName}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white/50">
                  {lastName}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div {...fadeUp(0.2)} className="mb-7">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-px bg-white/20" />
                <span className="font-mono text-[13px] text-white/35 tracking-[0.12em] uppercase">
                  {roleText}
                  <span className="inline-block w-0.5 h-3.5 bg-white/40 ml-0.5 align-middle animate-pulse" />
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p {...fadeUp(0.28)} className="text-white/40 text-[15px] leading-relaxed mb-10 max-w-lg font-light">
              {content.description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo("contact")}
                className="group flex items-center gap-2.5 px-6 py-3 bg-white text-black text-[13px] font-semibold rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                Let's work together
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollTo("projects")}
                className="flex items-center gap-2.5 px-6 py-3 border border-white/12 text-white/60 text-[13px] font-medium rounded-full hover:border-white/25 hover:text-white hover:bg-white/4 transition-all duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View projects
              </button>
              {content.resume && (
                <button
                  onClick={() => window.open(content.resume, "_blank")}
                  className="flex items-center gap-2 px-5 py-3 border border-white/8 text-white/35 text-[13px] rounded-full hover:border-white/18 hover:text-white/55 transition-all duration-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </button>
              )}
            </motion.div>

            {/* Social + stats row */}
            <motion.div {...fadeUp(0.44)} className="flex flex-wrap items-center gap-5">
              {/* Social icons */}
              <div className="flex gap-2">
                {[
                  { Icon: Github,   href: content.social.github,               label: "GitHub" },
                  { Icon: Linkedin, href: content.social.linkedin,             label: "LinkedIn" },
                  { Icon: Mail,     href: `mailto:${content.social.email}`,    label: "Email" },
                ].map((social) => {
                  const SocialIcon = social.Icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 border border-white/8 rounded-xl text-white/35 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all duration-200"
                    >
                      <SocialIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              <div className="h-5 w-px bg-white/10" />

              {/* Stats */}
              <div className="flex gap-7">
                {[
                  { value: content.projectCount,    label: "Projects" },
                  { value: content.experienceYears, label: "Yrs exp" },
                  { value: "100%",                  label: "Committed" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-bold text-white/90 leading-none mb-0.5">{s.value}</div>
                    <div className="text-[9px] font-mono text-white/22 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT: Photo ─── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
              className="relative"
            >
              {/* Floating skill chips — desktop only */}
              {CHIPS.map((chip, i) => {
                const ChipIcon = chip.Icon;
                return (
                  <motion.div
                    key={chip.name}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85 + i * 0.09, type: "spring", stiffness: 200 }}
                    className={`absolute ${chip.x} ${chip.y} hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-black/80 border border-white/8 rounded-full backdrop-blur-sm z-20`}
                  >
                    <ChipIcon className="w-3 h-3 text-white/45" />
                    <span className="text-[9px] font-mono text-white/38 whitespace-nowrap">{chip.name}</span>
                  </motion.div>
                );
              })}

              {/* Photo frame */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-88 lg:w-80 lg:h-[420px]">
                {/* Corner accents */}
                {[
                  "absolute -top-2 -left-2 border-t-2 border-l-2 rounded-tl-md",
                  "absolute -top-2 -right-2 border-t-2 border-r-2 rounded-tr-md",
                  "absolute -bottom-2 -left-2 border-b-2 border-l-2 rounded-bl-md",
                  "absolute -bottom-2 -right-2 border-b-2 border-r-2 rounded-br-md",
                ].map((cls, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className={`${cls} w-5 h-5 border-white/20`}
                  />
                ))}

                {/* Image */}
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] relative">
                  <img
                    src={logo}
                    alt={content.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Scan line effect — subtle */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
                    }}
                  />
                </div>

                {/* Bottom info chips */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/8 rounded-lg">
                    <MapPin className="w-2.5 h-2.5 text-white/35" />
                    <span className="text-[9px] font-mono text-white/35 tracking-wide">Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/8 rounded-lg">
                    <Sparkles className="w-2.5 h-2.5 text-white/35" />
                    <span className="text-[9px] font-mono text-white/35 tracking-wide">Open to work</span>
                  </div>
                </div>

                {/* Glow behind photo */}
                <div
                  className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }}
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* ─── Scroll indicator ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[9px] font-mono text-white/18 tracking-[0.25em] uppercase">scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-white/18" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
