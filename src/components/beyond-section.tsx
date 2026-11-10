"use client";

import { useEffect, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type BeyondItem = (typeof profile.beyond)[number];

/** Cycles through an item's photos while the card is hovered / opened. */
function usePhotoCycle(count: number, running: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!running || count < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      1800,
    );
    return () => window.clearInterval(id);
  }, [running, count]);
  return index;
}

function BeyondCard({ item }: { item: BeyondItem }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const photos = item.photos;
  const index = usePhotoCycle(photos.length, hovered || open);
  const marks = [...item.logos.map((src) => ({ src })), ...item.initials.map((text) => ({ text }))];

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-3xl text-left shadow-[0_18px_44px_rgb(15_23_42_/_14%)] transition-shadow duration-300 hover:shadow-[0_26px_56px_rgb(37_99_235_/_22%)]"
    >
      {/* background: photos, or a branded fallback until photos are added */}
      {photos.length > 0 ? (
        photos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.05]",
              i === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] via-[#2563eb] to-[#1e3a8a]">
          <div className="absolute -top-6 -right-6 flex rotate-12 gap-3 opacity-20">
            {marks.slice(0, 2).map((m) =>
              "src" in m ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={m.src}
                  src={m.src}
                  alt=""
                  className="size-28 rounded-3xl bg-white object-contain p-3"
                />
              ) : (
                <span
                  key={m.text}
                  className="flex size-28 items-center justify-center rounded-3xl bg-white text-2xl font-black text-[#1e3a8a]"
                >
                  {m.text}
                </span>
              ),
            )}
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />

      {/* top: period + logos */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-white backdrop-blur-md">
          {item.period}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {marks.map((m) =>
            "src" in m ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={m.src}
                src={m.src}
                alt=""
                className="size-8 rounded-full bg-white object-contain p-1 shadow-sm"
              />
            ) : (
              <span
                key={m.text}
                className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-[10px] font-bold text-primary shadow-sm"
              >
                {m.text}
              </span>
            ),
          )}
        </div>
      </div>

      {/* bottom: text */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl leading-tight font-bold text-white">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm font-medium text-white/80">
          {item.org}
        </p>
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-white/75",
            open ? "line-clamp-none" : "line-clamp-2 group-hover:line-clamp-none",
          )}
        >
          {item.body}
        </p>
        {photos.length > 1 ? (
          <div className="mt-4 flex gap-1" aria-hidden>
            {photos.map((src, i) => (
              <span
                key={src}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/45",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export function BeyondCards() {
  return (
    <Stagger className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
      {profile.beyond.map((item) => (
        <StaggerItem key={`${item.title}-${item.org}`}>
          <BeyondCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
