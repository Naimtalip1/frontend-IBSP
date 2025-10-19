'use client';

import React, { useState, useEffect } from 'react';

interface Application {
  id: string;
  user: { name: string; email: string };
  submittedAt: string;
  data: any;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    try {
      const apps = JSON.parse(localStorage.getItem('job_applications') || '[]');
      setApplications(apps);
    } catch (err) {
      console.error('Error loading applications', err);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Admin Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">All Applications ({applications.length})</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-[#2596be]">{app.user.name}</h3>
                    <p className="text-sm text-gray-600">{app.user.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Full Name:</strong> {app.data.personalInfo?.fullName}
                  </div>
                  <div>
                    <strong>Email:</strong> {app.data.personalInfo?.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {app.data.personalInfo?.contactNumber}
                  </div>
                  <div>
                    <strong>Position:</strong> {app.data.personalInfo?.preferredPosition}
                  </div>
                  <div>
                    <strong>Education:</strong> {app.data.education?.highestQualification} in {app.data.education?.fieldOfStudy}
                  </div>
                  <div>
                    <strong>Skills:</strong> {app.data.skills?.technicalSkills?.join(', ')}
                  </div>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-[#2596be] hover:underline">View Full Details</summary>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(app.data, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}