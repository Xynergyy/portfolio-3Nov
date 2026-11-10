"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { easeOut, Reveal } from "@/components/motion";
import { ProjectModal } from "@/components/project-modal";
import {
  categoryLabels,
  categoryOrder,
  publishedProjects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const featured = publishedProjects.filter((p) => p.featured);

type Filter = "all" | ProjectCategory;

const PREVIEW_COUNT = 3;

// only offer categories that actually have published work
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...categoryOrder
    .filter((id) => publishedProjects.some((p) => p.category === id))
    .map((id) => ({ id, label: categoryLabels[id] })),
];

/* ------------------------------------------------------------------ */
/* Featured coverflow                                                  */
/* ------------------------------------------------------------------ */

/** Signed distance from the active card, wrapped so the carousel loops. */
function wrapOffset(i: number, active: number, total: number) {
  let d = i - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

const AUTOPLAY_MS = 4500;

function FeaturedCarousel({
  onOpen,
  paused: externallyPaused,
}: {
  onOpen: (p: Project) => void;
  paused: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const total = featured.length;

  // any manual move restarts the autoplay countdown
  const go = useCallback(
    (dir: number) => {
      setActive((i) => (i + dir + total) % total);
      setTick((t) => t + 1);
    },
    [total],
  );
  const jump = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing =
    total > 1 &&
    inView &&
    !hovered &&
    !focused &&
    !externallyPaused &&
    !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        setActive((i) => (i + 1) % total);
      }
      setTick((t) => t + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, tick, total]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
  };

  if (total === 0) return null;
  const current = featured[active];

  return (
    <div
      ref={root}
      className="relative mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <motion.div
        className="relative mx-auto aspect-[4/5] w-[min(74vw,360px)] touch-pan-y select-none sm:aspect-square sm:w-[400px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
      >
        {featured.map((project, i) => {
          const offset = wrapOffset(i, active, total);
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          return (
            <motion.button
              key={project.slug}
              type="button"
              aria-label={
                isActive ? `Open ${project.title}` : `Show ${project.title}`
              }
              aria-hidden={abs > 2}
              tabIndex={isActive ? 0 : -1}
              onClick={() => (isActive ? onOpen(project) : jump(i))}
              initial={false}
              animate={{
                x: `${offset * 62}%`,
                scale: 1 - Math.min(abs, 3) * 0.14,
                opacity: abs > 2 ? 0 : abs === 0 ? 1 : 0.85 - abs * 0.15,
                zIndex: 10 - abs,
              }}
              transition={{ duration: 0.55, ease: easeOut }}
              className={cn(
                "group absolute inset-0 overflow-hidden rounded-[28px] bg-slate-200 text-left shadow-[0_24px_60px_rgb(15_23_42_/_18%)]",
                abs > 2 && "pointer-events-none",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt=""
                draggable={false}
                className={cn(
                  "h-full w-full object-cover transition duration-700 ease-out",
                  isActive && "group-hover:scale-[1.05]",
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent transition-opacity duration-500",
                  isActive ? "opacity-100" : "opacity-40",
                )}
              />
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500 sm:p-6",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              >
                <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-md">
                  {categoryLabels[project.category]}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h3>
                {project.subtitle ? (
                  <p className="mt-1 line-clamp-2 text-sm text-white/80">
                    {project.subtitle}
                  </p>
                ) : null}
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--ink)] transition group-hover:gap-2">
                  View project <span aria-hidden>→</span>
                </span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="glass flex size-10 items-center justify-center rounded-full text-[var(--ink)] transition hover:scale-105"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {featured.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => jump(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-[var(--ink)]"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="glass flex size-10 items-center justify-center rounded-full text-[var(--ink)] transition hover:scale-105"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        {current.title}, {active + 1} of {total}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* All projects — filterable list                                      */
/* ------------------------------------------------------------------ */

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <motion.button
      layout
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.55, ease: easeOut }}
      className="glass group block w-full rounded-3xl p-5 text-left transition-shadow duration-300 hover:shadow-[0_24px_50px_rgb(37_99_235_/_14%)] sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
              {categoryLabels[project.category]}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] sm:text-2xl">
            {project.title}
            <span
              aria-hidden
              className="ml-2 inline-block -translate-x-1 text-primary opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </h3>
          {project.subtitle ? (
            <p className="mt-1 text-sm font-medium text-primary">
              {project.subtitle}
            </p>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            {project.summary}
          </p>
          <p className="mt-3 text-xs font-medium text-[var(--ink-soft)]">
            {project.role}
          </p>
        </div>
        <div className="shrink-0 sm:pt-1 sm:text-right">
          <p className="text-sm font-medium text-[var(--ink-soft)]">
            {project.dateLabel}
          </p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/70 bg-white/50 sm:ml-auto sm:w-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.08] group-hover:rotate-[1deg]"
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? publishedProjects
        : publishedProjects.filter((p) => p.category === filter),
    [filter],
  );

  const visible = expanded ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hasMore = filtered.length > PREVIEW_COUNT;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const project = publishedProjects.find((p) => p.slug === slug);
      if (project) setActive(project);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  return (
    <section id="projects" className="band-white overflow-hidden">
      <div className="section-pad mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="section-title">Projects</h2>
          <p className="section-lede mx-auto">
            A collection of ideas shaped into playable worlds, interfaces, and
            visuals.
          </p>
        </Reveal>

        <FeaturedCarousel onOpen={setActive} paused={active !== null} />

        <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
          <Reveal className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFilter(item.id);
                  setExpanded(false);
                }}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  filter === item.id
                    ? "text-white"
                    : "glass text-[var(--ink-soft)] hover:text-[var(--ink)]",
                )}
              >
                {filter === item.id ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-[var(--ink)] shadow-[0_10px_24px_rgb(15_23_42_/_16%)]"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </Reveal>

          <motion.div layout className="mt-10 space-y-4 text-left">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onOpen={() => setActive(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {hasMore ? (
            <motion.div layout className="mt-8 flex justify-center">
              <motion.button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-[var(--ink)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgb(15_23_42_/_16%)]"
              >
                {expanded
                  ? "Show less"
                  : `View more (${filtered.length - PREVIEW_COUNT})`}
              </motion.button>
            </motion.div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <ProjectModal
            key={active.slug}
            project={active}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
