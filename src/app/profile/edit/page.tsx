'use client';

import React, { useState, useEffect } from 'react';
import ApplicationPage from '@/app/apply/page';
import { ApplicationFormData } from '@/types/application';

export default function ProfileEditPage() {
  // To reuse the existing apply form, we'll mount it inside this page and intercept submission via localStorage.
  // Simpler: render the apply page but change submit behavior to save profile.

  useEffect(() => {
    // no-op
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#303139] dark:text-[#f6f4f4]">Edit Profile</h1>
      <div className="bg-[#f6f4f4] dark:bg-[#303139] p-6 rounded shadow">
        {/* Reuse the existing apply page component; when submitted here it will save as profile */}
        <ApplicationPage saveAsProfile />
      </div>
    </div>
  );
}
