import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/project-detail";
import { SiteHeader } from "@/components/site-header";
import { StarField } from "@/components/star-field";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 pt-20">
        <StarField />
        <ProjectDetail project={project} />
      </main>
    </>
  );
}
