"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SearchCommand } from "@/components/search-command";
import { hasAchievements } from "@/data/achievements";
import { cn } from "@/lib/utils";

const links = [
  { href: "#projects", label: "Projects" },
  ...(hasAchievements
    ? [{ href: "#achievements", label: "Achievements" }]
    : []),
  { href: "#education", label: "Education" },
  { href: "#tools", label: "Tools" },
  { href: "#how-i-work", label: "How I Work" },
  { href: "#beyond", label: "Beyond" },
];

function NavPill() {
  return (
    <motion.span
      layoutId="nav-active-pill"
      className="absolute inset-0 rounded-full bg-white/90 shadow-sm"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // close the mobile menu on Escape, and when the screen grows past the md breakpoint
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1)).concat("resume");
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-sky-400 via-primary to-indigo-500"
        style={{ scaleX: progress }}
      />
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
          aria-label="Main Navigation"
          className={cn(
            "flex h-12 w-full max-w-4xl items-center gap-1 rounded-full px-2 pl-4 transition-all duration-300 sm:h-14 sm:gap-2 sm:px-3 sm:pl-5",
            scrolled ? "glass-strong" : "glass",
          )}
        >
          <Link
            href="#top"
            className="mr-1 shrink-0 font-[family-name:var(--font-display)] text-[15px] font-bold tracking-tight text-[var(--ink)] sm:mr-2 sm:text-base"
          >
            Carrot
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex">
            {links.map((link) => {
              const id = link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors lg:px-3",
                    active === id
                      ? "text-[var(--ink)]"
                      : "text-[var(--ink-soft)] hover:bg-white/55 hover:text-[var(--ink)]",
                  )}
                >
                  {active === id ? <NavPill /> : null}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <a
              href="#resume"
              className={cn(
                "relative hidden rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors sm:inline-flex",
                active === "resume"
                  ? "text-[var(--ink)]"
                  : "text-[var(--ink-soft)] hover:bg-white/55 hover:text-[var(--ink)]",
              )}
            >
              {active === "resume" ? <NavPill /> : null}
              <span className="relative">Resume</span>
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-white shadow-[0_8px_20px_rgb(15_23_42_/_18%)] transition hover:scale-105 active:scale-95 sm:h-10 sm:w-10"
              aria-label="Search & Actions"
              title="Search (⌘K)"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <path
                  d="m19.5 19.5-3.2-3.2"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[var(--ink)] transition hover:bg-white active:scale-95 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <motion.path
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: menuOpen ? "M6 6l12 12" : "M4 7h16" }}
                  transition={{ duration: 0.25 }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  d="M4 12h16"
                  initial={false}
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.path
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ d: menuOpen ? "M6 18L18 6" : "M4 17h16" }}
                  transition={{ duration: 0.25 }}
                />
              </svg>
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              key="menu-backdrop"
              aria-hidden
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] md:hidden"
            />
            <motion.div
              key="menu-panel"
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[72px] z-50 origin-top rounded-3xl border border-white/80 bg-white/92 p-2 shadow-[0_24px_60px_rgb(15_23_42_/_18%)] backdrop-blur-xl sm:inset-x-4 md:hidden"
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col">
                {[...links, { href: "#resume", label: "Resume" }].map((link) => {
                  const id = link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors",
                        active === id
                          ? "bg-primary/10 text-[var(--ink)]"
                          : "text-[var(--ink-soft)] active:bg-slate-100",
                      )}
                    >
                      {link.label}
                      {active === id ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      ) : null}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {searchOpen ? (
        <SearchCommand open onClose={closeSearch} />
      ) : null}
    </>
  );
}
