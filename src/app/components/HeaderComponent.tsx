'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationLinkEntry } from '@/lib/types';

interface HeaderProps {
    headerLinks: NavigationLinkEntry[];
    crestSvgUrl?: string;
}

export default function Header({ headerLinks, crestSvgUrl }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black/90' : 'bg-black'} text-white`}>
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

                {/* Left: Logo */}
                <div className="flex items-center space-x-3">
                    <Link href="/">
                        <Image
                            src={crestSvgUrl || '/fallback.svg'}
                            alt="Crest"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </Link>
                    {/* Optional Club Name */}
                    {/* <span className="text-xs uppercase tracking-wider font-bold">VALENCIA CF</span> */}
                </div>

                {/* Center: Navigation */}
                <nav className="hidden md:flex space-x-6 text-sm font-semibold uppercase items-center">
                    {headerLinks?.map(link => (
                        <Link key={link.sys.id} href={link.fields.url} className="hover:text-red-400 flex items-center space-x-1">
                            {/* Optional Icon placeholder: */}
                            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" ... /> */}
                            <span>{link.fields.displayText.toString()}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right: Search, Partner logos, Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        aria-label="Search"
                        onClick={() => setShowSearch(!showSearch)}
                        className="hover:text-red-400 transition-transform transform hover:scale-110 cursor-pointer"
                    >
                        🔍
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ml-2 ${
                            showSearch ? 'max-w-[200px]' : 'max-w-0'
                        }`}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-1 text-sm rounded-full text-black border border-gray-300 w-full focus:outline-none"
                        />
                    </div>
                    <button aria-label="Voice" className="hover:text-red-700">
                        🇬🇧️
                    </button>
                    <div className="flex space-x-2">
                        <Link href="/login" className="bg-red-700 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition">
                            SIGN IN
                        </Link>
                    </div>
                </div>
               

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-black text-white px-4 py-6 space-y-4">
                    {headerLinks.map(link => (
                        <Link key={link.sys.id} href={link.fields.url} className="block text-sm font-medium hover:text-red-700">
                            {link.fields.displayText.toString()}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
