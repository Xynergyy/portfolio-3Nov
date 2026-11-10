"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { hasAchievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { publishedProjects } from "@/data/projects";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  action: () => void;
};

export function SearchCommand({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // SiteHeader mounts this only while open, so query always starts empty
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const items = useMemo<CommandItem[]>(() => {
    const jump = (hash: string) => {
      onClose();
      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };

    const base: CommandItem[] = [
      {
        id: "home",
        label: "Home",
        group: "Navigate",
        action: () => jump("#top"),
      },
      {
        id: "projects",
        label: "Projects",
        group: "Navigate",
        action: () => jump("#projects"),
      },
      {
        id: "education",
        label: "Education",
        group: "Navigate",
        action: () => jump("#education"),
      },
      {
        id: "tools",
        label: "Tools & Capabilities",
        group: "Navigate",
        action: () => jump("#tools"),
      },
      ...(hasAchievements
        ? [
            {
              id: "achievements",
              label: "Achievements",
              group: "Navigate",
              action: () => jump("#achievements"),
            },
          ]
        : []),
      {
        id: "how",
        label: "How I Work",
        group: "Navigate",
        action: () => jump("#how-i-work"),
      },
      {
        id: "beyond",
        label: "Beyond the Work",
        group: "Navigate",
        action: () => jump("#beyond"),
      },
      {
        id: "resume-section",
        label: "Resume",
        group: "Navigate",
        action: () => jump("#resume"),
      },
      {
        id: "resume-pdf",
        label: "Download Resume PDF",
        hint: "PDF",
        group: "Actions",
        action: () => {
          onClose();
          window.open(profile.resume, "_blank");
        },
      },
      {
        id: "email",
        label: "Copy Email",
        hint: profile.email,
        group: "Actions",
        action: async () => {
          await navigator.clipboard.writeText(profile.email);
          onClose();
        },
      },
      ...profile.socials.map((s) => ({
        id: `social-${s.label}`,
        label: s.label,
        hint: "Open",
        group: "Social",
        action: () => {
          onClose();
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      })),
      ...publishedProjects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        hint: p.subtitle ?? p.category,
        group: "Projects",
        action: () => {
          onClose();
          window.setTimeout(() => {
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" });
            window.dispatchEvent(
              new CustomEvent("open-project", { detail: p.slug }),
            );
          }, 120);
        },
      })),
    ];

    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [query, onClose]);

  const groups = [...new Set(items.map((i) => i.group))];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search & Actions"
        className="glass-strong relative z-10 w-full max-w-xl overflow-hidden rounded-3xl shadow-[0_30px_80px_rgb(15_23_42_/_18%)]"
      >
        <div className="flex items-center gap-3 border-b border-[rgb(59_130_246_/_12%)] px-4 py-3">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-[var(--ink-soft)]"
            fill="none"
            aria-hidden
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-base text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]"
          />
          <kbd className="hidden rounded-md border border-[rgb(59_130_246_/_16%)] bg-white/70 px-2 py-0.5 text-[10px] font-medium text-[var(--ink-soft)] sm:inline">
            ESC
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--ink-soft)]">
              No matches for “{query}”
            </p>
          ) : (
            groups.map((group) => (
              <div key={group} className="mb-2">
                <p className="px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-[var(--ink-soft)] uppercase">
                  {group}
                </p>
                <ul className="space-y-1">
                  {items
                    .filter((i) => i.group === group)
                    .map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={item.action}
                          className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-primary/8"
                        >
                          <span className="text-sm font-medium text-[var(--ink)]">
                            {item.label}
                          </span>
                          {item.hint ? (
                            <span className="truncate text-xs text-[var(--ink-soft)]">
                              {item.hint}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
