import React from 'react';
import { useParams } from 'react-router-dom';

const LandingPage = ({ title }: { title: string }) => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  
  // Base path for navigation within the specific project slug
  const basePath = projectSlug ? `/${projectSlug}` : '';

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      margin: 0, 
      padding: 0, 
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      {/* Full-Width Navigation Bar */}
      <nav style={{ 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #e2e8f0', 
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 0,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 800 }}>
          {title.split(' ')[0]} <span style={{ color: '#3b82f6', fontSize: '1rem' }}>{title.split(' ').slice(1).join(' ')}</span>
        </div>
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
          <li><a href={`${basePath}/`} style={{ textDecoration: 'none', color: '#475569', fontWeight: 600 }}>Home</a></li>
          <li><a href={`${basePath}/about`} style={{ textDecoration: 'none', color: '#475569', fontWeight: 600 }}>About</a></li>
          <li><a href={`${basePath}/services`} style={{ textDecoration: 'none', color: '#475569', fontWeight: 600 }}>Services</a></li>
          <li><a href={`${basePath}/contact`} style={{ textDecoration: 'none', color: '#475569', fontWeight: 600 }}>Contact</a></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        width: '100%', 
        padding: '3rem 2rem', 
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <section style={{ 
            backgroundColor: '#ffffff', 
            padding: '4rem 3rem', 
            borderRadius: '1rem', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ color: '#0f172a', fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Project Environment: {projectSlug?.toUpperCase()}
            </h2>
            <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.1rem', maxWidth: '800px', marginBottom: '2rem' }}>
              This environment is fully isolated and ready for your custom design mockups.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ backgroundColor: '#3b82f6', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                Interact
              </div>
            </div>
        </section>
        </div>
      </main>

      {/* Full-width Footer */}
      <footer style={{ 
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '2rem', 
        textAlign: 'center', 
        color: '#64748b', 
        fontSize: '0.9rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        &copy; {new Date().getFullYear()} {title}. Portfolio Module.
      </footer>
    </div>
  );
};

export default LandingPage;
