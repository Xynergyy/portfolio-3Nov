import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.34 8.7H3.56V20.4h2.78V8.7ZM4.95 3.6a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.44 20.4h-2.77v-5.9c0-1.41-.03-3.22-1.96-3.22-1.97 0-2.27 1.53-2.27 3.12v6H10.66V8.7h2.66v1.6h.04c.37-.7 1.28-1.44 2.63-1.44 2.82 0 3.34 1.85 3.34 4.26v7.28Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 7.5 12 12.5l7.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.2c-5.42 0-9.8 4.38-9.8 9.8 0 4.33 2.81 8 6.71 9.3.49.09.67-.21.67-.47v-1.66c-2.73.59-3.3-1.16-3.3-1.16-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.18-.25-4.47-1.09-4.47-4.85 0-1.07.38-1.95 1.02-2.64-.1-.25-.44-1.26.1-2.63 0 0 .83-.27 2.72 1.01a9.4 9.4 0 0 1 2.48-.33c.84 0 1.69.11 2.48.33 1.89-1.28 2.72-1.01 2.72-1.01.54 1.37.2 2.38.1 2.63.64.69 1.02 1.57 1.02 2.64 0 3.77-2.3 4.6-4.49 4.84.36.31.67.92.67 1.86v2.76c0 .26.18.57.68.47A9.81 9.81 0 0 0 21.8 12c0-5.42-4.38-9.8-9.8-9.8Z" />
    </svg>
  );
}

export function ItchIoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M3.1 8.2c.2-.7 1.9-3.3 2.7-3.3.7 0 1.3.7 2 .7.7 0 1.1-.7 2-.7.8 0 1.3.7 2.1.7.8 0 1.2-.7 2-.7.8 0 1.3.7 2 .7.8 0 1.3-.7 2-.7.9 0 2.5 2.6 2.7 3.3.1.4-.4.7-.8.7H3.9c-.4 0-.9-.3-.8-.7Zm.7 1.6h16.4c.2 0 .3.2.3.4v.5c0 1.3-.8 2.4-1.9 2.8l-.7 5.2c-.1.8-.8 1.4-1.6 1.4H7.7c-.8 0-1.5-.6-1.6-1.4l-.7-5.2A3 3 0 0 1 3.5 10.7v-.5c0-.2.1-.4.3-.4Zm4.5 2.2c-.7 0-1.2.7-1.2 1.6 0 1.5 1 2.7 2.3 2.7 1.2 0 1.7-.7 2.3-.7.6 0 1.1.7 2.3.7 1.3 0 2.3-1.2 2.3-2.7 0-.9-.5-1.6-1.2-1.6-.8 0-1.4.7-2.2.7-.7 0-1.3-.7-2.2-.7-.8 0-1.4.7-2.2.7-.8 0-1.4-.7-2.2-.7Z" />
    </svg>
  );
}

export const socialIconMap = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
  "itch.io": ItchIoIcon,
  GitHub: GithubIcon,
} as const;
