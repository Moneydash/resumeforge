export interface ResumeFormData {
  personal: {
    name: string;
    headline?: string;
    email: string;
    website: {
      name: string;
      link: string;
    };
    location?: string;
  };
  socials: Array<{
    name: string;
    link: string;
    slug: string;
  }>;
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: Array<{
    name: string,
    keywords: string[]
  }>;
  languages?: string[];
  awards: Array<{
    title: string;
    date: string;
    description?: string;
  }>;
  certifications: Array<{
    name: string;
    issuingOrganization: string;
    date: string;
  }>;
  interests?: string[];
  projects: Array<{
    title: string;
    description?: string;
    technologies: string[];
  }>;
  references: Array<{
    name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
  }>;
}