"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type Props = {
  projects: Project[];
};

function buildPool(projects: Project[], min = 10) {
  if (!projects.length) return [];
  const pool = [...projects];
  while (pool.length < min) pool.push(...projects);
  return pool;
}

function wrapIndex(value: number, size: number) {
  return ((Math.floor(value) % size) + size) % size;
}

/** Symmetric slots around center — keeps the arc visually centered. */
const SLOTS = [-3, -2, -1, 0, 1, 2, 3] as const;

export function HomeWorksPreview({ projects }: Props) {
  const pool = useMemo(() => buildPool(projects, 10), [projects]);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(960);
  const stageRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || 960);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (pool.length < 2) return;
    let raf = 0;
    let last = performance.now();
    const speed = 0.3;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) {
        offsetRef.current += dt * speed;
        setOffset(offsetRef.current);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pool.length]);

  if (!pool.length) return null;

  const n = pool.length;
  const base = Math.floor(offset);
  const frac = offset - base; // 0…1
  const visibleSpan = 3;
  const radiusX = Math.min(520, width * 0.5);
  const radiusZ = Math.min(250, width * 0.26);
  const dipY = Math.min(40, width * 0.038);
  const cardW = Math.min(148, Math.max(100, width * 0.128));
  const cardH = cardW * (4 / 3);

  const focusIndex = wrapIndex(base + (frac >= 0.5 ? 1 : 0), n);
  const focus = pool[focusIndex];

  return (
    <section
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={stageRef}
        className="relative mx-auto w-full"
        style={{
          height: cardH + dipY * 2 + 64,
          perspective: "1600px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {SLOTS.map((slot) => {
            const pos = slot - frac;
            const t = pos / visibleSpan;
            const tt = t * t;
            const x = t * radiusX;
            const z = -(1 - tt) * radiusZ;
            const y = (1 - tt) * dipY;
            const rotateY = -t * 34;
            const scale = 0.78 + Math.abs(t) * 0.32;
            const opacity = 0.5 + Math.abs(t) * 0.4;
            const project = pool[wrapIndex(base + slot, n)];

            return (
              <Link
                key={slot}
                href={`/works/${project.slug}`}
                aria-label={project.title}
                className="absolute overflow-hidden rounded-2xl bg-[rgb(230_234_245)] shadow-[0_16px_36px_rgb(26_29_46_/_16%)] ring-1 ring-white/80"
                style={{
                  width: cardW,
                  height: cardH,
                  left: 0,
                  top: 0,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformOrigin: "center center",
                  zIndex: Math.round(40 + Math.abs(t) * 50),
                  opacity,
                  willChange: "transform",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cover}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-sm px-4 text-center">
        <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] sm:text-xl">
          {focus.title}
        </p>
        <p className="mt-0.5 text-sm text-[var(--ink-soft)]">
          {focus.subtitle ?? focus.dateLabel}
        </p>
      </div>
    </section>
  );
}
