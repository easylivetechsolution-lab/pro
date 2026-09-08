import React from 'react';
import ProjectTemplate from '../../../components/ProjectTemplate';

export const About = () => (
  <ProjectTemplate 
    title="About Trilink Agency" 
    subtitle="We combine world-class engineering with stunning design to empower modern digital enterprises."
    features={[
      { title: "Expert Engineers", desc: "Top-tier talent from leading tech hubs around the globe." },
      { title: "Data-Driven Strategy", desc: "Every campaign and architecture decision backed by rigorous analytics." },
      { title: "Client-Centric Focus", desc: "Dedicated squads working closely with your team 24/7." }
    ]}
  />
);

export default About;
