"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";
import { categoryLabels } from "@/data/projects";

type Props = {
  project: Project;
};

export function ProjectDetail({ project }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || project.images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % project.images.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [paused, project.images.length]);

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start sm:px-6">
      <div>
        <Link
          href={`/works?cat=${project.category}`}
          className="text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
        >
          ← Back to {categoryLabels[project.category]}
        </Link>

        <div
          className="relative mt-6 overflow-hidden rounded-[1.6rem] glass-panel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.images[index]}
                src={project.images[index]}
                alt={`${project.title} image ${index + 1}`}
                initial={{ opacity: 0.2, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          {project.images.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto p-3">
              {project.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                    i === index
                      ? "ring-[var(--brand-violet)]"
                      : "ring-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24">
        <p className="text-xs font-semibold tracking-[0.24em] text-[var(--brand-violet)] uppercase">
          {categoryLabels[project.category]} · {project.dateLabel}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="mt-2 text-lg text-[var(--ink-soft)]">{project.subtitle}</p>
        ) : null}

        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.18em] text-[var(--ink-soft)] uppercase">
              Team
            </dt>
            <dd className="mt-1 text-[var(--ink)]">{project.teamSize} people</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.18em] text-[var(--ink-soft)] uppercase">
              Role
            </dt>
            <dd className="mt-1 text-[var(--ink)]">{project.role}</dd>
          </div>
        </dl>

        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--ink-soft)]">
          <p>{project.summary}</p>
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] text-[var(--ink)] uppercase">
              What I learned
            </h2>
            <p className="mt-2">{project.learned}</p>
          </div>
          {project.award ? (
            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.18em] text-[var(--ink)] uppercase">
                Award / context
              </h2>
              <p className="mt-2">{project.award}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-8">
          <h2 className="text-[11px] font-semibold tracking-[0.18em] text-[var(--ink-soft)] uppercase">
            Tools
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[rgb(66_133_244_/_14%)]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-sm font-semibold text-gemini"
            >
              {tag}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
