import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [variant, setVariant] = useState("default"); // default | hover | click | text

  /* Spring-smoothed ring lags slightly behind */
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.6 });

  /* Dot tracks exactly */
  const dotX = useSpring(cursorX, { stiffness: 600, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 28 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down  = () => setVariant("click");
    const up    = () => setVariant("default");

    const over = (e) => {
      const t = e.target;
      if (t.matches("a, button, [role='button'], [data-cursor='hover']")) {
        setVariant("hover");
      } else if (t.matches("p, h1, h2, h3, h4, h5, h6, span, li")) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  /* Hide on touch devices */
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  if (isTouchDevice) return null;

  const ringSize   = variant === "hover" ? 40 : variant === "click" ? 20 : 28;
  const ringOpacity = variant === "hover" ? 0.5 : 0.2;
  const dotSize    = variant === "click" ? 4 : variant === "hover" ? 3 : 5;

  return (
    <>
      {/* Hide native cursor globally via style */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer lagging ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          opacity: ringOpacity,
        }}
        animate={{ width: ringSize, height: ringSize, opacity: ringOpacity }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer ring glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize + 8,
          height: ringSize + 8,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
      />

      {/* "hover" label for interactive elements */}
      {variant === "hover" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{ x: dotX, y: dotY, translateX: "10px", translateY: "-20px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
        >
          <div className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold tracking-widest uppercase whitespace-nowrap">
            Click
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
