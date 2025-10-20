'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  job_type?: string;
  experience_level?: string;
  requirements?: string;
  benefits?: string;
  description?: string;
  created_at: string;
}

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
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs`);
        if (response.ok) {
          const jobs = await response.json();
          const foundJob = jobs.find((j: any) => j.id.toString() === jobId);
          setJob(foundJob || null);
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setJob(null);
      }
    };

    fetchJobDetail();
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
    const jobIdString = job.id.toString();
    if (appliedList.includes(jobIdString)) {
      alert('You have already applied for this job.');
      return;
    }
    appliedList.push(jobIdString);
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
            <p className="text-lg text-[#76767b] dark:text-[#d8c5c5] mb-4">
              {job.company}
              {job.location && ` • ${job.location}`}
            </p>
            
            {/* Job Info Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              {job.salary_min && job.salary_max && (
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">
                   {job.salary_min} - {job.salary_max} {job.salary_currency || 'MYR'}
                </div>
              )}
              {job.job_type && (
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                  {job.job_type}
                </div>
              )}
              {job.experience_level && (
                <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">
                  {job.experience_level}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => apply(job)}
            className="px-8 py-4 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            disabled={applied.includes(job.id.toString())}
          >
            {applied.includes(job.id.toString()) ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
        <h2 className="text-2xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-6">Job Details</h2>

        <div className="space-y-8">
          {/* Job Description */}
          {job.description && (
            <div>
              <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-4">Job Description</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed text-lg whitespace-pre-wrap">{job.description}</p>
              </div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-4">Requirements</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
              </div>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div>
              <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-4"> Benefits & Perks</h3>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed whitespace-pre-wrap">{job.benefits}</p>
              </div>
            </div>
          )}

          {/* Job Information Grid */}
          <div className="border-t border-[#76767b] dark:border-[#76767b] pt-6">
            <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-4"> Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Company</h4>
                <p className="text-[#303139] dark:text-[#c18f8e]">{job.company}</p>
              </div>
              {job.location && (
                <div>
                  <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Location</h4>
                  <p className="text-[#303139] dark:text-[#c18f8e]"> {job.location}</p>
                </div>
              )}
              {job.job_type && (
                <div>
                  <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Employment Type</h4>
                  <p className="text-[#303139] dark:text-[#c18f8e]">{job.job_type}</p>
                </div>
              )}
              {job.experience_level && (
                <div>
                  <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Experience Level</h4>
                  <p className="text-[#303139] dark:text-[#c18f8e]"> {job.experience_level}</p>
                </div>
              )}
              {job.salary_min && job.salary_max && (
                <div>
                  <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Salary Range</h4>
                  <p className="text-[#303139] dark:text-[#c18f8e]"> {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()} {job.salary_currency || 'MYR'}</p>
                </div>
              )}
              <div>
                <h4 className="font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">Posted Date</h4>
                <p className="text-[#303139] dark:text-[#c18f8e]"> {new Date(job.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}