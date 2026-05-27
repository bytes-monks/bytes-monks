import { useState } from 'react';
import { Ornament } from './monastic';

const FORM_ENDPOINT = 'https://formgrid.dev/api/f/jjl2cap8';

const projectTypes = [
  'AI / Machine Learning',
  'Web Application',
  'SaaS Platform',
  'Data Engineering',
  'DevOps / Infrastructure',
  'Other',
];

const labelClass = 'mono';
const labelStyle: React.CSSProperties = {
  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)', display: 'block', marginBottom: 8,
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
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
            <span className="eyebrow">VII. Benediction</span>
            <h2 className="serif" style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.9, marginTop: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Send us your <span className="italic" style={{ color: 'var(--vermillion)' }}>hardest</span>
              <br />problem.
            </h2>
            <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 28, maxWidth: 480, lineHeight: 1.5 }}>
              Tell us what you are trying to build, or what has gone wrong with what you have built.
              We reply within a day, in plain language, with a plan — no commitment required.
            </p>

            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <a href="mailto:contact@bytesmonks.com" className="link-ink serif italic" style={{ fontSize: 18, alignSelf: 'flex-start' }}>
                or write directly → contact@bytesmonks.com
              </a>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
                Response within XXIV hours
              </div>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div style={{ border: '1px solid var(--sage)', padding: '48px 40px', textAlign: 'center', background: 'var(--bg)' }}>
                <div className="seal" style={{ margin: '0 auto 24px' }}>✓</div>
                <h3 className="serif italic" style={{ fontSize: 30, color: 'var(--ink)', marginBottom: 12 }}>Your letter is sealed</h3>
                <p className="serif" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                  Thank you for reaching out. We'll get back to you within a day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                <div>
                  <label htmlFor="name" className={labelClass} style={labelStyle}>Your name</label>
                  <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} disabled={status === 'loading'} placeholder="Brother or Sister…" className="ms-input" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass} style={labelStyle}>Your sending address</label>
                  <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} disabled={status === 'loading'} placeholder="you@house.io" className="ms-input" />
                </div>
                <div>
                  <label htmlFor="projectType" className={labelClass} style={labelStyle}>Nature of the work</label>
                  <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} disabled={status === 'loading'} className="ms-input">
                    <option value="" disabled>Select a discipline</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass} style={labelStyle}>Your petition</label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} disabled={status === 'loading'} placeholder="Tell us about your project, goals, and timeline…" className="ms-input" style={{ resize: 'vertical', fontStyle: 'normal', fontSize: 18, lineHeight: 1.6 }} />
                </div>

                <button type="submit" disabled={status === 'loading'} className="btn" style={{ justifyContent: 'center' }}>
                  {status === 'loading' ? 'Sealing…' : 'Seal & Send →'}
                </button>

                {status === 'error' && (
                  <p className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--vermillion)' }}>
                    Something went wrong. Please try again or{' '}
                    <a href="mailto:contact@bytesmonks.com" className="link-ink">email us directly</a>.
                  </p>
                )}

                <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>
                  No spam. No commitment. Just a conversation.
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
