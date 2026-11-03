"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  categoryLabels,
  categoryOrder,
  getProjectsByCategory,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const accents: Record<ProjectCategory, string> = {
  "3d": "from-[#4285f4] to-[#6b8cff]",
  "2d": "from-[#9b72cb] to-[#c49bff]",
  ui: "from-[#5b8def] to-[#d96570]",
  graphic: "from-[#d96570] to-[#f0a0a8]",
  other: "from-[#6b7cff] to-[#9b72cb]",
};

export function CategoryPicker() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categoryOrder.map((category, index) => {
        const count = getProjectsByCategory(category).length;
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0.2, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            <Link
              href={`/works?cat=${category}`}
              className={cn(
                "group relative block overflow-hidden rounded-3xl p-6 transition",
                "glass-panel hover:-translate-y-1 hover:shadow-[0_22px_50px_rgb(155_114_203_/_18%)]",
              )}
            >
              <div
                className={cn(
                  "absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-70 blur-2xl transition group-hover:opacity-100",
                  accents[category],
                )}
              />
              <p className="relative text-xs font-semibold tracking-[0.22em] text-[var(--ink-soft)] uppercase">
                Category
              </p>
              <h2 className="relative mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)]">
                {categoryLabels[category]}
              </h2>
              <p className="relative mt-2 text-sm text-[var(--ink-soft)]">
                {count} project{count === 1 ? "" : "s"}
              </p>
              <span className="relative mt-6 inline-flex text-sm font-semibold text-gemini">
                Open gallery →
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
