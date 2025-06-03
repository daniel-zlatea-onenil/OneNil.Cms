export const revalidate = 60; // every 60 seconds
import './globals.css';
import type {Metadata} from 'next';
import Image from 'next/image';
import Link from "next/link";
import React from "react";
import { GlobalLayoutSkeleton, NavigationLinkEntry } from '@/lib/types';
import {contentfulClient} from "@/lib/contentful";

export const metadata: Metadata = {
    title: 'OneNil FC',
    description: 'Official website of OneNil Football Club',
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const globalRes = await contentfulClient.getEntries<GlobalLayoutSkeleton>({
        content_type: 'globalLayout',
        limit: 1,
    });

    const global = globalRes.items[0];
    const headerLinks = global?.fields.headerLinks as NavigationLinkEntry[] || [];
    
    return (
        <html lang="en">
        <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">

        {/* Header */}
        <header className="bg-black text-white sticky top-0 z-50 shadow">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo only, no text */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/onenil-crest.png"
                        alt="OneNil FC Crest"
                        width={48}
                        height={48}
                        className="object-contain"
                    />
                </Link>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-6 text-sm font-medium">
                    {headerLinks?.map((link) => {
                        const { displayText, url } = link.fields;
                        return (
                            <li key={link.sys.id}>
                                <Link href={url} className="flex items-center space-x-1 hover:text-red-300">
                                    <span>{displayText.toString()}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>


        {/* Page Content */}
        <main className="flex-grow">
            {children}
        </main>

        {/* Footer */}
        <footer className="bg-red-700 text-white text-sm text-center mt-12">
            {/* Sponsor Section */}
            <div className="bg-red-600 py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <h3 className="text-lg font-semibold mb-4">Proudly Sponsored By</h3>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <img src="/images/sponsor1.svg" alt="Power Tech sponsor logo" className="h-10"/>
                        <img src="/images/sponsor2.svg" alt="Sponsor 2" className="h-10"/>
                        <img src="/images/sponsor3.svg" alt="Sponsor 3" className="h-10"/>
                        <img src="/images/sponsor4.svg" alt="Sponsor 4" className="h-10"/>
                    </div>
                </div>
            </div>

            {/* Legal Footer */}
            <div className="py-6 border-t border-red-500">
                <div className="max-w-7xl mx-auto px-4">
                    &copy; {new Date().getFullYear()} OneNil FC · All rights reserved.
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}
