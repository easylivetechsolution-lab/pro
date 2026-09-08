import React from 'react';
import ProjectTemplate from '../../../components/ProjectTemplate';

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

export default Contact;
