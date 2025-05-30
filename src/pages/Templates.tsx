import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  preview?: string;
  features: string[];
  category: string;
  color: string;
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Executive Classic",
    description: "A sophisticated template designed for senior professionals and executives seeking timeless elegance.",
    category: "Professional",
    color: "from-slate-600 to-slate-800",
    features: [
      "Executive-level formatting",
      "Professional typography",
      "Clean organizational structure",
      "ATS-optimized layout"
    ]
  },
  {
    id: "modern",
    name: "Modern Professional",
    description: "Modern design that balances innovation with professionalism for today's dynamic workplace.",
    category: "Modern",
    color: "from-blue-600 to-blue-800",
    features: [
      "Modern visual hierarchy",
      "Strategic white space usage",
      "Professional accent elements",
      "Mobile-responsive design"
    ]
  },
  {
    id: "minimal",
    name: "Executive Minimal",
    description: "Refined minimalism that lets your achievements speak loudly through sophisticated simplicity.",
    category: "Minimalist",
    color: "from-gray-700 to-gray-900",
    features: [
      "Sophisticated simplicity",
      "Premium typography",
      "Strategic content focus",
      "Elegant spacing"
    ]
  },
  {
    id: "creative",
    name: "Creative Professional",
    description: "Innovative design that showcases creativity while maintaining the professionalism employers expect.",
    category: "Creative",
    color: "from-purple-600 to-purple-800",
    features: [
      "Creative visual elements",
      "Professional presentation",
      "Unique layout design",
      "Industry-appropriate styling"
    ]
  }
];

const Templates: React.FC = () => {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  const categories = ["All", ...Array.from(new Set(templates.map(t => t.category)))];
  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (templateId: string) => {
    toast(`Redirecting to "${templates.find(t => t.id === templateId)?.name}" template!`);
    setTimeout(() => {
      navigate(`/preview?template=${templateId}`);
    }, 3000);
  };

  const handleCreateNew = () => {
    // Handle create new action - you can replace this with your routing logic
    toast("Redirecting to Executive Classic template!");
    setTimeout(() => {
      navigate("/preview?templates=classic");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <header className="relative bg-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates, 
              crafted to help you make a lasting impression with hiring managers.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              {/* Template Preview */}
              <div className="relative h-64 overflow-hidden">
                {template.preview ? (
                  <img 
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className={`h-full bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative text-white">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-semibold opacity-90">{template.name}</p>
                    </div>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{template.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{template.description}</p>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {template.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center transform transition-all duration-200"
                      style={{
                        transitionDelay: hoveredTemplate === template.id ? `${index * 50}ms` : '0ms'
                      }}
                    >
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg group"
                >
                  Select Template
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who have landed their dream jobs with our templates.
          </p>
          <button 
            onClick={handleCreateNew}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Templates;