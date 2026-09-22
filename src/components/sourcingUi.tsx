import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './monastic';
import { track } from '../lib/track';

/** Section header used by both sourcing pages: numbered eyebrow, a handwritten
 *  display line with one accented phrase, and an optional single-line sub. */
export function SectionHead({
  eyebrow, plain, accent, sub,
}: { eyebrow: string; plain: string; accent: string; sub?: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="hand" style={{ fontSize: 'clamp(40px, 5.6vw, 82px)', lineHeight: 1.14, marginTop: 16, fontWeight: 600, letterSpacing: '-0.005em' }}>
          {plain} <span style={{ color: 'var(--vermillion)' }}>{accent}</span>
        </h2>
        {sub && (
          <p className="serif italic" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 16, maxWidth: 620, lineHeight: 1.5 }}>
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Accordion row whose answer never leaves the DOM.
 *
 * The collapse is a grid-template-rows animation rather than a conditional
 * mount, so the text is in the prerendered HTML for crawlers and findable with
 * Ctrl+F. `visibility` keeps it out of the accessibility tree and the tab order
 * while closed, so it cannot contradict aria-expanded="false".
 */
export function FaqRow({ item, id }: { item: { q: string; a: string }; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--rule-soft)' }}>
      <h3 style={{ margin: 0 }}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 0', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit' }}
        >
          <span className="serif" style={{ fontSize: 21, fontWeight: 500, color: 'var(--ink)' }}>{item.q}</span>
          <ChevronDown className="w-4 h-4" aria-hidden style={{ color: open ? 'var(--vermillion)' : 'var(--ink-faint)', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </button>
      </h3>
      <div
        id={id}
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          visibility: open ? 'visible' : 'hidden',
          transition: `grid-template-rows 0.3s cubic-bezier(.2,.8,.2,1), visibility 0s linear ${open ? '0s' : '0.3s'}`,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p className="serif" style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)', paddingBottom: 22, paddingRight: 40, maxWidth: 900 }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
  color: 'var(--ink-soft)', display: 'block', marginBottom: 8,
};

/** Autofill and keyboard hints by field id, so phones offer the right keyboard. */
const FIELD_HINTS: Record<string, { autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'] }> = {
  name: { autoComplete: 'name' },
  email: { autoComplete: 'email', inputMode: 'email' },
  company: { autoComplete: 'organization' },
  link: { autoComplete: 'url', inputMode: 'url' },
  spec: { inputMode: 'url' },
  count: { inputMode: 'numeric' },
  years: { inputMode: 'numeric' },
};

export function Field({
  id, label, placeholder, type = 'text', required = false, options, textarea = false, disabled,
}: {
  id: string; label: string; placeholder?: string; type?: string; required?: boolean;
  options?: string[]; textarea?: boolean; disabled: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono" style={labelStyle}>
        {label}
        {required && <span aria-hidden style={{ color: 'var(--vermillion)' }}> *</span>}
      </label>
      {options ? (
        <select id={id} name={id} required={required} disabled={disabled} defaultValue="" className="ms-input">
          <option value="" disabled>Select one</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : textarea ? (
        <textarea id={id} name={id} rows={3} required={required} disabled={disabled} placeholder={placeholder} className="ms-input" style={{ resize: 'vertical', fontStyle: 'normal', fontSize: 18, lineHeight: 1.6 }} />
      ) : (
        <input id={id} name={id} type={type} required={required} disabled={disabled} placeholder={placeholder} className="ms-input" {...FIELD_HINTS[id]} />
      )}
    </div>
  );
}

/** Shared collector for every form on the site; `formType` separates the inboxes. */
export const FORM_ENDPOINT = 'https://formgrid.dev/api/f/jjl2cap8';

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Submit handler plus the focus/announcement wiring a form swap needs — without
 * it, replacing the form with a confirmation panel is a silent change for
 * anyone using a screen reader.
 */
export function useFormSubmit(formType: string) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    // A form collector on a sleeping host can hang for good; give up after 15 s
    // so the error state (with the email fallback) shows.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType, page: window.location.pathname }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      track('generate_lead', { form_type: formType });
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  };

  return { status, setStatus, submit, successRef, disabled: status === 'loading' };
}

export function SuccessPanel({
  panelRef, heading, body,
}: { panelRef: React.RefObject<HTMLDivElement | null>; heading: string; body: string }) {
  return (
    <div
      ref={panelRef}
      role="status"
      tabIndex={-1}
      style={{ border: '1px solid var(--sage)', padding: '56px 40px', textAlign: 'center', background: 'var(--bg)' }}
    >
      <div className="seal" aria-hidden style={{ margin: '0 auto 24px' }}>✓</div>
      <h3 className="hand" style={{ fontSize: 34, color: 'var(--ink)', marginBottom: 12 }}>{heading}</h3>
      <p className="serif" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5, maxWidth: 460, margin: '0 auto' }}>{body}</p>
    </div>
  );
}
