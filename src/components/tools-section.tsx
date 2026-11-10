"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import {
  toneClasses,
  toolStacks,
  type ToolStack,
} from "@/data/tools";

function ToolBadge({ name, logo }: { name: string; logo: string }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.4 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 420, damping: 18 },
        },
      }}
      whileHover={{ y: -8, scale: 1.14 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="group/tool relative -ml-2.5 first:ml-0 z-0 hover:z-20"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgb(15_23_42_/_10%)] ring-[3px] ring-white transition group-hover/tool:shadow-[0_10px_24px_rgb(15_23_42_/_16%)] sm:h-14 sm:w-14">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          className="h-7 w-7 object-contain sm:h-8 sm:w-8"
        />
      </div>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--ink)] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition duration-150 group-hover/tool:opacity-100"
      >
        {name}
      </span>
    </motion.li>
  );
}

function ToolStackBlock({
  stack,
  reverse = false,
  delay = 0,
}: {
  stack: ToolStack;
  reverse?: boolean;
  delay?: number;
}) {
  const tone = toneClasses[stack.tone];

  return (
    <motion.div
      className={`flex flex-col items-center gap-3 ${
        reverse ? "flex-col-reverse" : ""
      }`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${tone.pill}`}
      >
        <span
          className={`tool-sparkle text-base leading-none ${tone.icon}`}
          aria-hidden
        >
          ✦
        </span>
        {stack.label}
      </motion.div>
      <motion.ul className="flex items-center">
        {stack.tools.map((tool) => (
          <ToolBadge key={tool.name} name={tool.name} logo={tool.logo} />
        ))}
      </motion.ul>
    </motion.div>
  );
}

export function ToolsSection() {
  const byId = Object.fromEntries(toolStacks.map((s) => [s.id, s])) as Record<
    string,
    ToolStack
  >;

  const topRow = [byId.engines, byId["3d"], byId.video];
  const bottomRow = [byId.ui, byId["2d"], byId.mocap];

  return (
    <section id="tools" className="band-blue">
      <div className="section-pad mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10 sm:gap-12">
          <Reveal className="max-w-md px-2 text-center">
            <h2 className="section-title">Tools & Capabilities</h2>
          </Reveal>

          <div className="grid w-full grid-cols-1 items-start justify-items-center gap-8 sm:grid-cols-3 sm:gap-6">
            {topRow.map((stack, i) => (
              <ToolStackBlock key={stack.id} stack={stack} delay={i * 0.12} />
            ))}
          </div>

          <div className="grid w-full grid-cols-1 items-start justify-items-center gap-8 sm:grid-cols-3 sm:gap-6">
            {bottomRow.map((stack, i) => (
              <ToolStackBlock key={stack.id} stack={stack} delay={i * 0.12} />
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="max-w-lg px-2 text-center font-[family-name:var(--font-display)] text-base leading-relaxed text-[var(--ink-soft)] italic sm:text-lg">
              “The tool is just a tool. Don’t marry your software.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
