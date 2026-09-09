import React from 'react';
import { TrilinkLayout } from './TrilinkLayout';

export const Home = () => (
  <TrilinkLayout>
    {/* Hero Section */}
    <div className="hero-stripe-bg" style={{ padding: '6rem 2rem 5rem', position: 'relative' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(99, 91, 255, 0.15)',
            border: '1px solid rgba(99, 91, 255, 0.3)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#00d4ff',
            marginBottom: '1.5rem'
          }}>
            <span>✨ Introducing Trilink 3.0</span>
            <span style={{ color: '#fff' }}>→</span>
          </div>

          <h1 style={{
            fontSize: '3.75rem',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
            color: '#ffffff'
          }}>
            Financial infrastructure for the <span className="gradient-text">internet economy</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#adbdcc',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}>
            Millions of companies of all sizes—from startups to Fortune 500s—use Trilink’s software and APIs to accept payments, send payouts, and manage their businesses online.
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/agency-trilink/contact" className="stripe-btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Start now →
            </a>
            <a href="/agency-trilink/contact" className="stripe-btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Contact sales
            </a>
          </div>
        </div>

        {/* Code / UI Preview Card */}
        <div style={{
          backgroundColor: '#1a1f36',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            <span style={{ fontSize: '0.8rem', color: '#8898aa', marginLeft: '12px', fontFamily: 'monospace' }}>checkout.ts</span>
          </div>
          <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            <p style={{ margin: 0, color: '#635bff' }}>import <span style={{ color: '#fff' }}>&#123; Trilink &#125;</span> from <span style={{ color: '#00d4ff' }}>'@trilink/node'</span>;</p>
            <p style={{ margin: '12px 0 0', color: '#8898aa' }}>// Initialize payment session</p>
            <p style={{ margin: '4px 0 0' }}>const stripe = <span style={{ color: '#635bff' }}>new</span> Trilink(<span style={{ color: '#00d4ff' }}>'pk_live_TRILINK99'</span>);</p>
            <p style={{ margin: '12px 0 0', color: '#8898aa' }}>// Create checkout flow</p>
            <p style={{ margin: '4px 0 0' }}>const session = <span style={{ color: '#635bff' }}>await</span> stripe.checkout.sessions.create(&#123;</p>
            <p style={{ margin: '4px 0 0 20px' }}>payment_method_types: [<span style={{ color: '#00d4ff' }}>'card'</span>],</p>
            <p style={{ margin: '4px 0 0 20px' }}>line_items: [&#123; price: <span style={{ color: '#00d4ff' }}>'price_1M'</span>, quantity: <span style={{ color: '#ffbd2e' }}>1</span> &#125;],</p>
            <p style={{ margin: '4px 0 0 20px' }}>mode: <span style={{ color: '#00d4ff' }}>'subscription'</span>,</p>
            <p style={{ margin: '4px 0 0' }}>&#125;);</p>
          </div>
        </div>
      </div>
    </div>

    {/* Modular Features Grid */}
    <div style={{ backgroundColor: '#ffffff', color: '#0a2540', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Modular solutions for every business model
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#425466', maxWidth: '600px', margin: '0 auto' }}>
            Whether you’re a scrappy startup or a global enterprise, our composable suite scales with you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 91, 255, 0.1)', color: '#635bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>💳</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Global Payments</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Accept credit cards, mobile wallets, and local bank transfers with optimized checkout flows.
            </p>
          </div>

          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Billing & Invoicing</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Automate recurring billing, usage-based metering, and smart retry logic for failed payments.
            </p>
          </div>

          <div className="stripe-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 75, 75, 0.1)', color: '#ff4b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', marginBottom: '1.5rem' }}>🛡️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>AI Fraud Detection</h3>
            <p style={{ color: '#425466', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Machine learning models trained on billions of data points to block fraudsters instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </TrilinkLayout>
);

export default Home;
