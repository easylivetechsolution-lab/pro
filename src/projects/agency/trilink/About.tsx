import React from 'react';
import { TrilinkLayout } from './TrilinkLayout';

export const About = () => (
  <TrilinkLayout>
    <div className="hero-stripe-bg" style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: '#fff' }}>
          We’re building the <span className="gradient-text">financial backbone</span> for global commerce
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#adbdcc', lineHeight: 1.6 }}>
          Trilink was founded with a single guiding mission: to increase the GDP of the internet by removing friction from online business.
        </p>
      </div>
    </div>

    <div style={{ backgroundColor: '#ffffff', color: '#0a2540', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
          <div style={{ borderLeft: '3px solid #635bff', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#635bff', marginBottom: '0.5rem' }}>$250B+</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0a2540', marginBottom: '0.5rem' }}>Annual Volume Processed</div>
            <p style={{ color: '#425466', fontSize: '0.9rem' }}>Safely flowing through our secure cloud infrastructure every year.</p>
          </div>
          <div style={{ borderLeft: '3px solid #00d4ff', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00d4ff', marginBottom: '0.5rem' }}>195+</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0a2540', marginBottom: '0.5rem' }}>Countries Supported</div>
            <p style={{ color: '#425466', fontSize: '0.9rem' }}>Enabling cross-border transactions with local currency payouts.</p>
          </div>
          <div style={{ borderLeft: '3px solid #ff4b4b', paddingLeft: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff4b4b', marginBottom: '0.5rem' }}>99.999%</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0a2540', marginBottom: '0.5rem' }}>Uptime Reliability</div>
            <p style={{ color: '#425466', fontSize: '0.9rem' }}>Mission-critical redundancy for high-availability enterprise applications.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f8fafc', borderRadius: '24px', padding: '4rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Our Engineering Principles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0a2540' }}>1. Obsessive Reliability</h3>
              <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>We believe downtime is never acceptable. Our systems are engineered to self-heal and scale effortlessly during peak spikes.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0a2540' }}>2. Developer-First APIs</h3>
              <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>Clean documentation, predictable SDKs, and powerful test environments make building on Trilink a joyous experience.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0a2540' }}>3. Uncompromising Security</h3>
              <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>PCI-DSS Level 1 certified encryption and real-time behavioral monitoring safeguard every byte of sensitive data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TrilinkLayout>
);

export default About;
