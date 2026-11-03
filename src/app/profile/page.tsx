import { ProfilePanel } from "@/components/profile-panel";
import { SiteHeader } from "@/components/site-header";
import { StarField } from "@/components/star-field";

export default function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative flex-1 pt-20">
        <StarField />
        <ProfilePanel />
      </main>
    </>
  );
}
