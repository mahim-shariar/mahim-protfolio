import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Calendar, Clock, Video, Shield, Zap, CheckCircle,
  Github, Linkedin, Twitter, Instagram, Mail,
  ExternalLink, X, Maximize2, Minimize2, ArrowRight,
  Copy, Check, Sparkles, MessageSquare,
} from "lucide-react";

const SOCIAL = [
  { label: "GitHub",    icon: Github,    url: "https://github.com/mahim-shariar",                    },
  { label: "LinkedIn",  icon: Linkedin,  url: "https://www.linkedin.com/in/md-mahim-7957381a7/",     },
  { label: "X",         icon: Twitter,   url: "https://x.com/Being_MsMahim",                         },
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/being_mahimtalukder/",      },
];

const BENEFITS = [
  { icon: Clock,   title: "Flexible Scheduling", desc: "Book at your convenience, any timezone"   },
  { icon: Video,   title: "Video Call Ready",    desc: "Google Meet / Zoom links auto-generated"  },
  { icon: Shield,  title: "Secure & Private",    desc: "End-to-end encrypted scheduling system"   },
  { icon: Zap,     title: "Instant Confirmation",desc: "Calendar invites sent immediately"        },
];

/* ─── TidyCal modal ─── */
const CalendarModal = ({ onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className={`relative bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
            fullscreen ? "fixed inset-4" : "w-full max-w-4xl h-[82vh]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-white/60" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Schedule a Call</div>
                <div className="text-[10px] font-mono text-white/30">Powered by TidyCal</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setFullscreen(!fullscreen)}
                className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/6 transition-colors">
                {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <a href="https://tidycal.com/mdmahim924214/30-minute-meeting" target="_blank" rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/6 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button onClick={onClose}
                className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/6 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="flex-1 relative">
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black z-10">
                <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
                <span className="text-white/30 text-xs font-mono">Loading calendar…</span>
              </div>
            )}
            <iframe
              src="https://tidycal.com/mdmahim924214/30-minute-meeting"
              title="Book a call"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/8 shrink-0">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-white/25" />
              <span className="text-[10px] font-mono text-white/25">Secure booking</span>
            </div>
            <span className="text-[10px] font-mono text-white/20">30-minute free consultation</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

/* ─── Copy email button ─── */
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const email = "mdmahim924214@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/18 hover:bg-white/[0.04] transition-all duration-200"
    >
      <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-white/65 transition-colors" />
      <span className="text-[12px] font-mono text-white/40 group-hover:text-white/65 transition-colors">{email}</span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Check className="w-3.5 h-3.5 text-white/70" />
          </motion.div>
        ) : (
          <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Copy className="w-3.5 h-3.5 text-white/25 group-hover:text-white/50 transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

/* ─── Main ─── */
const ContactSection = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: true });

  useEffect(() => {
    document.body.style.overflow = showCalendar ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showCalendar]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay, ease: "easeOut" },
  });

  return (
    <div ref={sectionRef} id="contact" className="relative py-24 bg-black overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">get in touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Let's Build Together
          </h2>
          <p className="text-sm text-white/35 font-mono">
            <span className="text-white/15">{"// "}</span>
            book a free 30-minute consultation
          </p>
        </motion.div>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* LEFT — CTA + social */}
          <div className="flex flex-col gap-5">

            {/* Big booking card */}
            <motion.div {...fadeUp(0.1)} className="relative rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

              {/* Subtle radial bg */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,255,255,0.015), transparent)" }} />

              <div className="relative p-8 sm:p-10">
                <div className="max-w-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80" />
                    </span>
                    <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase">Available for new projects</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                    Have a project<br />
                    <span className="text-white/45">in mind?</span>
                  </h3>

                  <p className="text-white/40 text-[14px] leading-relaxed mb-8 max-w-sm">
                    Book a free 30-minute call. We'll discuss your goals, timeline, and how I can help bring your vision to life.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      onClick={() => setShowCalendar(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center gap-2.5 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors duration-200"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Free Call
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </motion.button>
                    <CopyEmail />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.18)} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">Connect Online</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                      className="group flex flex-col items-center gap-2 py-4 rounded-xl border border-white/6 bg-white/[0.015] hover:border-white/14 hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <SIcon className="w-4 h-4 text-white/35 group-hover:text-white/70 transition-colors duration-200" />
                      <span className="text-[10px] font-mono text-white/30 group-hover:text-white/55 transition-colors duration-200">{s.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Benefits */}
          <motion.div {...fadeUp(0.22)} className="flex flex-col gap-4">

            {/* Benefits list */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-white/30" />
                <span className="text-[11px] font-mono text-white/30 tracking-[0.15em] uppercase">What to expect</span>
              </div>
              {BENEFITS.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: 12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="group flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.015] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] group-hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors duration-200">
                      <BIcon className="w-3.5 h-3.5 text-white/45 group-hover:text-white/70 transition-colors duration-200" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/65 mb-0.5">{b.title}</div>
                      <div className="text-[11px] text-white/30 leading-relaxed">{b.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick info strip */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="space-y-3">
                {[
                  { label: "Response Time", value: "< 24 hours"     },
                  { label: "Call Duration",  value: "30 minutes"     },
                  { label: "Platform",       value: "Google Meet"    },
                  { label: "Cost",           value: "Completely free" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-[11px] font-mono text-white/28">{item.label}</span>
                    <span className="text-[11px] font-mono text-white/55">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timezone note */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.015]">
              <Clock className="w-3.5 h-3.5 text-white/25 shrink-0" />
              <span className="text-[11px] font-mono text-white/28">Available worldwide · All timezones welcome</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calendar modal */}
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} />}
    </div>
  );
};

export default ContactSection;
