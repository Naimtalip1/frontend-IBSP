'use client';

import React, { useState, useEffect } from 'react';

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
  updated_at?: string;
}

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState<{
    title: string;
    company: string;
    description: string;
    location: string;
    salary_min: string;
    salary_max: string;
    salary_currency: string;
    job_type: string;
    experience_level: string;
    requirements: string;
    benefits: string;
  }>({
    title: '',
    company: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    salary_currency: 'MYR',
    job_type: 'Full-time',
    experience_level: 'Entry Level',
    requirements: '',
    benefits: ''
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
            description: editingJob.description,
            location: editingJob.location,
            salary_min: editingJob.salary_min ? parseFloat(editingJob.salary_min) : null,
            salary_max: editingJob.salary_max ? parseFloat(editingJob.salary_max) : null,
            salary_currency: editingJob.salary_currency,
            job_type: editingJob.job_type,
            experience_level: editingJob.experience_level,
            requirements: editingJob.requirements,
            benefits: editingJob.benefits
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
          body: JSON.stringify({
            title: newJob.title,
            company: newJob.company,
            description: newJob.description,
            location: newJob.location,
            salary_min: newJob.salary_min ? parseFloat(newJob.salary_min) : null,
            salary_max: newJob.salary_max ? parseFloat(newJob.salary_max) : null,
            salary_currency: newJob.salary_currency,
            job_type: newJob.job_type,
            experience_level: newJob.experience_level,
            requirements: newJob.requirements,
            benefits: newJob.benefits
          }),
        });

        if (response.ok) {
          const createdJob = await response.json();
          setJobs(prev => [...prev, createdJob]);
          setNewJob({ 
            title: '', 
            company: '', 
            description: '',
            location: '',
            salary_min: '',
            salary_max: '',
            salary_currency: 'MYR',
            job_type: 'Full-time',
            experience_level: 'Entry Level',
            requirements: '',
            benefits: ''
          });
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
            placeholder="Job Title *"
            value={editingJob?.title || newJob.title || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, title: e.target.value}) : setNewJob({...newJob, title: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            required
          />
          <input
            type="text"
            placeholder="Company Name *"
            value={editingJob?.company || newJob.company || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, company: e.target.value}) : setNewJob({...newJob, company: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={editingJob?.location || newJob.location || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, location: e.target.value}) : setNewJob({...newJob, location: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
          />
          <select
            value={editingJob?.job_type || newJob.job_type || 'Full-time'}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, job_type: e.target.value}) : setNewJob({...newJob, job_type: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            value={editingJob?.experience_level || newJob.experience_level || 'Entry Level'}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, experience_level: e.target.value}) : setNewJob({...newJob, experience_level: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Mid Level</option>
            <option value="Senior Level">Senior Level</option>
            <option value="Executive">Executive</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Salary Min"
              value={editingJob?.salary_min || newJob.salary_min || ''}
              onChange={(e) => editingJob ? setEditingJob({...editingJob, salary_min: e.target.value}) : setNewJob({...newJob, salary_min: e.target.value})}
              className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            />
            <input
              type="number"
              placeholder="Salary Max"
              value={editingJob?.salary_max || newJob.salary_max || ''}
              onChange={(e) => editingJob ? setEditingJob({...editingJob, salary_max: e.target.value}) : setNewJob({...newJob, salary_max: e.target.value})}
              className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            />
            <select
              value={editingJob?.salary_currency || newJob.salary_currency || 'MYR'}
              onChange={(e) => editingJob ? setEditingJob({...editingJob, salary_currency: e.target.value}) : setNewJob({...newJob, salary_currency: e.target.value})}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            >
              <option value="MYR">MYR</option>
              <option value="USD">USD</option>
              <option value="SGD">SGD</option>
              <option value="PHP">PHP</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Job Description *"
            value={editingJob?.description || newJob.description || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, description: e.target.value}) : setNewJob({...newJob, description: e.target.value})}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            rows={3}
            required
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Requirements (e.g., Skills, Education, Experience)"
            value={editingJob?.requirements || newJob.requirements || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, requirements: e.target.value}) : setNewJob({...newJob, requirements: e.target.value})}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            rows={3}
          />
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Benefits (e.g., Health Insurance, Flexible Schedule, etc.)"
            value={editingJob?.benefits || newJob.benefits || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, benefits: e.target.value}) : setNewJob({...newJob, benefits: e.target.value})}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2596be]"
            rows={3}
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
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#2596be]">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  {job.location && <p className="text-sm text-gray-600">📍 {job.location}</p>}
                  <p className="text-sm text-gray-500">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                  
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    {job.job_type && (
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium">{job.job_type}</p>
                      </div>
                    )}
                    {job.experience_level && (
                      <div className="bg-green-50 p-2 rounded">
                        <p className="text-gray-600">Level</p>
                        <p className="font-medium">{job.experience_level}</p>
                      </div>
                    )}
                    {job.salary_min && job.salary_max && (
                      <div className="bg-yellow-50 p-2 rounded">
                        <p className="text-gray-600">Salary</p>
                        <p className="font-medium">{job.salary_min} - {job.salary_max} {job.salary_currency || 'MYR'}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 text-sm">
                    <p className="text-gray-700 font-medium">Description:</p>
                    <p className="text-gray-600">{job.description}</p>
                  </div>

                  {job.requirements && (
                    <div className="mt-3 text-sm">
                      <p className="text-gray-700 font-medium">Requirements:</p>
                      <p className="text-gray-600">{job.requirements}</p>
                    </div>
                  )}

                  {job.benefits && (
                    <div className="mt-3 text-sm">
                      <p className="text-gray-700 font-medium">Benefits:</p>
                      <p className="text-gray-600">{job.benefits}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="px-3 py-1 bg-[#2596be] text-white rounded text-sm hover:bg-[#1e40af] transition-colors whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors whitespace-nowrap"
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