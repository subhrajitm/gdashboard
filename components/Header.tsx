"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Function to get page name from pathname
  const getPageName = () => {
    if (pathname === '/') return 'Dashboard';
    return pathname.split('/').pop()?.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') || 'Dashboard';
  };
  
  return (
    <header className="bg-[#161916] border-b border-[#282A27] py-4 px-6 flex justify-between items-center h-[120px]">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-[#FFFAF4]">{getPageName()}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Link href="/notifications" className="text-[#FFFAF4] hover:text-[#FF4F59] transition-colors block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className="absolute -top-1 -right-1 bg-[#FFAD28] text-[#161916] rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
              3
            </div>
          </Link>
        </div>
        
        <Link href="/profile">
          <div className="h-8 w-8 rounded-full bg-[#282A27] flex items-center justify-center text-[#FFFAF4] hover:bg-[#FF4F59] transition-colors cursor-pointer">
            <span className="font-medium">SM</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
