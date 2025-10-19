'use client';

import React, { useState, useEffect } from 'react';

interface Application {
  id: number;
  user_id: number;
  job_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  user_email: string;
  full_name: string;
  job_title: string;
  company: string;
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('jobportal_token');
      if (!token) {
        window.location.href = '/auth';
        return;
      }

      const response = await fetch('http://localhost:5000/api/admin/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to fetch applications');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('jobportal_token');
      const response = await fetch(`http://localhost:5000/api/admin/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId 
              ? { ...app, status: newStatus, updated_at: new Date().toISOString() }
              : app
          )
        );
      } else {
        alert('Failed to update application status');
      }
    } catch (err) {
      alert('Error updating application status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Job Applications ({applications.length})</h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-[#2596be]">{app.full_name || 'N/A'}</h3>
                    <p className="text-sm text-gray-600">{app.user_email}</p>
                    <p className="text-sm text-gray-500">Applied for: <strong>{app.job_title}</strong> at {app.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      Submitted: {new Date(app.created_at).toLocaleDateString()}
                    </span>
                    <div className="mt-2">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          app.status === 'approved' ? 'bg-green-100 text-green-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="interviewed">Interviewed</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={() => window.open(`/admin/applicant/${app.user_id}`, '_blank')}
                    className="px-4 py-2 bg-[#2596be] text-white rounded hover:bg-[#1e40af] transition-colors"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}