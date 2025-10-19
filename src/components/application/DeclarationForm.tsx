'use client';

import React, { useEffect } from 'react';
import { Declaration } from '@/types/application';

interface DeclarationFormProps {
  data: Declaration;
  onChange: (data: Declaration) => void;
}

export default function DeclarationForm({ data, onChange }: DeclarationFormProps) {
  useEffect(() => {
    // Set current date when component mounts
    if (!data.date) {
      const today = new Date().toISOString().split('T')[0];
      onChange({ ...data, date: today });
    }
  }, []);

  const handleChange = (field: keyof Declaration, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Declaration</h2>
        <p className="text-white">Final confirmation and signature</p>
      </div>

      {/* Declaration Statement */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Declaration Statement</h3>
        <p className="text-black leading-relaxed">
          I hereby declare that the information provided in this application is true, accurate, and
          complete to the best of my knowledge. I understand that any false or misleading information
          may result in the rejection of my application or termination of employment if discovered
          after hiring.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Privacy Notice</h3>
        <p className="text-sm text-black leading-relaxed">
          The personal information provided in this application will be processed in accordance with
          applicable data protection laws. Your information will be used solely for the purpose of
          evaluating your application and will be kept confidential. We may contact your references
          and previous employers to verify the information provided.
        </p>
      </div>

      {/* Agreement Checkbox */}
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={data.agreeToTerms}
            onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <span className="block text-base font-medium text-white">
              I agree to the declaration statement and privacy notice <span className="text-red-500">*</span>
            </span>
            <span className="block text-sm text-white mt-1">
              By checking this box, you confirm that you have read and understood the above statements
            </span>
          </div>
        </label>
      </div>

      {/* Signature */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Signature (Full Name) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={data.signature}
          onChange={(e) => handleChange('signature', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-serif text-lg"
          placeholder="Type your full name as signature"
        />
        <p className="mt-2 text-sm text-white">
          Please type your full name above to serve as your digital signature
        </p>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          required
          value={data.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Confirmation Message */}
      {data.agreeToTerms && data.signature && data.date && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-green-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-green-900">Declaration Complete</h4>
              <p className="text-sm text-green-700 mt-1">
                Your declaration has been completed. You can now proceed to submit your application.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-yellow-600 mt-0.5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-yellow-900">Important</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Please review all sections carefully before submitting. Once submitted, you may not be
              able to edit your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
