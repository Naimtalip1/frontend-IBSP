'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

function getUserFromStorage() {
  try {
    const raw = localStorage.getItem('jobportal_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export default function TopNav() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setUser(getUserFromStorage());
    const onStorage = () => setUser(getUserFromStorage());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Don't show TopNav on home page and auth pages when not logged in
  if (!user && (pathname === '/' || pathname.startsWith('/auth'))) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('jobportal_user');
    setUser(null);
    // keep applied jobs/profile but remove session
    window.location.href = '/';
  };

  return (
    <header className="bg-[#f6f4f4] shadow-lg border-b border-[#891a14] w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center gap-8">
            <Link href="/jobs" className="text-xl font-bold text-[#31313a] hover:text-[#1e40af] transition-colors">
              JOBS
            </Link>
            <Link href="/applied-jobs" className="text-lg font-semibold text-[#31313a] hover:text-[#1e40af] transition-colors">
              APPLIED JOBS
            </Link>
            <Link href="/profile" className="text-lg font-semibold text-[#31313a] hover:text-[#1e40af] transition-colors">
              PROFILE
            </Link>
          </div>

          <div className="flex items-center gap-4">
          

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#303139]">Welcome, <span className="text-[#2596be] font-medium">{user.name}</span></span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#89302e] hover:bg-[#891a14] text-[#f6f4f4] rounded-lg font-medium transition-colors shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 bg-[#89302e] hover:bg-[#891a14] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 border border-[#89302e] text-[#89302e] hover:bg-[#89302e] hover:text-[#f6f4f4] rounded-lg font-medium transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
