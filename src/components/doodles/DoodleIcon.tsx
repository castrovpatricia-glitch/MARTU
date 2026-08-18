import type { DoodleIconName } from "@/lib/types";

interface Props {
  name: DoodleIconName;
  className?: string;
  size?: number;
}

// Hand-drawn-feeling doodle icons: loose strokes, slight asymmetry, no fills.
// Kept deliberately simple so they read at small sizes.
export default function DoodleIcon({ name, className, size = 22 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "coin":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="8" ry="7.3" />
          <path d="M9.3 9.8c.2-1.6 4.7-1.7 4.9.1.2 1.7-2.2 1.6-2.4 2.1-.2.7-.1 2.2-.1 2.2M11.6 15.8h1" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.4 14 9.6l6.4.2-5.1 3.9 1.9 6.1-5.2-3.7-5.2 3.7 1.9-6.1-5.1-3.9 6.4-.2Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M4 17 19 5.5" />
          <path d="M10.5 5 19.3 5.4 18.7 13.8" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M3.5 7.5c0-1.4 1.2-2 2.6-2h11c1.6 0 2.4.7 2.4 2v9.3c0 1.4-1 2-2.4 2h-11c-1.6 0-2.6-.7-2.6-2Z" />
          <path d="M14.5 12.2a1.6 1.6 0 1 0 3.2.2 1.6 1.6 0 0 0-3.2-.2Z" />
          <path d="M3.6 9.4h16.6" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M5 9h11.5v5.4c0 3-2.3 5-5.6 5S5 17.4 5 14.4Z" />
          <path d="M16.4 10.3c2.6-.5 3.6 3.3.9 4.1-.7.2-1.3.1-1.3.1" />
          <path d="M8 5.8c-.6.7-.6 1.2.1 2M11.4 5.6c-.6.7-.6 1.3.1 2" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common}>
          <path d="M5.5 8.4h13l1 11.6h-15Z" />
          <path d="M8.7 9.2v-2a3.3 3.3 0 0 1 6.6 0v2" />
        </svg>
      );
    case "character":
      return (
        <svg {...common}>
          <circle cx="12" cy="7.4" r="3.1" />
          <path d="M5.5 20c.5-4.4 3.8-6 6.5-6s6 1.6 6.5 6" />
        </svg>
      );
    case "flower":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" />
          <ellipse cx="12" cy="6.6" rx="2.1" ry="3" />
          <ellipse cx="12" cy="17.4" rx="2.1" ry="3" />
          <ellipse cx="6.6" cy="12" rx="3" ry="2.1" />
          <ellipse cx="17.4" cy="12" rx="3" ry="2.1" />
        </svg>
      );
    case "scribble":
      return (
        <svg {...common}>
          <path d="M3.5 14c2-4 4-6 6-4s.5 5 2.6 5.6c2.3.7 3-3 5-3.4 1.6-.3 2.7 1 3.4 2.3" />
        </svg>
      );
    case "food":
      return (
        <svg {...common}>
          <path d="M6 3.6v7.2M4.4 3.6v4.6a1.6 1.6 0 0 0 3.2 0V3.6M6 10.8v9.6" />
          <path d="M17.3 3.6c-2 .5-2.8 2.6-2.8 4.6 0 1.8 1 3 2.3 3.4v8.6" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <path d="M3.6 4.5h2.3l2.3 11.3h9.7l1.8-7.8H7" />
          <circle cx="9.3" cy="19.4" r="1.3" />
          <circle cx="16.2" cy="19.4" r="1.3" />
        </svg>
      );
    case "transport":
      return (
        <svg {...common}>
          <rect x="4" y="6.5" width="16" height="9.4" rx="2.4" />
          <path d="M4 12h16M7.5 19v-2.1M16.5 19v-2.1" />
          <circle cx="8" cy="10" r=".2" />
        </svg>
      );
    case "taxi":
      return (
        <svg {...common}>
          <path d="M5 15.5V11l1.8-4.4h10.4L19 11v4.5" />
          <path d="M4.2 15.5h15.6v3H4.2Z" />
          <circle cx="8" cy="18.5" r="1" />
          <circle cx="16" cy="18.5" r="1" />
          <path d="M10 6.6h4v-2h-4Z" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M4 11.4 12 4l8 7.4" />
          <path d="M6 10.4v9.2h12v-9.2" />
          <path d="M10 19.6v-5.4h4v5.4" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <path d="M12 5.5c2-2.6 7-1.6 7 2.4 0 4.4-5 6.9-7 8.6-2-1.7-7-4.2-7-8.6 0-4 5-5 7-2.4Z" />
        </svg>
      );
    case "shirt":
      return (
        <svg {...common}>
          <path d="M8.5 4.4 12 6l3.5-1.6L19 6.8l-2 3-1.8-1v11h-6.4v-11l-1.8 1-2-3Z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3.5c.4 3 1.7 4.3 4.7 4.7-3 .4-4.3 1.7-4.7 4.7-.4-3-1.7-4.3-4.7-4.7 3-.4 4.3-1.7 4.7-4.7Z" />
          <path d="M18 15c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2Z" />
        </svg>
      );
    case "movie":
      return (
        <svg {...common}>
          <rect x="3.6" y="6" width="16.8" height="12" rx="1.5" />
          <path d="M8 6 6 9.6M13.6 6l-2 3.6M19 6l-2 3.6" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="M5 8.5h11.5L14 5.6" />
          <path d="M19 15.5H7.5L10 18.4" />
        </svg>
      );
    case "plane":
      return (
        <svg {...common}>
          <path d="M3.5 13.6 20 8.2c1-.3 1.4.9.5 1.4L14.3 14l.7 5.6-2-1-1.6-4.2-4.4 2 .2 2.4-1.4-.6-.7-2.3-2.3-.8Z" />
        </svg>
      );
    case "gift":
      return (
        <svg {...common}>
          <rect x="4" y="9.6" width="16" height="4" />
          <rect x="5.3" y="13.6" width="13.4" height="6.8" />
          <path d="M12 9.6v10.8" />
          <path d="M12 9.6c-1-3.4-5.4-3-4.4.4 1 .1 3.2-.1 4.4-.4ZM12 9.6c1-3.4 5.4-3 4.4.4-1 .1-3.2-.1-4.4-.4Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4.5 5.6c3-1 5.5-.7 7.5.9 2-1.6 4.5-1.9 7.5-.9v12.8c-3-1-5.5-.7-7.5.9-2-1.6-4.5-1.9-7.5-.9Z" />
          <path d="M12 6.5v12.8" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3.6" y="8" width="16.8" height="10.4" rx="1.4" />
          <path d="M8.5 8V6a1.6 1.6 0 0 1 1.6-1.6h3.8A1.6 1.6 0 0 1 15.5 6v2" />
          <path d="M3.6 12.4h16.8" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3.5" y="6.2" width="17" height="11.6" rx="1.8" />
          <path d="M3.5 10h17" />
          <path d="M6 14.2h4" />
        </svg>
      );
    case "piggy":
      return (
        <svg {...common}>
          <ellipse cx="11" cy="13" rx="7.5" ry="5.6" />
          <path d="M17.4 11.4 20 10l-.4 3.2" />
          <circle cx="7.4" cy="12" r=".3" />
          <path d="M6 18.4v1.8M13.5 18.4v1.8M11 7.4V5.6l2 .7" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7.6" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="12" cy="12" r=".4" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4.5 12.8 9 17.4 19.5 6.4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7.5 17.5a3.8 3.8 0 0 1-.4-7.6 5 5 0 0 1 9.6-1.6 4 4 0 0 1-.6 9.2Z" />
        </svg>
      );
    case "dots":
    default:
      return (
        <svg {...common}>
          <circle cx="6.5" cy="12" r=".9" />
          <circle cx="12" cy="12" r=".9" />
          <circle cx="17.5" cy="12" r=".9" />
        </svg>
      );
  }
}
