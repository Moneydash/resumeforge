import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  socials: {
    linkedIn?: string;
    github?: string;
    twitter?: string;
  };
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
  skills: {
    programmingLanguages: string[];
    keywords: string[];
  };
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

// Helper function to convert comma-separated string to array
const stringToArray = (value: any): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
};

const schema = yup.object({
  personal: yup.object({
    name: yup.string().required('Name is required'),
    headline: yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    website: yup.object({
      name: yup.string(),
      link: yup.string().url('Invalid URL'),
    }).required('Website is required'),
    location: yup.string(),
  }).required('Personal information is required'),
  socials: yup.object({
    linkedIn: yup.string().url('Invalid LinkedIn URL'),
    github: yup.string().url('Invalid GitHub URL'),
    twitter: yup.string().url('Invalid Twitter URL'),
  }),
  summary: yup.string(),
  experience: yup.array().of(yup.object({
    title: yup.string().required('Title is required'),
    company: yup.string().required('Company is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string(),
    description: yup.string(),
  })),
  education: yup.array().of(yup.object({
    degree: yup.string().required('Degree is required'),
    institution: yup.string().required('Institution is required'),
    startDate: yup.string().required('Start date is required'),
    endDate: yup.string(),
  })),
  skills: yup.object({
    programmingLanguages: yup.mixed().transform(stringToArray).test(
      'min-length',
      'At least one programming language is required',
      (value) => {
        if (!value) return false;
        return Array.isArray(value) && value.length > 0;
      }
    ),
    keywords: yup.mixed().transform(stringToArray),
  }),
  languages: yup.mixed().transform(stringToArray),
  awards: yup.array().of(yup.object({
    title: yup.string().required('Title is required'),
    date: yup.string().required('Date is required'),
    description: yup.string(),
  })),
  certifications: yup.array().of(yup.object({
    name: yup.string().required('Name is required'),
    issuingOrganization: yup.string().required('Organization is required'),
    date: yup.string().required('Date is required'),
  })),
  interests: yup.mixed().transform(stringToArray),
  projects: yup.array().of(yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    technologies: yup.mixed().transform(stringToArray),
  })),
  references: yup.array().of(yup.object({
    name: yup.string().required('Name is required'),
    title: yup.string().required('Title is required'),
    company: yup.string().required('Company is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9\-\+]+$/, 'Invalid phone number'),
  })),
}).required();

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
}

