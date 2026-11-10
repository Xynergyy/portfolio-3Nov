import { AchievementsSection } from "@/components/achievements-section";
import { BeyondCards } from "@/components/beyond-section";
import { HeroSection } from "@/components/hero-section";
import {
  MotionProvider,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import { ProjectsSection } from "@/components/projects-section";
import { ResumeViewer } from "@/components/resume-viewer";
import { SiteHeader } from "@/components/site-header";
import { socialIconMap } from "@/components/social-icons";
import { ToolsSection } from "@/components/tools-section";
import { hasAchievements } from "@/data/achievements";
import { profile } from "@/data/profile";

function SectionHeading({
  title,
  lede,
}: {
  title: string;
  lede: string;
}) {
  return (
    <Reveal className="text-center">
      <h2 className="section-title">{title}</h2>
      <p className="section-lede">{lede}</p>
    </Reveal>
  );
}

export function HomePage() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main id="top" className="flex-1 pt-24">
        <HeroSection />

        <ProjectsSection />

        {hasAchievements ? <AchievementsSection /> : null}

        {/* Education — tint */}
        <section id="education" className="band-white section-pad">
          <div className="band-inner">
            <SectionHeading
              title="Education"
              lede="The foundation behind how I learn and build."
            />
            <Stagger className="mt-10 space-y-4">
              {profile.education.map((edu) => (
                <StaggerItem
                  key={`${edu.school}-${edu.level}`}
                  className="glass lift rounded-3xl p-6 text-left sm:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      {"logo" in edu && edu.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="h-14 w-14 shrink-0 rounded-lg bg-black object-contain p-2 shadow-sm sm:h-16 sm:w-16"
                        />
                      ) : (
                        <div
                          aria-hidden
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold tracking-wide text-primary shadow-sm sm:h-16 sm:w-16 sm:text-base"
                        >
                          {(edu as { school: string }).school.slice(0, 2)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                          {edu.level}
                        </p>
                        <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] sm:text-2xl">
                          {edu.school}
                        </h3>
                        {"degree" in edu && edu.degree ? (
                          <p className="mt-2 text-sm text-[var(--ink)] sm:text-base">
                            {edu.degree}
                          </p>
                        ) : null}
                        <p className="mt-1 text-sm text-[var(--ink-soft)]">
                          {edu.field}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[var(--ink-soft)] sm:text-right">
                      {edu.period}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {"gpa" in edu && edu.gpa ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                        GPA {edu.gpa}
                      </span>
                    ) : null}
                    {"scholarship" in edu && edu.scholarship ? (
                      <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                        {edu.scholarship}
                      </span>
                    ) : null}
                    {"expected" in edu && edu.expected ? (
                      <span className="rounded-full border border-[rgb(59_130_246_/_16%)] bg-white/60 px-3 py-1.5 text-xs font-medium text-[var(--ink)]">
                        Expected {edu.expected}
                      </span>
                    ) : null}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ToolsSection />

        {/* How I Work — white */}
        <section id="how-i-work" className="band-white">
          <div className="section-pad band-inner">
            <SectionHeading
              title="How I Work"
              lede="A simple process from understanding to execution."
            />
            <Stagger className="mt-10 grid gap-4 text-left md:grid-cols-3" stagger={0.14}>
              {profile.howIWork.map((step, i) => (
                <StaggerItem key={step.title} className="glass lift group rounded-3xl p-6">
                  <p className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase transition-transform duration-300 group-hover:scale-125">
                    0{i + 1}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {step.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Beyond — tint */}
        <section id="beyond" className="band-blue section-pad">
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading
              title="Beyond the Work"
              lede="Events, communities, and roles that shaped how I collaborate."
            />
            <BeyondCards />

            <Reveal className="glass mx-auto mt-6 max-w-3xl rounded-3xl p-5 text-left sm:p-6">
              <h3 className="text-sm font-semibold tracking-wide text-primary uppercase">
                Outside the calendar
              </h3>
              <Stagger as="ul" className="mt-3 flex flex-wrap gap-2" stagger={0.06}>
                {profile.hobbies.map((hobby) => (
                  <StaggerItem
                    as="li"
                    variant="pop"
                    key={hobby}
                    className="cursor-default rounded-full border border-[rgb(59_130_246_/_14%)] bg-white/65 px-3 py-1 text-sm text-[var(--ink)] transition-colors hover:bg-white"
                  >
                    {hobby}
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </section>

        {/* Resume — white */}
        <section id="resume" className="band-white">
          <div className="section-pad band-inner">
            <SectionHeading
              title="Resume"
              lede="Click a page to zoom — download when you need the PDF."
            />
            <Reveal className="mt-6 flex justify-center">
              <a
                href={profile.resume}
                download
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_28px_rgb(37_99_235_/_25%)] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95"
              >
                Download PDF
              </a>
            </Reveal>
            <Reveal className="mt-10">
              <ResumeViewer pages={profile.resumePages} />
            </Reveal>
          </div>
        </section>

        {/* Footer — tint */}
        <footer className="band-blue section-pad">
          <div className="band-inner">
            <Reveal className="glass flex flex-col items-center justify-center gap-6 rounded-3xl p-6">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
                  Let’s connect
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-1 text-sm text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {profile.socials.map((social) => {
                  const Icon =
                    socialIconMap[social.label as keyof typeof socialIconMap];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(59_130_246_/_14%)] bg-white/70 text-[var(--ink)] transition duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-white hover:text-primary hover:shadow-[0_10px_24px_rgb(37_99_235_/_18%)]"
                      aria-label={social.label}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : social.label[0]}
                    </a>
                  );
                })}
              </div>
            </Reveal>
            <p className="mt-6 text-xs text-[var(--ink-soft)]">
              © 2026 {profile.fullName}
            </p>
          </div>
        </footer>
      </main>
    </MotionProvider>
  );
}
