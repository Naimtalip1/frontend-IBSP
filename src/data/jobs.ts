export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description?: string;
}

export const JOBS: Job[] = [
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
