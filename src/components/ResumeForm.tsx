import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ResumeFormData } from '@/types/interface.resume-form-data';
import schema from '@/schema/schema';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import SocialsFieldsComponent from './forms/Socials';
import ExperienceFieldsComponent from './forms/Experience';
import EducationFieldsComponent from './forms/Education';
import SkillsFieldsComponent from './forms/Skills';
import ProjectFieldsComponent from './forms/Projects';
import AwardFieldsComponent from './forms/Awards';
import CertificationFieldsComponent from './forms/Certifications';
import ReferencesFieldsComponent from './forms/References';
import PersonalFieldsComponent from './forms/Personal';
import {
  inputClasses,
  labelClasses,
  sectionDivClasses,
  sectionHeaderClasses,
  addButtonClasses,
  removeButtonClasses,
  cardClasses
} from '@/styles/form-classes';
import { SaveIcon } from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (data: ResumeFormData) => void;
  loading?: boolean;
  template?: string;
}

const STORAGE_KEY = 'resumeFormData';

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, template, loading = false, }) => {
  const [loadingStep, setLoadingStep] = useState(0);
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

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
  
    if (loading) {
      setLoadingStep(0);
      if (template === "andromeda") {
        timers.push(setTimeout(() => setLoadingStep(1), 2000)); // After 2s: "Checking fonts ..."
        timers.push(setTimeout(() => setLoadingStep(2), 2000 + 10000)); // After 10s: "Styling ..."
        timers.push(setTimeout(() => setLoadingStep(3), 2000 + 10000 + 35000)); // After 47s: "Generating your resume..."
        timers.push(setTimeout(() => setLoadingStep(4), 2000 + 10000 + 35000 + 10000)); // After 15s: "Almost there ..."
      } else if (template === "cigar") {
        timers.push(setTimeout(() => setLoadingStep(1), 2000)); // After 2s: "Checking fonts ..."
        timers.push(setTimeout(() => setLoadingStep(2), 2000 + 5000)); // After 7s: "Styling ..."
        timers.push(setTimeout(() => setLoadingStep(3), 2000 + 5000 + 8000)); // After 15s: "Generating your resume..."
      } else if (template === "milky_way") {
        timers.push(setTimeout(() => setLoadingStep(1), 2000)); // After 2s: "Checking fonts ..."
        timers.push(setTimeout(() => setLoadingStep(2), 2000 + 7000)); // After 9s: "Styling ..."
        timers.push(setTimeout(() => setLoadingStep(3), 2000 + 7000 + 3000)); // After 12s: "Generating your resume..."
      } else {
        timers.push(setTimeout(() => setLoadingStep(1), 800)); // After 2s: "Checking fonts ..."
        timers.push(setTimeout(() => setLoadingStep(2), 800 + 950)); // After 4s: "Styling ..."
        timers.push(setTimeout(() => setLoadingStep(3), 800 + 950 + 1000)); // After 4s: "Generating your resume..."
      }
    } else {
      setLoadingStep(0); // Reset when not loading
      timers.forEach(timer => clearTimeout(timer));
    }
  
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [loading]);

  const { register, handleSubmit, control, reset, formState: { errors }, setValue, watch } = useForm<ResumeFormData>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      personal: {
        name: '',
        headline: '',
        email: '',
        website: { name: '', link: '' },
        location: ''
      },
      summary: '',
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

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: 'socials'
  });

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
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

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-8">
      {/* Personal Details */}
      <PersonalFieldsComponent
        sectionHeaderClasses={sectionHeaderClasses}
        sectionDivClasses={sectionDivClasses}
        labelClasses={labelClasses}
        register={register}
        errors={errors}
        inputClasses={inputClasses}
      />

      {/* Professional Summary Field */}
      <div className="space-y-4">
        <h2 className={`${sectionHeaderClasses} ${sectionDivClasses}`}>Summary</h2>
        <div>
          <Label htmlFor="summary" className={labelClasses}>Summary</Label>
          <Textarea
            id="summary"
            {...register('summary')}
            rows={10}
            placeholder="Write a brief professional summary highlighting your key achievements and skills..."
          />
        </div>
      </div>

      {/* Social Links Fields */}
      <SocialsFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendSocial={appendSocial}
        addButtonClasses={addButtonClasses}
        socialFields={socialFields}
        setValue={setValue}
        control={control}
        register={register}
        removeSocial={removeSocial}
      />

      {/* Experience Fields */}
      <ExperienceFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendExperience={appendExperience}
        addButtonClasses={addButtonClasses}
        experienceFields={experienceFields}
        cardClasses={cardClasses}
        removeExperience={removeExperience}
        inputClasses={inputClasses}
        removeButtonClasses={removeButtonClasses}
        register={register}
        labelClasses={labelClasses}
        errors={errors}
        control={control}
      />

      {/* Education Fields */}
      <EducationFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendEducation={appendEducation}
        addButtonClasses={addButtonClasses}
        educationFields={educationFields}
        cardClasses={cardClasses}
        removeEducation={removeEducation}
        removeButtonClasses={removeButtonClasses}
        errors={errors}
        register={register}
        labelClasses={labelClasses}
        inputClasses={inputClasses}
        control={control}
      />

      {/* Skills */}
      <SkillsFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendSkill={appendSkill}
        addButtonClasses={addButtonClasses}
        cardClasses={cardClasses}
        skillsFields={skillsFields}
        removeSkill={removeSkill}
        removeButtonClasses={removeButtonClasses}
        errors={errors}
        register={register}
        labelClasses={labelClasses}
        inputClasses={inputClasses}
      />

      {/* Languages */}
      <div className="space-y-4">
        <h2 className={`${sectionHeaderClasses} ${sectionDivClasses}`}>Languages</h2>
        <div>
          <Label htmlFor="languages" className={labelClasses}>Spoken Languages</Label>
          <Input
            id="languages"
            {...register('languages')}
            className={inputClasses}
            placeholder="English (Native), Spanish (Fluent) (separate with commas)"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <h2 className={`${sectionHeaderClasses} ${sectionDivClasses}`}>Interests & Hobbies</h2>
        <div>
          <Label htmlFor="interests" className={labelClasses}>Interests</Label>
          <Input
            type="text"
            id="interests"
            {...register('interests')}
            className={inputClasses}
            placeholder="Photography, Hiking, Open Source (separate with commas)"
          />
        </div>
      </div>

      {/* Projects */}
      <ProjectFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendProject={appendProject}
        addButtonClasses={addButtonClasses}
        cardClasses={cardClasses}
        projectFields={projectFields}
        removeProject={removeProject}
        removeButtonClasses={removeButtonClasses}
        errors={errors}
        register={register}
        labelClasses={labelClasses}
        inputClasses={inputClasses}
      />

      {/* Awards Fields */}
      <AwardFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendAward={appendAward}
        addButtonClasses={addButtonClasses}
        awardFields={awardFields}
        cardClasses={cardClasses}
        removeAward={removeAward}
        removeButtonClasses={removeButtonClasses}
        inputClasses={inputClasses}
        register={register}
        labelClasses={labelClasses}
        errors={errors}
        control={control}
      />

      {/* Certifications */}
      <CertificationFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendCertification={appendCertification}
        addButtonClasses={addButtonClasses}
        certificationFields={certificationFields}
        cardClasses={cardClasses}
        removeCertification={removeCertification}
        removeButtonClasses={removeButtonClasses}
        errors={errors}
        register={register}
        labelClasses={labelClasses}
        inputClasses={inputClasses}
        watch={watch}
        setValue={setValue}
      />

      {/* References */}
      <ReferencesFieldsComponent
        sectionDivClasses={sectionDivClasses}
        sectionHeaderClasses={sectionHeaderClasses}
        appendReference={appendReference}
        addButtonClasses={addButtonClasses}
        cardClasses={cardClasses}
        referenceFields={referenceFields}
        removeReference={removeReference}
        removeButtonClasses={removeButtonClasses}
        errors={errors}
        register={register}
        labelClasses={labelClasses}
        inputClasses={inputClasses}
      />

      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={loading}
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
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {loadingStep === 0 && "Saving your information..."}
              {loadingStep === 1 && "Loading fonts for a polished look..."}
              {loadingStep === 2 && "Applying elegant styles..."}
              {loadingStep === 3 && "Creating your resume..."}
              {loadingStep === 4 && "Wrapping things up..."}
            </>
          ) : (
            <><SaveIcon /> Save & Generate Resume</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResumeForm;