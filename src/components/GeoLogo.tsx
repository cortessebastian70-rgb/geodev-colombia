interface Props {
  size?: number;
  showTagline?: boolean;
  className?: string;
}

export function GeoGlobeIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      stroke="#3DDC84"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="12" />
      <ellipse cx="16" cy="16" rx="6" ry="12" />
      <path d="M4 16h24" />
      <path d="M5 11h22M5 21h22" />
    </svg>
  );
}

export function GeoLogo({ size = 28, showTagline = true, className = "" }: Props) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <div className="flex items-center gap-2">
        <GeoGlobeIcon size={size} />
        <span className="font-bold text-white text-lg tracking-tight">
          <span className="text-[#3DDC84]">&lt;</span>GeoDev
          <span className="text-[#3DDC84]">/&gt;</span>
        </span>
      </div>
      {showTagline && (
        <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#14B8A6]/80 pl-9">
          Geografia · Programacion · Drones
        </span>
      )}
    </div>
  );
}
