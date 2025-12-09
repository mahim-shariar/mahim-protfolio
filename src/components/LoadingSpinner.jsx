import { motion } from "framer-motion";
import logo from "../assets/logo-bg.png";

const ModernPulseLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Main pulse container */}
      <div className="relative mb-8">
        {/* Triple pulse rings - More visible */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/40"
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.5, 0, 0.5],
            borderWidth: ["2px", "5px", "2px"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.9, 1],
            opacity: [0.4, 0, 0.4],
            borderWidth: ["2px", "6px", "2px"],
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{
            scale: [1, 2.1, 1],
            opacity: [0.3, 0, 0.3],
            borderWidth: ["2px", "7px", "2px"],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
        />

        {/* Logo with more visible pulse */}
        <motion.div
          className="relative w-40 h-40 flex items-center justify-center"
          animate={{
            scale: [1, 1.07, 1],
            filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img src={logo} alt="Loading" className="w-32 h-32 object-contain" />

          {/* More visible pulsing border around logo */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{
              borderWidth: ["1px", "3px", "1px"],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 15px rgba(255,255,255,0.15)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center">
        {/* Text with more visible pulse */}
        <motion.div
          className="text-white/80 text-sm tracking-[0.3em] mb-4 font-medium"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.02, 1],
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 10px rgba(255,255,255,0.3)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          LOADING
        </motion.div>

        {/* Progress bar with more visible animation */}
        <div className="w-44 h-1.5 bg-white/15 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-white"
            animate={{
              width: ["0%", "100%", "0%"],
              x: ["0%", "0%", "100%"],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 8px rgba(255,255,255,0.4)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* More visible loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/80 rounded-full"
              animate={{
                scale: [0.7, 1.3, 0.7],
                opacity: [0.5, 1, 0.5],
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom glow for more depth */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-px bg-white/20"
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scaleX: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ModernPulseLoader;
