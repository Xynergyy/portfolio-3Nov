import { HomeHero } from "@/components/home-hero";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader transparent />
      <main className="flex-1">
        <HomeHero />
      </main>
    </>
  );
}
