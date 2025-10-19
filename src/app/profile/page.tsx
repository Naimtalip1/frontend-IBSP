'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function loadProfile() {
  try { return JSON.parse(localStorage.getItem('jobportal_profile') || 'null'); } catch { return null; }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#303139] dark:text-[#f6f4f4]">Candidate Profile</h1>
        <Link
          href="/profile/edit"
          className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          {profile ? 'Edit Profile' : 'Complete Profile'}
        </Link>
      </div>

      {profile ? (
        <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Full name</label>
              <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Email</label>
              <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Preferred position</label>
              <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.preferredPosition}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Expected salary</label>
              <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.expectedSalary}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#891a14] p-8 rounded-lg shadow-xl border border-[#a65c59] text-center">
          <p className="text-[#f6f4f4] text-lg mb-4">You have not completed your profile yet.</p>
          <p className="text-[#d8c5c5]">Please fill it in to apply for jobs.</p>
        </div>
      )}
    </div>
  );
}
