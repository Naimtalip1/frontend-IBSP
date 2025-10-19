'use client';

import React, { useState } from 'react';
import { Skills } from '@/types/application';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newLanguageProficiency, setNewLanguageProficiency] = useState<'basic' | 'intermediate' | 'advanced' | 'native'>('intermediate');
  const [newCompetency, setNewCompetency] = useState('');

  const addTechSkill = () => {
    if (newTechSkill.trim()) {
      onChange({
        ...data,
        technicalSkills: [...data.technicalSkills, newTechSkill.trim()],
      });
      setNewTechSkill('');
    }
  };

  const removeTechSkill = (index: number) => {
    onChange({
      ...data,
      technicalSkills: data.technicalSkills.filter((_, i) => i !== index),
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        softSkills: [...data.softSkills, newSoftSkill.trim()],
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      softSkills: data.softSkills.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      onChange({
        ...data,
        languages: [
          ...data.languages,
          { language: newLanguage.trim(), proficiency: newLanguageProficiency },
        ],
      });
      setNewLanguage('');
      setNewLanguageProficiency('intermediate');
    }
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    });
  };

  const addCompetency = () => {
    if (newCompetency.trim()) {
      onChange({
        ...data,
        additionalCompetencies: [...data.additionalCompetencies, newCompetency.trim()],
      });
      setNewCompetency('');
    }
  };

  const removeCompetency = (index: number) => {
    onChange({
      ...data,
      additionalCompetencies: data.additionalCompetencies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Skills & Competencies</h2>
        <p className="text-white">Showcase your technical and soft skills</p>
      </div>

      {/* Technical Skills */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Technical Skills <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-white mb-3">
          e.g., Python, React, Laravel, SQL, Docker, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTechSkill}
            onChange={(e) => setNewTechSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter technical skill"
          />
          <button
            type="button"
            onClick={addTechSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        {data.technicalSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.technicalSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTechSkill(index)}
                  className="hover:text-blue-900 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white italic">No technical skills added yet</p>
        )}
      </div>

      {/* Soft Skills */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Soft Skills <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-white mb-3">
          e.g., Leadership, Communication, Problem-Solving, Teamwork, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter soft skill"
          />
          <button
            type="button"
            onClick={addSoftSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        {data.softSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSoftSkill(index)}
                  className="hover:text-green-900 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white italic">No soft skills added yet</p>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Languages Spoken <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-white mb-3">Add languages with proficiency level</p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter language (e.g., English, Bahasa Malaysia)"
          />
          <select
            value={newLanguageProficiency}
            onChange={(e) => setNewLanguageProficiency(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="native">Native</option>
          </select>
          <button
            type="button"
            onClick={addLanguage}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        {data.languages.length > 0 ? (
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-purple-50 px-4 py-2 rounded-lg"
              >
                <div>
                  <span className="font-medium text-white">{lang.language}</span>
                  <span className="ml-3 text-sm text-white">
                    ({lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white italic">No languages added yet</p>
        )}
      </div>

      {/* Additional Competencies */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Additional Competencies / Licenses
        </label>
        <p className="text-sm text-white mb-3">
          e.g., Driving License, Forklift Certificate, First Aid, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newCompetency}
            onChange={(e) => setNewCompetency(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetency())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter competency or license"
          />
          <button
            type="button"
            onClick={addCompetency}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
        {data.additionalCompetencies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.additionalCompetencies.map((comp, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
              >
                {comp}
                <button
                  type="button"
                  onClick={() => removeCompetency(index)}
                  className="hover:text-orange-900 focus:outline-none"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white italic">No additional competencies added</p>
        )}
      </div>
    </div>
  );
}
