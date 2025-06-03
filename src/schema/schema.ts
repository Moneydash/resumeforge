import * as yup from 'yup';
import { stringToArray } from '@/utils/helper';

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

export default schema;