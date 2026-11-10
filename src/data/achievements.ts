export type AchievementKind = "award" | "competition" | "camp" | "exhibition";

export type Achievement = {
  id: string;
  /** Event / competition / camp name */
  title: string;
  /** What you got — "Winner", "Finalist", "Top 30", "Participant"… */
  result: string;
  /** Organiser or venue */
  org: string;
  /** Shown on the card, e.g. "Jan 2026" */
  period: string;
  /** "YYYY-MM" — used for sorting (newest first) */
  date: string;
  kind: AchievementKind;
  body?: string;
  /** Photo for the card (event photo, certificate, team shot…). Optional. */
  image?: string;
  /** Extra photos — the card cycles through them (hover on desktop, auto on mobile). */
  gallery?: string[];
  /** Slug of a related project — clicking the card opens its popup. */
  project?: string;
  /** External link (certificate, announcement post…) if there's no project. */
  href?: string;
  /** Hidden from the site while true. */
  draft?: boolean;
};

export const kindLabels: Record<AchievementKind, string> = {
  award: "Award",
  competition: "Competition",
  camp: "Camp",
  exhibition: "Exhibition",
};

/*
 * To add a camp or competition, copy this block into the list below:
 *
 * {
 *   id: "camp-name-2025",
 *   title: "Camp Name 2025",
 *   result: "Participant",
 *   org: "Organiser",
 *   period: "Mar 2025",
 *   date: "2025-03",
 *   kind: "camp",
 *   body: "One or two sentences about what you did or learned.",
 *   image: "/achievements/camp-name-2025.webp",
 * },
 *
 * Put photos in public/achievements/ (landscape 4:3 looks best).
 */
const allAchievements: Achievement[] = [
  {
    id: "ggj-2026",
    title: "Global Game Jam 2026",
    result: "The Best Creative Concept Award",
    org: "Game Dev Hub site",
    period: "Jan – Feb 2026",
    date: "2026-01",
    kind: "award",
    body: "48-hour jam on the theme “Mask” — Who’s Next?, a lonely alien who befriends humans by becoming them.",
    image: "/works/whos-next/03.webp",
    project: "whos-next",
  },
  {
    id: "play-nation-2025",
    title: "Play Nation 2025",
    result: "Exhibitor — Land Shaper",
    org: "Board game, card game & game dev festival · Union Hall",
    period: "9 Mar 2025",
    date: "2025-03",
    kind: "exhibition",
    body: "Showcased Land Shaper, team Sigma Gals’ tile-laying board game, and ran live play sessions for visitors at the booth.",
    image: "/achievements/play-nation-2025/01.webp",
    gallery: [
      "/achievements/play-nation-2025/01.webp",
      "/achievements/play-nation-2025/02.webp",
      "/achievements/play-nation-2025/03.webp",
      "/achievements/play-nation-2025/04.webp",
      "/achievements/play-nation-2025/05.webp",
    ],
    project: "land-shaper",
  },
  {
    id: "garena-game-jam-2025",
    title: "Garena Game Jam 2025",
    result: "Top 20 Teams — Frog Farter",
    org: "Garena × Sea · DPU College of Creative Design and Entertainment Technology",
    period: "20 – 22 Jun 2025",
    date: "2025-06",
    kind: "competition",
    body: "As team 404 Brain Not Found, we made the final 20 teams and built Frog Farter during the on-site jam at Dhurakij Pundit University.",
    image: "/achievements/garena-game-jam-2025/01.webp",
    gallery: [
      "/achievements/garena-game-jam-2025/01.webp",
      "/achievements/garena-game-jam-2025/02.webp",
      "/achievements/garena-game-jam-2025/03.webp",
      "/achievements/garena-game-jam-2025/04.webp",
      "/achievements/garena-game-jam-2025/05.webp",
    ],
  },
  {
    id: "ywc-20",
    title: "Young Webmaster Camp 20",
    result: "Selected Camper",
    org: "Thai Webmaster Association (TWA)",
    period: "May – Jun 2025",
    date: "2025-05",
    kind: "camp",
    body: "Selected for YWC #20, “Web Never Die” — a camp for building digital careers, with talks, workshops and team projects alongside campers from across Thailand.",
    image: "/achievements/ywc-20/01.webp",
    gallery: [
      "/achievements/ywc-20/01.webp",
      "/achievements/ywc-20/02.webp",
      "/achievements/ywc-20/03.webp",
      "/achievements/ywc-20/04.webp",
      "/achievements/ywc-20/05.webp",
    ],
  },
  {
    id: "nsc-2025",
    title: "National Software Contest 2025",
    result: "Selected — First Round",
    org: "The 27th NSC · Central region, SIIT Thammasat University",
    period: "Jul – Aug 2025",
    date: "2025-07",
    kind: "competition",
    body: "The Crypt Whisper — a co-op 3D puzzle game where one player explores and the other reads the manual.",
    image: "/achievements/nsc-2025/01.webp",
    gallery: [
      "/achievements/nsc-2025/01.webp",
      "/achievements/nsc-2025/02.webp",
      "/achievements/nsc-2025/03.webp",
      "/achievements/nsc-2025/04.webp",
    ],
    project: "the-crypt-whisper",
  },
  {
    id: "afterklass-camp-5",
    title: "AfterKlass Business Camp #5",
    result: "Top 12 Teams — TestCoop",
    org: "YoungBiz Accelerator Camp · Kasikornthai Foundation × KBank",
    period: "2024",
    date: "2024-09",
    kind: "competition",
    body: "As team The Walking Dev, we pitched TestCoop — a software-testing community for tech learners — and made the final 12 teams.",
    image: "/works/testcoop/camp-01.webp",
    gallery: [
      "/works/testcoop/camp-01.webp",
      "/works/testcoop/camp-02.webp",
      "/works/testcoop/camp-03.webp",
      "/works/testcoop/camp-04.webp",
    ],
    project: "testcoop",
  },
];

export const achievements = allAchievements
  .filter((a) => !a.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const hasAchievements = achievements.length > 0;
