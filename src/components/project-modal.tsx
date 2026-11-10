"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { easeOut } from "@/components/motion";
import {
  categoryLabels,
  getProjectMedia,
  type Project,
  type ProjectMedia,
} from "@/data/projects";

function MediaSlide({ item, title }: { item: ProjectMedia; title: string }) {
  if (item.type === "video") {
    return (
      <video
        controls
        playsInline
        poster={item.poster}
        className="h-full w-full object-contain"
        src={item.src}
      />
    );
  }

  if (item.type === "model") {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 bg-slate-100/80 p-6 text-center">
        <p className="text-sm font-medium text-[var(--ink)]">3D model ready</p>
        <p className="max-w-xs text-xs text-[var(--ink-soft)]">
          Drop a GLB at <code className="text-[var(--ink)]">{item.src}</code> —
          viewer hook is prepared for this popup.
        </p>
        {item.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.poster}
            alt={`${title} 3D preview`}
            className="mt-2 max-h-40 rounded-lg object-contain opacity-80"
          />
        ) : null}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt ?? title}
      className="h-full w-full object-contain"
    />
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  // parent remounts this component per project (key={slug}), so index starts at 0
  const [index, setIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  const media = getProjectMedia(project);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const count = media.length;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    window.setTimeout(() => focusables()[0]?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (count < 2) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [media.length]);

  const safeIndex = media.length ? index % media.length : 0;
  const current = media[safeIndex] ?? media[0];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        aria-label="Close project details"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        ref={panelRef}
        className="glass-strong relative z-10 flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-xl lg:flex-row"
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.22 } }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {/* Left — media (fixed height on mobile so the details stay readable) */}
        <div className="relative flex h-[42dvh] w-full shrink-0 flex-col bg-slate-100/80 sm:h-[48dvh] lg:h-auto lg:w-[48%] lg:min-h-[min(92dvh,40rem)]">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {current ? (
                <motion.div
                  key={safeIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                >
                  <MediaSlide item={current} title={project.title} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {media.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto border-t border-white/50 bg-white/40 p-3">
              {media.map((m, i) => {
                const thumb =
                  m.type === "image"
                    ? m.src
                    : m.type === "video"
                      ? m.poster
                      : m.poster;
                return (
                  <motion.button
                    key={`${m.type}-${i}`}
                    type="button"
                    onClick={() => setIndex(i)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:h-16 sm:w-16 ${
                      i === safeIndex
                        ? "ring-primary"
                        : "ring-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Show media ${i + 1}`}
                  >
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-slate-200 text-[10px] font-semibold text-[var(--ink-soft)] uppercase">
                        {m.type}
                      </span>
                    )}
                    {m.type === "video" ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center bg-slate-900/25 text-white"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <path d="M8 5.5v13l10.5-6.5z" />
                        </svg>
                      </span>
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          ) : null}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-[var(--ink)] shadow-sm backdrop-blur hover:bg-white lg:hidden"
          >
            Close
          </button>
        </div>

        {/* Right — full details */}
        <div className="relative flex min-h-0 w-full flex-1 flex-col">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 hidden rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-[var(--ink)] shadow-sm backdrop-blur hover:bg-white lg:inline-flex"
          >
            Close
          </button>

          <motion.div
            className="scrollbar-minimal overflow-y-auto px-5 py-5 sm:px-7 sm:py-7 lg:pr-16"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--ink-soft)]">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                {categoryLabels[project.category]}
              </span>
              <span>{project.dateLabel}</span>
              {project.draft ? (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
                  Placeholder
                </span>
              ) : null}
            </div>

            <h2
              id={titleId}
              className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl lg:text-4xl"
            >
              {project.title}
            </h2>
            {project.subtitle ? (
              <p className="mt-1 text-sm font-medium text-primary sm:text-base">
                {project.subtitle}
              </p>
            ) : null}

            <p className="mt-5 text-sm leading-relaxed text-[var(--ink)] sm:text-[15px]">
              {project.summary}
            </p>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  Role
                </dt>
                <dd className="mt-1 leading-relaxed text-[var(--ink)]">
                  {project.role}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  Team
                </dt>
                <dd className="mt-1 text-[var(--ink)]">
                  {project.teamSize}{" "}
                  {project.teamSize === 1 ? "person" : "people"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  Timeline
                </dt>
                <dd className="mt-1 text-[var(--ink)]">{project.dateLabel}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  Category
                </dt>
                <dd className="mt-1 text-[var(--ink)]">
                  {categoryLabels[project.category]}
                </dd>
              </div>
            </dl>

            {project.award ? (
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  Award / context
                </p>
                <p className="mt-2 rounded-2xl bg-primary/8 px-4 py-3 text-sm leading-relaxed text-[var(--ink)]">
                  {project.award}
                </p>
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                Tools
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[rgb(59_130_246_/_16%)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--ink)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {project.learned && !project.draft ? (
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
                  What I learned
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {project.learned}
                </p>
              </div>
            ) : null}

            {project.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-sm font-semibold text-primary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgb(37_99_235_/_22%)] transition hover:brightness-110"
              >
                {project.hrefLabel ?? "View project"}
              </a>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
