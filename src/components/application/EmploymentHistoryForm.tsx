'use client';

import React from 'react';
import { Employment } from '@/types/application';

interface EmploymentHistoryFormProps {
  data: Employment[];
  onChange: (data: Employment[]) => void;
}

export default function EmploymentHistoryForm({ data, onChange }: EmploymentHistoryFormProps) {
  const addEmployment = () => {
    const newEmployment: Employment = {
      id: Date.now().toString(),
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false,
      keyResponsibilities: '',
      reasonForLeaving: '',
      referencePerson: {
        name: '',
        position: '',
        contact: '',
      },
    };
    onChange([...data, newEmployment]);
  };

  const removeEmployment = (id: string) => {
    onChange(data.filter((emp) => emp.id !== id));
  };

  const updateEmployment = (id: string, field: string, value: any) => {
    onChange(
      data.map((emp) => {
        if (emp.id === id) {
          if (field.startsWith('referencePerson.')) {
            const refField = field.split('.')[1];
            return {
              ...emp,
              referencePerson: {
                ...emp.referencePerson,
                [refField]: value,
              },
            };
          }
          return { ...emp, [field]: value };
        }
        return emp;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
      <h2 className="text-2xl font-bold text-white">Employment History</h2>
      <p className="text-white">Please provide your previous work experience</p>
        </div>
        <button
          type="button"
          onClick={addEmployment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Add Employment
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-white mb-4">No employment history added yet</p>
          <button
            type="button"
            onClick={addEmployment}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Your First Employment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((employment, index) => (
            <div key={employment.id} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Employment #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeEmployment(employment.id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={employment.companyName}
                    onChange={(e) => updateEmployment(employment.id, 'companyName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Position */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Position / Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={employment.position}
                    onChange={(e) => updateEmployment(employment.id, 'position', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your position"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={employment.startDate}
                    onChange={(e) => updateEmployment(employment.id, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    End Date {!employment.isCurrentlyWorking && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="date"
                    required={!employment.isCurrentlyWorking}
                    value={employment.endDate}
                    onChange={(e) => updateEmployment(employment.id, 'endDate', e.target.value)}
                    disabled={employment.isCurrentlyWorking}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Currently Working Checkbox */}
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={employment.isCurrentlyWorking}
                      onChange={(e) => {
                        updateEmployment(employment.id, 'isCurrentlyWorking', e.target.checked);
                        if (e.target.checked) {
                          updateEmployment(employment.id, 'endDate', '');
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-white">I am currently working here</span>
                  </label>
                </div>

                {/* Key Responsibilities */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Key Responsibilities <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={employment.keyResponsibilities}
                    onChange={(e) => updateEmployment(employment.id, 'keyResponsibilities', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your main responsibilities and achievements"
                  />
                </div>

                {/* Reason for Leaving */}
                {!employment.isCurrentlyWorking && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Reason for Leaving <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={employment.reasonForLeaving}
                      onChange={(e) => updateEmployment(employment.id, 'reasonForLeaving', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief reason for leaving"
                    />
                  </div>
                )}

                {/* Reference Person Section */}
                <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-md font-semibold text-white mb-4">Reference Person</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name</label>
                      <input
                        type="text"
                        value={employment.referencePerson.name}
                        onChange={(e) => updateEmployment(employment.id, 'referencePerson.name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Reference name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Position</label>
                      <input
                        type="text"
                        value={employment.referencePerson.position}
                        onChange={(e) => updateEmployment(employment.id, 'referencePerson.position', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Their position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Contact</label>
                      <input
                        type="text"
                        value={employment.referencePerson.contact}
                        onChange={(e) => updateEmployment(employment.id, 'referencePerson.contact', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Phone or email"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
