'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getJobs } from '@/data/jobs';

export default function AppliedJobsPage() {
  const [applied, setApplied] = useState<string[]>([]);

  useEffect(() => {
    try { const a = JSON.parse(localStorage.getItem('jobportal_applied') || '[]'); setApplied(a); } catch { setApplied([]); }
  }, []);

  const appliedJobs = getJobs().filter(j => applied.includes(j.id));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Applied Jobs</h1>
      {appliedJobs.length === 0 ? (
        <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] text-center">
          <p className="text-[#76767b] dark:text-[#d8c5c5] text-lg">You haven't applied to any jobs yet.</p>
          <p className="text-[#a65c59] dark:text-[#c18f8e] mt-2">Browse available jobs and start applying!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appliedJobs.map(job => (
                        <div key={job.id} className="bg-[#f6f4f4] dark:bg-[#303139] p-6 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
              <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">{job.title}</h3>
              <p className="text-sm text-[#76767b] dark:text-[#d8c5c5] mb-3">{job.company} • {job.location}</p>
              <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed">{job.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-lg font-medium text-[#2596be] dark:text-[#2596be]">{job.salary}</div>
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 border border-[#2596be] dark:border-[#2596be] text-[#2596be] dark:text-[#2596be] hover:bg-[#2596be] hover:text-[#f6f4f4] dark:hover:bg-[#2596be] dark:hover:text-[#f6f4f4] rounded-lg font-medium transition-all"
                >
                  View More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
