"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialIconMap } from "@/components/social-icons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

function ToggleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl glass-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
          {title}
        </span>
        <span className="text-sm font-semibold text-gemini">
          {open ? "Hide" : "Show"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[rgb(66_133_244_/_10%)] px-5 pb-5 pt-4">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ProfilePanel() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 pb-20 pt-8 sm:px-6">
      <header className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
        <div className="relative shrink-0 overflow-hidden rounded-[1.4rem] ring-gemini shadow-[0_18px_40px_rgb(155_114_203_/_20%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile/avatar.png"
            alt={profile.fullName}
            className="h-40 w-40 object-cover sm:h-44 sm:w-44"
          />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--brand-violet)] uppercase">
            Profile
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {profile.fullName}
          </h1>
          <p className="mt-1 text-lg text-gemini">({profile.displayName})</p>
        </div>
      </header>

      <p className="text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
        {profile.about}
      </p>

      <div className="flex flex-wrap gap-3">
        {profile.socials.map((social) => {
          const Icon =
            socialIconMap[social.label as keyof typeof socialIconMap];
          return (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full transition",
                "border border-[rgb(66_133_244_/_16%)] bg-white/80 text-[var(--ink)]",
                "hover:bg-gemini hover:text-white hover:border-transparent hover:scale-105",
              )}
            >
              {Icon ? <Icon className="h-5 w-5" /> : social.label}
            </a>
          );
        })}
      </div>

      <ToggleSection title="Education" defaultOpen>
        <div className="space-y-5">
          {profile.education.map((edu) => (
            <div key={`${edu.school}-${edu.level}`}>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--ink-soft)] uppercase">
                {edu.level}
              </p>
              <p className="mt-1 font-semibold text-[var(--ink)]">
                {edu.school}
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                {"degree" in edu && edu.degree ? (
                  <>
                    {edu.degree}
                    <br />
                  </>
                ) : null}
                {edu.field}
              </p>
              <p className="mt-2 text-sm text-[var(--ink)]">
                {"expected" in edu && edu.expected
                  ? `Expected ${edu.expected}`
                  : null}
                {"expected" in edu && edu.expected && "gpa" in edu && edu.gpa
                  ? " · "
                  : null}
                {"gpa" in edu && edu.gpa ? `GPA ${edu.gpa}` : null}
              </p>
              {"scholarship" in edu && edu.scholarship ? (
                <p className="mt-1 text-sm text-[var(--brand-violet)]">
                  {edu.scholarship}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-[var(--ink-soft)]">{edu.period}</p>
            </div>
          ))}
        </div>
      </ToggleSection>

      <ToggleSection title="Software skills">
        <div className="space-y-4">
          {Object.entries(profile.software).map(([group, tools]) => (
            <div key={group}>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--ink-soft)] uppercase">
                {group}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-[rgb(66_133_244_/_8%)] px-3 py-1 text-xs font-medium text-[var(--ink)]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ToggleSection>

      <ToggleSection title="Languages & soft skills">
        <div className="space-y-4">
          <ul className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <li
                key={lang.name}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[rgb(66_133_244_/_14%)]"
              >
                {lang.name} — {lang.level}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {profile.softSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-[rgb(155_114_203_/_12%)] px-3 py-1 text-xs font-medium text-[var(--ink)]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </ToggleSection>

      <ToggleSection title="Hobbies">
        <ul className="flex flex-wrap gap-2">
          {profile.hobbies.map((hobby) => (
            <li
              key={hobby}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[rgb(217_101_112_/_20%)]"
            >
              {hobby}
            </li>
          ))}
        </ul>
      </ToggleSection>
    </div>
  );
}
