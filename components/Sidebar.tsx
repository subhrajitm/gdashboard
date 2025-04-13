"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    )},
    { name: 'Shop Status', path: '/shop-status', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )},
    { name: 'Billing Performance', path: '/billing-performance', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    )},
    { name: 'Notifications', path: '/notifications', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    )},
  ];
  
  return (
    <aside className="bg-[#161916] border-r border-[#282A27] w-64 h-screen fixed top-0 left-0 flex flex-col">
      <div className="h-[120px] flex items-center justify-center px-6 border-b border-[#282A27]">
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <Image 
              src="/genpact-logo.svg" 
              alt="Genpact Logo" 
              width={140} 
              height={60}
            />
            <span className="text-[#FF4F59] font-bold text-xl ml-2">SMBA</span>
          </div>
        </Link>
      </div>
      
      <div className="p-4 flex-grow">
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    pathname === item.path 
                      ? 'bg-[#1d1f1d] text-[#FFFAF4] border-l-4 border-[#FF4F59] pl-3 shadow-sm' 
                      : 'text-[#FFFAF4] hover:bg-[#1d1f1d] hover:border-l-4 hover:border-[#FF4F59] hover:pl-3'
                  }`}
                >
                  <span className={`mr-3 ${pathname === item.path ? 'text-[#FF4F59]' : 'text-[#FF4F59]'}`}>
                    {item.icon}
                  </span>
                  <span className={`font-medium ${pathname === item.path ? 'text-[#FF4F59]' : ''}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Logout button at bottom of sidebar */}
      <div className="p-4 border-t border-[#282A27]">
        <button 
          onClick={() => console.log('Logout clicked')}
          className="flex items-center px-4 py-3 rounded-md w-full text-[#FFFAF4] hover:bg-[#282A27] transition-colors"
        >
          <span className="mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
