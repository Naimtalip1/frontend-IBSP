// Utility functions for the job application form

import { ApplicationFormData } from '@/types/application';

// Local storage key
const STORAGE_KEY = 'job_application_draft';

/**
 * Save form data to local storage
 */
export const saveFormDraft = (data: ApplicationFormData): void => {
  try {
    // Note: Files cannot be stored in localStorage
    // You would need to handle file uploads separately
    const dataToSave = {
      ...data,
      documents: {
        resume: data.documents.resume?.name || null,
        coverLetter: data.documents.coverLetter?.name || null,
        academicCertificates: data.documents.academicCertificates.map(f => f.name),
        idCopy: data.documents.idCopy?.name || null,
        portfolio: data.documents.portfolio?.name || null,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving form draft:', error);
  }
};

/**
 * Load form data from local storage
 */
export const loadFormDraft = (): Partial<ApplicationFormData> | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading form draft:', error);
  }
  return null;
};

/**
 * Clear saved form draft
 */
export const clearFormDraft = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing form draft:', error);
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (flexible format)
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '');
  // Check if it contains only digits and + (for international format)
  return /^[\d+]{8,15}$/.test(cleaned);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate file type
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => {
    if (type === 'image/*') {
      return file.type.startsWith('image/');
    }
    return file.type === type || file.name.toLowerCase().endsWith(type.replace('*', ''));
  });
};

/**
 * Validate file size (in MB)
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Create FormData for file upload
 */
export const createFormDataForSubmission = (data: ApplicationFormData): FormData => {
  const formData = new FormData();

  // Add personal info
  Object.entries(data.personalInfo).forEach(([key, value]) => {
    formData.append(`personalInfo[${key}]`, String(value));
  });

  // Add education
  Object.entries(data.education).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`education[${key}][${index}]`, String(item));
      });
    } else {
      formData.append(`education[${key}]`, String(value));
    }
  });

  // Add employment history
  data.employmentHistory.forEach((emp, index) => {
    Object.entries(emp).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`employmentHistory[${index}][${key}][${subKey}]`, String(subValue));
        });
      } else {
        formData.append(`employmentHistory[${index}][${key}]`, String(value));
      }
    });
  });

  // Add skills
  data.skills.technicalSkills.forEach((skill, index) => {
    formData.append(`skills[technicalSkills][${index}]`, skill);
  });
  data.skills.softSkills.forEach((skill, index) => {
    formData.append(`skills[softSkills][${index}]`, skill);
  });
  data.skills.languages.forEach((lang, index) => {
    formData.append(`skills[languages][${index}][language]`, lang.language);
    formData.append(`skills[languages][${index}][proficiency]`, lang.proficiency);
  });
  data.skills.additionalCompetencies.forEach((comp, index) => {
    formData.append(`skills[additionalCompetencies][${index}]`, comp);
  });

  // Add files
  if (data.documents.resume) {
    formData.append('resume', data.documents.resume);
  }
  if (data.documents.coverLetter) {
    formData.append('coverLetter', data.documents.coverLetter);
  }
  data.documents.academicCertificates.forEach((file, index) => {
    formData.append(`academicCertificates[${index}]`, file);
  });
  if (data.documents.idCopy) {
    formData.append('idCopy', data.documents.idCopy);
  }
  if (data.documents.portfolio) {
    formData.append('portfolio', data.documents.portfolio);
  }

  // Add references
  data.references.forEach((ref, index) => {
    Object.entries(ref).forEach(([key, value]) => {
      formData.append(`references[${index}][${key}]`, String(value));
    });
  });

  // Add declaration
  Object.entries(data.declaration).forEach(([key, value]) => {
    formData.append(`declaration[${key}]`, String(value));
  });

  return formData;
};

/**
 * Calculate form completion percentage
 */
export const calculateCompletionPercentage = (data: ApplicationFormData): number => {
  let completed = 0;
  const total = 7;

  // Personal Info
  if (
    data.personalInfo.fullName &&
    data.personalInfo.email &&
    data.personalInfo.contactNumber
  ) {
    completed++;
  }

  // Education
  if (data.education.highestQualification && data.education.fieldOfStudy) {
    completed++;
  }

  // Employment (optional but counts if filled)
  if (data.employmentHistory.length > 0) {
    completed++;
  }

  // Skills
  if (
    data.skills.technicalSkills.length > 0 &&
    data.skills.languages.length > 0
  ) {
    completed++;
  }

  // Documents
  if (data.documents.resume && data.documents.idCopy) {
    completed++;
  }

  // References
  if (data.references.length >= 2) {
    completed++;
  }

  // Declaration
  if (data.declaration.agreeToTerms && data.declaration.signature) {
    completed++;
  }

  return Math.round((completed / total) * 100);
};

/**
 * Validate NRIC/IC number (Malaysia format)
 */
export const isValidMalaysianIC = (ic: string): boolean => {
  // Remove dashes and spaces
  const cleaned = ic.replace(/[\s-]/g, '');
  // Malaysian IC format: YYMMDD-PB-###G (12 digits)
  return /^\d{12}$/.test(cleaned);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
