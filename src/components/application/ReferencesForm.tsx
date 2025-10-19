'use client';

import React from 'react';
import { Reference } from '@/types/application';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: '',
      relationship: '',
      companyPosition: '',
      contactNumber: '',
      email: '',
    };
    onChange([...data, newReference]);
  };

  const removeReference = (id: string) => {
    onChange(data.filter((ref) => ref.id !== id));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    onChange(
      data.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">References</h2>
          <p className="text-white">Provide professional or personal references</p>
        </div>
        <button
          type="button"
          onClick={addReference}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Add Reference
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-white mb-4">No references added yet</p>
          <p className="text-sm text-white mb-4">Please add at least 2 references</p>
          <button
            type="button"
            onClick={addReference}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Your First Reference
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((reference, index) => (
            <div key={reference.id} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Reference #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeReference(reference.id)}
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
                {/* Referee Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reference.name}
                    onChange={(e) => updateReference(reference.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter referee's full name"
                  />
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reference.relationship}
                    onChange={(e) => updateReference(reference.id, 'relationship', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Former Manager, Professor, Colleague"
                  />
                </div>

                {/* Company / Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company / Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={reference.companyPosition}
                    onChange={(e) => updateReference(reference.id, 'companyPosition', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Manager at ABC Company"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={reference.contactNumber}
                    onChange={(e) => updateReference(reference.id, 'contactNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+60 12-345 6789"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={reference.email}
                    onChange={(e) => updateReference(reference.id, 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="referee@example.com"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.length > 0 && data.length < 2 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            💡 Tip: It's recommended to provide at least 2 references
          </p>
        </div>
      )}
    </div>
  );
}
