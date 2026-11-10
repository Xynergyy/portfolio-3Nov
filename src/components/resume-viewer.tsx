"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;

type Page = { src: string; width: number; height: number };

export function ResumeViewer({ pages }: { pages: readonly Page[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {pages.map((page, i) => (
          <button
            key={page.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block cursor-zoom-in overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_rgb(15_23_42_/_14%)] ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgb(37_99_235_/_20%)]"
            aria-label={`Open resume page ${i + 1}`}
          >
            <Image
              src={page.src}
              alt={`Resume page ${i + 1}`}
              width={page.width}
              height={page.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
              <Plus className="size-3" /> Click to zoom
            </span>
          </button>
        ))}
      </div>

      {open !== null ? (
        <Lightbox
          pages={pages}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}

function Lightbox({
  pages,
  index,
  onIndex,
  onClose,
}: {
  pages: readonly Page[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const zoomTo = useCallback((s: number) => {
    const next = clampScale(s);
    setScale(next);
    if (next === 1) setOffset({ x: 0, y: 0 });
  }, []);

  const reset = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const go = useCallback(
    (dir: number) => {
      const next = index + dir;
      if (next < 0 || next >= pages.length) return;
      reset();
      onIndex(next);
    },
    [index, pages.length, onIndex, reset],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomTo(scale + 0.5);
      else if (e.key === "-") zoomTo(scale - 0.5);
      else if (e.key === "0") reset();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose, reset, scale, zoomTo]);

  const page = pages[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full touch-none items-center justify-center overflow-hidden select-none"
        onWheel={(e) => zoomTo(scale - e.deltaY * 0.0015 * scale)}
        onPointerDown={(e) => {
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setDragging(true);
          if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            pinch.current = {
              dist: Math.hypot(a.x - b.x, a.y - b.y),
              scale,
            };
            drag.current = null;
          } else if (scale > 1) {
            drag.current = {
              x: e.clientX,
              y: e.clientY,
              ox: offset.x,
              oy: offset.y,
            };
          }
        }}
        onPointerMove={(e) => {
          if (!pointers.current.has(e.pointerId)) return;
          pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
          if (pinch.current && pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            zoomTo(pinch.current.scale * (dist / pinch.current.dist));
          } else if (drag.current) {
            setOffset({
              x: drag.current.ox + (e.clientX - drag.current.x),
              y: drag.current.oy + (e.clientY - drag.current.y),
            });
          }
        }}
        onPointerUp={(e) => {
          pointers.current.delete(e.pointerId);
          if (pointers.current.size < 2) pinch.current = null;
          drag.current = null;
          if (pointers.current.size === 0) setDragging(false);
        }}
        onPointerCancel={(e) => {
          pointers.current.delete(e.pointerId);
          pinch.current = null;
          drag.current = null;
          setDragging(false);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (scale > 1) reset();
          else zoomTo(2.5);
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: dragging ? "none" : "transform 150ms ease-out",
          }}
        >
          <Image
            src={page.src}
            alt={`Resume page ${index + 1}`}
            width={page.width}
            height={page.height}
            priority
            draggable={false}
            sizes="100vw"
            className="h-[92vh] w-auto max-w-[94vw] object-contain shadow-2xl"
          />
        </div>
      </div>

      {/* Controls */}
      <div
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 p-1.5 text-white ring-1 ring-white/15 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {pages.length > 1 ? (
          <>
            <CtrlButton label="Previous page" onClick={() => go(-1)} disabled={index === 0}>
              <ChevronLeft className="size-4" />
            </CtrlButton>
            <span className="px-2 text-xs tabular-nums">
              {index + 1} / {pages.length}
            </span>
            <CtrlButton
              label="Next page"
              onClick={() => go(1)}
              disabled={index === pages.length - 1}
            >
              <ChevronRight className="size-4" />
            </CtrlButton>
            <span className="mx-1 h-5 w-px bg-white/20" />
          </>
        ) : null}
        <CtrlButton label="Zoom out" onClick={() => zoomTo(scale - 0.5)} disabled={scale <= MIN_SCALE}>
          <Minus className="size-4" />
        </CtrlButton>
        <span className="w-12 text-center text-xs tabular-nums">{Math.round(scale * 100)}%</span>
        <CtrlButton label="Zoom in" onClick={() => zoomTo(scale + 0.5)} disabled={scale >= MAX_SCALE}>
          <Plus className="size-4" />
        </CtrlButton>
        <CtrlButton label="Reset zoom" onClick={reset}>
          <RotateCcw className="size-4" />
        </CtrlButton>
      </div>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/20"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

function CtrlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-9 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-35 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
