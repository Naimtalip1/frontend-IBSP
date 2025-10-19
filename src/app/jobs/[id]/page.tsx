'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getJobs, Job } from '@/data/jobs';

function getUser() {
  try { return JSON.parse(localStorage.getItem('jobportal_user') || 'null'); } catch { return null; }
}

function getApplied() {
  try { return JSON.parse(localStorage.getItem('jobportal_applied') || '[]'); } catch { return []; }
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const foundJob = getJobs().find(j => j.id === jobId);
    setJob(foundJob || null);
    setUser(getUser());
    setApplied(getApplied());
  }, [jobId]);

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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-4">Job Not Found</h1>
          <p className="text-[#76767b] dark:text-[#d8c5c5] mb-6">The job you're looking for doesn't exist.</p>
          <Link
            href="/jobs"
            className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/jobs"
          className="inline-flex items-center text-[#2596be] dark:text-[#2596be] hover:text-[#1e40af] dark:hover:text-[#1e40af] font-medium transition-colors"
        >
          ← Back to Jobs
        </Link>
      </div>

      {/* Job Header */}
      <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] mb-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-2">{job.title}</h1>
            <p className="text-lg text-[#76767b] dark:text-[#d8c5c5] mb-4">{job.company} • {job.location}</p>
            <div className="text-2xl font-semibold text-[#2596be] dark:text-[#2596be]">{job.salary}</div>
          </div>
          <button
            onClick={() => apply(job)}
            className="px-8 py-4 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            disabled={applied.includes(job.id)}
          >
            {applied.includes(job.id) ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
        <h2 className="text-2xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-6">Job Details</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#303139] dark:text-[#f6f4f4] mb-3">Description</h3>
            <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed text-lg">{job.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#76767b] dark:border-[#76767b]">
            <div>
              <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Company</h4>
              <p className="text-[#303139] dark:text-[#c18f8e]">{job.company}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Location</h4>
              <p className="text-[#303139] dark:text-[#c18f8e]">{job.location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Salary</h4>
              <p className="text-[#303139] dark:text-[#c18f8e]">{job.salary}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Job ID</h4>
              <p className="text-[#303139] dark:text-[#c18f8e]">{job.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}