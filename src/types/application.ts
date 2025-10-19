// Type definitions for job application form

export interface PersonalInfo {
  fullName: string;
  identificationNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  nationality: string;
  race: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  contactNumber: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  sameAsCurrentAddress: boolean;
  expectedSalary: string;
  preferredPosition: string;
}

export interface Education {
  highestQualification: string;
  fieldOfStudy: string;
  institution: string;
  yearGraduated: string;
  cgpa: string;
  additionalCertifications: string[];
}

export interface Employment {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
  keyResponsibilities: string;
  reasonForLeaving: string;
  referencePerson: {
    name: string;
    position: string;
    contact: string;
  };
}

export interface Skills {
  technicalSkills: string[];
  softSkills: string[];
  languages: Array<{
    language: string;
    proficiency: 'basic' | 'intermediate' | 'advanced' | 'native';
  }>;
  additionalCompetencies: string[];
}

export interface Documents {
  resume: File | null;
  coverLetter: File | null;
  academicCertificates: File[];
  idCopy: File | null;
  portfolio: File | null;
}

export interface Reference {
  id: string;
  name: string;
  relationship: string;
  companyPosition: string;
  contactNumber: string;
  email: string;
}

export interface Declaration {
  agreeToTerms: boolean;
  signature: string;
  date: string;
}

export interface ApplicationFormData {
  personalInfo: PersonalInfo;
  education: Education;
  employmentHistory: Employment[];
  skills: Skills;
  documents: Documents;
  references: Reference[];
  declaration: Declaration;
}

export const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  identificationNumber: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  race: '',
  maritalStatus: '',
  contactNumber: '',
  email: '',
  currentAddress: '',
  permanentAddress: '',
  sameAsCurrentAddress: false,
  expectedSalary: '',
  preferredPosition: '',
};

export const initialEducation: Education = {
  highestQualification: '',
  fieldOfStudy: '',
  institution: '',
  yearGraduated: '',
  cgpa: '',
  additionalCertifications: [],
};

export const initialEmployment: Employment = {
  id: '',
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

export const initialSkills: Skills = {
  technicalSkills: [],
  softSkills: [],
  languages: [],
  additionalCompetencies: [],
};

export const initialDocuments: Documents = {
  resume: null,
  coverLetter: null,
  academicCertificates: [],
  idCopy: null,
  portfolio: null,
};

export const initialReference: Reference = {
  id: '',
  name: '',
  relationship: '',
  companyPosition: '',
  contactNumber: '',
  email: '',
};

export const initialDeclaration: Declaration = {
  agreeToTerms: false,
  signature: '',
  date: '',
};
