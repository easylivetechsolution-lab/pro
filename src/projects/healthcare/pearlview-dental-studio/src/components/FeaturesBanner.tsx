import React from 'react';
import { Award, Cpu, UserCheck, HeartHandshake } from 'lucide-react';

export const FeaturesBanner: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Board-Certified Care',
      description: 'Highly trained, experienced dentists and specialists you can trust.',
      tag: 'Credentialed',
    },
    {
      icon: Cpu,
      title: 'Advanced Digital Dentistry',
      description: 'More accurate, comfortable and efficient treatment with 3D scanning.',
      tag: 'State-of-the-Art',
    },
    {
      icon: UserCheck,
      title: 'Personalized Treatment Plans',
      description: 'Bespoke care designed specifically around your unique facial aesthetic and goals.',
      tag: 'Tailored',
    },
    {
      icon: HeartHandshake,
      title: 'Comfort-First Experience',
      description: 'A calm, welcoming, spa-like environment with zero judgment from start to finish.',
      tag: 'Anxiety-Free',
    },
  ];

  return (
    <section id="features-strip" className="relative py-10 bg-white border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-zinc-200/70">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group flex flex-col items-start pt-6 sm:pt-0 ${
                  index !== 0 ? 'lg:pl-6' : ''
                } transition-all duration-300 hover:translate-y-[-2px]`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-zinc-200 flex items-center justify-center text-[#0E282E] group-hover:bg-[#0E282E] group-hover:text-[#EAD8B7] transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 group-hover:text-[#0E282E] transition-colors">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#0E282E] mb-1.5 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
