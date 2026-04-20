import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Calendar, LogOut, LayoutDashboard,
  ChevronDown, User, Command,
} from "lucide-react";
import logo from "../assets/logo-bg.png";

const NAV_ITEMS = [
  { id: "home",         label: "Home"         },
  { id: "about",        label: "About"        },
  { id: "projects",     label: "Projects"     },
  { id: "services",     label: "Services"     },
  { id: "testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [profileOpen, setProfileOpen]   = useState(false);
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const profileRef = useRef(null);
  const mobileRef  = useRef(null);
  const btnRef     = useRef(null);

  /* Auth check */
  useEffect(() => {
    const check = () => setIsLoggedIn(!!localStorage.getItem("adminToken"));
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  /* Scroll spy */
  useEffect(() => {
    let ticking = false;
    const sections = NAV_ITEMS.map((n) => n.id);
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const current = sections.find((id) => {
          const el = document.getElementById(id);
          if (!el) return false;
          const { top, bottom } = el.getBoundingClientRect();
          return top <= 120 && bottom >= 120;
        });
        if (current) setActiveSection(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Click outside */
  useEffect(() => {
    const fn = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ── Bar ── */}
        <div className={`transition-all duration-400 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.07]" : "bg-transparent"}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <button
                onClick={() => scrollTo("home")}
                className="flex items-center shrink-0"
              >
                <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
              </button>

              {/* Desktop nav — centered pill */}
              <div className="hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-white/8 bg-white/3 backdrop-blur-sm">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                        isActive ? "text-black" : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {/* Active pill background */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right side */}
              <div className="hidden md:flex items-center gap-2">
                {/* Cmd+K hint */}
                <button
                  onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 text-white/25 hover:text-white/45 hover:border-white/15 transition-all duration-200"
                  title="Open command palette"
                >
                  <Command className="w-3 h-3" />
                  <span className="text-[10px] font-mono">K</span>
                </button>

                {/* Admin profile */}
                {isLoggedIn && (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-[13px] font-medium"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Admin</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                        >
                          <div className="p-1.5">
                            <button onClick={() => { navigate("/dashboard"); setProfileOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/55 hover:text-white hover:bg-white/6 transition-all duration-150 text-[13px]">
                              <LayoutDashboard className="w-3.5 h-3.5" />
                              Dashboard
                            </button>
                            <div className="my-1 h-px bg-white/6" />
                            <button onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/4 transition-all duration-150 text-[13px]">
                              <LogOut className="w-3.5 h-3.5" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={() => scrollTo("contact")}
                  className="group flex items-center gap-2 px-4 py-2 bg-white text-black text-[13px] font-semibold rounded-full hover:bg-white/90 transition-colors duration-200"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book Call
                </button>
              </div>

              {/* Mobile burger */}
              <button
                ref={btnRef}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20 transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen
                    ? <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4 h-4" /></motion.div>
                    : <motion.div key="men" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.div>
                  }
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={mobileRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden border-b border-white/8 bg-black/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive ? "bg-white/8 text-white border border-white/12" : "text-white/50 hover:text-white hover:bg-white/4"
                      }`}
                    >
                      {item.label}
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white/60" />}
                    </motion.button>
                  );
                })}

                {isLoggedIn && (
                  <>
                    <div className="my-1 h-px bg-white/6" />
                    <button onClick={() => { navigate("/dashboard"); setMobileOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/4 text-sm transition-all duration-150">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-white/35 hover:text-white/60 hover:bg-white/4 text-sm transition-all duration-150">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Free Call
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