const STORAGE_KEY = 'resumeFormData';

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Reset the form with saved data
        reset(parsedData);
      } catch (error) {
        console.error('Error parsing saved resume data:', error);
      }
    }
  }, []);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ResumeFormData>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      personal: {
        name: '',
        headline: '',
        email: '',
        website: { name: '', link: '' },
        location: ''
      },
      socials: {
        linkedIn: '',
        github: '',
        twitter: ''
      },
      summary: '',
      skills: { programmingLanguages: [], keywords: [] },
      languages: [],
      awards: [],
      certifications: [],
      interests: [],
      experience: [],
      education: [],
      projects: [],
      references: []
    }
  });

  // Field arrays for dynamic sections
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects'
  });

  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: 'awards'
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications'
  });

  const { fields: referenceFields, append: appendReference, remove: removeReference } = useFieldArray({
    control,
    name: 'references'
  });

  const handleSubmitForm = (data: ResumeFormData) => {
    // Save form data to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
    // Process projects technologies from comma-separated strings to arrays
    const processedData = {
      ...data,
      projects: data.projects.map(project => ({
        ...project,
        technologies: typeof project.technologies === 'string' 
          ? (project.technologies as string).split(',').map(t => t.trim()).filter(t => t.length > 0)
          : project.technologies || []
      }))
    };
    onSubmit(processedData);
  };

  // Consistent styling classes
  const inputClasses = `
    mt-1 block w-full rounded-md border shadow-sm px-3 py-2
    border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1
    transition-colors duration-200
  `;

  const labelClasses = `
    block text-sm font-medium mb-1
    text-gray-700 dark:text-gray-300
  `;

  const sectionHeaderClasses = `
    text-xl font-semibold mb-4 pb-2 border-b
    text-gray-900 dark:text-white
    border-gray-200 dark:border-gray-700
  `;

  const buttonClasses = `
    inline-flex items-center px-3 py-2 border border-transparent text-sm 
    leading-4 font-medium rounded-md focus:outline-none focus:ring-2 
    focus:ring-offset-2 transition-colors duration-200
  `;

  const addButtonClasses = `
    ${buttonClasses}
    text-indigo-700 bg-indigo-100 hover:bg-indigo-200 
    focus:ring-indigo-500 dark:bg-indigo-900 dark:text-indigo-200 
    dark:hover:bg-indigo-800 dark:focus:ring-offset-gray-800
  `;

  const removeButtonClasses = `
    ${buttonClasses}
    text-red-700 bg-red-100 hover:bg-red-200 
    focus:ring-red-500 dark:bg-red-900 dark:text-red-200 
    dark:hover:bg-red-800 dark:focus:ring-offset-gray-800
  `;

  const cardClasses = `
    p-4 border rounded-lg space-y-4
    border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-800
  `;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      {/* Personal Details */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Personal Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="name" className={labelClasses}>Full Name *</label>
            <input
              type="text"
              id="name"
              {...register('personal.name')}
              className={inputClasses}
              placeholder="Enter your full name"
            />
            {errors.personal?.name && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.personal.name.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="headline" className={labelClasses}>Professional Headline</label>
            <input
              type="text"
              id="headline"
              {...register('personal.headline')}
              className={inputClasses}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          
          <div>
            <label htmlFor="email" className={labelClasses}>Email *</label>
            <input
              type="email"
              id="email"
              {...register('personal.email')}
              className={inputClasses}
              placeholder="your.email@example.com"
            />
            {errors.personal?.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.personal.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className={labelClasses}>Location</label>
            <input
              type="text"
              id="location"
              {...register('personal.location')}
              className={inputClasses}
              placeholder="City, Country"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="websiteName" className={labelClasses}>Website Name</label>
              <input
                type="text"
                id="websiteName"
                {...register('personal.website.name')}
                className={inputClasses}
                placeholder="Portfolio"
              />
            </div>
            <div>
              <label htmlFor="websiteLink" className={labelClasses}>Website URL</label>
              <input
                type="url"
                id="websiteLink"
                {...register('personal.website.link')}
                className={inputClasses}
                placeholder="https://yourwebsite.com"
              />
              {errors.personal?.website?.link && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.personal.website.link.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Social Links</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="linkedin" className={labelClasses}>LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              {...register('socials.linkedIn')}
              className={inputClasses}
              placeholder="https://linkedin.com/in/yourprofile"
            />
            {errors.socials?.linkedIn && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.linkedIn.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="github" className={labelClasses}>GitHub</label>
            <input
              type="url"
              id="github"
              {...register('socials.github')}
              className={inputClasses}
              placeholder="https://github.com/yourusername"
            />
            {errors.socials?.github && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.github.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="twitter" className={labelClasses}>Twitter</label>
            <input
              type="url"
              id="twitter"
              {...register('socials.twitter')}
              className={inputClasses}
              placeholder="https://twitter.com/yourusername"
            />
            {errors.socials?.twitter && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.socials.twitter.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Professional Summary</h2>
        <div>
          <label htmlFor="summary" className={labelClasses}>Summary</label>
          <textarea
            id="summary"
            {...register('summary')}
            rows={4}
            className={inputClasses}
            placeholder="Write a brief professional summary highlighting your key achievements and skills..."
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Work Experience</h2>
          <button
            type="button"
            onClick={() => appendExperience({ title: '', company: '', startDate: '', endDate: '', description: '' })}
            className={addButtonClasses}
          >
            ➕ Add Experience
          </button>
        </div>
        
        {experienceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Experience #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Job Title *</label>
                <input
                  {...register(`experience.${index}.title`)}
                  className={inputClasses}
                  placeholder="Software Engineer"
                />
                {errors.experience?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Company *</label>
                <input
                  {...register(`experience.${index}.company`)}
                  className={inputClasses}
                  placeholder="Company Name"
                />
                {errors.experience?.[index]?.company && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.company?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Start Date *</label>
                <input
                  type="month"
                  {...register(`experience.${index}.startDate`)}
                  className={inputClasses}
                />
                {errors.experience?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.experience[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>End Date</label>
                <input
                  type="month"
                  {...register(`experience.${index}.endDate`)}
                  className={inputClasses}
                  placeholder="Leave empty if current position"
                />
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                {...register(`experience.${index}.description`)}
                rows={3}
                className={inputClasses}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Education</h2>
          <button
            type="button"
            onClick={() => appendEducation({ degree: '', institution: '', startDate: '', endDate: '' })}
            className={addButtonClasses}
          >
            ➕ Add Education
          </button>
        </div>
        
        {educationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Education #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClasses}>Degree *</label>
                <input
                  {...register(`education.${index}.degree`)}
                  className={inputClasses}
                  placeholder="Bachelor of Science in Computer Science"
                />
                {errors.education?.[index]?.degree && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Institution *</label>
                <input
                  {...register(`education.${index}.institution`)}
                  className={inputClasses}
                  placeholder="University Name"
                />
                {errors.education?.[index]?.institution && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Start Date *</label>
                <input
                  type="month"
                  {...register(`education.${index}.startDate`)}
                  className={inputClasses}
                />
                {errors.education?.[index]?.startDate && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.education[index]?.startDate?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>End Date</label>
                <input
                  type="month"
                  {...register(`education.${index}.endDate`)}
                  className={inputClasses}
                  placeholder="Leave empty if ongoing"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Skills</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="programmingLanguages" className={labelClasses}>
              Programming Languages *
            </label>
            <input
              type="text"
              id="programmingLanguages"
              {...register('skills.programmingLanguages')}
              className={inputClasses}
              placeholder="JavaScript, Python, Java (separate with commas)"
            />
            {errors.skills?.programmingLanguages && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.skills.programmingLanguages.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="keywords" className={labelClasses}>Technical Keywords</label>
            <input
              type="text"
              id="keywords"
              {...register('skills.keywords')}
              className={inputClasses}
              placeholder="React, Node.js, Docker, AWS (separate with commas)"
            />
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Languages</h2>
        <div>
          <label htmlFor="languages" className={labelClasses}>Spoken Languages</label>
          <input
            type="text"
            id="languages"
            {...register('languages')}
            className={inputClasses}
            placeholder="English (Native), Spanish (Fluent) (separate with commas)"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <h2 className={sectionHeaderClasses}>Interests & Hobbies</h2>
        <div>
          <label htmlFor="interests" className={labelClasses}>Interests</label>
          <input
            type="text"
            id="interests"
            {...register('interests')}
            className={inputClasses}
            placeholder="Photography, Hiking, Open Source (separate with commas)"
          />
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Projects</h2>
          <button
            type="button"
            onClick={() => appendProject({ title: '', description: '', technologies: [] })}
            className={addButtonClasses}
          >
            ➕ Add Project
          </button>
        </div>
        
        {projectFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Project #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div>
              <label className={labelClasses}>Project Title *</label>
              <input
                {...register(`projects.${index}.title`)}
                className={inputClasses}
                placeholder="E-commerce Platform"
              />
              {errors.projects?.[index]?.title && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.projects[index]?.title?.message}
                </p>
              )}
            </div>
            
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                {...register(`projects.${index}.description`)}
                rows={3}
                className={inputClasses}
                placeholder="Describe the project, your role, and key achievements..."
              />
            </div>
            
            <div>
              <label className={labelClasses}>Technologies Used</label>
              <input
                {...register(`projects.${index}.technologies`)}
                className={inputClasses}
                placeholder="React, Node.js, MongoDB (separate with commas)"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Awards & Achievements</h2>
          <button
            type="button"
            onClick={() => appendAward({ title: '', date: '', description: '' })}
            className={addButtonClasses}
          >
            ➕ Add Award
          </button>
        </div>
        
        {awardFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Award #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeAward(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Award Title *</label>
                <input
                  {...register(`awards.${index}.title`)}
                  className={inputClasses}
                  placeholder="Employee of the Year"
                />
                {errors.awards?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.title?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Date *</label>
                <input
                  type="month"
                  {...register(`awards.${index}.date`)}
                  className={inputClasses}
                />
                {errors.awards?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.awards[index]?.date?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Description</label>
              <textarea
                {...register(`awards.${index}.description`)}
                rows={2}
                className={inputClasses}
                placeholder="Brief description of the award..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>Certifications</h2>
          <button
            type="button"
            onClick={() => appendCertification({ name: '', issuingOrganization: '', date: '' })}
            className={addButtonClasses}
          >
            ➕ Add Certification
          </button>
        </div>
        
        {certificationFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Certification #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClasses}>Certification Name *</label>
                <input
                  {...register(`certifications.${index}.name`)}
                  className={inputClasses}
                  placeholder="AWS Certified Solutions Architect"
                />
                {errors.certifications?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Issuing Organization *</label>
                <input
                  {...register(`certifications.${index}.issuingOrganization`)}
                  className={inputClasses}
                  placeholder="Amazon Web Services"
                />
                {errors.certifications?.[index]?.issuingOrganization && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.issuingOrganization?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Date Obtained *</label>
                <input
                  type="month"
                  {...register(`certifications.${index}.date`)}
                  className={inputClasses}
                />
                {errors.certifications?.[index]?.date && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.certifications[index]?.date?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* References */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className={sectionHeaderClasses}>References</h2>
          <button
            type="button"
            onClick={() => appendReference({ name: '', title: '', company: '', email: '', phone: '' })}
            className={addButtonClasses}
          >
            ➕ Add Reference
          </button>
        </div>
        
        {referenceFields.map((field, index) => (
          <div key={field.id} className={cardClasses}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Reference #{index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeReference(index)}
                className={removeButtonClasses}
              >
                🗑️ Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Full Name *</label>
                <input
                  {...register(`references.${index}.name`)}
                  className={inputClasses}
                  placeholder="John Doe"
                />
                {errors.references?.[index]?.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.name?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Job Title *</label>
                <input
                  {...register(`references.${index}.title`)}
                  className={inputClasses}
                  placeholder="Senior Manager"
                />
                {errors.references?.[index]?.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.title?.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Company *</label>
              <input
                {...register(`references.${index}.company`)}
                className={inputClasses}
                placeholder="Company Name"
              />
              {errors.references?.[index]?.company && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.references[index]?.company?.message}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Email *</label>
                <input
                  type="email"
                  {...register(`references.${index}.email`)}
                  className={inputClasses}
                  placeholder="john.doe@company.com"
                />
                {errors.references?.[index]?.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.email?.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className={labelClasses}>Phone *</label>
                <input
                  type="tel"
                  {...register(`references.${index}.phone`)}
                  className={inputClasses}
                  placeholder="+1-234-567-8900"
                />
                {errors.references?.[index]?.phone && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.references[index]?.phone?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          className={`
            w-full flex justify-center items-center gap-2 py-3 px-4 
            border border-transparent rounded-lg shadow-sm 
            text-sm font-medium text-white 
            bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            dark:focus:ring-offset-gray-800
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          💾 Save Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;