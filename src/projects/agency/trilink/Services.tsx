import React from 'react';
import { TrilinkLayout } from './TrilinkLayout';

export const Services = () => (
  <TrilinkLayout>
    <div className="hero-stripe-bg" style={{ padding: '6rem 2rem 4rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: '#fff' }}>
          A complete suite of <span className="gradient-text">financial products</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#adbdcc', lineHeight: 1.6 }}>
          Explore our modular APIs and fully-hosted payment flows designed to optimize conversion at every touchpoint.
        </p>
      </div>
    </div>

    <div style={{ backgroundColor: '#ffffff', color: '#0a2540', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 91, 255, 0.1)', color: '#635bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>💳</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>Payments & Checkout</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Accept credit cards, debit cards, and 50+ local payment methods with our pre-built, conversion-optimized checkout UI.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#635bff' }}>
              <li>✓ Adaptive Pricing & Currency Conversion</li>
              <li>✓ Apple Pay & Google Pay One-Click</li>
              <li>✓ Automated Receipt Emails</li>
            </ul>
          </div>

          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>📊</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>Billing & Subscriptions</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Manage recurring revenue models, tiered pricing matrices, usage-based metering, and involuntary churn recovery.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#00d4ff' }}>
              <li>✓ Smart Dunning & Card Account Updaters</li>
              <li>✓ Custom Invoicing & Tax Calculation</li>
              <li>✓ Customer Portal for Self-Service</li>
            </ul>
          </div>

          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 75, 75, 0.1)', color: '#ff4b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>🛡️</div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem' }}>Radar AI Fraud Prevention</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Protect your revenue against sophisticated botnets and fraudulent chargebacks using advanced machine learning networks.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#ff4b4b' }}>
              <li>✓ Pre-built 3D Secure Authentication</li>
              <li>✓ Custom Rule Builder & Risk Scoring</li>
              <li>✓ Zero Setup Friction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </TrilinkLayout>
);

export default Services;
