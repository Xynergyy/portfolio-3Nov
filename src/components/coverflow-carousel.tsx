"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Props = {
  projects: Project[];
};

export function CoverflowCarousel({ projects }: Props) {
  const [active, setActive] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    setActive(0);
  }, [projects]);

  if (!projects.length) {
    return (
      <p className="py-20 text-center text-[var(--ink-soft)]">
        No projects in this category yet.
      </p>
    );
  }

  const current = projects[active];

  function go(delta: number) {
    setActive((prev) => {
      const next = prev + delta;
      if (next < 0) return projects.length - 1;
      if (next >= projects.length) return 0;
      return next;
    });
  }

  function onPointerDown(clientX: number) {
    dragStartX.current = clientX;
    dragging.current = false;
  }

  function onPointerMove(clientX: number) {
    if (dragStartX.current == null) return;
    if (Math.abs(clientX - dragStartX.current) > 8) dragging.current = true;
  }

  function onPointerUp(clientX: number) {
    if (dragStartX.current == null) return;
    const dx = clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 48) {
      go(dx < 0 ? 1 : -1);
    }
  }

  return (
    <div className="relative">
      <div
        className="relative mx-auto h-[420px] max-w-5xl touch-pan-y select-none sm:h-[480px]"
        onMouseDown={(e) => onPointerDown(e.clientX)}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        onMouseUp={(e) => onPointerUp(e.clientX)}
        onMouseLeave={(e) => {
          if (dragStartX.current != null) onPointerUp(e.clientX);
        }}
        onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
        onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
      >
        {projects.map((project, index) => {
          const offset = index - active;
          const abs = Math.abs(offset);
          if (abs > 2) return null;

          const rotate = offset * -18;
          const translateX = offset * 150;
          const translateY = abs * 18;
          const scale = 1 - abs * 0.14;
          const z = 30 - abs;

          return (
            <button
              key={project.slug}
              type="button"
              aria-label={`Select ${project.title}`}
              onClick={() => {
                if (dragging.current) return;
                setActive(index);
              }}
              className={cn(
                "absolute left-1/2 top-6 origin-bottom -translate-x-1/2 overflow-hidden rounded-[1.4rem] transition-shadow",
                abs === 0
                  ? "ring-gemini shadow-[0_28px_60px_rgb(66_133_244_/_25%)]"
                  : "opacity-90 shadow-[0_16px_30px_rgb(26_29_46_/_12%)]",
              )}
              style={{
                width: "min(260px, 62vw)",
                aspectRatio: "3 / 4",
                zIndex: z,
                transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-2 max-w-xl px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)] sm:text-4xl">
              {current.title}
            </h2>
            {current.subtitle ? (
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                {current.subtitle}
              </p>
            ) : null}
            <p className="mt-2 text-sm font-medium tracking-wide text-[var(--brand-violet)]">
              {current.dateLabel}
            </p>
            {current.draft ? (
              <p className="mt-2 text-xs text-[var(--ink-soft)]">
                Rough preview — full case study coming soon
              </p>
            ) : null}
            <Link
              href={`/works/${current.slug}`}
              className="mt-6 inline-flex rounded-full bg-gemini px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgb(155_114_203_/_30%)] transition hover:scale-[1.03]"
            >
              Open project
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-full border border-[rgb(66_133_244_/_18%)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--ink)]"
        >
          ← Prev
        </button>
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Go to ${p.title}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === active ? "bg-gemini w-6" : "bg-[rgb(155_114_203_/_35%)]",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-full border border-[rgb(66_133_244_/_18%)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--ink)]"
        >
          Next →
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--ink-soft)]">
        Drag sideways to browse covers
      </p>
    </div>
  );
}
