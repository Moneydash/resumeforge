import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import ResumeForm from '../components/ResumeForm';
import { useTheme } from '../contexts/ThemeContext';
import type { ResumeFormData } from '@/types/interface.resume-form-data';
import type { TemplateType } from '@/types/types.template-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formRequest } from '@/api/request';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Preview: React.FC = () => {
  const layoutPluginInstance = defaultLayoutPlugin();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get the selected template and validate it
  const templateParam = searchParams.get("template");
  const validTemplates: TemplateType[] = ['cigar', 'andromeda', 'comet', 'milky_way'];
  const template: TemplateType | undefined = templateParam && validTemplates.includes(templateParam as TemplateType)
    ? templateParam as TemplateType
    : undefined;
  
  // Properly typed initial state matching ResumeFormData interface
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeFormData>({
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
    experience: [],
    education: [],
    skills: {
      programmingLanguages: [],
      keywords: []
    },
    languages: [],
    awards: [],
    certifications: [],
    interests: [],
    projects: [],
    references: []
  });

  const handleFormSubmit = async (data: ResumeFormData) => {
    try {
      setResumeData(data);
      const requestData = await formRequest("POST", `/v1/api/pdf/${template}/generate`, data);
      // Convert the binary PDF data to a blob URL
      const blob = new Blob([requestData?.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      console.log('PDF URL created:', url);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Generate a proper PDF with selectable text and clickable links
  const handleExportPDF = async (data: ResumeFormData) => {
    try {
      setResumeData(data);
      const requestData = await formRequest("POST", `/v1/api/pdf/${template}/export`, data);
      // Convert the binary PDF data to a blob and trigger download
      const blob = new Blob([requestData?.data], { type: 'application/pdf' });
      const fileName = `${data.personal.name.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;
      saveAs(blob, fileName);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const redirectTemplates = () => {
    toast("Redirecting to Templates page...");
    setTimeout(() => {
      navigate("/templates");
    }, 4000);
  }

  return (
    <div className="min-h-screen flex flex-col dark:border-gray-700">
      {/* Main container with minimum height */}
      <div className={`flex-1 flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Form Sidebar - Always scrollable */}
        <div 
          className={`
            lg:w-2/5 xl:w-1/3 
            ${isDarkMode 
              ? 'bg-gray-800 lg:border-r border-gray-700' 
              : 'bg-white lg:border-r border-gray-200'
            }
            h-[50vh] lg:h-[calc(100vh-1px)]
            overflow-y-auto
            sticky top-0
          `}
        >
          <div className="sticky top-0 z-10 p-4 lg:p-6 bg-inherit border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <h1 className={`
                text-xl lg:text-2xl font-bold 
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                ResumeForge
              </h1>
              
              {/* Theme indicator */}
              <div className={`
                px-2 rounded text-xs font-medium
                ${isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          <div className="p-4 lg:p-6 pt-0">
            <ResumeForm onSubmit={handleFormSubmit} />
          </div>
        </div>

        {/* Preview Area - Only scrolls when needed */}
        <div className="lg:w-3/5 xl:w-2/3 h-[50vh] lg:h-[calc(100vh-1px)] flex flex-col overflow-hidden">
          {/* Fixed Preview Header */}
          <div className={`
            sticky top-0 z-10 p-4 lg:p-6 
            ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
            border-b border-gray-200 dark:border-gray-700
          `}>
            <div className="flex items-center justify-between">
              <h2 className={`
                text-lg lg:text-xl font-semibold 
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                Resume Preview
              </h2>
              
              {/* Export Button */}
              <Button
                variant="outline"
                onClick={redirectTemplates}
              >
                Return to Templates
              </Button>
              <button
                id="exportButton"
                onClick={() => handleExportPDF(resumeData)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                📃 Export to PDF
              </button>
            </div>
          </div>

          {/* Scrollable Preview Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-0">
            {/* Preview Container with Paper Effect */}
            <div 
              ref={resumeRef}
              className={`
                ${isDarkMode 
                  ? 'bg-gray-800 shadow-2xl' 
                  : 'bg-white shadow-lg'
                }
                rounded-lg p-6 lg:p-8
                print:shadow-none print:rounded-none print:p-0
                min-h-[800px]
              `}
              style={{
                // Inline styles to override any oklch colors for PDF generation
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                color: isDarkMode ? '#ffffff' : '#000000'
              }}
            >
              {/* <ResumePreview data={resumeData} template={template || 'classic'} /> */}
              {pdfUrl ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <div style={{ height: '800px' }}>
                    <Viewer 
                      fileUrl={pdfUrl} 
                      plugins={[layoutPluginInstance]} 
                    />
                  </div>
                </Worker>
              ) : (
                <div className="text-center py-8">
                  No PDF generated yet. Please submit the form.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;