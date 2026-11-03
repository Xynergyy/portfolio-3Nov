import Link from "next/link";
import { HomeWorksPreview } from "@/components/home-works-preview";
import { StarField } from "@/components/star-field";
import { profile } from "@/data/profile";
import { getFeaturedProjects, projects } from "@/data/projects";

export function HomeHero() {
  const preview = getFeaturedProjects().length
    ? getFeaturedProjects()
    : projects.slice(0, 6);

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-x-clip px-4 pb-8 pt-24">
      <StarField />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] z-0 h-[34vmin] w-[58vmin] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
        style={{ backgroundImage: "var(--gemini)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl flex-none text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.28em] text-[var(--ink-soft)] uppercase">
          Portfolio
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-extrabold tracking-tight text-[var(--ink)] sm:text-6xl">
          Hi, I’m <span className="text-gemini">Carrot</span>.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
          {profile.tagline}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/works"
            className="inline-flex items-center justify-center rounded-full bg-gemini px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_rgb(155_114_203_/_35%)] transition hover:scale-[1.03] active:scale-[0.98]"
          >
            View works
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-full border border-[rgb(66_133_244_/_22%)] bg-white/70 px-7 py-3 text-sm font-semibold text-[var(--ink)] backdrop-blur transition hover:bg-white active:scale-[0.98]"
          >
            View profile
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-1 items-center justify-center">
        <HomeWorksPreview projects={preview} />
      </div>
    </section>
  );
}
