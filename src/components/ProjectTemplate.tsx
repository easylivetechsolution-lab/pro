import React from 'react';
import { useParams } from 'react-router-dom';

const LandingPage = ({ title }: { title: string }) => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  
  // Base path for navigation within the specific project slug
  const basePath = projectSlug ? `/${projectSlug}` : '';

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>{title}</h1>
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href={`${basePath}/`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Home</a></li>
            <li><a href={`${basePath}/about`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>About</a></li>
            <li><a href={`${basePath}/services`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Services</a></li>
            <li><a href={`${basePath}/contact`} style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#34495e' }}>Isolated Multi-Page Module</h2>
          <p style={{ lineHeight: '1.6', color: '#7f8c8d' }}>
            This page is running under the slug: <strong>/{projectSlug}</strong>.
            All routes within this project are isolated from other projects on this same domain.
          </p>
        </section>
      </main>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #eaeaea', paddingTop: '20px', textAlign: 'center', color: '#95a5a6', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} {title}. Running on EasyLiveTech projects hub.
      </footer>
    </div>
  );
};

export default LandingPage;
