'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#f6f4f4] dark:bg-[#303139] shadow-sm border-b border-[#d8c5c5] dark:border-[#76767b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Image */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/images/impact-logo.png"
                alt="Job Portal Logo"
                className="w-35 h-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-[#303139] dark:text-[#f6f4f4]">
                Jobs@Impact
              </span>
            </Link>
          </div>

          {/* Right side - Could add additional elements here */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for future elements like notifications, user menu, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
}