'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProfileData {
  personalInfo: {
    full_name?: string;
    contact_number?: string;
    current_address?: string;
    expected_salary?: string;
    preferred_position?: string;
    date_of_birth?: string;
    gender?: string;
    nationality?: string;
    race?: string;
    marital_status?: string;
  };
  education: any[];
  employment: any[];
  skills: any[];
  languages: any[];
  references: any[];
  documents: any[];
  declarations: any[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('jobportal_token');
        if (!token) {
          setError('Please login to view your profile');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile/complete', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-8">Candidate Profile</h1>
        <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b] text-center">
          <p className="text-[#76767b] dark:text-[#d8c5c5] text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-[#303139] dark:text-[#f6f4f4] mb-8">Candidate Profile</h1>
        <div className="bg-[#891a14] p-8 rounded-lg shadow-xl border border-[#a65c59] text-center">
          <p className="text-[#f6f4f4] text-lg mb-4">Error loading profile</p>
          <p className="text-[#d8c5c5]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#303139] dark:text-[#f6f4f4]">Candidate Profile</h1>
        <Link
          href="/profile/edit"
          className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
        >
          {profile?.personalInfo?.full_name ? 'Edit Profile' : 'Complete Profile'}
        </Link>
      </div>

      {profile?.personalInfo?.full_name ? (
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
            <h2 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Full name</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Contact number</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.contact_number || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Preferred position</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.preferred_position || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Expected salary</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.expected_salary || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Date of birth</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">
                  {profile.personalInfo?.date_of_birth ? new Date(profile.personalInfo.date_of_birth).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Gender</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.gender || 'Not specified'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#76767b] dark:text-[#d8c5c5] mb-2">Current address</label>
                <p className="text-[#303139] dark:text-[#f6f4f4] text-lg">{profile.personalInfo?.current_address || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          {profile.education && profile.education.length > 0 && (
            <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
              <h2 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-6">Education</h2>
              <div className="space-y-4">
                {profile.education.map((edu: any, index: number) => (
                  <div key={index} className="border-l-4 border-[#2596be] pl-4">
                    <h3 className="font-medium text-[#303139] dark:text-[#f6f4f4]">{edu.degree} in {edu.field_of_study}</h3>
                    <p className="text-[#76767b] dark:text-[#d8c5c5]">{edu.institution}</p>
                    <p className="text-sm text-[#76767b] dark:text-[#d8c5c5]">{edu.start_date} - {edu.end_date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employment History */}
          {profile.employment && profile.employment.length > 0 && (
            <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
              <h2 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-6">Employment History</h2>
              <div className="space-y-4">
                {profile.employment.map((emp: any, index: number) => (
                  <div key={index} className="border-l-4 border-[#2596be] pl-4">
                    <h3 className="font-medium text-[#303139] dark:text-[#f6f4f4]">{emp.position}</h3>
                    <p className="text-[#76767b] dark:text-[#d8c5c5]">{emp.company}</p>
                    <p className="text-sm text-[#76767b] dark:text-[#d8c5c5]">{emp.start_date} - {emp.end_date || 'Present'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-[#f6f4f4] dark:bg-[#303139] p-8 rounded-lg shadow-xl border border-[#76767b] dark:border-[#76767b]">
              <h2 className="text-xl font-semibold text-[#303139] dark:text-[#f6f4f4] mb-6">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: any, index: number) => (
                  <span key={index} className="px-3 py-1 bg-[#2596be] text-[#f6f4f4] rounded-full text-sm">
                    {skill.skill_name} ({skill.proficiency_level})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#891a14] p-8 rounded-lg shadow-xl border border-[#a65c59] text-center">
          <p className="text-[#f6f4f4] text-lg mb-4">You have not completed your profile yet.</p>
          <p className="text-[#d8c5c5]">Please fill it in to apply for jobs.</p>
        </div>
      )}
    </div>
  );
}
