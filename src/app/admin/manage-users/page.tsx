'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
  full_name?: string;
  contact_number?: string;
  preferred_position?: string;
  applications_count: number;
  last_application?: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jobportal_token');
        if (!token) {
          setError('Please login as admin to view users');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Manage Users</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <p className="text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Manage Users</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#31313a]">Manage Users</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Registered Users ({users.length})</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Position</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Applications</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Registered</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {user.full_name || 'Profile not completed'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {user.preferred_position || 'Not specified'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {user.contact_number || 'Not provided'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.applications_count > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.applications_count} applications
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {user.last_application 
                        ? new Date(user.last_application).toLocaleDateString()
                        : 'No applications'
                      }
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