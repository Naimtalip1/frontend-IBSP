'use client';

import React from 'react';
import { PersonalInfo } from '@/types/application';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  const handleSameAddressChange = (checked: boolean) => {
    if (checked) {
      onChange({
        ...data,
        sameAsCurrentAddress: true,
        permanentAddress: data.currentAddress,
      });
    } else {
      onChange({
        ...data,
        sameAsCurrentAddress: false,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
      <p className="text-white">Please provide your basic personal details</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Full Name (as per IC / Passport) <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {/* Identification Number */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Identification Number (IC / Passport) <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={data.identificationNumber}
            onChange={(e) => handleChange('identificationNumber', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your IC / Passport number"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Date of Birth <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            required
            value={data.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Gender <span className="text-red-400">*</span>
          </label>
          <select
            required
            value={data.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nationality <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={data.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., Malaysian, Singaporean"
          />
        </div>

        {/* Race/Ethnicity */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Race / Ethnicity (Optional)
          </label>
          <input
            type="text"
            value={data.race}
            onChange={(e) => handleChange('race', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter race or ethnicity"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={data.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Contact Number (Mobile) <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={data.contactNumber}
            onChange={(e) => handleChange('contactNumber', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+60 12-345 6789"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Current Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Current Address <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={data.currentAddress}
            onChange={(e) => handleChange('currentAddress', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your current residential address"
          />
        </div>

        {/* Same as Current Address Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.sameAsCurrentAddress}
              onChange={(e) => handleSameAddressChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-white">Permanent address is same as current address</span>
          </label>
        </div>

        {/* Permanent Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-2">
            Permanent Address <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={data.permanentAddress}
            onChange={(e) => handleChange('permanentAddress', e.target.value)}
            disabled={data.sameAsCurrentAddress}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Enter your permanent address"
          />
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Expected Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.expectedSalary}
            onChange={(e) => handleChange('expectedSalary', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., RM 3,000 - RM 4,000"
          />
        </div>

        {/* Preferred Position */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Preferred Position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={data.preferredPosition}
            onChange={(e) => handleChange('preferredPosition', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
      </div>
    </div>
  );
}
