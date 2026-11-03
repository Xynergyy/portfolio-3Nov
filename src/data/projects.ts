export type ProjectCategory = "3d" | "2d" | "ui" | "graphic" | "other";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  date: string;
  dateLabel: string;
  teamSize: number;
  role: string;
  summary: string;
  learned: string;
  award?: string;
  tools: string[];
  tags: string[];
  cover: string;
  images: string[];
  featured?: boolean;
  draft?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  "3d": "3D",
  "2d": "2D",
  ui: "UI",
  graphic: "Graphic",
  other: "Other",
};

export const categoryOrder: ProjectCategory[] = [
  "3d",
  "2d",
  "ui",
  "graphic",
  "other",
];

/** Rough placeholders until full case studies land — Ramhunt is complete. */
export const projects: Project[] = [
  {
    slug: "ramhunt",
    title: "Ramhunt",
    subtitle: "VR Thai Dancing Ghost",
    category: "3d",
    date: "2026-05",
    dateLabel: "May – Jun 2026",
    teamSize: 5,
    role: "3D Character Design, Sound Brief, Mocap Director, UI Designer",
    summary:
      "Created the 3D characters and designed the UX/UI in Figma for a VR game where players mirror a ghost dancer’s Thai dance poses to win. Planned and ran a mocap session with a hired Thai dancer using Rokoko, then handed the data to an animator for cleanup and re-rigging. Wrote sound briefs and directed an outsourced audio mixer.",
    learned:
      "Working under a tight 40-day deadline taught me how to scope honestly and lead under pressure. Our core team started with only three people — a programmer, a 3D environment artist, and me covering character, sound, UI, animation, and rigging. I quickly saw that finishing everything in-house wasn’t realistic, so I used part of the budget to bring in freelancers, briefed them clearly, and kept production moving. The project sharpened my skills in time management, delegation, and turning limited resources into a shippable VR experience.",
    award:
      "Commissioned by a BUSEM team that advanced in the Hug Mae Hackathon and received funding to develop the project further. Joined as hired talent to help bring the concept to a playable build. The team reached the finals but did not take the win.",
    tools: [
      "Character Creator 5",
      "Marvelous Designer",
      "Substance Painter",
      "Blender",
      "Rokoko",
      "Figma",
    ],
    tags: ["#3d", "#character", "#mocap", "#VR", "#Thaisoftpower"],
    cover: "/works/ramhunt/cover.png",
    images: [
      "/works/ramhunt/cover.png",
      "/works/ramhunt/01.png",
      "/works/ramhunt/02.png",
      "/works/ramhunt/03.png",
      "/works/ramhunt/04.png",
      "/works/ramhunt/05.jpg",
      "/works/ramhunt/06.jpg",
      "/works/ramhunt/07.jpg",
      "/works/ramhunt/08.jpg",
    ],
    featured: true,
  },
  {
    slug: "character-studies",
    title: "Character Studies",
    subtitle: "2D exploration set",
    category: "2d",
    date: "2025-11",
    dateLabel: "2025",
    teamSize: 1,
    role: "2D Artist",
    summary: "Placeholder — detailed write-up coming soon.",
    learned: "Details coming soon.",
    tools: ["Procreate", "Clip Studio Paint"],
    tags: ["#2d", "#character"],
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    ],
    draft: true,
    featured: true,
  },
  {
    slug: "interface-playground",
    title: "Interface Playground",
    subtitle: "UI / UX experiments",
    category: "ui",
    date: "2025-08",
    dateLabel: "2025",
    teamSize: 1,
    role: "UI Designer",
    summary: "Placeholder — detailed write-up coming soon.",
    learned: "Details coming soon.",
    tools: ["Figma"],
    tags: ["#ui", "#ux"],
    cover:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    ],
    draft: true,
    featured: true,
  },
  {
    slug: "visual-identity-bits",
    title: "Visual Identity Bits",
    subtitle: "Posters & key art",
    category: "graphic",
    date: "2025-06",
    dateLabel: "2025",
    teamSize: 1,
    role: "Graphic Designer",
    summary: "Placeholder — detailed write-up coming soon.",
    learned: "Details coming soon.",
    tools: ["Photoshop", "Canva"],
    tags: ["#graphic", "#poster"],
    cover:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    ],
    draft: true,
    featured: true,
  },
  {
    slug: "side-experiments",
    title: "Side Experiments",
    subtitle: "Misc interactive bits",
    category: "other",
    date: "2025-03",
    dateLabel: "2025",
    teamSize: 1,
    role: "Creator",
    summary: "Placeholder — detailed write-up coming soon.",
    learned: "Details coming soon.",
    tools: ["Unity", "Blender"],
    tags: ["#other", "#experiment"],
    cover:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    ],
    draft: true,
  },
  {
    slug: "prop-kit",
    title: "Hard-Surface Kit",
    subtitle: "Game-ready props",
    category: "3d",
    date: "2025-09",
    dateLabel: "2025",
    teamSize: 1,
    role: "3D Artist",
    summary: "Placeholder — detailed write-up coming soon.",
    learned: "Details coming soon.",
    tools: ["Blender", "Substance Painter"],
    tags: ["#3d", "#props"],
    cover:
      "https://images.unsplash.com/photo-1614726365723-498aa67c5f7b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1614726365723-498aa67c5f7b?w=1200&q=80",
    ],
    draft: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}
