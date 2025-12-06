import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Quote,
  Star,
  User,
  Building,
  Sparkles,
  Terminal,
  MessageSquare,
} from "lucide-react";

const TestimonialsSection = () => {
  const [isHovered, setIsHovered] = useState({});
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

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

  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      title: "CTO at TechForward Inc.",
      quote:
        "Absolutely transformative work! The attention to detail and technical excellence delivered results that exceeded all our expectations.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Product Manager at DesignHub",
      quote:
        "Working together was a game-changer for our platform. The intuitive UI/UX designs improved user engagement by 45%.",
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      title: "CEO at StartupScale",
      quote:
        "The technical architecture implemented for our scaling needs was brilliant. We've grown 3x without any performance issues.",
    },
    {
      id: 4,
      name: "Emma Williams",
      title: "Lead Developer at CloudNine",
      quote:
        "The code quality and documentation were impeccable. Easy to maintain and extend. Our team learned so much.",
    },
    {
      id: 5,
      name: "David Kim",
      title: "Head of Marketing at BrandSync",
      quote:
        "The responsive redesign boosted our mobile conversion rate by 60%. The animations created an engaging experience.",
    },
    {
      id: 6,
      name: "Lisa Wang",
      title: "Operations Director at GlobalTech",
      quote:
        "Outstanding strategic guidance during our digital transformation. The technical roadmaps empowered our engineers.",
    },
  ];

  const HandDrawnBorder = ({ isActive, color = "white", className = "" }) => (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <svg
        className="absolute top-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
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
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute top-0 right-0 w-1 h-full transition-all duration-700 ease-in-out"
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
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-700 ease-in-out"
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
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      <svg
        className="absolute top-0 left-0 w-1 h-full transition-all duration-700 ease-in-out"
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
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
    </div>
  );

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 2;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["-100px", "100vh"],
              opacity: [0, 0.2, 0],
              x: [0, (Math.random() - 0.5) * 15, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating ? "fill-white text-white" : "text-white/20"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden py-20"
    >
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 inline-block group hover:bg-black/60 transition-all duration-700"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, header: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, header: false }))
            }
          >
            <HandDrawnBorder isActive={isHovered.header} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex gap-1.5 mb-6 justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 rounded-full bg-white/40"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 rounded-full bg-white/60"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 rounded-full bg-white/80"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              TESTIMONIALS
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <MessageSquare className="w-5 h-5 text-white/60" />
              <span className="text-white/40 font-mono text-sm">
                $ testimonials --trust --proof
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* SIMPLIFIED FIX: Put quote icons INSIDE the card with proper positioning */}
        <div className="space-y-12">
          {/* Top Marquee - Left to Right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-left hover:animation-paused">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`top-${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 mx-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full group hover:bg-black/60 hover:border-white/30 transition-all duration-500"
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`top-${testimonial.id}`]: true,
                      }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`top-${testimonial.id}`]: false,
                      }))
                    }
                  >
                    <HandDrawnBorder
                      isActive={isHovered[`top-${testimonial.id}`]}
                    />

                    {/* SIMPLE QUOTE ICON - INSIDE THE CARD */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <Quote className="w-4 h-4 text-white/80" />
                    </div>

                    {/* Stars */}
                    <div className="mb-4 flex">
                      <StarRating rating={5} />
                    </div>

                    {/* Quote Text */}
                    <p className="text-white/70 text-sm italic mb-6 leading-relaxed line-clamp-3">
                      "{testimonial.quote}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-white/80" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-white/40 text-xs">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Right to Left */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-right hover:animation-paused">
              {[
                ...testimonials.slice().reverse(),
                ...testimonials.slice().reverse(),
              ].map((testimonial, index) => (
                <motion.div
                  key={`bottom-${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 mx-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full group hover:bg-black/60 hover:border-white/30 transition-all duration-500"
                    onMouseEnter={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`bottom-${testimonial.id}`]: true,
                      }))
                    }
                    onMouseLeave={() =>
                      setIsHovered((prev) => ({
                        ...prev,
                        [`bottom-${testimonial.id}`]: false,
                      }))
                    }
                  >
                    <HandDrawnBorder
                      isActive={isHovered[`bottom-${testimonial.id}`]}
                    />

                    {/* SIMPLE QUOTE ICON - INSIDE THE CARD (Different style for bottom row) */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-white/40" />
                        <span className="text-white/40 text-xs">
                          Verified Client
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Quote className="w-4 h-4 text-white/80" />
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-white/70 text-sm mb-6 leading-relaxed line-clamp-3">
                      "{testimonial.quote}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center">
                          <span className="text-white/80 text-xs font-mono">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-white text-white" />
                            <span className="text-white/40 text-xs">5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-20">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rotate-45 bg-white/10 border border-white/20" />
          </div>
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div
            className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group hover:bg-black/60 transition-all duration-700"
            onMouseEnter={() =>
              setIsHovered((prev) => ({ ...prev, summary: true }))
            }
            onMouseLeave={() =>
              setIsHovered((prev) => ({ ...prev, summary: false }))
            }
          >
            <HandDrawnBorder isActive={isHovered.summary} />

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                Proven Track Record
              </h3>

              <p className="text-white/60 max-w-xl mx-auto mb-6">
                Every testimonial represents a successful partnership built on
                trust, quality, and exceptional results. Join the growing list
                of satisfied clients who have transformed their digital
                presence.
              </p>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50+</div>
                  <div className="text-white/40 text-sm">Happy Clients</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-white/40 text-sm">Satisfaction</div>
                </div>
                <div className="h-12 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5.0</div>
                  <div className="text-white/40 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }

        .hover:animation-paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsSection;
