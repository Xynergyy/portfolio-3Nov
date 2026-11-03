import { Suspense } from "react";
import Link from "next/link";
import { CategoryPicker } from "@/components/category-picker";
import { CoverflowCarousel } from "@/components/coverflow-carousel";
import { SiteHeader } from "@/components/site-header";
import { StarField } from "@/components/star-field";
import {
  categoryLabels,
  categoryOrder,
  getProjectsByCategory,
  type ProjectCategory,
} from "@/data/projects";

type SearchParams = Promise<{ cat?: string }>;

function isCategory(value: string | undefined): value is ProjectCategory {
  return !!value && (categoryOrder as string[]).includes(value);
}

async function WorksBody({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const cat = isCategory(params.cat) ? params.cat : null;
  const projects = cat ? getProjectsByCategory(cat) : [];

  if (cat) {
    return (
      <>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              href="/works"
              className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)]"
            >
              ← All categories
            </Link>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
              {categoryLabels[cat]}
            </h1>
            <p className="mt-2 text-[var(--ink-soft)]">
              Drag the covers — center card shows the project title & date.
            </p>
          </div>
        </div>
        <CoverflowCarousel projects={projects} />
      </>
    );
  }

  return (
    <>
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.24em] text-[var(--brand-violet)] uppercase">
          Works
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
          Pick a category
        </h1>
        <p className="mt-3 text-[var(--ink-soft)]">
          Browse by discipline, then spin through project covers.
        </p>
      </header>
      <CategoryPicker />
    </>
  );
}

export default function WorksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 pt-20">
        <StarField />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <Suspense
            fallback={
              <p className="py-20 text-center text-[var(--ink-soft)]">
                Loading works…
              </p>
            }
          >
            <WorksBody searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
