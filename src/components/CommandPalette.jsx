import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Home, Code2, User, Briefcase, Star, Phone,
  Github, Linkedin, Twitter, Instagram, Mail, Calendar,
  Copy, Check, ArrowRight, Command, Hash,
} from "lucide-react";

const COMMANDS = [
  {
    group: "Navigate",
    items: [
      { id: "home",         label: "Go to Home",         icon: Home,      action: "scroll", target: "home"         },
      { id: "about",        label: "Go to About",        icon: User,      action: "scroll", target: "about"        },
      { id: "projects",     label: "View Projects",      icon: Code2,     action: "scroll", target: "projects"     },
      { id: "services",     label: "View Services",      icon: Briefcase, action: "scroll", target: "services"     },
      { id: "testimonials", label: "See Testimonials",   icon: Star,      action: "scroll", target: "testimonials" },
      { id: "contact",      label: "Contact / Book Call",icon: Phone,     action: "scroll", target: "contact"      },
    ],
  },
  {
    group: "Social",
    items: [
      { id: "github",    label: "Open GitHub",    icon: Github,    action: "url", target: "https://github.com/mahim-shariar"                     },
      { id: "linkedin",  label: "Open LinkedIn",  icon: Linkedin,  action: "url", target: "https://www.linkedin.com/in/md-mahim-7957381a7/"      },
      { id: "twitter",   label: "Open X / Twitter", icon: Twitter, action: "url", target: "https://x.com/Being_MsMahim"                          },
      { id: "instagram", label: "Open Instagram", icon: Instagram, action: "url", target: "https://www.instagram.com/being_mahimtalukder/"       },
    ],
  },
  {
    group: "Actions",
    items: [
      { id: "book",        label: "Book a Free Call",    icon: Calendar, action: "scroll", target: "contact"                     },
      { id: "email",       label: "Copy Email Address",  icon: Mail,     action: "copy",   target: "mdmahim924214@gmail.com"      },
    ],
  },
];

const ALL_ITEMS = COMMANDS.flatMap((g) => g.items.map((i) => ({ ...i, group: g.group })));

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  /* Open on Cmd+K / Ctrl+K */
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query.trim()
    ? ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()) || i.group.toLowerCase().includes(query.toLowerCase()))
    : ALL_ITEMS;

  const execute = useCallback((item) => {
    setOpen(false);
    if (item.action === "scroll") {
      setTimeout(() => {
        const el = document.getElementById(item.target) || document.querySelector(`[id="${item.target}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    } else if (item.action === "url") {
      window.open(item.target, "_blank", "noopener,noreferrer");
    } else if (item.action === "copy") {
      navigator.clipboard.writeText(item.target).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, []);

  /* Keyboard navigation */
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && filtered[cursor]) {
      execute(filtered[cursor]);
    }
  };

  /* Scroll active item into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  /* Group the filtered results */
  const grouped = query.trim()
    ? [{ group: "Results", items: filtered }]
    : COMMANDS.map((g) => ({ ...g, items: ALL_ITEMS.filter((i) => i.group === g.group) }));

  return (
    <>
      {/* Hint badge — bottom right */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md text-white/35 hover:text-white/60 hover:border-white/20 transition-all duration-200 shadow-xl"
        data-cursor="hover"
      >
        <Command className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono tracking-widest">K</span>
        <span className="text-[10px] font-mono text-white/20 ml-1">Command</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="cp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9990]"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <div className="fixed inset-0 z-[9991] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
              <motion.div
                key="cp-panel"
                initial={{ opacity: 0, scale: 0.96, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl pointer-events-auto"
              >
                <div className="rounded-2xl border border-white/12 bg-[#0a0a0a] shadow-2xl overflow-hidden">
                  {/* Search input */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                    <Search className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
                      onKeyDown={onKeyDown}
                      placeholder="Type a command or search…"
                      className="flex-1 bg-transparent text-white/80 placeholder-white/25 text-sm outline-none font-mono"
                    />
                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-[9px] font-mono text-white/25">ESC</kbd>
                  </div>

                  {/* Results */}
                  <div ref={listRef} className="max-h-[360px] overflow-y-auto py-2">
                    {filtered.length === 0 ? (
                      <div className="px-4 py-8 text-center text-white/25 text-sm font-mono">
                        No commands found for "{query}"
                      </div>
                    ) : (
                      (() => {
                        let globalIdx = 0;
                        return grouped.map((g) => (
                          g.items.length > 0 && (
                            <div key={g.group}>
                              <div className="flex items-center gap-2 px-4 py-2">
                                <Hash className="w-3 h-3 text-white/15" />
                                <span className="text-[10px] font-mono text-white/20 tracking-[0.15em] uppercase">{g.group}</span>
                              </div>
                              {g.items.map((item) => {
                                const idx = globalIdx++;
                                const isActive = cursor === idx;
                                const ItemIcon = item.icon;
                                return (
                                  <motion.button
                                    key={item.id}
                                    data-index={idx}
                                    onClick={() => execute(item)}
                                    onMouseEnter={() => setCursor(idx)}
                                    initial={false}
                                    animate={{ backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)" }}
                                    transition={{ duration: 0.1 }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left group"
                                  >
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${isActive ? "bg-white/12" : "bg-white/[0.04]"}`}>
                                      {item.id === "email" && copied
                                        ? <Check className="w-3.5 h-3.5 text-white/70" />
                                        : <ItemIcon className={`w-3.5 h-3.5 transition-colors duration-150 ${isActive ? "text-white/75" : "text-white/30"}`} />
                                      }
                                    </div>
                                    <span className={`flex-1 text-[13px] transition-colors duration-150 ${isActive ? "text-white/85" : "text-white/45"}`}>
                                      {item.id === "email" && copied ? "Email copied!" : item.label}
                                    </span>
                                    {isActive && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -4 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-1"
                                      >
                                        <kbd className="px-1.5 py-0.5 rounded border border-white/10 text-[9px] font-mono text-white/30">↵</kbd>
                                      </motion.div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          )
                        ));
                      })()
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      {[
                        { keys: "↑↓", desc: "navigate" },
                        { keys: "↵",  desc: "select"   },
                        { keys: "esc",desc: "close"    },
                      ].map((k) => (
                        <div key={k.desc} className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 rounded border border-white/8 text-[9px] font-mono text-white/20">{k.keys}</kbd>
                          <span className="text-[9px] font-mono text-white/15">{k.desc}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Command className="w-3 h-3 text-white/15" />
                      <span className="text-[9px] font-mono text-white/15">Command Palette</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
