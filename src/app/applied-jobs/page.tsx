'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Application {
  id: number;
  job_id: number;
  status: string;
  applied_at: string;
  job_title: string;
  company: string;
  description: string;
  location?: string;
  salary?: string;
}

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('jobportal_token');
        if (!token) {
          setError('Please login to view your applications');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/job-applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Applied Jobs</h1>
        <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] text-center">
          <p className="text-[#76767b] dark:text-[#d8c5c5] text-lg">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Applied Jobs</h1>
        <div className="bg-[#891a14] p-8 rounded-lg shadow-xl border border-[#a65c59] text-center">
          <p className="text-[#f6f4f4] text-lg mb-4">Error loading applications</p>
          <p className="text-[#d8c5c5]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-[#303139] dark:text-[#f6f4f4]">Applied Jobs</h1>
      {applications.length === 0 ? (
        <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] text-center">
          <p className="text-[#76767b] dark:text-[#d8c5c5] text-lg">You haven't applied to any jobs yet.</p>
          <p className="text-[#a65c59] dark:text-[#c18f8e] mt-2">Browse available jobs and start applying!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map(application => (
            <div key={application.id} className="bg-[#f6f4f4] dark:bg-[#303139] p-6 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-2">{application.job_title}</h3>
                  <p className="text-sm text-[#76767b] dark:text-[#d8c5c5] mb-3">{application.company}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  application.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </div>
              </div>
              <p className="text-[#303139] dark:text-[#c18f8e] leading-relaxed mb-4">{application.description}</p>
              <div className="flex justify-between items-center text-sm text-[#76767b] dark:text-[#d8c5c5]">
                <span>Applied on: {new Date(application.applied_at).toLocaleDateString()}</span>
                <Link
                  href={`/jobs/${application.job_id}`}
                  className="px-4 py-2 border border-[#2596be] dark:border-[#2596be] text-[#2596be] dark:text-[#2596be] hover:bg-[#2596be] hover:text-[#f6f4f4] dark:hover:bg-[#2596be] dark:hover:text-[#f6f4f4] rounded-lg font-medium transition-all"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
