'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {NavigationLinkEntry} from "@/lib/types";


interface HeaderProps {
    headerLinks: NavigationLinkEntry[];
}

export default function Header({ headerLinks }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-black text-white sticky top-0 z-50 shadow">
            <nav className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/onenil-crest.png"
                        alt="OneNil FC Crest"
                        width={64}
                        height={64}
                        className="object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 text-sm font-medium">
                    {headerLinks?.map((link) => (
                        <li key={link.sys.id}>
                            <Link href={link.fields.url} className="hover:text-red-300">
                                {link.fields.displayText.toString()}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

            </nav>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-black text-white z-40 md:hidden">
                    <ul className="flex flex-col items-end space-y-3 px-4 py-6 text-right">
                        {headerLinks?.map((link) => (
                            <li key={link.sys.id} className="w-full">
                                <Link
                                    href={link.fields.url}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm font-medium hover:text-red-300"
                                >
                                    {link.fields.displayText.toString()}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </header>
    );
}
