interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  const id = `bm-grad-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Monk's robe — wide flowing arch symbolising devotion & craft */}
      <path
        d="M16 14.5C10 14.5 5 18 5 28H27C27 18 22 14.5 16 14.5Z"
        fill={`url(#${id})`}
      />
      {/* Monk's head — the knowing circle */}
      <circle cx="16" cy="9.5" r="5" fill={`url(#${id})`} />
      {/* Three circuit nodes — bytes / binary / data */}
      <circle cx="11" cy="23" r="1.2" fill="white" fillOpacity="0.35" />
      <circle cx="16" cy="20.5" r="1.2" fill="white" fillOpacity="0.35" />
      <circle cx="21" cy="23" r="1.2" fill="white" fillOpacity="0.35" />
    </svg>
  );
}
