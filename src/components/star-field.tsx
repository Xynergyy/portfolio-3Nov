"use client";

const STARS = [
  { top: "8%", left: "12%", size: 3, delay: "0s" },
  { top: "16%", left: "78%", size: 2, delay: "0.6s" },
  { top: "28%", left: "22%", size: 2.5, delay: "1.2s" },
  { top: "38%", left: "88%", size: 2, delay: "0.3s" },
  { top: "52%", left: "8%", size: 2, delay: "1.8s" },
  { top: "64%", left: "64%", size: 3, delay: "0.9s" },
  { top: "74%", left: "42%", size: 2, delay: "1.5s" },
  { top: "82%", left: "91%", size: 2.5, delay: "0.2s" },
  { top: "18%", left: "48%", size: 2, delay: "2.1s" },
  { top: "46%", left: "36%", size: 2, delay: "1.1s" },
];

export function StarField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-white shadow-[0_0_8px_rgb(155_114_203_/_70%)]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            backgroundImage:
              "linear-gradient(135deg, #fff, #c9b6ff, #8ec5ff)",
          }}
        />
      ))}
    </div>
  );
}
