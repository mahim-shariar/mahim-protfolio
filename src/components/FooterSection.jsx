import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Github, Linkedin, Twitter, Instagram,
  Mail, ArrowUp, ArrowRight, Terminal,
  Heart, Calendar,
} from "lucide-react";
import { useApi } from "../hooks/useApi";
import logo from "../assets/logo-bg.png";

const SOCIAL = [
  { label: "GitHub",    icon: Github,    url: "https://github.com/mahim-shariar"                   },
  { label: "LinkedIn",  icon: Linkedin,  url: "https://www.linkedin.com/in/md-mahim-7957381a7/"    },
  { label: "X",         icon: Twitter,   url: "https://x.com/Being_MsMahim"                        },
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/being_mahimtalukder/"     },
];

const NAV = [
  { label: "Home",         id: "home"         },
  { label: "About",        id: "about"        },
  { label: "Projects",     id: "projects"     },
  { label: "Services",     id: "services"     },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact",      id: "contact"      },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const FooterSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: true });
  const [showTop, setShowTop] = useState(false);
  const [contentData, setContentData] = useState(null);
  const year = new Date().getFullYear();

  const { get: getContent } = useApi();

  useEffect(() => {
    getContent("/content")
      .then((r) => setContentData(r?.data || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: "easeOut" },
  });

  return (
    <>
      <footer ref={sectionRef} className="relative bg-black overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Top separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 max-w-6xl">

          {/* ── Large editorial wordmark ── */}
          <motion.div {...fadeUp(0)} className="py-16 border-b border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/80" />
                    </span>
                    <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Open to work</span>
                  </div>
                </div>
                <p className="text-white/25 text-sm font-mono max-w-xs">
                  {contentData?.title || "Building digital experiences that matter."}
                </p>
              </div>

              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group self-start sm:self-auto flex items-center gap-2.5 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors duration-200 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book a Free Call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            </div>
          </motion.div>

          {/* ── Main grid ── */}
          <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 border-b border-white/[0.06]">

            {/* Brand col */}
            <motion.div {...fadeUp(0.08)}>
              <div className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase mb-4">About</div>
              <p className="text-white/35 text-[13px] leading-relaxed mb-6 max-w-xs">
                Full-stack developer crafting performant, pixel-perfect web applications with a focus on user experience.
              </p>
              <div className="flex items-center gap-2">
                {SOCIAL.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      title={s.label}
                      className="w-8 h-8 rounded-lg border border-white/8 bg-white/[0.03] flex items-center justify-center text-white/35 hover:text-white/70 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200"
                    >
                      <SIcon className="w-3.5 h-3.5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation col */}
            <motion.div {...fadeUp(0.14)}>
              <div className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase mb-4">Navigate</div>
              <ul className="space-y-2.5">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.2 + i * 0.04 }}
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="group flex items-center gap-2 text-white/35 hover:text-white/70 text-[13px] transition-colors duration-200"
                    >
                      <span className="w-3 h-px bg-white/15 group-hover:w-5 group-hover:bg-white/40 transition-all duration-200" />
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats col */}
            <motion.div {...fadeUp(0.20)}>
              <div className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase mb-4">Stats</div>
              <div className="space-y-4">
                {[
                  { value: `${contentData?.experienceYears ?? 3}+`, label: "Years experience" },
                  { value: `${contentData?.projectCount ?? 20}+`,   label: "Projects shipped" },
                  { value: "100%",                                    label: "Client satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white/80 tracking-tight">{stat.value}</div>
                    <div className="text-[11px] font-mono text-white/25 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact col */}
            <motion.div {...fadeUp(0.26)}>
              <div className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase mb-4">Contact</div>
              <div className="space-y-3">
                <a
                  href={`mailto:${contentData?.email || "mdmahim924214@gmail.com"}`}
                  className="group flex items-center gap-2.5 text-white/35 hover:text-white/65 text-[13px] transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono text-[11px] truncate">
                    {contentData?.email || "mdmahim924214@gmail.com"}
                  </span>
                </a>

                <div className="pt-2 space-y-2">
                  {["Freelance projects", "Full-time roles", "Consultation"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-white/30 text-[11px]">
                      <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <motion.div {...fadeUp(0.32)} className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/20 text-[11px] font-mono">
              <Terminal className="w-3 h-3" />
              <span>© {year} {contentData?.name || "Mahim"}. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-1 text-white/15 text-[11px] font-mono">
              <Heart className="w-3 h-3" />
              <span>Built with passion &amp; coffee</span>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-6 z-40 w-9 h-9 rounded-xl border border-white/10 bg-black/80 backdrop-blur-sm text-white/50 hover:text-white hover:border-white/25 hover:bg-black/90 transition-all duration-200 flex items-center justify-center shadow-xl"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FooterSection;
