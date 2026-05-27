// Bytes Monks mark: a monastic sigil fused with a bracket/byte glyph

interface MarkProps {
  size?: number;
  strokeWidth?: number;
  variant?: 'full' | 'mark';
  className?: string;
}

export function Mark({ size = 44, strokeWidth = 1.5, variant = 'full', className = '' }: MarkProps) {
  const s = size;
  const cx = s / 2, cy = s / 2;
  const ringR = s * 0.47;
  const innerR = s * 0.38;
  const pathId = `logo-arc-${Math.round(s)}`;

  const ringText = variant === 'full';

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
      <defs>
        <path id={pathId} d={`M ${cx} ${cy} m -${ringR * 0.92} 0 a ${ringR * 0.92} ${ringR * 0.92} 0 1 1 ${ringR * 1.84} 0 a ${ringR * 0.92} ${ringR * 0.92} 0 1 1 -${ringR * 1.84} 0`} />
      </defs>

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Inner dashed ring */}
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="currentColor" strokeWidth={strokeWidth * 0.6} strokeDasharray="2 3" opacity="0.55" />

      {/* Tick marks at cardinal points */}
      {[0, 90, 180, 270].map((a) => (
        <line
          key={a}
          x1={cx + Math.cos((a * Math.PI) / 180) * (ringR - 2)}
          y1={cy + Math.sin((a * Math.PI) / 180) * (ringR - 2)}
          x2={cx + Math.cos((a * Math.PI) / 180) * (ringR + 1.5)}
          y2={cy + Math.sin((a * Math.PI) / 180) * (ringR + 1.5)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      ))}

      {ringText && (
        <text fontFamily="'JetBrains Mono', monospace" fontSize={s * 0.07} letterSpacing={s * 0.03} fill="currentColor" opacity="0.7">
          <textPath href={`#${pathId}`} startOffset="0%">ORDO · BYTORVM · ORA · ET · CODICA · </textPath>
        </text>
      )}

      {/* Left bracket — [ */}
      <path
        d={`M ${cx - s * 0.17} ${cy - s * 0.14} L ${cx - s * 0.21} ${cy - s * 0.14} L ${cx - s * 0.21} ${cy + s * 0.14} L ${cx - s * 0.17} ${cy + s * 0.14}`}
        stroke="currentColor" strokeWidth={strokeWidth * 1.1} fill="none" strokeLinecap="square"
      />
      {/* Right bracket — ] */}
      <path
        d={`M ${cx + s * 0.17} ${cy - s * 0.14} L ${cx + s * 0.21} ${cy - s * 0.14} L ${cx + s * 0.21} ${cy + s * 0.14} L ${cx + s * 0.17} ${cy + s * 0.14}`}
        stroke="currentColor" strokeWidth={strokeWidth * 1.1} fill="none" strokeLinecap="square"
      />

      {/* Central monastic arch / M */}
      <path
        d={`
          M ${cx - s * 0.13} ${cy + s * 0.12}
          L ${cx - s * 0.13} ${cy - s * 0.04}
          Q ${cx - s * 0.13} ${cy - s * 0.12}, ${cx - s * 0.065} ${cy - s * 0.12}
          Q ${cx} ${cy - s * 0.12}, ${cx} ${cy - s * 0.02}
          Q ${cx} ${cy - s * 0.12}, ${cx + s * 0.065} ${cy - s * 0.12}
          Q ${cx + s * 0.13} ${cy - s * 0.12}, ${cx + s * 0.13} ${cy - s * 0.04}
          L ${cx + s * 0.13} ${cy + s * 0.12}
        `}
        stroke="currentColor" strokeWidth={strokeWidth * 1.3} fill="none" strokeLinejoin="round" strokeLinecap="round"
      />

      {/* Vermillion byte-dot — illumination above the arch */}
      <circle cx={cx} cy={cy - s * 0.18} r={s * 0.032} fill="var(--vermillion)" />

      {/* Baseline tick under monogram */}
      <line x1={cx - s * 0.13} y1={cy + s * 0.18} x2={cx + s * 0.13} y2={cy + s * 0.18} stroke="var(--vermillion)" strokeWidth={strokeWidth * 0.8} strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ height = 22 }: { height?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1 }}>
      <span className="serif" style={{ fontSize: height, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
        Bytes
      </span>
      <span className="serif italic" style={{ fontSize: height, lineHeight: 1, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--vermillion)', marginLeft: 4 }}>
        Monks
      </span>
    </span>
  );
}

export function Lockup({ size = 40 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--ink)' }}>
      <Mark size={size} />
      <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
        <Wordmark height={size * 0.44} />
        <span className="mono" style={{ fontSize: size * 0.2, letterSpacing: '0.24em', color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: 4 }}>
          Ordo · Bytorvm
        </span>
      </span>
    </span>
  );
}

// Backwards-compatible default export
export default function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return <Mark size={size} className={className} variant="mark" />;
}
