import { Asset } from 'contentful';

export const revalidate = 60; // every 60 seconds
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/app/components/HeaderComponent';
import React from 'react';
import { GlobalLayoutSkeleton, NavigationLinkEntry } from '@/lib/types';
import { contentfulClient } from '@/lib/contentful';
import Image from 'next/image';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'OneNil FC',
  description: 'Official website of OneNil Football Club',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalRes = await contentfulClient.getEntries<GlobalLayoutSkeleton>({
    content_type: 'globalLayout',
    limit: 1,
  });

  const global = globalRes.items[0];
  const headerLinks =
    (global?.fields.headerLinks as NavigationLinkEntry[]) || [];
  const crest = global?.fields.crest as Asset;

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        {/* Header */}
        <Header
          headerLinks={headerLinks}
          crestSvgUrl={`https:${crest?.fields?.file?.url}`}
        />

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-b from-neutral-900 to-black text-white text-sm relative overflow-hidden">
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

          {/* Sponsors Section */}
          <div className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h3 className="text-lg font-semibold uppercase mb-8 tracking-wider text-white/90">
                Partners Oficiales
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="p-4 rounded-xl hover:bg-white/5 transition-all duration-300 hover:scale-105 group"
                  >
                    <Image
                      src={`/images/sponsor${num}.svg`}
                      alt={`Sponsor ${num}`}
                      width={160}
                      height={80}
                      className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Club Info & Legal Section */}
          <div className="py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center md:text-left">
              {/* Column 1: Navigation Links */}
              <div>
                <h4 className="font-semibold mb-4 text-white/90">Club</h4>
                <ul className="space-y-2">
                  {['Equipos', 'Estadio', 'Entradas', 'Tienda'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Social Icons */}
              <div>
                <h4 className="font-semibold mb-4 text-white/90">Siguenos</h4>
                <div className="flex justify-center md:justify-start gap-3">
                  {[
                    { Icon: FaFacebookF, label: 'Facebook' },
                    { Icon: FaXTwitter, label: 'Twitter' },
                    { Icon: FaInstagram, label: 'Instagram' },
                    { Icon: FaYoutube, label: 'YouTube' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="p-3 rounded-full bg-white/5 hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 3: Legal */}
              <div>
                <h4 className="font-semibold mb-4 text-white/90">Legal</h4>
                <ul className="space-y-2">
                  {[
                    'Aviso Legal',
                    'Politica de Privacidad',
                    'Cookies',
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs mt-12 text-white/40">
              &copy; {new Date().getFullYear()} OneNil FC. Todos los derechos
              reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
