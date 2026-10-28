import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Variant = "up" | "down" | "left" | "right" | "scale" | "blur";

const VARIANTS: Record<Variant, { initial: TargetAndTransition; animate: TargetAndTransition }> = {
  up: { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } },
  blur: { initial: { opacity: 0, filter: "blur(10px)", y: 16 }, animate: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

export function Reveal({ children, delay = 0, variant = "up", className }: { children: ReactNode; delay?: number; variant?: Variant; className?: string }) {
  const v = VARIANTS[variant];
  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word text reveal — each word slides up from a clipped mask. */
export function RevealText({ text, className, delay = 0, stagger = 0.06 }: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            custom={i}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: (index: number) => ({ y: "0%", opacity: 1, transition: { duration: 0.8, delay: delay + index * stagger, ease: EASE } }),
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
