'use client';

import React, { useState } from 'react';
import { Education } from '@/types/application';

interface EducationFormProps {
  data: Education;
  onChange: (data: Education) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [newCertification, setNewCertification] = useState('');

  const handleChange = (field: keyof Education, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      onChange({
        ...data,
        additionalCertifications: [...data.additionalCertifications, newCertification.trim()],
      });
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    const updated = data.additionalCertifications.filter((_, i) => i !== index);
    onChange({ ...data, additionalCertifications: updated });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Education Background</h2>
      <p className="text-white">Please provide your academic qualifications</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Qualification */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Highest Qualification <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={data.highestQualification}
            onChange={(e) => handleChange('highestQualification', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select qualification</option>
            <option value="SPM">SPM / O-Level</option>
            <option value="STPM">STPM / A-Level</option>
            <option value="Diploma">Diploma</option>
            <option value="Degree">Bachelor's Degree</option>
            <option value="Master">Master's Degree</option>
            <option value="PhD">PhD / Doctorate</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Field of Study */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.fieldOfStudy}
            onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Computer Science, Business Administration"
          />
        </div>

        {/* Institution Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Institution / University Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.institution}
            onChange={(e) => handleChange('institution', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., University of Malaya, Universiti Teknologi Malaysia"
          />
        </div>

        {/* Year Graduated */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Year Graduated <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.yearGraduated}
            onChange={(e) => handleChange('yearGraduated', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 2020"
            pattern="\d{4}"
          />
        </div>

        {/* CGPA / Grade */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            CGPA / Grade <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.cgpa}
            onChange={(e) => handleChange('cgpa', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 3.75, First Class Honours"
          />
        </div>

        {/* Additional Certifications */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Additional Certifications
          </label>
          <p className="text-sm text-white mb-3">
            e.g., AWS, Google Cloud, Microsoft Azure, PMP, etc.
          </p>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter certification name"
            />
            <button
              type="button"
              onClick={addCertification}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add
            </button>
          </div>

          {data.additionalCertifications.length > 0 && (
            <div className="space-y-2">
              {data.additionalCertifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                >
                  <span className="text-white">{cert}</span>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
