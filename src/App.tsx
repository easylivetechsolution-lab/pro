import React from 'react';
import { Routes, Route, useParams, Navigate, Link } from 'react-router-dom';
import TrilinkApp from './projects/agency/trilink/src/App';

const PROJECT_REGISTRY = {
  'Real Estate': {
    icon: '🏠',
    description: 'Property management, luxury listings, and urban apartment landing pages.',
    projects: {
      're-p1': 'real-estate/project-1',
      're-p2': 'real-estate/project-2',
      're-p3': 'real-estate/project-3',
      're-p4': 'real-estate/project-4',
      're-p5': 'real-estate/project-5',
    }
  },
  'Healthcare': {
    icon: '🩺',
    description: 'Medical tools, dental clinics, and health consultation platforms.',
    projects: {
      'hc-supply1': 'healthcare/healthcare-supply-1',
      'hc-supply2': 'healthcare/healthcare-supply-2',
      'hc-consultation': 'healthcare/consultation',
      'hc-dental': 'healthcare/dental',
      'hc-advice': 'healthcare/healthcare-advice',
    }
  },
  'Ecommerce': {
    icon: '🛍️',
    description: 'Single product stores for furniture, books, and skincare products.',
    projects: {
      'eco-furniture1': 'ecommerce/furniture-1',
      'eco-furniture2': 'ecommerce/furniture-2',
      'eco-book1': 'ecommerce/book-1',
      'eco-cream1': 'ecommerce/cream-1',
      'eco-cream2': 'ecommerce/cream-2',
    }
  },
  'Professional Services': {
    icon: '⚖️',
    description: 'Legal firms, accounting practices, and financial planning suites.',
    projects: {
      'prof-law': 'professional-services/law-firm',
      'prof-accounting': 'professional-services/accounting',
      'prof-brokerage': 'professional-services/real-estate-brokerage',
      'prof-finance': 'professional-services/financial-planning',
      'prof-consulting': 'professional-services/consulting',
    }
  },
  'Logistics': {
    icon: '🚛',
    description: 'Supply chain tracking, freight management, and delivery services.',
    projects: {
      'log-p1': 'logistics/project-1',
      'log-p2': 'logistics/project-2',
      'log-p3': 'logistics/project-3',
      'log-p4': 'logistics/project-4',
      'log-p5': 'logistics/project-5',
    }
  },
  'Coaching': {
    icon: '🎓',
    description: 'Personal development, business coaching, and mentorship portals.',
    projects: {
      'coach-p1': 'coaching/project-1',
      'coach-p2': 'coaching/project-2',
      'coach-p3': 'coaching/project-3',
      'coach-p4': 'coaching/project-4',
      'coach-p5': 'coaching/project-5',
    }
  },
  'Gym & Fitness': {
    icon: '🏋️',
    description: 'Athletic clubs, fitness tracking, and personal trainer portfolios.',
    projects: {
      'gym-p1': 'gym/project-1',
      'gym-p2': 'gym/project-2',
      'gym-p3': 'gym/project-3',
      'gym-p4': 'gym/project-4',
      'gym-p5': 'gym/project-5',
    }
  },
  'Agency': {
    icon: '🚀',
    description: 'Creative portfolios, marketing agencies, and startup landing pages.',
    projects: {
      'agency-trilink': 'agency/trilink',
      'agency-p2': 'agency/project-2',
      'agency-p3': 'agency/project-3',
      'agency-p4': 'agency/project-4',
      'agency-p5': 'agency/project-5',
    }
  }
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HubLanding />} />
      <Route path="/agency-trilink" element={<TrilinkApp />} />
      <Route path="/:projectSlug" element={<ProjectLayoutWrapper page="Home" />} />
      <Route path="/:projectSlug/about" element={<ProjectLayoutWrapper page="About" />} />
      <Route path="/:projectSlug/services" element={<ProjectLayoutWrapper page="Services" />} />
      <Route path="/:projectSlug/contact" element={<ProjectLayoutWrapper page="Contact" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const HubLanding = () => {
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      fontFamily: '"Inter", system-ui, sans-serif',
      color: '#1e293b'
    }}>
      {/* SaaS Navbar */}
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em', color: '#0f172a' }}>
          PRO<span style={{ color: '#3b82f6' }}>LABS</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Solution</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>Pricing</a>
          <div style={{ 
            backgroundColor: '#0f172a', 
            color: '#fff', 
            padding: '0.5rem 1.25rem', 
            borderRadius: '0.5rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Deploy Project
          </div>
      </div>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        textAlign: 'center', 
        padding: '5rem 1rem 4rem', 
        background: 'linear-gradient(to bottom, #ffffff, #f8fafc)'
      }}>
        <div style={{ 
          display: 'inline-block', 
          backgroundColor: '#eff6ff', 
          color: '#2563eb', 
          padding: '0.5rem 1rem', 
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1.5rem'
        }}>
          Now with 40+ UI Kits
        </div>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          letterSpacing: '-0.05em', 
          marginBottom: '1rem',
          color: '#0f172a'
        }}>
          Multi-Project <span style={{ color: '#3b82f6' }}>Showcase</span>
        </h1>
        <p style={{ 
          color: '#64748b', 
          fontSize: '1.25rem', 
          maxWidth: '600px', 
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Explore our isolated portfolio environments. Each folder contains high-performance, multi-page business modules.
        </p>
      </header>

      {/* Grid Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          {Object.entries(PROJECT_REGISTRY).map(([category, data]) => (
            <div key={category} style={{ 
              backgroundColor: '#ffffff',
              borderRadius: '1rem', 
              padding: '2rem',
              border: '1px solid #e2e8f0',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#f1f5f9', 
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem'
              }}>
                {data.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>{category}</h2>
              <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {data.description}
              </p>
              
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  Available Projects
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {Object.entries(data.projects).map(([slug]) => (
                    <Link 
                      key={slug} 
                      to={`/${slug}`} 
                      style={{ 
                        textDecoration: 'none', 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#475569',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        padding: '0.75rem 1rem',
                        backgroundColor: '#f8fafc',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#3b82f6';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#475569';
                      }}
                    >
                      <span>{slug.toUpperCase().replace(/-/g, ' ')}</span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Launch →</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 2rem', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} PROLABS by EasyLiveTech Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const ProjectLayoutWrapper = ({ page }: { page: string }) => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    if (!projectSlug) return;

    // Reset component when transitioning to a new route/project
    setComponent(null);

    const flatMap: Record<string, string> = {};
    Object.values(PROJECT_REGISTRY).forEach(categorySet => {
      Object.assign(flatMap, categorySet.projects);
    });

    const targetFolder = flatMap[projectSlug.toLowerCase()];
    if (!targetFolder) {
      setComponent(() => () => (
        <div style={{ padding: '100px 40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
          <h2 style={{ color: '#64748b' }}>Project Not Found</h2>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Back to Showcase</Link>
        </div>
      ));
      return;
    }

    const [category, folder] = targetFolder.split('/');

    // Vite glob module resolver logic to prevent dynamic import errors in production builds
    const modules = import.meta.glob('./projects/**/*.tsx');
    const targetPath = `./projects/${category}/${folder}/${page}.tsx`;
    const loadModule = modules[targetPath];

    if (loadModule) {
      loadModule()
        .then((module: any) => {
          setComponent(() => module[page] || module.default);
        })
        .catch((err) => {
          console.error("Vite dynamic resolution error:", err);
          setComponent(() => () => (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p>Dynamic module loading error. Please refresh.</p>
              <Link to="/">Back to Hub</Link>
            </div>
          ));
        });
    } else {
      console.warn(`Target path not matched in Vite manifest: ${targetPath}`);
      setComponent(() => () => (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>This page context does not exist: {targetPath}</p>
          <Link to="/">Back to Hub</Link>
        </div>
      ));
    }
  }, [projectSlug, page]);

  if (!Component) return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: '#64748b',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #3b82f6', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
        <p>Initializing Secure Environment...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return <Component />;
};

export default App;
