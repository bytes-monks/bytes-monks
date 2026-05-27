import { useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties, ElementType } from 'react';

// Astrolabe sigil — concentric rings rotating at different speeds
export function Sigil({ size = 260 }: { size?: number }) {
  const S = size, C = S / 2;
  const rings = [
    { r: S * 0.46, n: 24, glyph: '✚', fs: 11, dur: 120, dir: 1, col: 'var(--vermillion)', op: 0.85 },
    { r: S * 0.38, n: 16, glyph: '◆', fs: 10, dur: 90, dir: -1, col: 'var(--vermillion)', op: 0.7 },
  ];
  return (
    <div className="sigil-astro" style={{ width: S, height: S, position: 'relative' }}>
      <div className="sigil-halo" style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        boxShadow: 'inset 0 0 0 1px color-mix(in oklch, var(--vermillion) 28%, transparent)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: S * 0.30, height: S * 0.30,
        transform: 'translate(-50%, -50%)', borderRadius: '50%',
        background: 'var(--bg)',
        boxShadow: '0 0 0 1px color-mix(in oklch, var(--vermillion) 18%, transparent), 0 0 28px 10px var(--bg)',
        pointerEvents: 'none',
      }} />
      <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <g style={{ animation: 'sigil-spin 240s linear infinite', transformOrigin: `${C}px ${C}px` }}>
          {Array.from({ length: 72 }).map((_, i) => {
            const a = (i / 72) * Math.PI * 2;
            const r1 = S * 0.495, r2 = S * 0.48;
            return <line key={i} x1={C + Math.cos(a) * r1} y1={C + Math.sin(a) * r1} x2={C + Math.cos(a) * r2} y2={C + Math.sin(a) * r2} stroke="var(--vermillion)" strokeOpacity={i % 9 === 0 ? 0.9 : 0.35} strokeWidth={i % 9 === 0 ? 1.4 : 0.8} />;
          })}
        </g>
        {rings.map((ring, ri) => (
          <g key={ri} style={{ animation: `sigil-spin ${ring.dur}s linear infinite ${ring.dir < 0 ? 'reverse' : ''}`, transformOrigin: `${C}px ${C}px` }}>
            <circle cx={C} cy={C} r={ring.r} fill="none" stroke="var(--vermillion)" strokeOpacity={0.12} strokeDasharray={ri % 2 ? '2 4' : '1 3'} />
            {Array.from({ length: ring.n }).map((_, i) => {
              const a = (i / ring.n) * Math.PI * 2 - Math.PI / 2;
              const x = C + Math.cos(a) * ring.r, y = C + Math.sin(a) * ring.r;
              return (
                <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
                  fill={ring.col} fillOpacity={ring.op} fontSize={ring.fs}
                  fontFamily="'JetBrains Mono', monospace"
                  style={{ animation: `sigil-pulse 3.2s ease-in-out ${(i * 0.13).toFixed(2)}s infinite` }}
                >{ring.glyph}</text>
              );
            })}
          </g>
        ))}
        <g style={{ animation: 'sigil-spin 18s linear infinite', transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C + S * 0.42} cy={C} r={3} fill="var(--vermillion)" />
          <circle cx={C + S * 0.42} cy={C} r={7} fill="none" stroke="var(--vermillion)" strokeOpacity={0.4} />
        </g>
        <g style={{ animation: 'sigil-spin 30s linear infinite reverse', transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C - S * 0.34} cy={C} r={2.5} fill="var(--sage)" />
        </g>
      </svg>
    </div>
  );
}

export function Ornament({ muted = false }: { muted?: boolean }) {
  const c = muted ? 'var(--ink-trace)' : 'var(--vermillion)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, color: c }}>
      <span style={{ flex: 1, maxWidth: 90, height: 1, background: 'var(--rule)' }} />
      <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 22, fontStyle: 'italic' }}>⁂</span>
      <span style={{ flex: 1, maxWidth: 90, height: 1, background: 'var(--rule)' }} />
    </div>
  );
}

// Scroll reveal wrapper — defaults to becoming visible; hidden only briefly
// while off-screen. A timed fallback guarantees content is never stuck hidden.
function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    };
    const rect0 = el.getBoundingClientRect();
    const inViewNow = rect0.top < window.innerHeight && rect0.bottom > 0;
    if (inViewNow) { show(); return; }
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const fallback = setTimeout(show, 1500);
    if (typeof IntersectionObserver === 'undefined') { show(); return () => clearTimeout(fallback); }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(); io.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
  return ref;
}

export function Reveal({
  as: Tag = 'div',
  className = '',
  style,
  children,
  delay = 0,
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{ transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(.2,.8,.2,1) ${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
