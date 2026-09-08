import React from 'react';
import ProjectTemplate from '../../../components/ProjectTemplate';

export const Home = () => (
  <ProjectTemplate 
    title="Trilink Agency Platform" 
    subtitle="Next-generation brand growth, high-conversion design, and scalable infrastructure."
    features={[
      { title: "Global CDN & Edge", desc: "Lightning-fast asset delivery worldwide with 99.99% uptime SLA." },
      { title: "Agentic AI Commerce", desc: "Automate user acquisition and conversion flows with autonomous agents." },
      { title: "Enterprise Security", desc: "SOC2 Type II certified with end-to-end encryption for all transactions." }
    ]}
  />
);

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

export const Contact = () => (
  <ProjectTemplate 
    title="Contact Trilink" 
    subtitle="Ready to accelerate your growth? Get in touch with our strategy team today."
    features={[
      { title: "Schedule a Demo", desc: "Book a 30-minute consultation with our lead architects." },
      { title: "Enterprise Sales", desc: "Contact sales@trilink.agency for custom enterprise agreements." },
      { title: "Office Locations", desc: "Headquartered in San Francisco with hubs in New York and London." }
    ]}
  />
);
