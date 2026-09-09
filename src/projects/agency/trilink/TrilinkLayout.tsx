import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const TrilinkLayout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/agency-trilink' && (location.pathname === '/agency-trilink' || location.pathname === '/agency-trilink/')) return true;
    return location.pathname === path;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a2540',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .stripe-btn-primary {
          background: #635bff;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .stripe-btn-primary:hover {
          background: #0a2540;
          outline: 2px solid #635bff;
          transform: translateY(-1px);
        }
        .stripe-btn-secondary {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 10px 18px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }
        .stripe-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #ffffff;
        }
        .stripe-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          color: #0a2540;
          box-shadow: 0 13px 27px -5px rgba(50,50,93,0.25), 0 8px 16px -8px rgba(0,0,0,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stripe-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -12px rgba(50,50,93,0.25), 0 18px 36px -18px rgba(0,0,0,0.3);
        }
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #635bff 50%, #ff4b4b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-stripe-bg {
          position: relative;
          background: linear-gradient(135deg, #0a2540 0%, #1a1f36 50%, #0a2540 100%);
          overflow: hidden;
        }
        .hero-stripe-bg::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,91,255,0.25) 0%, rgba(0,212,255,0.1) 50%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* Header / Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(10, 37, 64, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <Link to="/agency-trilink" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '18px',
              color: '#fff'
            }}>
              T
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
              Trilink
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/agency-trilink" className={`nav-link ${isActive('/agency-trilink') ? 'active' : ''}`}>Home</Link>
            <Link to="/agency-trilink/about" className={`nav-link ${isActive('/agency-trilink/about') ? 'active' : ''}`}>About</Link>
            <Link to="/agency-trilink/services" className={`nav-link ${isActive('/agency-trilink/services') ? 'active' : ''}`}>Services</Link>
            <Link to="/agency-trilink/contact" className={`nav-link ${isActive('/agency-trilink/contact') ? 'active' : ''}`}>Contact</Link>
          </nav>

          {/* Auth CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/agency-trilink/contact" style={{
              color: 'rgba(255, 255, 255, 0.85)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '8px 14px'
            }}>
              Sign in →
            </Link>
            <Link to="/agency-trilink/contact" className="stripe-btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Modern Stripe-Inspired Footer */}
      <footer style={{
        backgroundColor: '#081c31',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '5rem 2rem 3rem'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '15px',
                  color: '#fff'
                }}>
                  T
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Trilink</span>
              </div>
              <p style={{ color: '#adbdcc', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Financial infrastructure & digital scale engine for modern web applications.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Products</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><Link to="/agency-trilink/services" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Payments Engine</Link></li>
                <li><Link to="/agency-trilink/services" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Billing & Subscriptions</Link></li>
                <li><Link to="/agency-trilink/services" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Connect Platform</Link></li>
                <li><Link to="/agency-trilink/services" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Radar AI Fraud Protection</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><Link to="/agency-trilink/about" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>About Trilink</Link></li>
                <li><Link to="/agency-trilink/about" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Careers & Team</Link></li>
                <li><Link to="/agency-trilink/about" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Newsroom</Link></li>
                <li><Link to="/agency-trilink/about" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Partners</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Resources & Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li><Link to="/agency-trilink/contact" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Sales</Link></li>
                <li><Link to="/agency-trilink/contact" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>Support Portal</Link></li>
                <li><Link to="/agency-trilink/contact" style={{ color: '#adbdcc', textDecoration: 'none', fontSize: '0.9rem' }}>API Documentation</Link></li>
                <li><Link to="/" style={{ color: '#635bff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>← Back to Hub</Link></li>
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{ color: '#8898aa', fontSize: '0.85rem', margin: 0 }}>
              &copy; {new Date().getFullYear()} Trilink, Inc. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ color: '#8898aa', fontSize: '0.85rem' }}>Privacy Policy</span>
              <span style={{ color: '#8898aa', fontSize: '0.85rem' }}>Terms of Service</span>
              <span style={{ color: '#8898aa', fontSize: '0.85rem' }}>Cookie Settings</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
