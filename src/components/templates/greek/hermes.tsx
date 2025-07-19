import { parseMonthYear } from "@/utils/helper";
import React from "react";
import type { TemplateProps } from "@/types/interface.template-props";
import HermesCss from "@/styles/templates/greek/hermes.css?inline";

const HermesTemplate: React.FC<TemplateProps> = ({ data }) => {
  const headerSection = (
    <div className="resume-header">
      <div className="resume-header-content">
        <h1 className="resume-name">{data?.personal?.name}</h1>
        <p className="resume-title">{data?.personal?.headline}</p>
        <p className="resume-summary">{data?.summary}</p>

        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href={`mailto:${data?.personal?.email}`}>{data?.personal?.email}</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>{data?.personal?.contact_number}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{data?.personal?.location}</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-globe"></i>
            <a href={data?.personal?.website?.link} target="_blank">{data?.personal?.website?.name}</a>
          </div>
        </div>

        <div className="social-links">
          {data?.socials?.map((social, i) => (
            <a key={i} href={social?.link} target="_blank" className="social-link">
              <i className={`fab fa-${social.slug}`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const workExperienceSection = (
    <div className="resume-section">
      <h2 className="section-title">WORK EXPERIENCE</h2>
      {data?.experience?.map((exp, i) => (
        <div className="experience-item" key={i}>
          <div className="experience-header">
            <h3 className="experience-title">{exp?.title}</h3>
            <span className="experience-date">
              {parseMonthYear(exp?.startDate)} - {exp?.endDate ? parseMonthYear(exp?.endDate) : 'Present'}
            </span>
          </div>
          <p className="experience-company">{exp?.company}</p>
          <div className="experience-description">
            {exp?.description?.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const skillsSection = (
    <div className="resume-section">
      <h2 className="section-title">SKILLS & COMPETENCIES</h2>
      <div className="skills-grid">
        {data?.skills?.map((skillCategory) => (
          skillCategory?.keywords?.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))
        ))}
      </div>
    </div>
  );

  const certificatesSection = (
    <div className="resume-section">
      <h2 className="section-title">CERTIFICATES</h2>
      {data?.certifications?.map((cert, i) => (
        <div className="certificate-item" key={i}>
          <h3 className="certificate-name">{cert?.name}</h3>
          <p className="certificate-org">{cert?.issuingOrganization}</p>
          <span className="certificate-date">{parseMonthYear(cert?.date)}</span>
        </div>
      ))}
    </div>
  );

  const educationSection = (
    <div className="resume-section">
      <h2 className="section-title">EDUCATION</h2>
      {data?.education?.map((educ, i) => (
        <div className="education-item" key={i}>
          <h3 className="education-degree">{educ?.degree}</h3>
          <p className="education-school">{educ?.institution}</p>
          <span className="education-date">
            {parseMonthYear(educ?.startDate)} - {educ?.endDate ? parseMonthYear(educ?.endDate) : 'Present'}
          </span>
        </div>
      ))}
    </div>
  );

  const projectsSection = (
    <div className="resume-section">
      <h2 className="section-title">KEY PROJECTS</h2>
      {data?.projects?.map((proj, i) => (
        <div className="project-item" key={i}>
          <h3 className="project-title">{proj?.title}</h3>
          <p className="project-description">{proj?.description}</p>
          <div className="project-technologies">
            {proj?.technologies?.map((tech, j) => (
              <span key={j} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const awardsSection = (
    <div className="resume-section">
      <h2 className="section-title">AWARDS</h2>
      {data?.awards?.map((award, i) => (
        <div className="award-item" key={i}>
          <div className="award-header">
            <h3 className="award-title">{award?.title}</h3>
            <span className="award-date">{parseMonthYear(award?.date)}</span>
          </div>
          <p className="award-description">{award?.description}</p>
        </div>
      ))}
    </div>
  );

  const interestsSection = (
    <div className="resume-section">
      <h2 className="section-title">INTERESTS</h2>
      <div className="interests-grid">
        {data?.interests?.map((interest, i) => (
          <span key={i} className="interest-tag">{interest}</span>
        ))}
      </div>
    </div>
  );

  const languagesSection = (
    <div className="resume-section">
      <h2 className="section-title">LANGUAGES</h2>
      <div className="languages-list">
        {data?.languages?.map((lang, i) => (
          <div key={i} className="language-item">
            <span className="language-name">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const referencesSection = (
    <div className="resume-section">
      <h2 className="section-title">REFERENCES</h2>
      {data?.references?.map((reference, i) => (
        <div className="reference-item" key={i}>
          <h3 className="reference-name">{reference?.name}</h3>
          <p className="reference-title">{reference?.title} at {reference?.company}</p>
          <p className="reference-contact">
            {reference?.email || '-'} | {reference?.phone || '-'}
          </p>
        </div>
      ))}
    </div>
  );

  const leftColumn = (
    <div className="resume-left-column">
      {data?.experience && data?.experience?.length >= 1 && workExperienceSection}
      {data?.interests && data?.interests?.length >= 1 && interestsSection}
      {data?.experience?.length < 3 && (
        <>
          {data?.projects && data?.projects?.length >= 1 && projectsSection}
          {data?.references && data?.references?.length >= 1 && referencesSection}
        </>
      )}
    </div>
  );

  const rightColumn = (
    <div className="resume-right-column">
      {data?.skills && data?.skills?.length >= 1 && skillsSection}
      {data?.certifications && data?.certifications?.length >= 1 && certificatesSection}
      {data?.education && data?.education?.length >= 1 && educationSection}
      {data?.experience?.length > 2 && (
        data?.projects && data?.projects?.length >= 1 && projectsSection
      )}
      {data?.awards && data?.awards?.length >= 1 && awardsSection}
      {data?.languages && data?.languages?.length >= 1 && languagesSection}
      {data?.experience?.length > 2 && (
        data?.references && data?.references?.length >= 1 && referencesSection
      )}
    </div>
  );

  return (
    <>
      <style>
        {HermesCss}
      </style>
      <div className="hermes-resume">
        {headerSection}
        <div className="resume-content">
          {leftColumn}
          {rightColumn}
        </div>
      </div>
    </>
  );
};

export default HermesTemplate;