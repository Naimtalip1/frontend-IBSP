'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  location?: string;
  salary_min?: string;
  salary_max?: string;
  salary_currency?: string;
  job_type?: string;
  experience_level?: string;
  requirements?: string;
  benefits?: string;
  user_id: number;
  created_at: string;
}

function getUser() {
  try { return JSON.parse(localStorage.getItem('jobportal_user') || 'null'); } catch { return null; }
}

function getApplied() {
  try { return JSON.parse(localStorage.getItem('jobportal_applied') || '[]'); } catch { return []; }
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applied, setApplied] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
    setApplied(getApplied());
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const apply = (job: Job) => {
    if (!user) {
      if (!confirm('You must be logged in and have a saved profile to apply. Go to login?')) {
        return;
      }
      window.location.href = '/auth';
      return;
    }

    // Apply through backend API
    applyForJob(job.id);
  };

  const applyForJob = async (jobId: number) => {
    try {
      const token = localStorage.getItem('jobportal_token');
      if (!token) {
        alert('Please log in to apply for jobs');
        return;
      }

      const response = await fetch('http://localhost:5000/api/job-applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        // Update local applied list for UI
        const appliedList = [...applied, jobId.toString()];
        setApplied(appliedList);
        localStorage.setItem('jobportal_applied', JSON.stringify(appliedList));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit application');
      }
    } catch (err) {
      alert('Error submitting application');
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Available Jobs</h1>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-[#f6f4f4] dark:bg-[#303139] p-6 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] hover:border-[#2596be] dark:hover:border-[#2596be] transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">{job.title}</h3>
                <p className="text-sm text-[#76767b] dark:text-[#d8c5c5] mb-1">{job.company}</p>
                {job.location && <p className="text-sm text-[#76767b] dark:text-[#d8c5c5] mb-3">📍 {job.location}</p>}
                
                {/* Job info badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.job_type && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {job.job_type}
                    </span>
                  )}
                  {job.experience_level && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {job.experience_level}
                    </span>
                  )}
                  {job.salary_min && job.salary_max && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {job.salary_min} - {job.salary_max} {job.salary_currency || 'MYR'}
                    </span>
                  )}
                </div>

                <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed">{job.description}</p>
                <p className="text-xs text-gray-500 mt-2">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col justify-center items-end gap-4 ml-6">
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
                    disabled={applied.includes(job.id.toString())}
                  >
                    {applied.includes(job.id.toString()) ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
