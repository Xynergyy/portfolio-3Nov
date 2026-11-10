export const profile = {
  displayName: "Carrot",
  fullName: "Pariyakorn Saelao",
  greeting: "HI! I'm Carrot",
  roles: ["Game Artist", "UX/UI Designer", "Graphic Design"] as const,
  tagline:
    "Third-year Games & Interactive Media student — making characters, interactions, and playable worlds.",
  about:
    "I’m Pariyakorn Saelao (Carrot), a third-year Games and Interactive Media student at Bangkok University (GPA 3.90, 100% scholarship). I work across 3D character creation, mocap coordination, 2D/3D art, and interactive media — often collaborating with animators and programmers on game and VR projects. I’m especially interested in the technical side of 3DCG and real-time production, where art and interactive tech meet.",
  education: [
    {
      school: "Bangkok University",
      level: "University",
      degree: "B.Sc. Information Technology and Innovation",
      field: "Games and Interactive Media",
      expected: "2027",
      gpa: "3.90/4.00",
      scholarship: "BU Creative 100% Scholarship",
      period: "Jun 2024 – Present",
      logo: "/logos/bu.png",
    },
    {
      school: "Hatyaiwittayalai School",
      level: "Upper Secondary",
      field: "English–Mathematics",
      gpa: "3.89/4.00",
      period: "2022 – 2024 (2565–2567)",
      logo: "/logos/hatyaiwittayalai.png",
    },
    {
      school: "Hatyaiwittayalai School",
      level: "Lower Secondary",
      field: "English Program",
      period: "2020 – 2022 (2563–2565)",
      logo: "/logos/hatyaiwittayalai.png",
    },
  ],
  software: {
    "Game Engines": ["Unity", "Unreal Engine 5"],
    "3D Art & Production": [
      "Blender",
      "Maya",
      "Character Creator 5",
      "Marvelous Designer",
      "Substance Painter",
    ],
    "Motion Capture": ["Rokoko"],
    "2D & Digital Art": ["Clip Studio Paint", "Procreate"],
    "UI / Graphic": ["Figma", "Adobe Photoshop", "Canva"],
    "Video & Motion": [
      "Adobe After Effects",
      "Premiere Pro",
      "FlipaClip",
      "CapCut",
    ],
  },
  languages: [
    { name: "Thai", level: "Native" },
    { name: "English", level: "Intermediate" },
  ],
  softSkills: [
    "Teamwork",
    "Problem Solving",
    "Communication",
    "Cross-functional Collaboration",
    "Time Management",
  ],
  howIWork: [
    {
      title: "Jump in & learn by doing",
      body: "I take risks, try new things, and start building before everything is perfect — then refine as I learn.",
    },
    {
      title: "Draw it until it clicks",
      body: "When concepts feel slow to land — math, code, or systems — I sketch them into pictures until the idea becomes clear.",
    },
    {
      title: "Connect the dots",
      body: "As a generalist, I rarely specialize in one lane — I bridge people and disciplines so the project keeps moving.",
    },
  ],
  beyond: [
    {
      title: "Volunteer",
      org: "2nd Global Economic Forum Annual Meeting Bangkok",
      period: "2026",
      body: "Assisted with on-site event operations and supported the event team to ensure smooth coordination.",
      logos: ["/logos/gef.png"],
      initials: [] as string[],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/gef/01.webp",
        "/beyond/gef/02.webp",
        "/beyond/gef/03.webp",
        "/beyond/gef/04.webp",
        "/beyond/gef/05.webp",
      ] as string[],
    },
    {
      title: "Host",
      org: "BU × KAIT 2026 Student Buddy Program",
      period: "2026",
      body: "Participated in Thai and Japanese cultural exchange, collaborated on an AI technology project for smart cultural experiences.",
      logos: ["/logos/bu.png", "/logos/kait.png"],
      initials: [],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/kait/01.webp",
        "/beyond/kait/02.webp",
        "/beyond/kait/03.webp",
        "/beyond/kait/04.webp",
        "/beyond/kait/05.webp",
        "/beyond/kait/06.webp",
        "/beyond/kait/07.webp",
      ] as string[],
    },
    {
      title: "Volunteer",
      org: "DevFest Bangkok (Google Developer Groups Thailand)",
      period: "2025",
      body: "Sourced and designed Thai soft power gadgets, and coordinated on-site operations and problem-solving.",
      logos: ["/logos/gdg.png", "/logos/google.png"],
      initials: [],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/devfest/01.webp",
        "/beyond/devfest/02.webp",
        "/beyond/devfest/03.webp",
        "/beyond/devfest/04.webp",
        "/beyond/devfest/05.webp",
        "/beyond/devfest/06.webp",
      ] as string[],
    },
    {
      title: "Volunteer",
      org: "WordCamp Bangkok 2025",
      period: "2025",
      body: "Produced promotional media and coordinated teams at an international event with attendees from many countries.",
      logos: ["/logos/wordcamp.png", "/logos/wordpress.png"],
      initials: [],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/wordcamp/01.webp",
        "/beyond/wordcamp/02.webp",
        "/beyond/wordcamp/03.webp",
        "/beyond/wordcamp/04.webp",
        "/beyond/wordcamp/05.webp",
        "/beyond/wordcamp/06.webp",
      ] as string[],
    },
    {
      title: "Vice President, Student Council",
      org: "School of Information Technology and Innovation, Bangkok University",
      period: "2025",
      body: "Led faculty activities, coordinated with internal and external teams, and addressed student concerns through cross-department collaboration.",
      logos: ["/logos/buiti.png", "/logos/bu.png"],
      initials: [],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/student-council/04.webp",
        "/beyond/student-council/01.webp",
        "/beyond/student-council/02.webp",
        "/beyond/student-council/03.webp",
        "/beyond/student-council/05.webp",
        "/beyond/student-council/06.webp",
        "/beyond/student-council/07.webp",
        "/beyond/student-council/08.webp",
      ] as string[],
    },
    {
      title: "Graphic Designer & Event Staff",
      org: "Level Up Student Dev · CoDev Community",
      period: "Jun 2025",
      body: "Designed the event graphics, including speaker cards, announcements and recap posts, then worked as on-site staff at Siam Paragon running registration and helping the event run smoothly.",
      logos: [] as string[],
      initials: ["CoDev"],
      /** Photos in public/beyond/ — the first one is the card cover. */
      photos: [
        "/beyond/level-up/01.webp",
        "/beyond/level-up/02.webp",
        "/beyond/level-up/03.webp",
        "/beyond/level-up/04.webp",
        "/beyond/level-up/05.webp",
        "/beyond/level-up/06.webp",
      ] as string[],
    },
  ],
  hobbies: ["Drawing", "Basketball", "Traveling", "Cooking", "Badminton"],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/carrothatenoodle/",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pariyakorn-saelao",
    },
    {
      label: "Email",
      href: "mailto:pariyakorn.carrot28@gmail.com",
    },
    {
      label: "itch.io",
      href: "https://witchery-zzz.itch.io/",
    },
    {
      label: "GitHub",
      href: "https://github.com/Xynergyy",
    },
  ],
  email: "pariyakorn.carrot28@gmail.com",
  resume: "/resume.pdf",
  resumePages: [
    { src: "/resume-1.png", width: 1655, height: 2340 },
    { src: "/resume-2.png", width: 1655, height: 2340 },
  ],
} as const;
