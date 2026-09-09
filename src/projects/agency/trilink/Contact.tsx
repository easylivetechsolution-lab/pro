import React, { useState } from 'react';
import { TrilinkLayout } from './TrilinkLayout';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <TrilinkLayout>
      <div className="hero-stripe-bg" style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: '#fff' }}>
            Let’s talk about your <span className="gradient-text">growth & scale</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#adbdcc', lineHeight: 1.6 }}>
            Our enterprise architects and sales specialists are ready to help you design the ideal payments infrastructure.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', color: '#0a2540', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="stripe-card" style={{ padding: '3rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0a2540' }}>Thank you!</h2>
                <p style={{ color: '#425466', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  We’ve received your inquiry. A Trilink specialist will contact you at <strong style={{ color: '#635bff' }}>{formData.email}</strong> within 24 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="stripe-btn-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Contact Sales</h2>
                <p style={{ color: '#425466', fontSize: '0.95rem', marginBottom: '1rem' }}>Fill out the form below and we’ll get right back to you.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a2540' }}>Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a2540' }}>Work Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a2540' }}>Company Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a2540' }}>How can we help?</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your expected payment volume or technical requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="stripe-btn-primary" style={{ justifyContent: 'center', padding: '14px', fontSize: '1.05rem', marginTop: '1rem' }}>
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </TrilinkLayout>
  );
};

export default Contact;
