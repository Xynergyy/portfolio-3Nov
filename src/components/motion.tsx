"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Respects the visitor's OS "reduce motion" setting for every framer animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Fades + lifts its content in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.75, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

const group: Variants = {
  hidden: {},
  show: (stagger: number = 0.09) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 22 },
  },
};

/** Container that reveals its <StaggerItem> children one after another. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const Comp = as === "ul" ? motion.ul : motion.div;
  return (
    <Comp
      className={className}
      variants={group}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "rise",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "pop";
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp className={className} variants={variant === "pop" ? pop : item}>
      {children}
    </Comp>
  );
}
