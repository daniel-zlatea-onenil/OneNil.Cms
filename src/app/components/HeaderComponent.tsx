'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationLinkEntry } from '@/lib/types';
import { FiSearch, FiGlobe, FiUser, FiX, FiMenu } from 'react-icons/fi';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeaderProps {
  headerLinks: NavigationLinkEntry[];
  crestSvgUrl?: string;
}

export default function Header({ headerLinks, crestSvgUrl }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const initialCheckDone = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!initialCheckDone.current) {
      setScrolled(window.scrollY > 50);
      initialCheckDone.current = true;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isScrolled = mounted ? scrolled : true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line - only show after mounted to prevent flicker */}
      <div
        className={`h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 ${
          mounted ? 'transition-opacity duration-300' : ''
        } ${mounted && scrolled ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative group transition-transform duration-300 hover:scale-105"
        >
          <div
            className={`transition-all duration-300 ${
              isScrolled ? 'w-12 h-12' : 'w-16 h-16'
            }`}
          >
            <Image
              src={crestSvgUrl || '/fallback.svg'}
              alt="Crest"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {headerLinks?.map((link) => (
            <Link
              key={link.sys.id}
              href={link.fields.url}
              className={`relative px-5 py-2.5 text-white font-medium tracking-wide uppercase transition-all duration-300 group ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {link.fields.displayText.toString()}
              </span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-lg transition-all duration-300" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Search */}
          <div className="flex items-center">
            <button
              aria-label="Search"
              onClick={() => setShowSearch(!showSearch)}
              className={`p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 ${
                showSearch ? 'bg-white/10' : ''
              }`}
            >
              <FiSearch className={isScrolled ? 'w-5 h-5' : 'w-6 h-6'} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                showSearch ? 'w-48 ml-2 opacity-100' : 'w-0 opacity-0'
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm rounded-full bg-white/10 backdrop-blur text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-red-500 focus:bg-white/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Language */}
          <button
            aria-label="Language"
            className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <FiGlobe className={isScrolled ? 'w-5 h-5' : 'w-6 h-6'} />
          </button>

          {/* Sign In */}
          <Link
            href="/login"
            className={`flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 ${
              isScrolled ? 'px-5 py-2.5 text-sm' : 'px-6 py-3 text-base'
            }`}
          >
            <FiUser className={isScrolled ? 'w-4 h-4' : 'w-5 h-5'} />
            <span>Sign In</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 rounded-full text-white hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6">
          <nav className="space-y-1">
            {headerLinks.map((link, index) => (
              <Link
                key={link.sys.id}
                href={link.fields.url}
                className="block px-4 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.fields.displayText.toString()}
              </Link>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-white/10 flex gap-3">
            <button className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">
              <FiSearch className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">
              <FiGlobe className="w-5 h-5" />
            </button>
            <Link
              href="/login"
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-full transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
