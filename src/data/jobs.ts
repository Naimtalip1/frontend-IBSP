export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  salary?: string;
  salary_min?: string;
  salary_max?: string;
  salary_currency?: string;
  job_type?: string;
  experience_level?: string;
  requirements?: string;
  benefits?: string;
  description?: string;
}

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'Acme Corp',
    location: 'Kuala Lumpur',
    salary: 'RM 5,000 - RM 7,000',
    description: 'Work on React/Next.js applications.'
  },
  {
    id: 'job-2',
    title: 'Backend Developer',
    company: 'Beta Solutions',
    location: 'Penang',
    salary: 'RM 6,000 - RM 8,000',
    description: 'Work on Node.js services and APIs.'
  },
  {
    id: 'job-3',
    title: 'UI/UX Designer',
    company: 'Design Studio',
    location: 'Remote',
    salary: 'RM 4,000 - RM 6,000',
    description: 'Design interfaces and user experiences.'

    
  },

    {
    id: 'job-4',
    title: 'Driver Developer',
    company: 'Posix Labs',
    location: 'On-Site',
    salary: 'RM 4,000 - RM 6,000',
    description: 'Design interfaces and user experiences.'

    
  }
];

export const getJobs = (): Job[] => {
  if (typeof window === 'undefined') return INITIAL_JOBS;
  try {
    const stored = localStorage.getItem('jobs');
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem('jobs', JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
  } catch {
    return INITIAL_JOBS;
  }
};

export const saveJobs = (jobs: Job[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
};
