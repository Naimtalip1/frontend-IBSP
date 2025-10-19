'use client';

import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email === 'admin@jobportal.com' ? 'admin' : 'user';
    const user = { name: name || email.split('@')[0], email, role };
    // In a real app you'd POST to an API. Here we just save to localStorage
    localStorage.setItem('jobportal_user', JSON.stringify(user));
    window.location.href = role === 'admin' ? '/admin/dashboard' : '/jobs';
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

      {/* Right side - Register form */}
      <div className="w-1/2 pl-8">
        <div className="bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#f6f4f4]">Register</h2>
          <form onSubmit={handleRegister} className="space-y-6">
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
              <label className="block text-sm font-medium text-[#c18f8e] mb-2">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#76767b] border border-[#a65c59] px-4 py-3 rounded-lg text-[#f6f4f4] placeholder-[#d8c5c5] focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
