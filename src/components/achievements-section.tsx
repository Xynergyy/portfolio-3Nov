"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Dices,
  Medal,
  Tent,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeOut, Reveal } from "@/components/motion";
import {
  achievements,
  kindLabels,
  type Achievement,
  type AchievementKind,
} from "@/data/achievements";
import { cn } from "@/lib/utils";

const kindIcon: Record<AchievementKind, typeof Trophy> = {
  award: Trophy,
  competition: Medal,
  camp: Tent,
  exhibition: Dices,
};

const kindTone: Record<AchievementKind, string> = {
  award: "bg-amber-100/95 text-amber-900",
  competition: "bg-sky-100/95 text-sky-900",
  camp: "bg-emerald-100/95 text-emerald-900",
  exhibition: "bg-fuchsia-100/95 text-fuchsia-900",
};

/** Cycles photos while hovered (desktop) or while on screen (touch devices). */
function usePhotoCycle(count: number, ref: React.RefObject<HTMLElement | null>) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [touch, setTouch] = useState(false);
  const inView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouch(mq.matches);
    const raf = requestAnimationFrame(update);
    mq.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", update);
    };
  }, []);

  const running = count > 1 && (hovered || (touch && inView));
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 1700);
    return () => window.clearInterval(id);
  }, [running, count]);

  return { index, setHovered };
}

function AchievementCard({
  item,
  index,
  suppressClick,
}: {
  item: Achievement;
  index: number;
  suppressClick: () => boolean;
}) {
  const Icon = kindIcon[item.kind];
  const liRef = useRef<HTMLLIElement>(null);
  const photos = item.gallery?.length
    ? item.gallery
    : item.image
      ? [item.image]
      : [];
  const { index: photoIndex, setHovered } = usePhotoCycle(photos.length, liRef);
  const clickable = Boolean(item.project || item.href);

  const open = () => {
    if (suppressClick()) return;
    if (item.project) {
      window.dispatchEvent(
        new CustomEvent("open-project", { detail: item.project }),
      );
    } else if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  const inner = (
    <>
      {/* photo */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {photos.length ? (
          <AnimatePresence initial={false}>
            <motion.img
              key={photos[photoIndex]}
              src={photos[photoIndex]}
              alt=""
              draggable={false}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
          </AnimatePresence>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#93c5fd] via-[#3b82f6] to-[#1e40af]">
            <Icon className="h-16 w-16 text-white/70" strokeWidth={1.4} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        <span
          className={cn(
            "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur",
            kindTone[item.kind],
          )}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
          {kindLabels[item.kind]}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[var(--ink)] backdrop-blur">
          {item.period}
        </span>
        {photos.length > 1 ? (
          <div className="absolute bottom-4 left-4 flex gap-1" aria-hidden>
            {photos.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === photoIndex ? "w-4 bg-white" : "w-1.5 bg-white/55",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-bold text-primary">{item.result}</p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg leading-snug font-bold text-[var(--ink)]">
          {item.title}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-[var(--ink-soft)]">
          {item.org}
        </p>
        {item.body ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            {item.body}
          </p>
        ) : null}
        {clickable ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-primary">
            {item.project ? "View project" : "Open link"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClass =
    "glass group flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-shadow duration-300 hover:shadow-[0_24px_50px_rgb(37_99_235_/_18%)]";

  return (
    <motion.li
      ref={liRef}
      data-card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[80%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: easeOut, delay: Math.min(index, 3) * 0.1 }}
    >
      {clickable ? (
        <motion.button
          type="button"
          onClick={open}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          className={cardClass}
        >
          {inner}
        </motion.button>
      ) : (
        <motion.article whileHover={{ y: -6 }} className={cardClass}>
          {inner}
        </motion.article>
      )}
    </motion.li>
  );
}

export function AchievementsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    return card.offsetWidth + gap;
  }, []);

  // keep the dots in sync with the scroll position and viewport width
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const visible = Math.max(1, Math.round(track.clientWidth / s));
    const total = Math.max(1, achievements.length - visible + 1);
    setPages(total);
    const atEnd =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    setPage(atEnd ? total - 1 : Math.round(track.scrollLeft / s));
  }, [step]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const raf = requestAnimationFrame(measure);
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(pages - 1, i));
    trackRef.current?.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  // mouse drag-to-scroll (touch already swipes natively)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: trackRef.current.scrollLeft,
      moved: 0,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 5 && !dragging) setDragging(true);
    track.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (dragging) {
      setDragging(false);
      // let snap settle on the nearest card
      requestAnimationFrame(() => goTo(Math.round((trackRef.current?.scrollLeft ?? 0) / step())));
    }
  };
  // swallow the click that ends a drag
  const suppressClick = () => {
    const moved = drag.current.moved > 5;
    drag.current.moved = 0;
    return moved;
  };

  return (
    <section id="achievements" className="band-blue section-pad overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="section-title">Achievements</h2>
          <p className="section-lede">
            Competitions, awards, and camps along the way.
          </p>
        </Reveal>

        <div className="relative mt-10">
          <ul
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className={cn(
              "no-scrollbar -mx-4 flex gap-4 overflow-x-auto scroll-px-4 px-4 pt-2 pb-6 sm:mx-0 sm:scroll-px-0 sm:px-0",
              dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory sm:cursor-grab",
            )}
            aria-label="Achievements"
          >
            {achievements.map((item, i) => (
              <AchievementCard
                key={item.id}
                item={item}
                index={i}
                suppressClick={suppressClick}
              />
            ))}
          </ul>

          {pages > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page === 0}
                aria-label="Previous achievements"
                className="absolute top-[30%] -left-5 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_10px_28px_rgb(15_23_42_/_16%)] transition hover:scale-110 disabled:pointer-events-none disabled:opacity-0 sm:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page >= pages - 1}
                aria-label="Next achievements"
                className="absolute top-[30%] -right-5 hidden h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--ink)] shadow-[0_10px_28px_rgb(15_23_42_/_16%)] transition hover:scale-110 disabled:pointer-events-none disabled:opacity-0 sm:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        {pages > 1 ? (
          <div className="mt-2 flex items-center justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === page}
                className="relative h-2 rounded-full bg-[rgb(37_99_235_/_22%)] transition-all duration-300"
                style={{ width: i === page ? 28 : 8 }}
              >
                {i === page ? (
                  <motion.span
                    layoutId="achievement-dot"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        <p className="mt-4 text-center text-xs text-[var(--ink-soft)] sm:hidden">
          ← Swipe to see more →
        </p>
      </div>
    </section>
  );
}
