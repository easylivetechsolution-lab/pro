import React from 'react';
import { Routes, Route, useParams, Navigate, Link } from 'react-router-dom';

const PROJECT_REGISTRY = {
  'Real Estate': {
    're-p1': 'real-estate/project-1',
    're-p2': 'real-estate/project-2',
    're-p3': 'real-estate/project-3',
    're-p4': 'real-estate/project-4',
    're-p5': 'real-estate/project-5',
  },
  'Healthcare': {
    'hc-supply1': 'healthcare/healthcare-supply-1',
    'hc-supply2': 'healthcare/healthcare-supply-2',
    'hc-consultation': 'healthcare/consultation',
    'hc-dental': 'healthcare/dental',
    'hc-advice': 'healthcare/healthcare-advice',
  },
  'Ecommerce': {
    'eco-furniture1': 'ecommerce/furniture-1',
    'eco-furniture2': 'ecommerce/furniture-2',
    'eco-book1': 'ecommerce/book-1',
    'eco-cream1': 'ecommerce/cream-1',
    'eco-cream2': 'ecommerce/cream-2',
  },
  'Logistics': {
    'log-p1': 'logistics/project-1',
    'log-p2': 'logistics/project-2',
    'log-p3': 'logistics/project-3',
    'log-p4': 'logistics/project-4',
    'log-p5': 'logistics/project-5',
  },
  'Coaching': {
    'coach-p1': 'coaching/project-1',
    'coach-p2': 'coaching/project-2',
    'coach-p3': 'coaching/project-3',
    'coach-p4': 'coaching/project-4',
    'coach-p5': 'coaching/project-5',
  },
  'Gym': {
    'gym-p1': 'gym/project-1',
    'gym-p2': 'gym/project-2',
    'gym-p3': 'gym/project-3',
    'gym-p4': 'gym/project-4',
    'gym-p5': 'gym/project-5',
  },
  'Professional Services': {
    'prof-law': 'professional-services/law-firm',
    'prof-accounting': 'professional-services/accounting',
    'prof-brokerage': 'professional-services/real-estate-brokerage',
    'prof-finance': 'professional-services/financial-planning',
    'prof-consulting': 'professional-services/consulting',
  },
  'Agency': {
    'agency-p1': 'agency/project-1',
    'agency-p2': 'agency/project-2',
    'agency-p3': 'agency/project-3',
    'agency-p4': 'agency/project-4',
    'agency-p5': 'agency/project-5',
  }
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HubLanding />} />
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
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a202c' }}>Pro Solutions Lab</h1>
        <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>Multi-Project Portfolio Hub</p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {Object.entries(PROJECT_REGISTRY).map(([category, projects]) => (
          <div key={category} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px', 
            padding: '24px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>📂</span>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: '#2d3748' }}>{category}</h2>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {Object.entries(projects).map(([slug, path]) => (
                <li key={slug} style={{ marginBottom: '8px' }}>
                  <Link 
                    to={`/${slug}`} 
                    style={{ 
                      textDecoration: 'none', 
                      color: '#3182ce', 
                      fontSize: '0.95rem',
                      display: 'block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ebf8ff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    • {slug.toUpperCase().replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectLayoutWrapper = ({ page }: { page: string }) => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    if (!projectSlug) return;

    // Flatten registry for lookup
    const flatMap: Record<string, string> = {};
    Object.values(PROJECT_REGISTRY).forEach(categorySet => {
      Object.assign(flatMap, categorySet);
    });

    const targetFolder = flatMap[projectSlug.toLowerCase()];
    if (!targetFolder) {
      setComponent(() => () => (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Project Not Found</h2>
          <Link to="/">Return to Hub</Link>
        </div>
      ));
      return;
    }

    const [category, folder] = targetFolder.split('/');
    import(`./projects/${category}/${folder}/${page}.tsx`)
      .then(module => setComponent(() => module[page] || module.default))
      .catch(() => setComponent(() => () => <div>Load Error</div>));
  }, [projectSlug, page]);

  if (!Component) return <div style={{ padding: '20px' }}>Loading...</div>;
  return <Component />;
};

export default App;

export default App;
