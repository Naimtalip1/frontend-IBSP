'use client';

import React from 'react';
import { Documents } from '@/types/application';

interface DocumentsFormProps {
  data: Documents;
  onChange: (data: Documents) => void;
}

export default function DocumentsForm({ data, onChange }: DocumentsFormProps) {
  const handleFileChange = (field: keyof Documents, files: FileList | null) => {
    if (!files) return;

    if (field === 'academicCertificates') {
      const fileArray = Array.from(files);
      onChange({
        ...data,
        [field]: [...data.academicCertificates, ...fileArray],
      });
    } else {
      onChange({
        ...data,
        [field]: files[0],
      });
    }
  };

  const removeAcademicCertificate = (index: number) => {
    onChange({
      ...data,
      academicCertificates: data.academicCertificates.filter((_, i) => i !== index),
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Supporting Documents</h2>
        <p className="text-white">Please upload your documents (PDF or image files)</p>
      </div>

      {/* Resume / CV */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Resume / CV <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('resume', e.target.files)}
            className="hidden"
            required={!data.resume}
          />
          <label htmlFor="resume" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-white">
              {data.resume ? (
                <span className="text-blue-600 font-medium">
                  {data.resume.name} ({formatFileSize(data.resume.size)})
                </span>
              ) : (
                <>
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-white mt-1">PDF, DOC, or DOCX up to 10MB</p>
          </label>
        </div>
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Cover Letter
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="coverLetter"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('coverLetter', e.target.files)}
            className="hidden"
          />
          <label htmlFor="coverLetter" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-white">
              {data.coverLetter ? (
                <span className="text-blue-600 font-medium">
                  {data.coverLetter.name} ({formatFileSize(data.coverLetter.size)})
                </span>
              ) : (
                <>
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-white mt-1">PDF, DOC, or DOCX up to 10MB</p>
          </label>
        </div>
      </div>

      {/* Academic Certificates */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Academic Certificates <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="certificates"
            accept=".pdf,image/*"
            multiple
            onChange={(e) => handleFileChange('academicCertificates', e.target.files)}
            className="hidden"
          />
          <label htmlFor="certificates" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-white">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-white mt-1">PDF or images, multiple files allowed</p>
          </label>
        </div>
        {data.academicCertificates.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-white">Uploaded Certificates:</p>
            {data.academicCertificates.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <p className="text-xs text-white">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeAcademicCertificate(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* IC / Passport Copy */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          IC / Passport Copy <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="idCopy"
            accept=".pdf,image/*"
            onChange={(e) => handleFileChange('idCopy', e.target.files)}
            className="hidden"
            required={!data.idCopy}
          />
          <label htmlFor="idCopy" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-white">
              {data.idCopy ? (
                <span className="text-blue-600 font-medium">
                  {data.idCopy.name} ({formatFileSize(data.idCopy.size)})
                </span>
              ) : (
                <>
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-white mt-1">PDF or image up to 5MB</p>
          </label>
        </div>
      </div>

      {/* Portfolio (Optional) */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Portfolio (Optional)
        </label>
        <p className="text-sm text-white mb-3">For designers, developers, or creative professionals</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="portfolio"
            accept=".pdf,.zip"
            onChange={(e) => handleFileChange('portfolio', e.target.files)}
            className="hidden"
          />
          <label htmlFor="portfolio" className="cursor-pointer">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              {data.portfolio ? (
                <span className="text-blue-600 font-medium">
                  {data.portfolio.name} ({formatFileSize(data.portfolio.size)})
                </span>
              ) : (
                <>
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">PDF or ZIP up to 20MB</p>
          </label>
        </div>
      </div>
    </div>
  );
}
