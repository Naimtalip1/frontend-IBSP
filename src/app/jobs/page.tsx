'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getJobs, Job } from '@/data/jobs';

function getUser() {
  try { return JSON.parse(localStorage.getItem('jobportal_user') || 'null'); } catch { return null; }
}

function getApplied() {
  try { return JSON.parse(localStorage.getItem('jobportal_applied') || '[]'); } catch { return []; }
}

export default function JobsPage() {
  const [applied, setApplied] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser());
    setApplied(getApplied());
  }, []);

  const apply = (job: Job) => {
    if (!user) {
      if (!confirm('You must be logged in and have a saved profile to apply. Go to login?')) {
        return;
      }
      window.location.href = '/auth/login';
      return;
    }

    // check profile exists
    const profile = localStorage.getItem('jobportal_profile');
    if (!profile) {
      if (confirm('You need to complete your profile before applying. Go to profile?')) {
        window.location.href = '/profile';
      }
      return;
    }

    const appliedList: string[] = getApplied();
    if (appliedList.includes(job.id)) {
      alert('You have already applied for this job.');
      return;
    }
    appliedList.push(job.id);
    localStorage.setItem('jobportal_applied', JSON.stringify(appliedList));
    setApplied(appliedList);
    alert('Application saved. You can view it under Applied Jobs.');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Available Jobs</h1>
      <div className="grid gap-6">
        {getJobs().map((job) => (
          <div key={job.id} className="bg-[#f6f4f4] dark:bg-[#303139] p-6 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] hover:border-[#2596be] dark:hover:border-[#2596be] transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">{job.title}</h3>
                <p className="text-sm text-[#76767b] dark:text-[#d8c5c5] mb-3">{job.company} • {job.location}</p>
                <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed">{job.description}</p>
              </div>
              <div className="flex flex-col justify-center items-end gap-4 ml-6">
                <div className="text-lg font-medium text-[#2596be] dark:text-[#2596be]">{job.salary}</div>
                <div className="flex gap-3">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="px-4 py-2 border border-[#2596be] dark:border-[#2596be] text-[#2596be] dark:text-[#2596be] hover:bg-[#2596be] hover:text-[#f6f4f4] dark:hover:bg-[#2596be] dark:hover:text-[#f6f4f4] rounded-lg font-medium transition-all"
                  >
                    View More
                  </Link>
                  <button
                    onClick={() => apply(job)}
                    className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={applied.includes(job.id)}
                  >
                    {applied.includes(job.id) ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
