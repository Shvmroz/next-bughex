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
    <footer className="mt-auto overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #eef0f2 100%)' }}>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20 pb-0 flex flex-col justify-end">

        <div className="bg-white rounded-t-[3rem] border-x border-t border-primary/5 shadow-[0_-10px_60px_rgba(19,167,150,0.06)] w-full relative overflow-hidden">

          {/* Gradient visual — replaces buildings PNG */}
          <div className="absolute bottom-0 right-0 w-[420px] h-full pointer-events-none overflow-hidden rounded-tr-[3rem]">
            {/* Vertical gradient bars rising from bottom */}
            <div className="absolute bottom-0 right-0 w-full h-full" style={{
              background: 'linear-gradient(to top, rgba(19,167,150,0.07) 0%, transparent 70%)',
            }} />
            {/* Hex grid pattern */}
            <svg
              className="absolute bottom-0 right-0 opacity-[0.07]"
              width="420"
              height="340"
              viewBox="0 0 420 340"
              fill="none"
            >
              {[...Array(6)].map((_, col) =>
                [...Array(5)].map((_, row) => {
                  const size = 34;
                  const xOffset = col % 2 === 0 ? 0 : size * 0.866;
                  const cx = col * size * 1.732 + xOffset + 30;
                  const cy = row * size * 2 + (col % 2 === 0 ? 0 : size) + 30;
                  return (
                    <polygon
                      key={`${col}-${row}`}
                      points={`${cx},${cy - size} ${cx + size * 0.866},${cy - size * 0.5} ${cx + size * 0.866},${cy + size * 0.5} ${cx},${cy + size} ${cx - size * 0.866},${cy + size * 0.5} ${cx - size * 0.866},${cy - size * 0.5}`}
                      stroke="#13a796"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  );
                })
              )}
            </svg>
            {/* Glowing orb bottom-right */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(19,167,150,0.18) 0%, transparent 70%)',
            }} />
            {/* Rising line accents */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute bottom-0"
                style={{
                  right: `${40 + i * 60}px`,
                  width: '1px',
                  height: `${80 + i * 40}px`,
                  background: `linear-gradient(to top, rgba(19,167,150,${0.25 - i * 0.04}), transparent)`,
                }}
              />
            ))}
          </div>

          {/* CONTENT */}
          <div className="p-10 md:px-14 md:pt-16 md:pb-8 relative z-10">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

              {/* Services */}
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold mb-8 text-dark tracking-tight">Services</h3>
                <ul className="space-y-4">
                  {footerData.Services.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-dark/70 hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 group">
                        <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
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
                        <Link href="#" className="text-sm text-dark/70 hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 group">
                          <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-2" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>

            {/* CTA STRIP */}
            <motion.div
              className="mt-14 mb-4 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(19,167,150,0.08) 0%, rgba(19,167,150,0.03) 100%)',
                border: '1px solid rgba(19,167,150,0.15)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 0% 100%, rgba(19,167,150,0.1) 0%, transparent 60%)',
              }} />
              <div className="relative z-10">
                <p className="font-display font-bold text-lg text-dark">Ready to build something great?</p>
                <p className="text-sm text-dark/50 font-medium mt-1">Let&apos;s turn your idea into reality.</p>
              </div>
              <Link href="/#contact" className="relative z-10">
                <button className="btn shrink-0">
                  <i className="animation"></i>
                  Start a Project
                  <i className="animation"></i>
                </button>
              </Link>
            </motion.div>

            {/* BOTTOM */}
            <div className="mt-10 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">

              <div className="flex items-center gap-6">
                <Logo width={40} height={40} textColor="text-dark" />
              </div>

              {/* SOCIAL ICONS */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-dark/60 overflow-hidden relative group transition-all duration-300 hover:scale-110"
                    whileHover={{ y: -2 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: social.hoverColor }}
                    />
                    <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                      <Icon icon={social.icon} width={22} />
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>

            {/* COPYRIGHT */}
            <p className="text-xs text-dark/40 font-medium tracking-wide text-center md:text-right w-full mt-4 pb-2">
              © {new Date().getFullYear()} Bughex Ltd. All Rights Reserved.
            </p>

          </div>
        </div>
      </div>

    </footer>
  );
}
