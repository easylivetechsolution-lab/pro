import React from 'react';
import ProjectTemplate from '../../../components/ProjectTemplate';

export const Services = () => (
  <ProjectTemplate 
    title="Trilink Services & Solutions" 
    subtitle="Comprehensive digital transformation packages tailored for fast-growing startups and enterprises."
    features={[
      { title: "Full-Stack Web Apps", desc: "Robust React, Node, and Next.js applications built for scale." },
      { title: "Brand Identity & UI/UX", desc: "Award-winning design systems that captivate and convert users." },
      { title: "Growth & Performance", desc: "SEO, conversion rate optimization, and automated funnel management." }
    ]}
  />
);

export default Services;
