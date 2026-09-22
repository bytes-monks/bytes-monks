import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ornament } from './monastic';
import { FORM_ENDPOINT } from './sourcingUi';
import { track } from '../lib/track';

const projectTypes = [
  'AI / Machine Learning',
  'Web Application',
  'SaaS Platform',
  'Data Engineering',
  'DevOps / Infrastructure',
  'Managed hosting',
  'Ongoing support (retainer)',
  'Hiring engineers (talent sourcing)',
  'Sourcing products from China',
  'Other',
];

/** /pricing links here as /?plan=<name>#contact; preselect the matching topic. */
const PLAN_TOPIC: Record<string, string> = {
  starter: 'Managed hosting',
  growth: 'Managed hosting',
  scale: 'Managed hosting',
  essential: 'Ongoing support (retainer)',
  professional: 'Ongoing support (retainer)',
  dedicated: 'Ongoing support (retainer)',
};

const labelClass = 'mono';
const labelStyle: React.CSSProperties = {
  fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', display: 'block', marginBottom: 8,
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [plan, setPlan] = useState('');
  const { search } = useLocation();
  const successRef = useRef<HTMLDivElement>(null);

  // Read the plan after mount: the prerendered HTML has no query string, so
  // using it for the first render would break hydration.
  useEffect(() => {
    const p = new URLSearchParams(search).get('plan')?.toLowerCase() ?? '';
    if (!p) return;
    setPlan(p);
    const topic = PLAN_TOPIC[p];
    if (topic) setFormData((prev) => (prev.projectType ? prev : { ...prev, projectType: topic }));
  }, [search]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // A form collector on a sleeping host can hang for good; fall through to
    // the error state (which offers the email address) after 15 s.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan: plan || undefined, formType: 'contact', page: window.location.pathname }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      track('generate_lead', { form_type: 'contact', project_type: formData.projectType, plan: plan || undefined });
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section" style={{ paddingTop: 140 }}>
      <div style={{ border: '1px solid var(--ink)', padding: 'clamp(28px, 5vw, 72px)', position: 'relative', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
        <div className="benediction-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <span className="eyebrow">VII. Contact · Benediction</span>
            <h2 className="serif" style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.9, marginTop: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Send us your <span className="italic" style={{ color: 'var(--vermillion)' }}>hardest</span>{' '}
              <br />problem.
            </h2>
            <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 28, maxWidth: 480, lineHeight: 1.5 }}>
              Tell us what you're building, or what broke. We'll reply within a day with a plan.
              No commitment.
            </p>

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <a href="mailto:contact@bytesmonks.com" className="link-ink serif italic" style={{ fontSize: 18, alignSelf: 'flex-start' }}>
                or write directly → contact@bytesmonks.com
              </a>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
                Reply within 24 hours
              </div>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div ref={successRef} role="status" tabIndex={-1} style={{ border: '1px solid var(--sage)', padding: '48px 40px', textAlign: 'center', background: 'var(--bg)' }}>
                <div className="seal" aria-hidden style={{ margin: '0 auto 24px' }}>✓</div>
                <h3 className="serif italic" style={{ fontSize: 30, color: 'var(--ink)', marginBottom: 12 }}>Your letter is sealed</h3>
                <p className="serif" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                  Thanks for writing. We'll reply to {formData.email || 'your email'} within 24 hours, from contact@bytesmonks.com.
                </p>
              </div>
            ) : (
              <form method="post" action={FORM_ENDPOINT} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                  <label htmlFor="name" className={labelClass} style={labelStyle}>Your name</label>
                  <input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} disabled={status === 'loading'} placeholder="First and last name" className="ms-input" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass} style={labelStyle}>Your email</label>
                  <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required value={formData.email} onChange={handleChange} disabled={status === 'loading'} placeholder="you@company.com" className="ms-input" />
                </div>
                <div>
                  <label htmlFor="projectType" className={labelClass} style={labelStyle}>What do you need?</label>
                  <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} disabled={status === 'loading'} className="ms-input">
                    <option value="" disabled>Choose one</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass} style={labelStyle}>Your message</label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} disabled={status === 'loading'} placeholder="What you're building, and by when…" className="ms-input" style={{ resize: 'vertical', fontStyle: 'normal', fontSize: 18, lineHeight: 1.6 }} />
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn" data-cta="contact-submit" style={{ justifyContent: 'center' }}>
                  {status === 'loading' ? 'Sealing…' : 'Seal & Send →'}
                </button>

                {status === 'error' && (
                  <p role="alert" className="mono" style={{ fontSize: 12, letterSpacing: '0.06em', color: 'var(--vermillion)' }}>
                    Something went wrong. Please try again or{' '}
                    <a href="mailto:contact@bytesmonks.com" className="link-ink">email us directly</a>.
                  </p>
                )}

                <p className="sans" style={{ fontSize: 13, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.5 }}>
                  No spam. No commitment. We use your details only to reply — see the{' '}
                  <Link to="/privacy" className="link-ink">privacy policy</Link>.
                </p>
              </form>
            )}
          </div>
        </div>

        <div style={{ marginTop: 56 }}>
          <Ornament muted />
        </div>
      </div>
    </section>
  );
}
