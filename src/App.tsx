import React from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';

// Since all multi-page projects will now live under pro.easylivetech.com/[project-slug],
// we use react-router URL parameters /:projectSlug instead of reading subdomains!

const App = () => {
  return (
    <Routes>
      {/* Root domain fallback / landing instructions */}
      <Route path="/" element={
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h2>EasyLiveTech Multi-Project Hub</h2>
          <p>Navigate to <code>/pro.easylivetech.com/:projectSlug</code> or local <code>/:projectSlug</code> to view individual projects.</p>
          <p>Example: <a href="/re-p1">/re-p1</a></p>
        </div>
      } />

      {/* Dynamic project routes matching projects.easylivetech.com/:projectSlug */}
      <Route path="/:projectSlug" element={<ProjectLayoutWrapper page="Home" />} />
      <Route path="/:projectSlug/about" element={<ProjectLayoutWrapper page="About" />} />
      <Route path="/:projectSlug/services" element={<ProjectLayoutWrapper page="Services" />} />
      <Route path="/:projectSlug/contact" element={<ProjectLayoutWrapper page="Contact" />} />

      {/* Wildcard / Not Found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const ProjectLayoutWrapper = ({ page }: { page: string }) => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    if (!projectSlug) return;

    // Registry linking custom path/slug in URL to the corresponding nested folder in /src/projects/
    const projectMap: Record<string, string> = {
      // Real Estate
      're-p1': 'real-estate/project-1',
      're-p2': 'real-estate/project-2',
      're-p3': 'real-estate/project-3',
      're-p4': 'real-estate/project-4',
      're-p5': 'real-estate/project-5',

      // Healthcare
      'hc-supply1': 'healthcare/healthcare-supply-1',
      'hc-supply2': 'healthcare/healthcare-supply-2',
      'hc-consultation': 'healthcare/consultation',
      'hc-dental': 'healthcare/dental',
      'hc-advice': 'healthcare/healthcare-advice',

      // Ecommerce
      'eco-furniture1': 'ecommerce/furniture-1',
      'eco-furniture2': 'ecommerce/furniture-2',
      'eco-book1': 'ecommerce/book-1',
      'eco-cream1': 'ecommerce/cream-1',
      'eco-cream2': 'ecommerce/cream-2',

      // Logistics
      'log-p1': 'logistics/project-1',
      'log-p2': 'logistics/project-2',
      'log-p3': 'logistics/project-3',
      'log-p4': 'logistics/project-4',
      'log-p5': 'logistics/project-5',

      // Coaching
      'coach-p1': 'coaching/project-1',
      'coach-p2': 'coaching/project-2',
      'coach-p3': 'coaching/project-3',
      'coach-p4': 'coaching/project-4',
      'coach-p5': 'coaching/project-5',

      // Gym & Exercises
      'gym-p1': 'gym/project-1',
      'gym-p2': 'gym/project-2',
      'gym-p3': 'gym/project-3',
      'gym-p4': 'gym/project-4',
      'gym-p5': 'gym/project-5',

      // Professional Services
      'prof-law': 'professional-services/law-firm',
      'prof-accounting': 'professional-services/accounting',
      'prof-brokerage': 'professional-services/real-estate-brokerage',
      'prof-finance': 'professional-services/financial-planning',
      'prof-consulting': 'professional-services/consulting',

      // Agency & Portfolio (Now under projects/agency with 5 projects!)
      'agency-p1': 'agency/project-1',
      'agency-p2': 'agency/project-2',
      'agency-p3': 'agency/project-3',
      'agency-p4': 'agency/project-4',
      'agency-p5': 'agency/project-5'
    };

    const targetFolder = projectMap[projectSlug.toLowerCase()];

    if (!targetFolder) {
      setComponent(() => () => (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h2>Project Not Found</h2>
          <p>The slug <code>/{projectSlug}</code> does not match any registered client project.</p>
        </div>
      ));
      return;
    }

    const [category, folder] = targetFolder.split('/');

    import(`./projects/${category}/${folder}/${page}.tsx`)
      .then(module => {
        setComponent(() => module[page] || module.default);
      })
      .catch(err => {
        console.error("Failed to load component", err);
        setComponent(() => () => <div>Error loading project page. Check folder structure.</div>);
      });
  }, [projectSlug, page]);

  if (!Component) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Project Site...</div>;

  return <Component />;
};

export default App;
