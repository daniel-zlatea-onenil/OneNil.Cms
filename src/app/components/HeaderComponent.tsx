'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationLinkEntry } from '@/lib/types';
import { FiSearch, FiGlobe, FiUser, FiX, FiMenu } from 'react-icons/fi';

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
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-xl shadow-lg border-b border-white/10'
          : 'bg-gradient-to-b from-black/90 to-black/70'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={crestSvgUrl || '/fallback.svg'}
              alt="Crest"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold uppercase items-center">
          {headerLinks?.map((link) => (
            <Link
              key={link.sys.id}
              href={link.fields.url}
              className="relative group py-2"
            >
              <span className="transition-colors duration-300 group-hover:text-red-400">
                {link.fields.displayText.toString()}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right: Search, Language, Sign In */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            aria-label="Search"
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <FiSearch className="w-5 h-5" />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showSearch ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 w-full focus:outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300"
            />
          </div>
          <button
            aria-label="Language"
            className="p-2.5 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <FiGlobe className="w-5 h-5" />
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs px-5 py-2.5 rounded-full font-semibold hover:shadow-glow-red transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <FiUser className="w-4 h-4" />
            <span>SIGN IN</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl text-white px-4 py-6 space-y-4 border-t border-white/10">
          {headerLinks.map((link, index) => (
            <Link
              key={link.sys.id}
              href={link.fields.url}
              className="block text-sm font-medium hover:text-red-400 transition-all duration-300 hover:translate-x-2"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {link.fields.displayText.toString()}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm px-6 py-3 rounded-full font-semibold"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="w-4 h-4" />
              <span>SIGN IN</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
