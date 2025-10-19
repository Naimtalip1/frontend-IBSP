'use client';

import React, { useState, useEffect } from 'react';

interface Application {
  id: string;
  user: { name: string; email: string };
  submittedAt: string;
  data: any;
}

interface UserStats {
  name: string;
  email: string;
  applicationsCount: number;
  lastApplication: string;
}

export default function ManageUsersPage() {
  const [userStats, setUserStats] = useState<UserStats[]>([]);

  useEffect(() => {
    try {
      const applications: Application[] = JSON.parse(localStorage.getItem('job_applications') || '[]');
      const statsMap = new Map<string, UserStats>();

      applications.forEach(app => {
        const key = app.user.email;
        if (statsMap.has(key)) {
          const existing = statsMap.get(key)!;
          existing.applicationsCount++;
          if (new Date(app.submittedAt) > new Date(existing.lastApplication)) {
            existing.lastApplication = app.submittedAt;
          }
        } else {
          statsMap.set(key, {
            name: app.user.name,
            email: app.user.email,
            applicationsCount: 1,
            lastApplication: app.submittedAt,
          });
        }
      });

      setUserStats(Array.from(statsMap.values()));
    } catch (err) {
      console.error('Error loading user stats', err);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Manage Users</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">User Statistics ({userStats.length})</h2>
        {userStats.length === 0 ? (
          <p className="text-gray-500">No users with applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Applications</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Application</th>
                </tr>
              </thead>
              <tbody>
                {userStats.map((user, index) => (
                  <tr key={user.email} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.applicationsCount}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {new Date(user.lastApplication).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}