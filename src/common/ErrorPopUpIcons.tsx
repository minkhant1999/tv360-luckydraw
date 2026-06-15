type IconProps = {
  className?: string;
};

/** Inline SVG — works offline (no network fetch for /public assets). */
export function NoWifiIcon({ className = "h-[120px] w-[155px]" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <circle cx="77.5" cy="60" r="52" fill="#FFE8C8" />
      <circle cx="77.5" cy="60" r="44" fill="#FFD49A" />
      <path
        d="M77.5 34c-18 0-34 7-46 19l6 6c9-9 22-15 40-15s31 6 40 15l6-6c-12-12-28-19-46-19Z"
        fill="#E8913A"
      />
      <path
        d="M77.5 48c-11 0-21 4-29 12l6 6c6-6 14-9 23-9s17 3 23 9l6-6c-8-8-18-12-29-12Z"
        fill="#D8611A"
      />
      <path
        d="M77.5 62c-5 0-9 2-12 5l12 14 12-14c-3-3-7-5-12-5Z"
        fill="#C47A2E"
      />
      <circle cx="77.5" cy="88" r="5" fill="#A74000" />
      <path
        d="M28 22 133 98"
        stroke="#FE554E"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M28 22 133 98"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

/** Generic API / server error — inline SVG for offline-safe display. */
export function FailIcon({ className = "h-[120px] w-[155px]" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 155 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <circle cx="77.5" cy="60" r="52" fill="#FFE8C8" />
      <circle cx="77.5" cy="60" r="44" fill="#FFD49A" />
      <path
        d="M77.5 38 95 78H60l17-40Z"
        fill="#E8913A"
        stroke="#D8611A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="73" y="54" width="9" height="22" rx="2" fill="#fff" />
      <circle cx="77.5" cy="84" r="5" fill="#A74000" />
    </svg>
  );
}
