'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // very simple login: store name and email in localStorage
    const user = { name: name || email.split('@')[0], email };
    localStorage.setItem('jobportal_user', JSON.stringify(user));
    // redirect to jobs
    window.location.href = '/jobs';
  };

  return (
    <div className="max-w-4xl mx-auto flex items-center min-h-[600px]">
      {/* Left side - Image */}
      <div className="w-1/2 pr-8 relative">
        <img
          src="/images/image1.jpg"
          alt="Welcome to Job Portal"
          className="rounded-lg shadow-xl object-cover w-full h-96"
        />
     
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 pl-8">
        <div className="bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#f6f4f4]">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#c18f8e] mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#76767b] border border-[#a65c59] px-4 py-3 rounded-lg text-[#f6f4f4] placeholder-[#d8c5c5] focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#c18f8e] mb-2">Display name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#76767b] border border-[#a65c59] px-4 py-3 rounded-lg text-[#f6f4f4] placeholder-[#d8c5c5] focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:border-transparent"
                placeholder="Enter your display name"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                Login
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-[#d8c5c5]">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-[#2596be] hover:text-[#1e40af] font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
