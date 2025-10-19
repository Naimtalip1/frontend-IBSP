'use client';

import React, { useState, useEffect } from 'react';
import { getJobs, saveJobs, Job } from '@/data/jobs';

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState<Partial<Job>>({});

  useEffect(() => {
    setJobs(getJobs());
  }, []);

  const handleSave = () => {
    if (editingJob) {
      const updated = jobs.map(j => j.id === editingJob.id ? editingJob : j);
      setJobs(updated);
      saveJobs(updated);
      setEditingJob(null);
    } else {
      const job: Job = {
        id: `job-${Date.now()}`,
        title: newJob.title || '',
        company: newJob.company || '',
        location: newJob.location || '',
        salary: newJob.salary,
        description: newJob.description,
      };
      const updated = [...jobs, job];
      setJobs(updated);
      saveJobs(updated);
      setNewJob({});
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      const updated = jobs.filter(j => j.id !== id);
      setJobs(updated);
      saveJobs(updated);
    }
  };

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
            placeholder="Title"
            value={editingJob?.title || newJob.title || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, title: e.target.value}) : setNewJob({...newJob, title: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Company"
            value={editingJob?.company || newJob.company || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, company: e.target.value}) : setNewJob({...newJob, company: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={editingJob?.location || newJob.location || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, location: e.target.value}) : setNewJob({...newJob, location: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Salary"
            value={editingJob?.salary || newJob.salary || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, salary: e.target.value}) : setNewJob({...newJob, salary: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={editingJob?.description || newJob.description || ''}
            onChange={(e) => editingJob ? setEditingJob({...editingJob, description: e.target.value}) : setNewJob({...newJob, description: e.target.value})}
            className="border border-gray-300 px-4 py-2 rounded col-span-2"
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
                <div>
                  <h3 className="text-lg font-medium text-[#2596be]">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
                  <p className="text-sm text-gray-500">{job.salary}</p>
                  <p className="text-sm mt-2">{job.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="px-3 py-1 bg-[#2596be] text-white rounded text-sm hover:bg-[#1e40af]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}