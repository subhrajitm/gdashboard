"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  
  // Function to get page name from pathname
  const getPageName = () => {
    if (pathname === '/') return 'Dashboard';
    return pathname.split('/').pop()?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Dashboard';
  };
  
  return (
    <header className="bg-[#161916] dark:bg-[#161916] light:bg-morning border-b border-[#282A27] py-4 px-6 flex justify-between items-center h-[120px]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold dark:text-sunrise-white light:text-midnight">{getPageName()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1d1f1d] dark:bg-[#1d1f1d] light:bg-sunrise-cream px-4 py-2 rounded-lg border border-[#282A27] focus:outline-none focus:border-coral w-64 placeholder:text-gray-500 dark:text-sunrise-white light:text-midnight"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 dark:text-sunrise-white light:text-midnight">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg dark:bg-[#1d1f1d] light:bg-sunrise-cream dark:text-sunrise-white light:text-midnight hover:bg-first-light-2 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        
        <div className="relative">
          <Link href="/notifications" className="dark:text-sunrise-white light:text-midnight hover:text-coral transition-colors block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className="absolute -top-1 -right-1 bg-sunset text-midnight rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
              3
            </div>
          </Link>
        </div>
        
        <Link href="/profile">
          <div className="h-8 w-8 rounded-full dark:bg-first-light-1 light:bg-sunrise-cream flex items-center justify-center dark:text-sunrise-white light:text-midnight hover:bg-coral transition-colors cursor-pointer">
            <span className="font-medium">SM</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
