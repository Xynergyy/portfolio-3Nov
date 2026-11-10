export type ProjectCategory =
  | "3d"
  | "2d"
  | "ui"
  | "graphic"
  | "product"
  | "other";

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "model"; src: string; poster?: string };

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
  /** Optional rich media for the popup (video / 3D model supported). */
  media?: ProjectMedia[];
  /** Optional external case / product URL */
  href?: string;
  /** Button text for `href` — defaults to "View project". */
  hrefLabel?: string;
  featured?: boolean;
  draft?: boolean;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  "3d": "3D",
  "2d": "2D",
  ui: "UX/UI",
  graphic: "Graphic",
  product: "Product",
  other: "Other",
};

export const categoryOrder: ProjectCategory[] = [
  "3d",
  "2d",
  "ui",
  "graphic",
  "product",
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
    slug: "cosi-pilot",
    title: "CoSI Pilot",
    subtitle: "VR-Based Drone Pilot Training Simulator",
    category: "ui",
    date: "2026-05",
    dateLabel: "May 2026 – Present",
    teamSize: 5,
    role: "UX/UI Designer, QA Tester",
    summary:
      "Designed user interfaces for VR/PC simulators and web-based dashboards for reviewing detailed training results. Tested VR and PC builds, identified usability and technical issues, and communicated feedback to the development team.",
    learned:
      "Through work at the Center of Specialty Innovation (CoSI) — a university research center where real industry briefs count toward coursework — I learned what production feels like outside the classroom. Collaborating with a cross-functional team on a live client-facing simulator pushed me to communicate clearer, adapt faster, and treat UX and QA as part of the same loop: design, test, report, and improve until the experience held up in real builds.",
    tools: ["Figma", "Unity"],
    tags: ["#UX/UI", "#Tester", "#VR", "#Unity", "#Web-App"],
    cover: "/works/cosi-pilot/cover.png",
    images: [
      "/works/cosi-pilot/cover.png",
      "/works/cosi-pilot/01.png",
      "/works/cosi-pilot/02.png",
      "/works/cosi-pilot/03.png",
      "/works/cosi-pilot/04.png",
      "/works/cosi-pilot/05.png",
      "/works/cosi-pilot/06.png",
      "/works/cosi-pilot/07.png",
      "/works/cosi-pilot/08.png",
      "/works/cosi-pilot/09.png",
    ],
    href: "https://cosi.bu.ac.th/projects/cosi-pilot",
    featured: true,
  },
  {
    slug: "whos-next",
    title: "Who’s Next?",
    subtitle: "Global Game Jam 2026 — a lonely alien who befriends humans by becoming them",
    category: "2d",
    date: "2026-01",
    dateLabel: "30 Jan – 1 Feb 2026",
    teamSize: 6,
    role: "2D Artist",
    summary:
      "Made in 48 hours at Global Game Jam 2026 (Game Dev Hub site) for the theme “Mask”. You play a lonely little alien who wants human friends — and the only way to blend in is to eat a human and wear their skin. Players follow a chain of “friends” (eat a woman to approach a man, a man to approach a grandma, and so on), avoid the wrong targets, and grab a Friendship Potion to break the rules for a few seconds, racing the clock for a high score. As one of three artists on Team 99%, I drew 2D character art and game UI in a goofy, hand-drawn cartoon style that keeps the dark joke funny rather than creepy. Playable in the browser on itch.io.",
    learned:
      "A 48-hour jam showed me how differently code and art move under pressure: by day two the programmers were ahead while every piece of art still had to be drawn by hand, so I learned to prioritise the assets that matter most for play, reuse what I could, and keep a style simple enough to produce fast without looking unfinished. We submitted just seven minutes before the deadline, which taught me a lot about scoping and staying calm with a team when time runs out. Winning the Best Creative Concept award also proved that a clear, funny idea and a strong visual voice can stand out even in a game made in a weekend.",
    award: "The Best Creative Concept Award — Global Game Jam 2026, Game Dev Hub.",
    tools: ["Clip Studio Paint", "Figma"],
    tags: ["#GameJam", "#GGJ2026", "#2DArt", "#CharacterDesign", "#GameUI", "#Unity"],
    cover: "/works/whos-next/01.webp",
    images: [
      "/works/whos-next/01.webp",
      "/works/whos-next/02.webp",
      "/works/whos-next/03.webp",
      "/works/whos-next/04.webp",
      "/works/whos-next/05.webp",
      "/works/whos-next/06.webp",
      "/works/whos-next/07.webp",
    ],
    href: "https://witchery-zzz.itch.io/whos-next",
    hrefLabel: "Play on itch.io",
    featured: true,
  },
  {
    slug: "dva-gun",
    title: "D.Va’s Gun",
    subtitle: "Hard-surface fan-art model of D.Va’s light gun from Overwatch",
    category: "3d",
    date: "2026-04",
    dateLabel: "Apr 2026",
    teamSize: 1,
    role: "3D Modeler & Texture Artist",
    summary:
      "A class assignment to recreate D.Va’s light gun from Overwatch as a 3D model (fan art). I built it with hard-surface modeling, matching the weapon’s Korean sci-fi mech-inspired design, then unwrapped the UVs and textured it in Substance Painter — painted metal, a glossy pink shell and glowing neon accents — aiming for a stylized-realistic finish that would sit comfortably in a game.",
    learned:
      "This was only my second modeling project, and it’s where the technical side clicked for me. Hard-surface work forced me to care about clean topology — keeping edge flow tidy so bevels and curves stayed smooth — and laying out UVs properly made texturing far easier and sharper. I also learned how much lighting changes the way materials read: the same metal and neon looked flat or convincing depending on the setup, which taught me to test lighting early instead of treating it as the last step.",
    tools: ["Blender", "Substance Painter"],
    tags: ["#3D", "#HardSurface", "#Texturing", "#Blender", "#SubstancePainter", "#FanArt"],
    cover: "/works/dva-gun/01.webp",
    images: [
      "/works/dva-gun/01.webp",
      "/works/dva-gun/02.png",
      "/works/dva-gun/03.png",
    ],
    href: "https://youtu.be/3PeDOVDZAWA",
    hrefLabel: "Watch on YouTube",
  },
  {
    slug: "the-crypt-whisper",
    title: "The Crypt Whisper",
    subtitle: "3D puzzle game",
    category: "3d",
    date: "2025-07",
    dateLabel: "Jul – Aug 2025",
    teamSize: 3,
    role: "2D & 3D Artist",
    summary:
      "Created 2D and 3D art for a first-person cooperative puzzle game — one player explores the crypt while the other reads the manual, Keep Talking and Nobody Explodes–style. Focused on the physical/digital manual and in-game puzzle objects that make the duo loop work.",
    learned:
      "Jumping between Procreate and Maya taught me to design 2D assets with the 3D pipeline in mind — readable as a manual page, then solid enough as puzzle props in-engine. Preparing for the first-round selection of the National Software Contest 2025 also forced clearer priorities under a hard deadline: ship the art that made the co-op puzzle readable, not every detail that felt nice to polish.",
    award:
      "Selected for the first round of the National Software Contest (NSC) 2025.",
    tools: ["Maya", "Procreate"],
    tags: ["#Unreal", "#Maya", "#3DGame", "#PuzzleGame"],
    cover: "/works/crypt-whisper/cover.png",
    images: [
      "/works/crypt-whisper/cover.png",
      "/works/crypt-whisper/01.png",
      "/works/crypt-whisper/02.png",
    ],
    media: [
      {
        type: "video",
        src: "/works/crypt-whisper/trailer.mp4",
        poster: "/works/crypt-whisper/cover.png",
      },
      { type: "image", src: "/works/crypt-whisper/cover.png" },
      { type: "image", src: "/works/crypt-whisper/01.png" },
      { type: "image", src: "/works/crypt-whisper/02.png" },
    ],
    featured: true,
  },
  {
    slug: "wespray",
    title: "WeSpray",
    subtitle: "Back-acne spray — product, mascot & print design",
    category: "product",
    date: "2024-10",
    dateLabel: "2024 – 2025 · 1st year",
    teamSize: 1,
    role: "Freelance Product & Graphic Designer",
    summary:
      "A freelance commission to design WeSpray, a spray you mist onto your shirt to treat and prevent back acne. I designed the bottle around a hook so it can hang on a shower rail or clothes hanger, created a small water-drop mascot, and modeled and rendered the product shots in 3D. I also designed the printed materials — a roll-up banner and flyer explaining the benefits, a three-step how-to, and QR codes for contact and the client’s survey — using a fresh blue–white palette to feel clean and cooling.",
    learned:
      "WeSpray was my first freelance job, in my first year of university. Working for a real client taught me to turn a brief into concrete options, explain my design decisions, and take feedback without losing the core idea. Carrying one concept across a 3D product render, a mascot and print materials showed me how much a consistent identity holds a product together, and delivering finished files on a client’s schedule gave me my first taste of working professionally rather than for a class.",
    tools: ["Maya", "Procreate", "Canva"],
    tags: ["#ProductDesign", "#Packaging", "#3D", "#Mascot", "#Print", "#Freelance"],
    cover: "/works/wespray/01.jpg",
    images: [
      "/works/wespray/01.jpg",
      "/works/wespray/02.webp",
      "/works/wespray/03.webp",
    ],
  },
  {
    slug: "buiti-student-council",
    title: "BUITI Student Council",
    subtitle: "Social media design & content planning for a faculty student council",
    category: "graphic",
    date: "2025-08",
    dateLabel: "Aug – Nov 2025",
    teamSize: 1,
    role: "Graphic Designer & Content Creator",
    summary:
      "As the only PR designer on the School of Information Technology and Innovation student council at Bangkok University, I planned the posting schedule and designed every post for the faculty’s Instagram during the 2025 academic year — orientation, BU Open House, Freshy Sport Day results, football and basketball jersey pre-orders, staff and cheerleader recruitment, and event recaps. I kept a consistent dark-blue, high-contrast look so each post read as BUITI at a glance, while working with the other council teams to get details and timing right. The role passes to a new team each year, so this work covers my 2025 term.",
    learned:
      "Being the only person on PR meant I owned the whole pipeline — deciding what to post and when, designing it, and getting it out on time. Coordinating with the events, sports and merchandise teams taught me to chase the right information early, keep a content calendar realistic, and design systems instead of one-off posts so I could keep up with a busy semester. Seeing which posts students actually engaged with also showed me how much timing and clear calls to action matter, not just how a post looks.",
    tools: ["Canva"],
    tags: ["#GraphicDesign", "#SocialMedia", "#ContentPlanning", "#Instagram", "#StudentCouncil"],
    cover: "/works/buiti-student-council/02.webp",
    images: [
      "/works/buiti-student-council/01.webp",
      "/works/buiti-student-council/02.webp",
      "/works/buiti-student-council/03.webp",
      "/works/buiti-student-council/04.png",
    ],
    href: "https://www.instagram.com/buitistudentact/",
    hrefLabel: "View on Instagram",
  },
  {
    slug: "kloyds",
    title: "Kloyd’s",
    subtitle: "Retro packaging for a local cassava-chip snack",
    category: "product",
    date: "2024-01",
    dateLabel: "2024 · ~1 month",
    teamSize: 3,
    role: "Art Director",
    summary:
      "A class assignment to redesign the packaging for crispy fried cassava chips made in Khao Kroi, a local community product. As art director, I led the visual direction: a playful 90s-retro brand called Kloyd’s with a bold logo, sunburst badge, checkerboard pattern, a cute snacking-kid illustration and a warm orange–teal–yellow palette. The pouch is a kraft-paper stand-up bag with a zip-lock so the chips stay fresh after opening, and we mocked it up in 3D and produced a short promo video.",
    learned:
      "Leading the art direction in a team of three taught me to set a clear visual direction early — mood, palette and references — so everyone could design toward the same result instead of merging three styles at the end. Redesigning a real local product also showed me that packaging has to work on the shelf and in the hand, not just look good on screen: legibility, nutrition labelling and a resealable pouch mattered as much as the illustration. Using Pacdora to fold the dieline into a 3D mock-up helped us check proportions before presenting.",
    tools: ["Procreate", "Canva", "Pacdora"],
    tags: ["#Packaging", "#Branding", "#Illustration", "#Retro", "#ClassProject"],
    cover: "/works/kloyds/01.webp",
    images: ["/works/kloyds/01.webp"],
    media: [
      {
        type: "video",
        src: "/works/kloyds/trailer.mp4",
        poster: "/works/kloyds/01.webp",
      },
      { type: "image", src: "/works/kloyds/01.webp" },
    ],
  },
  {
    slug: "codev-community",
    title: "CoDev Community",
    subtitle: "Brand & event graphics for a student developer community",
    category: "graphic",
    date: "2025-06",
    dateLabel: "Jun – Jul 2025",
    teamSize: 2,
    role: "Graphic Designer",
    summary:
      "Designed the Instagram presence for CoDev, a community for student developers — intro and “Join Us” recruitment posts, a full set of speaker cards for its first meetup, Level Up Student Dev (23 June 2025, SCBX Next Tech), sponsor thank-you posts and the post-event recap. I built a bold pink–purple identity on dark backgrounds with a reusable speaker-card template so every announcement felt part of one series.",
    learned:
      "Designing for a brand-new community meant shaping its look from the very first post, not just following an existing guide. Creating a speaker template that could hold very different names, titles and photos taught me to design flexible systems that still look consistent, and producing a whole run of announcements on a tight lead-up to the event pushed me to work faster in Figma without losing polish. It was also a good lesson in how a clear visual identity helps a small, new group look credible to speakers, sponsors and attendees.",
    tools: ["Figma"],
    tags: ["#GraphicDesign", "#SocialMedia", "#Branding", "#EventDesign", "#Community"],
    cover: "/works/codev-community/01.webp",
    images: [
      "/works/codev-community/01.webp",
      "/works/codev-community/02.png",
      "/works/codev-community/03.webp",
    ],
    href: "https://www.instagram.com/codev.community/",
    hrefLabel: "View on Instagram",
  },
  {
    slug: "devfest-bangkok-2025",
    title: "DevFest Bangkok 2025",
    subtitle:
      "Merch & gadget design for GDG Bangkok and GDG Cloud Bangkok’s flagship community tech conference",
    category: "product",
    date: "2025-10",
    dateLabel: "Oct – Nov 2025",
    teamSize: 2,
    role: "Merchandise & Gadget Designer",
    summary:
      "DevFest Bangkok is the annual, community-led tech conference run by Google Developer Group Bangkok and GDG Cloud Bangkok. On a two-person graphic team within a wider organising crew of around 7–10, I designed the event’s gadgets — Thai elephant pants, ya-dom (herbal inhaler) stickers and lanyards. The GDG mascot already existed; my job was to recompose it into new layouts and patterns that mixed it with Thai motifs, so the merch felt local, playful and unmistakably DevFest.",
    learned:
      "As a second-year student on a team of experienced professionals, this project was a crash course in how real event production runs. I learned to plan backwards from print and production deadlines, come to meetings with options ready to discuss, and take direction from senior organisers quickly and without fuss. Working with an existing mascot also taught me to respect someone else’s character design while still finding fresh compositions for each item, and seeing how the team broke a large event into owners and timelines changed how I plan my own projects.",
    tools: ["Figma", "Canva"],
    tags: ["#Merchandise", "#ProductDesign", "#EventDesign", "#ThaiPattern", "#GDG"],
    cover: "/works/devfest-bangkok-2025/cover.png",
    images: [
      "/works/devfest-bangkok-2025/01.webp",
      "/works/devfest-bangkok-2025/02.png",
      "/works/devfest-bangkok-2025/03.png",
      "/works/devfest-bangkok-2025/04.png",
      "/works/devfest-bangkok-2025/05.webp",
      "/works/devfest-bangkok-2025/06.webp",
    ],
  },
  {
    slug: "bu-space",
    title: "BU Space",
    subtitle: "Scholarship activity tracking web app",
    category: "ui",
    date: "2026-08",
    dateLabel: "Aug 2026 – Present",
    teamSize: 1,
    role: "UX/UI Designer & Frontend Developer",
    summary:
      "Designed a web application concept for recording, reviewing, and approving student scholarship activities. Built the system concept and UX/UI through research and iterative design across multiple versions.",
    learned:
      "Working solo on BU Space pushed me to own the full loop — research, structure, interface, and frontend direction. Iterating through multiple design versions taught me to validate flows before overbuilding, and using tools like Figma, React, and Next.js together made the gap between concept and a shippable web app feel much smaller.",
    tools: ["Figma", "React", "Next.js", "Claude"],
    tags: ["#WebApp", "#UX/UI", "#Nextjs", "#React", "#Figma", "#Solo"],
    cover: "/works/bu-space/cover.png",
    images: [
      "/works/bu-space/cover.png",
      "/works/bu-space/03.png",
      "/works/bu-space/04.png",
      "/works/bu-space/05.png",
      "/works/bu-space/01.png",
      "/works/bu-space/02.png",
    ],
    media: [
      {
        type: "video",
        src: "/works/bu-space/trailer.mp4",
        poster: "/works/bu-space/cover.png",
      },
      { type: "image", src: "/works/bu-space/cover.png" },
      { type: "image", src: "/works/bu-space/03.png" },
      { type: "image", src: "/works/bu-space/04.png" },
      { type: "image", src: "/works/bu-space/05.png" },
      { type: "image", src: "/works/bu-space/01.png" },
      { type: "image", src: "/works/bu-space/02.png" },
    ],
    featured: true,
  },
  {
    slug: "testcoop",
    title: "TestCoop",
    subtitle: "Test, Learn, and Earn Together — a software-testing community for tech learners",
    category: "ui",
    date: "2024-07",
    dateLabel: "Jul – Sep 2024",
    teamSize: 5,
    role: "UX/UI & Graphic Designer",
    summary:
      "TestCoop is a startup concept that tackles two problems at once: software teams rarely have enough time or testers to test properly, and many students and first-jobbers want real experience and extra income but can’t get it. TestCoop is an online community where tech learners take on testing work for real companies. Companies send in-sprint tickets (feature, UI and API tests, plus performance and security) or book weekly regression and production testing, and learners join each project as a “quest”, design the test cases, report pass/fail results, and get paid, with TestCoop keeping a 30% commission. A learning roadmap takes them from manual testing and test-case design up to automation, performance and security testing. In a team of five, I was one of two designers and focused on UX/UI, designing the four-step learner flow — the Board of Quest, the test-case editor, results reporting, and “Your Journey”, a rewards dashboard with earnings, contributions and a leaderboard — in a navy-and-gold style. I also designed the visuals for our pitch. As team The Walking Dev, we pitched TestCoop at AfterKlass Business Camp #5 (YoungBiz Accelerator Camp by Kasikornthai Foundation × KBank) and made the final 12 teams.",
    learned:
      "TestCoop showed me how much design starts before the screens. We interviewed learners and companies first, and hearing that students wanted income, a portfolio and new skills, while companies just wanted someone to test when things got urgent, shaped the whole flow: join a quest, design the tests, report, get rewarded. Borrowing game ideas like quests, points and a leaderboard made a fairly dry task feel motivating, but I had to balance that playful layer with screens that needed to stay clear and data-heavy, like the test-case table. It was also my first time designing a product for a pitch — and standing in front of the judges at Mini Pitching — which taught me to explain a business model visually, not just make the UI look good.",
    award:
      "Top 12 teams — AfterKlass Business Camp #5 (YoungBiz Accelerator Camp), team The Walking Dev. Selected into the Top 30 from the open call (applications 31 Jul – 6 Sep 2024), then advanced to the final 12 at Mini Pitching.",
    tools: ["Figma", "Canva"],
    tags: ["#UXUI", "#WebDesign", "#Gamification", "#Dashboard", "#Competition", "#Pitching", "#AfterKlass"],
    cover: "/works/testcoop/cover.png",
    images: [
      "/works/testcoop/cover.png",
      "/works/testcoop/01.png",
      "/works/testcoop/02.png",
      "/works/testcoop/03.png",
      "/works/testcoop/camp-01.webp",
      "/works/testcoop/camp-02.webp",
      "/works/testcoop/camp-03.webp",
      "/works/testcoop/camp-04.webp",
    ],
  },
  {
    slug: "sita",
    title: "Sita",
    subtitle: "Fan-made Valorant agent concept inspired by Thai culture",
    category: "2d",
    date: "2024-01",
    dateLabel: "2024",
    teamSize: 1,
    role: "Character Designer & Illustrator",
    summary:
      "A personal fan-art project: what would a Thai agent look like in Valorant? Sita wears a sabai-style wrap top, a purple skirt, and gold jewellery with Thai kranok details, and carries a golden bow whose tips curl like Thai ornaments. Her kit follows the game’s ability format. C equips the golden bow, and a single-fire kill recharges it. Q throws a lotus-shaped projectile that blooms into a vision-blocking cloud. E sends her little golden companion, Dodo, to burst into a flash that blinds enemies. I painted the character in Procreate, then laid out the key art and the ability sheet in Canva. The palette is gold, blue and deep purple, with sky lanterns and temple silhouettes in the background.",
    learned:
      "Sita taught me how to design a character to fit an existing game’s world instead of drawing from a blank page. To fit Valorant I had to study its rules: a readable silhouette, a short colour palette, and abilities that match the game’s smoke, flash and weapon roles. Adding Thai culture made it harder still, because traditional costumes are very detailed, and I learned to keep the details that read instantly (the gold collar, the kranok shapes, the sabai wrap) and simplify the rest so the character still feels like a modern game agent. Designing the ability icons also showed me how a single simple shape has to explain a whole skill at a glance.",
    tools: ["Procreate", "Canva"],
    tags: ["#CharacterDesign", "#2DArt", "#FanArt", "#Valorant", "#ThaiCulture", "#Procreate"],
    cover: "/works/sita/01.webp",
    images: ["/works/sita/01.webp", "/works/sita/02.png"],
  },
  {
    slug: "stupid-hackathon-2026",
    title: "Stupid Hackathon 2026",
    subtitle: "Frutiger Aero × Y2K event identity for Creatorsgarten",
    category: "graphic",
    date: "2026-09",
    dateLabel: "Sep – Oct 2026",
    teamSize: 1,
    role: "Graphic Designer (Volunteer)",
    summary:
      "Stupid Hackathon is Creatorsgarten’s hackathon for building useless, ridiculous things just for fun. The 2026 edition ran on 10–11 Oct at the Cleverse office. I volunteered to design its visual identity and social posts, built on Frutiger Aero and Y2K nostalgia: glossy MSN-style buddy icons, a goldfish and a four-leaf clover, soap bubbles, the Windows XP hills-and-sky backdrop with a taskbar on every post, and props like CRT monitors, flip phones and Windows Media Player. The set covered the logo, the “239 Pages Paper” challenge post, team registration, the Late Bird ticket teaser, the event-photo cover, and a sticker sheet of joke stickers (“Brain.exe has stopped working”, a brain in the recycle bin, a failed reCAPTCHA). Creatorsgarten is a volunteer-run community, so this was unpaid work done for the community.",
    learned:
      "This project taught me to commit fully to a style. Frutiger Aero and Y2K only work when every detail is in on it — the glossy highlights, the pixel fonts, the XP taskbar — so I built a small kit of recurring elements and reused it across posts so they all felt like one system, even though each post carried different information. Designing for a deliberately silly event also taught me that humour is a design skill: the jokes had to land quickly with a developer audience without burying the dates and calls to action people actually needed. And because Creatorsgarten’s page is shared by many volunteer designers, I learned to make my event feel distinct while still fitting the community’s voice.",
    tools: ["Canva", "Figma", "Illustrator"],
    tags: ["#GraphicDesign", "#EventBranding", "#FrutigerAero", "#Y2K", "#SocialMedia", "#Community"],
    cover: "/works/stupid-hackathon-2026/01.webp",
    images: [
      "/works/stupid-hackathon-2026/01.webp",
      "/works/stupid-hackathon-2026/02.webp",
      "/works/stupid-hackathon-2026/03.webp",
      "/works/stupid-hackathon-2026/04.webp",
      "/works/stupid-hackathon-2026/05.webp",
      "/works/stupid-hackathon-2026/06.webp",
      "/works/stupid-hackathon-2026/07.png",
      "/works/stupid-hackathon-2026/08.png",
      "/works/stupid-hackathon-2026/09.png",
    ],
    href: "https://www.facebook.com/creatorsgarten",
    hrefLabel: "Creatorsgarten on Facebook",
    featured: true,
  },
  {
    slug: "chum-chum-summer",
    title: "Chum Chum Summer",
    subtitle: "A 90s Thai shaved-ice shop game built for a game-physics class",
    category: "2d",
    date: "2026-05",
    dateLabel: "May 2026",
    teamSize: 2,
    role: "2D Artist",
    summary:
      "Chum Chum Summer (ฉ่ำฉ่ำ ซัมเมอร์) is a browser game made by our two-person team, “3 Minus 1”, for a Physics for Games class. The brief was to build real physics into the gameplay. You play the grumpy scout-uniformed uncle running a shaved-ice cart outside a school, serving kids on a scorching afternoon before they lose patience. Each order is a chain of physics mini-games: shave the ice block while a fan blows the flakes off course (air resistance), squirt red syrup that arcs out of the bottle (projectile motion), and drop bread cubes and green jelly that bob in their jar (2D buoyancy). The game then scores how close you got to the order. As the artist, I aimed for the feel of a 90s Thai neighbourhood ice stall in the summer heat, drawn like a children’s cartoon. I drew the characters, ingredients, props and game UI, and set them over background scenes we generated with Gemini.",
    learned:
      "Making art for a physics game taught me that assets aren’t just decoration. The ice flakes, syrup and jelly cubes all had to work as physics objects, so I learned to draw with colliders and motion in mind: simple, readable shapes that still look right when they fall, splash or float. With a team of two, I also had to plan the art list carefully against the gameplay so every scene had what it needed in time. Mixing hand-drawn characters with AI-generated backgrounds taught me how to tie different sources together into one warm, nostalgic look through colour, lighting and line style, and to be clear about which parts are mine.",
    tools: ["Unity"],
    tags: ["#GameArt", "#2DArt", "#GamePhysics", "#Unity", "#ThaiNostalgia", "#UI"],
    cover: "/works/chum-chum-summer/01.webp",
    images: [
      "/works/chum-chum-summer/01.webp",
      "/works/chum-chum-summer/02.webp",
      "/works/chum-chum-summer/03.webp",
    ],
    href: "https://maillegal.itch.io/chum-chum-summer",
    hrefLabel: "Play on itch.io",
  },
  {
    slug: "land-shaper",
    title: "Land Shaper",
    subtitle: "A tile-laying board game about animals burying their treasure",
    category: "other",
    date: "2025-02",
    dateLabel: "Feb – Mar 2025",
    teamSize: 5,
    role: "Character Designer, Rulebook & Graphic Designer",
    summary:
      "Land Shaper is a board game by our team, Sigma Gals. Its theme comes from how animals bury their valuables in the ground. Each turn, players lay square tiles split into grass, water and soil, and colours have to match where tiles meet. When a player builds the right shape, they can bury a treasure chest: silver for a 4-tile square, gold for a 5-tile one, each hiding a random score. Closing off an area earns action cards that let you mess with your friends: Destroy, Steal, Wildfire, Dry, Quake, Block, Shield and Rebirth. The first player to bury three chests ends the game, and the highest score wins. I designed the cast of cats, dogs and foxes and drew the illustration for each action card. I also designed the rulebook, the logo and the key art, and we playtested on a digital tabletop. The game went through eight versions, and the rulebook went through four rounds of blind testing.",
    learned:
      "Land Shaper taught me that in a board game, the art has to teach. Each action card needed a character pose and colour that hinted at what the card does before anyone read the text, and on the tiles, grass, water and soil had to be easy to tell apart at a glance on a crowded table. Designing the rulebook was the hardest part. In blind tests, players learned the game from the rulebook alone, and watching where they got stuck showed me that pictures of right and wrong tile placements explained more than paragraphs of rules. After four rounds of revisions, I learned to treat a rulebook as a UX problem rather than a document.",
    tools: ["Procreate", "Canva"],
    tags: ["#BoardGame", "#CharacterDesign", "#RulebookDesign", "#GameDesign", "#Illustration"],
    cover: "/works/land-shaper/cover.webp",
    images: [
      "/works/land-shaper/cover.webp",
      "/works/land-shaper/01.png",
      "/works/land-shaper/02.png",
      "/works/land-shaper/03.png",
      "/works/land-shaper/04.webp",
      "/works/land-shaper/05.webp",
      "/works/land-shaper/06.webp",
      "/works/land-shaper/07.webp",
      "/works/land-shaper/08.png",
    ],
    media: [
      { type: "image", src: "/works/land-shaper/cover.webp" },
      {
        type: "video",
        src: "/works/land-shaper/presentation.mp4",
        poster: "/works/land-shaper/cover.webp",
      },
      { type: "image", src: "/works/land-shaper/01.png" },
      { type: "image", src: "/works/land-shaper/02.png" },
      { type: "image", src: "/works/land-shaper/03.png" },
      { type: "image", src: "/works/land-shaper/04.webp" },
      { type: "image", src: "/works/land-shaper/05.webp" },
      { type: "image", src: "/works/land-shaper/06.webp" },
      { type: "image", src: "/works/land-shaper/07.webp" },
      { type: "image", src: "/works/land-shaper/08.png" },
    ],
    href: "https://canva.link/tebulgmsn5faldp",
    hrefLabel: "Read the design document",
    featured: true,
  },
  {
    slug: "seraph",
    title: "Seraph",
    subtitle: "Digital illustration",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Illustrator",
    summary: "A blindfolded, many-eyed angel melting into a golden pedestal.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#Illustration"],
    cover: "/works/character-studies/01.webp",
    images: ["/works/character-studies/01.webp"],
  },
  {
    slug: "moodeng",
    title: "Moodeng",
    subtitle: "Character turnaround sheet",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Character Designer",
    summary: "Front and back views of an original character, in line art and in colour.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#CharacterDesign", "#Turnaround"],
    cover: "/works/character-studies/02.webp",
    images: ["/works/character-studies/02.webp"],
  },
  {
    slug: "white-blood",
    title: "White Blood",
    subtitle: "Digital illustration",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Illustrator",
    summary: "A silver-haired girl in a crown of thorns, drawn with rough, expressive brushwork.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#Illustration"],
    cover: "/works/character-studies/03.webp",
    images: ["/works/character-studies/03.webp"],
  },
  {
    slug: "lavender",
    title: "Lavender",
    subtitle: "Digital illustration",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Illustrator",
    summary: "A soft pastel portrait with flowing lavender hair.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#Illustration"],
    cover: "/works/character-studies/04.webp",
    images: ["/works/character-studies/04.webp"],
  },
  {
    slug: "midnight-blue",
    title: "Midnight Blue",
    subtitle: "Digital illustration",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Illustrator",
    summary: "A painterly portrait in deep blue and black.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#Illustration"],
    cover: "/works/character-studies/05.webp",
    images: ["/works/character-studies/05.webp"],
  },
  {
    slug: "slime-buddies",
    title: "Slime Buddies",
    subtitle: "Character sketch",
    category: "2d",
    date: "2025-01",
    dateLabel: "Personal work",
    teamSize: 1,
    role: "Illustrator",
    summary: "A laid-back character with two little slime companions.",
    learned: "",
    tools: ["Procreate"],
    tags: ["#Illustration", "#CharacterDesign"],
    cover: "/works/character-studies/06.webp",
    images: ["/works/character-studies/06.webp"],
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
  {
    slug: "star-survey",
    title: "Star Survey",
    subtitle: "Social content for an AI-powered survey platform",
    category: "graphic",
    date: "2024-12",
    dateLabel: "Dec 2024 – Feb 2025",
    teamSize: 4,
    role: "Graphic & PR Designer",
    summary:
      "Star Survey is an AI survey platform that analyses each response and generates the next question on the fly, so surveys get to the point faster. I planned the content and designed the Instagram posts that introduced the platform, explained how it works, and promoted its first online focus group — built around a red–black, starry visual identity with cut-paper collage and meme-style posts to make survey talk feel approachable. The product is currently on hold.",
    learned:
      "This was one of my first real PR projects, and my first time working with this team — friends from a different university. Planning content from scratch taught me to think about what an audience needs to hear first before deciding how it should look, and to turn a fairly technical idea like AI-generated questions into posts people would actually stop for. Collaborating across universities also taught me to communicate clearly and stay in sync remotely with people I hadn’t worked with before.",
    tools: ["Canva"],
    tags: ["#GraphicDesign", "#SocialMedia", "#PR", "#Instagram", "#Content"],
    cover: "/works/star-survey/cover.png",
    images: [
      "/works/star-survey/01.png",
      "/works/star-survey/02.png",
      "/works/star-survey/03.png",
    ],
    href: "https://www.instagram.com/starsurvey_official/",
    hrefLabel: "View on Instagram",
  },
];

/** Projects visible on the site — drafts stay hidden until their write-up is ready. */
export const publishedProjects = projects.filter((p) => !p.draft);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectMedia(project: Project): ProjectMedia[] {
  if (project.media?.length) return project.media;
  return project.images.map((src) => ({
    type: "image" as const,
    src,
    alt: project.title,
  }));
}
