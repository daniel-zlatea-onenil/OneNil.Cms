import { Asset } from 'contentful';

export const revalidate = 60; // every 60 seconds
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/app/components/HeaderComponent';
import React from 'react';
import { GlobalLayoutSkeleton, NavigationLinkEntry } from '@/lib/types';
import { contentfulClient } from '@/lib/contentful';
import Image from 'next/image';

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
        <footer className="bg-red-700 text-white text-sm mt-12">
          {/* Sponsors Section */}
          {/* Sponsors Section */}
          <div className="py-10">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h3 className="text-lg font-semibold uppercase mb-6">
                Partners Oficiales
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-10">
                <Image
                  src="/images/sponsor1.svg"
                  alt="Sponsor 1"
                  width={160}
                  height={80}
                  className="h-20"
                />
                <Image
                  src="/images/sponsor2.svg"
                  alt="Sponsor 2"
                  width={160}
                  height={80}
                  className="h-20"
                />
                <Image
                  src="/images/sponsor3.svg"
                  alt="Sponsor 3"
                  width={160}
                  height={80}
                  className="h-20"
                />
                <Image
                  src="/images/sponsor4.svg"
                  alt="Sponsor 4"
                  width={160}
                  height={80}
                  className="h-20"
                />
              </div>
            </div>
          </div>

          {/* Club Info & Legal Section */}
          <div className="bg-black py-10 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center md:text-left">
              {/* Column 1: Navigation Links */}
              <div>
                <h4 className="font-semibold mb-3">Club</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Equipos
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Estadio
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Entradas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Tienda
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Social Icons */}
              <div>
                <h4 className="font-semibold mb-3">Síguenos</h4>
                <div className="flex justify-center md:justify-start gap-4 text-xl">
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-x-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </div>

              {/* Column 3: Legal */}
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:underline">
                      Aviso Legal
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Política de Privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center text-xs mt-8 opacity-60">
              &copy; {new Date().getFullYear()} OneNil FC. Todos los derechos
              reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
