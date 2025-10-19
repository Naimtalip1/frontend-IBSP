'use client';

import { useEffect, useState } from 'react';
import AuthIndex from './auth/page';
import JobsPage from './jobs/page';

function getUserFromStorage() {
  try {
    const raw = localStorage.getItem('jobportal_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getUserFromStorage());
    setIsLoading(false);

    // Listen for storage changes (login/logout)
    const onStorage = () => setUser(getUserFromStorage());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f4f4] dark:bg-[#303139] flex items-center justify-center">
        <div className="text-[#303139] dark:text-[#f6f4f4] text-lg">Loading...</div>
      </div>
    );
  }

  return user ? <JobsPage /> : <AuthIndex />;
}
