'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface UserProfile {
  personalInfo: any;
  education: any;
  employmentHistory: any[];
  skills: any;
  references: any[];
  declaration: any;
  documents: any[];
}

export default function ApplicantProfilePage() {
  const params = useParams();
  const userId = params.id;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchApplicantProfile();
    }
  }, [userId]);

  const fetchApplicantProfile = async () => {
    try {
      const token = localStorage.getItem('jobportal_token');
      if (!token) {
        window.location.href = '/auth';
        return;
      }

      const response = await fetch(`http://localhost:5000/api/admin/user/${userId}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
      } else if (response.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to fetch applicant profile');
      }
    } catch (err) {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading applicant profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">No profile data found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#31313a]">Applicant Profile</h1>
        <button
          onClick={() => window.close()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Full Name:</strong> {profile.personalInfo?.full_name || 'N/A'}</div>
          <div><strong>Email:</strong> {profile.personalInfo?.email || 'N/A'}</div>
          <div><strong>Phone:</strong> {profile.personalInfo?.contact_number || 'N/A'}</div>
          <div><strong>Date of Birth:</strong> {profile.personalInfo?.date_of_birth || 'N/A'}</div>
          <div><strong>Gender:</strong> {profile.personalInfo?.gender || 'N/A'}</div>
          <div><strong>Nationality:</strong> {profile.personalInfo?.nationality || 'N/A'}</div>
          <div><strong>Marital Status:</strong> {profile.personalInfo?.marital_status || 'N/A'}</div>
          <div><strong>Expected Salary:</strong> {profile.personalInfo?.expected_salary || 'N/A'}</div>
          <div className="md:col-span-2"><strong>Address:</strong> {profile.personalInfo?.current_address || 'N/A'}</div>
          <div className="md:col-span-2"><strong>Preferred Position:</strong> {profile.personalInfo?.preferred_position || 'N/A'}</div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Highest Qualification:</strong> {profile.education?.highest_qualification || 'N/A'}</div>
          <div><strong>Field of Study:</strong> {profile.education?.field_of_study || 'N/A'}</div>
          <div><strong>Institution:</strong> {profile.education?.institution || 'N/A'}</div>
          <div><strong>Year Graduated:</strong> {profile.education?.year_graduated || 'N/A'}</div>
          <div><strong>CGPA:</strong> {profile.education?.cgpa || 'N/A'}</div>
          <div className="md:col-span-2">
            <strong>Additional Certifications:</strong> 
            {profile.education?.additional_certifications?.join(', ') || 'N/A'}
          </div>
        </div>
      </div>

      {/* Employment History */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Employment History</h2>
        {profile.employmentHistory?.length > 0 ? (
          <div className="space-y-4">
            {profile.employmentHistory.map((emp: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <h3 className="font-semibold text-[#2596be]">{emp.position} at {emp.company_name}</h3>
                <p className="text-sm text-gray-600">
                  {emp.start_date} - {emp.is_currently_working ? 'Present' : emp.end_date}
                </p>
                <p className="mt-2">{emp.key_responsibilities}</p>
                {emp.reference_name && (
                  <p className="text-sm mt-2">
                    <strong>Reference:</strong> {emp.reference_name} ({emp.reference_position}) - {emp.reference_contact}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No employment history provided</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Skills & Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Technical Skills:</strong> 
            {profile.skills?.technical_skills?.join(', ') || 'N/A'}
          </div>
          <div>
            <strong>Soft Skills:</strong> 
            {profile.skills?.soft_skills?.join(', ') || 'N/A'}
          </div>
          <div className="md:col-span-2">
            <strong>Languages:</strong>
            {profile.skills?.languages?.map((lang: any) => `${lang.language} (${lang.proficiency})`).join(', ') || 'N/A'}
          </div>
          <div className="md:col-span-2">
            <strong>Additional Competencies:</strong> 
            {profile.skills?.additional_competencies?.join(', ') || 'N/A'}
          </div>
        </div>
      </div>

      {/* References */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">References</h2>
        {profile.references?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.references.map((ref: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <h3 className="font-semibold">{ref.name}</h3>
                <p className="text-sm text-gray-600">{ref.company_position}</p>
                <p className="text-sm">{ref.relationship}</p>
                <p className="text-sm">{ref.contact_number}</p>
                <p className="text-sm">{ref.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No references provided</p>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#303139]">Documents</h2>
        {profile.documents?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.documents.map((doc: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded p-4">
                <h3 className="font-semibold capitalize">{doc.document_type}</h3>
                <p className="text-sm text-gray-600">{doc.file_name}</p>
                <a 
                  href={`http://localhost:5000${doc.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2596be] hover:underline text-sm"
                >
                  View Document
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No documents uploaded</p>
        )}
      </div>
    </div>
  );
}