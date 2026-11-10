"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { easeOut } from "@/components/motion";
import { profile } from "@/data/profile";

/** A decor layer that drifts with the pointer; deeper layers move further. */
function ParallaxLayer({
  depth,
  mx,
  my,
  children,
}: {
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className="absolute inset-0" style={{ x, y }}>
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  // pointer parallax (-0.5 … 0.5), smoothed with a spring
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  // scroll: content drifts up and fades as the hero leaves
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  // portrait drifts gently against the pointer, a little less than the decor
  const photoX = useTransform(mx, (v) => v * -14);
  const photoY = useTransform(my, (v) => v * -10);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const words = profile.greeting.split(" ");

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="hero-shell relative isolate flex min-h-[78dvh] flex-col items-center justify-center overflow-hidden px-4 pb-28 pt-8 text-center sm:px-6 sm:pt-16 lg:pb-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ y: decorY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: easeOut }}
      >
        <div className="hero-dot-grid absolute inset-0 opacity-70" />

        {/* far layer — clouds */}
        <ParallaxLayer depth={-18} mx={mx} my={my}>
          <div className="hero-cloud hero-cloud-drift top-[12%] left-[-4%] h-16 w-40 opacity-90 sm:h-20 sm:w-52" />
          <div className="hero-cloud hero-cloud-drift-slow top-[18%] right-[-2%] h-14 w-36 opacity-80 sm:top-[14%] sm:h-16 sm:w-48" />
          <div className="hero-cloud hero-cloud-drift top-[42%] left-[4%] h-12 w-28 opacity-70 sm:left-[8%] sm:h-14 sm:w-36" />
          <div className="hero-cloud hero-cloud-drift-slow top-[48%] right-[6%] h-11 w-32 opacity-75 sm:right-[10%] sm:h-14 sm:w-40" />
          <div className="hero-cloud hero-cloud-drift bottom-[16%] left-[10%] h-14 w-44 opacity-85 sm:bottom-[18%] sm:h-16 sm:w-56" />
          <div className="hero-cloud hero-cloud-drift-slow bottom-[22%] right-[4%] h-12 w-36 opacity-80 sm:h-14 sm:w-44" />
        </ParallaxLayer>

        {/* near layer — stars & orbs */}
        <ParallaxLayer depth={40} mx={mx} my={my}>
          <div className="hero-star hero-float hero-twinkle absolute top-[14%] right-[12%] h-16 w-16 opacity-80 sm:h-24 sm:w-24" />
          <div className="hero-star hero-float-delayed hero-twinkle-slow absolute bottom-[18%] left-[10%] h-12 w-12 opacity-70 sm:h-16 sm:w-16" />
          <div className="hero-orb hero-float absolute top-[30%] left-[8%] h-16 w-16 rounded-full opacity-80 sm:left-[14%] sm:h-20 sm:w-20" />
          <div className="hero-orb hero-float-delayed absolute top-[22%] right-[18%] h-10 w-10 rounded-full opacity-70 sm:h-12 sm:w-12" />
          <div className="hero-orb hero-float absolute bottom-[28%] right-[12%] h-14 w-14 rounded-full opacity-60 sm:right-[16%]" />
        </ParallaxLayer>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* portrait — on top on mobile, right column on desktop */}
        <motion.div
          className="relative mx-auto w-[min(62vw,240px)] lg:order-2 lg:w-full lg:max-w-[360px]"
          style={{ x: photoX, y: photoY }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.45 }}
        >
          <div
            aria-hidden
            className="absolute inset-x-[2%] bottom-0 aspect-square rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#dbeafe_45%,#93c5fd_100%)] shadow-[0_30px_80px_rgb(37_99_235_/_22%)]"
          />
          <div
            aria-hidden
            className="hero-orb hero-float absolute -top-2 right-[4%] h-10 w-10 rounded-full opacity-80 sm:h-12 sm:w-12"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/portrait.webp"
            alt={`Portrait of ${profile.fullName}`}
            width={365}
            height={486}
            draggable={false}
            className="relative mx-auto w-[86%] select-none [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
          />
        </motion.div>

        <div className="text-center lg:order-1 lg:text-left">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {profile.roles.map((role) => (
            <motion.span
              key={role}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.8 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 380, damping: 20 },
                },
              }}
              whileHover={{ y: -3 }}
              className="rounded-full border border-[rgb(59_130_246_/_16%)] bg-white/70 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--ink-soft)] shadow-[0_8px_24px_rgb(37_99_235_/_6%)] backdrop-blur-sm"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <div className="relative mx-auto mt-6 max-w-full lg:mx-0 lg:mt-8">
          <h1
            aria-label={profile.greeting}
            className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,10vw,6.5rem)] leading-[1] font-extrabold tracking-[-0.04em] lg:text-[clamp(3.75rem,6.4vw,6rem)]"
          >
            {words.map((word, i) => (
              <span
                key={`${word}-${i}`}
                aria-hidden
                className="inline-block overflow-hidden px-[0.04em] pb-[0.08em] align-bottom"
              >
                <motion.span
                  className="hero-title-gradient inline-block"
                  initial={{ y: "105%", rotate: 8, opacity: 0 }}
                  animate={{ y: "0%", rotate: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 16,
                    delay: 0.3 + i * 0.12,
                  }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          {/* glass bubbles over type */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[10%] left-[8%] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255_/_85%),rgb(147_197_253_/_25%))] opacity-80 blur-[0.5px] sm:h-20 sm:w-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-[0%] right-[18%] h-10 w-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(255_255_255_/_90%),rgb(191_219_254_/_35%))] opacity-75 sm:h-14 sm:w-14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.05 }}
          />

          <motion.span
            className="mt-3 inline-block cursor-default rounded-2xl border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-[0_12px_30px_rgb(37_99_235_/_12%)] backdrop-blur sm:text-sm"
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            whileHover={{ rotate: 3, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.85 }}
          >
            {profile.fullName}
          </motion.span>
        </div>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[var(--ink-soft)] sm:mt-10 sm:text-lg lg:mx-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 1 }}
        >
          {profile.tagline}
        </motion.p>
        </div>
      </motion.div>

      <motion.a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-[var(--ink-soft)] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        Scroll
        <span className="scroll-cue flex h-8 w-5 justify-center rounded-full border-2 border-[rgb(37_99_235_/_35%)] pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-primary" />
        </span>
      </motion.a>
    </section>
  );
}
