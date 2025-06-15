import React, { useCallback, useState } from 'react';
import { saveAs } from 'file-saver';
import ResumeForm from '../components/ResumeForm';
import { useTheme } from '../contexts/ThemeContext';
import type { ResumeFormData } from '@/types/interface.resume-form-data';
import type { TemplateType } from '@/types/types.template-types';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formRequest } from '@/api/request';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FileIcon } from 'lucide-react';

const Preview: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const layoutPluginInstance = defaultLayoutPlugin();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // get the selected template and validate it
  const templateParam = localStorage.getItem("template") || 'cigar';
  const validTemplates: TemplateType[] = ['cigar', 'andromeda', 'comet', 'milky_way', 'zeus', 'athena', 'apollo', 'artemis'];
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
    summary: '',
    socials: [],
    experience: [],
    education: [],
    skills: [],
    languages: [],
    awards: [],
    certifications: [],
    interests: [],
    projects: [],
    references: []
  });

  const handleFormSubmit = useCallback(
    async (data: ResumeFormData) => {
      setLoading(true);
      try {
        setResumeData(data);
        const requestData = await formRequest("POST", `/api/pdf/${template}/generate`, data);
        const blob = new Blob([requestData?.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    },
    [template, setResumeData, setPdfUrl, setLoading] // dependencies
  );

  // Generate a proper PDF with selectable text and clickable links
  const handleExportPDF = async (data: ResumeFormData) => {
    setLoadingExport(true);
    try {
      setResumeData(data);
      const requestData = await formRequest("POST", `/galaxy/api/pdf/${template}/generate`, data);
      // Convert the binary PDF data to a blob and trigger download
      const blob = new Blob([requestData?.data], { type: 'application/pdf' });
      const fileName = `${data.personal.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`;
      saveAs(blob, fileName);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoadingExport(false);
    }
  };

  const redirectTemplates = () => {
    toast("Redirecting to Templates page...");
    setTimeout(() => {
      navigate("/templates");
    }, 4000);
  }

  return (
      <div className="min-h-screen w-full dark:border-gray-700 font-cambria">
        {/* Main container with minimum height */}
        <div className={`w-full flex-1 flex flex-col lg:flex-row ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {/* Form Sidebar - Always scrollable */}
          <div 
            className={`
              lg:w-1/3 xl:w-2/5
              ${isDarkMode 
                ? 'bg-gray-800 lg:border-r border-gray-700' 
                : 'bg-white lg:border-r border-gray-200'
              }
              h-[50vh] lg:h-[calc(100vh)]
              overflow-auto
              sticky top-0
            `}
          >
            <div className="sticky top-0 z-10 p-4 lg:px-6 lg:py-2.5 bg-inherit border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <h1 className={`
                  text-xl lg:text-2xl font-bold
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  ResumeForge
                </h1>
                
                {/* Theme indicator */}
                <div className={`
                  px-2 rounded text-xs font-medium mt-1
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white-300' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  <ThemeToggle />
                </div>
              </div>
            </div>
            
            <div className="px-4 py-2 lg:px-6 lg:py-4 pt-0">
              <ResumeForm onSubmit={handleFormSubmit} loading={loading} template={template} />
            </div>
          </div>

          {/* Preview Area - Only scrolls when needed */}
          <div className="lg:w-3/5 xl:w-full h-[50vh] lg:h-full flex flex-col">
            {/* Fixed Preview Header */}
            <div className={`
              sticky top-0 z-10 p-4 lg:p-3 
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
                  color="primary"
                  className="dark:text-white"
                  onClick={redirectTemplates}
                >
                  Return to Templates
                </Button>
                <Button
                  id="exportButton"
                  className="dark:text-white"
                  onClick={() => handleExportPDF(resumeData)}
                >
                  {loadingExport
                    ? "Exporting ..." : (
                      <>
                        <FileIcon size={15} style={{ marginBottom: 1 }} />
                        Export to PDF
                      </>)
                  }
                </Button>
              </div>
            </div>

            {/* Scrollable Preview Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 pt-0">
              {/* Preview Container with Paper Effect */}
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
  );
};

export default Preview;