'use client';

import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import Logo from './Logo';

const footerData = {
  Services: [
    'Digital Consulting & Strategy',
    'Digital Commerce',
    'Business Applications',
    'Cloud Operations & Migration',
    'Cloud Applications',
    'Development & Integrations',
    'Managed Services'
  ],
  Industries: [
    'Communications',
    'Banking & Financial Services',
    'Public Sector',
    'Health',
    'Retail'
  ],
  Insights: [
    'Case Studies',
    'Newsroom',
    'Whitepapers',
    'Blogs'
  ],
  'Quick Links': [
    'Who we are',
    'Careers',
    'Our Leadership',
    'Investor Relation',
    'Financial Reports'
  ]
};

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    href: '#',
    hoverColor: '#0A66C2'
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    href: '#',
    hoverColor: '#1877F2'
  },
  {
    name: 'Instagram',
    icon: 'mdi:instagram',
    href: '#',
    hoverColor: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    isGradient: true
  }
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#F8F9FA] pt-24 pb-0 overflow-hidden relative">


      <div className="max-w-7xl mx-auto px-6 relative z-10 h-full flex flex-col justify-end">

        <div className="bg-white rounded-t-[3rem] border-x border-t border-primary/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] w-full relative overflow-hidden">

          {/* BUILDING IMAGE (starts from border-top) */}
          <img
            src="/buildings.png"
            alt="Buildings"
            className="absolute bottom-[50px] right-5 w-[260px] md:w-[340px] opacity-30 pointer-events-none object-contain z-0"
          />

          {/* CONTENT WRAPPER (padding moved here) */}
          <div className="p-10 md:px-14 md:pt-16 md:pb-8 relative z-10">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

              {/* Services */}
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold mb-8 text-dark tracking-tight">Services</h3>
                <ul className="space-y-4">
                  {footerData.Services.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-dark/70 hover:text-primary font-medium">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Columns */}
              {['Industries', 'Insights', 'Quick Links'].map((section, i) => (
                <div key={i} className="lg:col-span-2 md:col-span-1">
                  <h3 className="text-xl font-bold mb-8 text-dark tracking-tight">{section}</h3>
                  <ul className="space-y-4">
                    {footerData[section].map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-sm text-dark/70 hover:text-primary font-medium">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>

            {/* BOTTOM */}
            <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">

              <div className="flex items-center gap-6">
                <Logo width={40} height={40} textColor="text-dark" />
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-dark/60 shadow-sm overflow-hidden relative group"
                  >
                    {/* Hover Background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background: social.hoverColor }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 group-hover:text-white">
                      <Icon icon={social.icon} width={26} />
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>

            {/* COPYRIGHT */}
            <p className="text-xs text-dark/50 font-medium tracking-wide md:text-right w-full md:w-auto mt-4">
              © {new Date().getFullYear()} Bughex Ltd. All Rights Reserved.
            </p>

          </div>
        </div>
      </div>



    </footer>
  );
}