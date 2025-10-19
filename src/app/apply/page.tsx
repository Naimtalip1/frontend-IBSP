'use client';

import React, { useState } from 'react';
import PersonalInfoForm from '@/components/application/PersonalInfoForm';
import EducationForm from '@/components/application/EducationForm';
import EmploymentHistoryForm from '@/components/application/EmploymentHistoryForm';
import SkillsForm from '@/components/application/SkillsForm';
import DocumentsForm from '@/components/application/DocumentsForm';
import ReferencesForm from '@/components/application/ReferencesForm';
import DeclarationForm from '@/components/application/DeclarationForm';
import {
  ApplicationFormData,
  initialPersonalInfo,
  initialEducation,
  initialSkills,
  initialDocuments,
  initialDeclaration,
} from '@/types/application';

const STEPS = [
  { id: 1, name: 'Personal Info', description: 'Basic details' },
  { id: 2, name: 'Education', description: 'Academic background' },
  { id: 3, name: 'Employment', description: 'Work history' },
  { id: 4, name: 'Skills', description: 'Competencies' },
  { id: 5, name: 'Documents', description: 'File uploads' },
  { id: 6, name: 'References', description: 'Contacts' },
  { id: 7, name: 'Declaration', description: 'Final confirmation' },
];

export default function ApplicationPage({ saveAsProfile }: { saveAsProfile?: boolean } = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationFormData>({
    personalInfo: initialPersonalInfo,
    education: initialEducation,
    employmentHistory: [],
    skills: initialSkills,
    documents: initialDocuments,
    references: [],
    declaration: initialDeclaration,
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (saveAsProfile) {
      // Save profile to localStorage
      try {
        // Files cannot be serialized — only save metadata and non-file fields
        const serializable = {
          personalInfo: formData.personalInfo,
          education: formData.education,
          employmentHistory: formData.employmentHistory,
          skills: formData.skills,
          references: formData.references,
          declaration: formData.declaration,
        };
        localStorage.setItem('jobportal_profile', JSON.stringify(serializable));
        alert('Profile saved. You can now apply for jobs.');
        // redirect back to profile summary
        window.location.href = '/profile';
      } catch (err) {
        console.error('Error saving profile', err);
        alert('Failed to save profile. See console for details.');
      }
      return;
    }

    // Default apply submission (for job application submissions)
    try {
      const user = JSON.parse(localStorage.getItem('jobportal_user') || '{}');
      const applications = JSON.parse(localStorage.getItem('job_applications') || '[]');
      const newApplication = {
        id: Date.now().toString(),
        user: { name: user.name, email: user.email },
        submittedAt: new Date().toISOString(),
        data: formData,
      };
      applications.push(newApplication);
      localStorage.setItem('job_applications', JSON.stringify(applications));
      alert('Application submitted successfully! We will contact you soon.');
    } catch (err) {
      console.error('Error saving application', err);
      alert('Failed to submit application. See console for details.');
    }
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.personalInfo.fullName &&
          formData.personalInfo.identificationNumber &&
          formData.personalInfo.dateOfBirth &&
          formData.personalInfo.gender &&
          formData.personalInfo.nationality &&
          formData.personalInfo.maritalStatus &&
          formData.personalInfo.contactNumber &&
          formData.personalInfo.email &&
          formData.personalInfo.currentAddress &&
          formData.personalInfo.permanentAddress &&
          formData.personalInfo.expectedSalary &&
          formData.personalInfo.preferredPosition
        );
      case 2:
        return !!(
          formData.education.highestQualification &&
          formData.education.fieldOfStudy &&
          formData.education.institution &&
          formData.education.yearGraduated &&
          formData.education.cgpa
        );
      case 3:
        return formData.employmentHistory.length >= 0; // Can be empty for fresh graduates
      case 4:
        return (
          formData.skills.technicalSkills.length > 0 &&
          formData.skills.softSkills.length > 0 &&
          formData.skills.languages.length > 0
        );
      case 5:
        return !!(
          formData.documents.resume &&
          formData.documents.academicCertificates.length > 0 &&
          formData.documents.idCopy
        );
      case 6:
        return formData.references.length >= 2;
      case 7:
        return !!(
          formData.declaration.agreeToTerms &&
          formData.declaration.signature &&
          formData.declaration.date
        );
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={(data) => setFormData({ ...formData, personalInfo: data })}
          />
        );
      case 2:
        return (
          <EducationForm
            data={formData.education}
            onChange={(data) => setFormData({ ...formData, education: data })}
          />
        );
      case 3:
        return (
          <EmploymentHistoryForm
            data={formData.employmentHistory}
            onChange={(data) => setFormData({ ...formData, employmentHistory: data })}
          />
        );
      case 4:
        return (
          <SkillsForm
            data={formData.skills}
            onChange={(data) => setFormData({ ...formData, skills: data })}
          />
        );
      case 5:
        return (
          <DocumentsForm
            data={formData.documents}
            onChange={(data) => setFormData({ ...formData, documents: data })}
          />
        );
      case 6:
        return (
          <ReferencesForm
            data={formData.references}
            onChange={(data) => setFormData({ ...formData, references: data })}
          />
        );
      case 7:
        return (
          <DeclarationForm
            data={formData.declaration}
            onChange={(data) => setFormData({ ...formData, declaration: data })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f4f4] dark:bg-[#303139] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-[#303139] rounded-lg shadow-xl border border-[#76767b] p-6 mb-8">
          <h1 className="text-3xl font-bold text-[#f6f4f4] mb-2">Job Application Form</h1>
          <p className="text-[#c18f8e]">
            Please complete all sections of the application form. Fields marked with{' '}
            <span className="text-[#891a14]">*</span> are required.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-[#303139] rounded-lg shadow-xl border border-[#76767b] p-6 mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep === step.id
                        ? 'bg-[#2596be] text-[#f6f4f4]'
                        : isStepComplete(step.id)
                        ? 'bg-[#89302e] text-[#f6f4f4]'
                        : currentStep > step.id
                        ? 'bg-[#76767b] text-[#d8c5c5]'
                        : 'bg-[#a65c59] text-[#c18f8e]'
                    }`}
                  >
                    {isStepComplete(step.id) && currentStep !== step.id ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-[#c18f8e] hidden sm:block">{step.name}</p>
                    <p className="text-xs text-[#d8c5c5] hidden md:block">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-colors ${
                      currentStep > step.id ? 'bg-[#89302e]' : 'bg-[#a65c59]'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#303139] rounded-lg shadow-xl border border-[#76767b] p-8 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center bg-[#303139] rounded-lg shadow-xl border border-[#76767b] p-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-[#76767b] text-[#d8c5c5] cursor-not-allowed'
                  : 'bg-[#a65c59] text-[#f6f4f4] hover:bg-[#89302e]'
              }`}
            >
              ← Previous
            </button>

            <div className="text-sm text-[#d8c5c5]">
              Step {currentStep} of {STEPS.length}
            </div>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-[#2596be] hover:bg-[#1e40af] text-[#f6f4f4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2596be] focus:ring-offset-2 focus:ring-offset-[#303139]"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepComplete(7)}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  isStepComplete(7)
                    ? 'bg-[#89302e] hover:bg-[#891a14] text-[#f6f4f4] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#89302e] focus:ring-offset-2 focus:ring-offset-[#303139]'
                    : 'bg-[#76767b] text-[#d8c5c5] cursor-not-allowed'
                }`}
              >
                Submit Application ✓
              </button>
            )}
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-[#d8c5c5]">
          <p>Need help? Contact us at support@jobportal.com</p>
        </div>
      </div>
    </div>
  );
}
