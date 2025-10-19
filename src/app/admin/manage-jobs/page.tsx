'use client';

import React, { useState, useEffect } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  user_id: number;
  created_at: string;
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState<{title: string; company: string; description: string}>({
    title: '',
    company: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        setError('Failed to fetch jobs');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('jobportal_token');
      if (!token) {
        alert('Please log in as admin');
        return;
      }

      if (editingJob) {
        // Update existing job
        const response = await fetch(`http://localhost:5000/api/jobs/${editingJob.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editingJob.title,
            company: editingJob.company,
            description: editingJob.description
          }),
        });

        if (response.ok) {
          const updatedJob = await response.json();
          setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
          setEditingJob(null);
          alert('Job updated successfully!');
        } else {
          alert('Failed to update job');
        }
      } else {
        // Create new job
        const response = await fetch('http://localhost:5000/api/jobs', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newJob),
        });

        if (response.ok) {
          const createdJob = await response.json();
          setJobs(prev => [...prev, createdJob]);
          setNewJob({ title: '', company: '', description: '' });
          alert('Job created successfully!');
        } else {
          alert('Failed to create job');
        }
      }
    } catch (err) {
      alert('Error saving job');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const token = localStorage.getItem('jobportal_token');
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setJobs(prev => prev.filter(job => job.id !== id));
        alert('Job deleted successfully!');
      } else {
        alert('Failed to delete job');
      }
    } catch (err) {
      alert('Error deleting job');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Manage Jobs</h1>

      {/* Add/Edit Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">
          {editingJob ? 'Edit Job' : 'Add New Job'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={editingJob?.title || newJob.title || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, title: e.target.value}) : setNewJob({...newJob, title: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={editingJob?.company || newJob.company || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, company: e.target.value}) : setNewJob({...newJob, company: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Job Description"
            value={editingJob?.description || newJob.description || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, description: e.target.value}) : setNewJob({...newJob, description: e.target.value})}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            rows={4}
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#2596be] text-white rounded hover:bg-[#1e40af]"
          >
            {editingJob ? 'Update' : 'Add'} Job
          </button>
          {editingJob && (
            <button
              onClick={() => setEditingJob(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Current Jobs ({jobs.length})</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-[#2596be]">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                  <p className="text-sm mt-2 text-gray-700">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="px-3 py-1 bg-[#2596be] text-white rounded text-sm hover:bg-[#1e40af] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <p className="text-gray-500 text-center py-8">No jobs posted yet. Create your first job posting above.</p>
          )}
        </div>
      </div>
    </div>
  );
}