export type ToolItem = {
  name: string;
  logo: string;
};

export type ToolStack = {
  id: string;
  label: string;
  tone: "blue" | "amber" | "violet" | "rose" | "slate" | "indigo";
  tools: ToolItem[];
};

export const toolStacks: ToolStack[] = [
  {
    id: "engines",
    label: "Game Engines",
    tone: "blue",
    tools: [
      { name: "Unity", logo: "/logos/tools/unity.png" },
      { name: "Unreal Engine 5", logo: "/logos/tools/unreal.png" },
    ],
  },
  {
    id: "3d",
    label: "3D Art & Production",
    tone: "amber",
    tools: [
      { name: "Blender", logo: "/logos/tools/blender.png" },
      { name: "Maya", logo: "/logos/tools/maya.png" },
      { name: "Character Creator 5", logo: "/logos/tools/character-creator.png" },
      { name: "Marvelous Designer", logo: "/logos/tools/marvelous.png" },
      { name: "Substance Painter", logo: "/logos/tools/substance.svg" },
    ],
  },
  {
    id: "video",
    label: "Video & Motion",
    tone: "indigo",
    tools: [
      { name: "Adobe After Effects", logo: "/logos/tools/aftereffects.svg" },
      { name: "Premiere Pro", logo: "/logos/tools/premiere.svg" },
      { name: "FlipaClip", logo: "/logos/tools/flipaclip.png" },
      { name: "CapCut", logo: "/logos/tools/capcut.png" },
    ],
  },
  {
    id: "ui",
    label: "UI / Graphic",
    tone: "violet",
    tools: [
      { name: "Figma", logo: "/logos/tools/figma.png" },
      { name: "Adobe Photoshop", logo: "/logos/tools/photoshop.svg" },
      { name: "Canva", logo: "/logos/tools/canva.png" },
    ],
  },
  {
    id: "2d",
    label: "2D & Digital Art",
    tone: "rose",
    tools: [
      { name: "Clip Studio Paint", logo: "/logos/tools/clip-studio.png" },
      { name: "Procreate", logo: "/logos/tools/procreate.png" },
    ],
  },
  {
    id: "mocap",
    label: "Motion Capture",
    tone: "slate",
    tools: [{ name: "Rokoko Studio", logo: "/logos/tools/rokoko.png" }],
  },
];

export const toneClasses: Record<
  ToolStack["tone"],
  { pill: string; icon: string }
> = {
  blue: {
    pill: "bg-sky-100 text-sky-900",
    icon: "text-sky-600",
  },
  amber: {
    pill: "bg-amber-100 text-amber-950",
    icon: "text-amber-600",
  },
  violet: {
    pill: "bg-violet-100 text-violet-950",
    icon: "text-violet-600",
  },
  rose: {
    pill: "bg-rose-100 text-rose-950",
    icon: "text-rose-600",
  },
  slate: {
    pill: "bg-slate-100 text-slate-800",
    icon: "text-slate-600",
  },
  indigo: {
    pill: "bg-indigo-100 text-indigo-950",
    icon: "text-indigo-600",
  },
};
