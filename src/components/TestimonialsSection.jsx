import { useState, useEffect, useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";
import { useApi } from "../hooks/useApi";

const FALLBACK_REVIEWS = [
  { _id: "1", clientName: "Alex Chen",         company: "CTO at TechForward Inc.",    quote: "Absolutely transformative work! The attention to detail and technical excellence delivered results that exceeded all our expectations.", stars: 5 },
  { _id: "2", clientName: "Sarah Johnson",     company: "Product Manager at DesignHub", quote: "Working together was a game-changer for our platform. The intuitive UI/UX designs improved user engagement by 45%.", stars: 5 },
  { _id: "3", clientName: "Michael Rodriguez", company: "CEO at StartupScale",         quote: "The technical architecture implemented for our scaling needs was brilliant. We've grown 3x without any performance issues.", stars: 5 },
  { _id: "4", clientName: "Emma Williams",     company: "Lead Developer at CloudNine", quote: "The code quality and documentation were impeccable. Easy to maintain and extend. Our team learned so much from this collaboration.", stars: 5 },
  { _id: "5", clientName: "David Kim",         company: "Head of Marketing at BrandSync", quote: "The responsive redesign boosted our mobile conversion rate by 60%. The animations created a truly engaging experience.", stars: 5 },
  { _id: "6", clientName: "Lisa Wang",         company: "Operations Director at GlobalTech", quote: "Outstanding strategic guidance during our digital transformation. The technical roadmaps empowered our whole engineering team.", stars: 5 },
];

const getInitials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "??";

/* ─── Card ─── */
const TestimonialCard = memo(({ review }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="shrink-0 w-[300px] mx-2.5 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-white/18 hover:bg-white/[0.045] transition-colors duration-300 group cursor-default"
  >
    {/* Stars + quote icon */}
    <div className="flex items-start justify-between mb-3.5">
      <div className="flex gap-0.5">
        {Array.from({ length: review.stars || 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-white/70 text-white/70 group-hover:fill-white group-hover:text-white transition-colors duration-300" />
        ))}
      </div>
      <Quote className="w-4 h-4 text-white/10 group-hover:text-white/20 transition-colors duration-300" />
    </div>

    {/* Quote */}
    <p className="text-white/50 text-[13px] leading-relaxed mb-4 line-clamp-3 group-hover:text-white/70 transition-colors duration-300">
      "{review.quote}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-3.5 border-t border-white/[0.06]">
      {/* Avatar ring */}
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-white/6 border border-white/10 flex items-center justify-center">
          <span className="text-white/55 text-[10px] font-bold font-mono">
            {getInitials(review.clientName)}
          </span>
        </div>
        <motion.div
          className="absolute -inset-1 rounded-full border border-white/8"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ borderStyle: "dashed" }}
        />
      </div>
      <div className="min-w-0">
        <div className="text-white/75 text-xs font-semibold truncate group-hover:text-white transition-colors duration-300">
          {review.clientName}
        </div>
        <div className="text-white/30 text-[10px] truncate font-mono">{review.company}</div>
      </div>
    </div>
  </motion.div>
));

/* ─── Marquee row ─── */
const MarqueeRow = ({ items, direction = 1, speed = 45 }) => {
  const [paused, setPaused] = useState(false);
  const triple = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: direction > 0 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ animationPlayState: paused ? "paused" : "running" }}
        className="flex py-2"
      >
        {triple.map((review, i) => (
          <TestimonialCard key={`${review._id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Main ─── */
const TestimonialsSection = () => {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1, once: true });
  const { get: getReviews } = useApi();

  useEffect(() => {
    getReviews("/reviews").then((res) => {
      if (res?.data?.length) setReviews(res.data);
    }).catch(() => {});
  }, [getReviews]);

  const reversed = [...reviews].reverse();

  return (
    <div ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-mono text-white/40 tracking-[0.15em] uppercase">testimonials</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            What Clients Say
          </h2>

          <p className="text-sm text-white/35 font-mono">
            <span className="text-white/15">{"// "}</span>
            real feedback from real partnerships · hover to pause
          </p>
        </motion.div>
      </div>

      {/* ── Marquee rows ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <MarqueeRow items={reviews}   direction={1}  speed={45} />
        <MarqueeRow items={reversed}  direction={-1} speed={55} />
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.4 }}
        className="relative z-10 container mx-auto px-4 max-w-6xl mt-14"
      >
        <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-3 divide-x divide-white/[0.06] py-8">
            {[
              { value: `${reviews.length}+`, label: "Happy Clients"    },
              { value: "100%",               label: "Satisfaction Rate" },
              { value: "5.0",                label: "Average Rating"    },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 px-4">
                <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] font-mono text-white/28 tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
