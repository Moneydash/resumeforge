import TemplateCard from "@/components/TemplateCard";
import type { Template } from "@/types/interface.template-card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const templates: Template[] = [
  // Galaxy Collection
  {
    id: "cigar",
    name: "Executive Classic",
    description: "A sophisticated template designed for senior professionals and executives seeking timeless elegance.",
    category: "Professional",
    theme: "galaxy",
    color: "from-slate-600 to-slate-800",
    icon: "⭐",
    available: true,
    features: [
      "Executive-level formatting",
      "Professional typography",
      "Clean organizational structure",
      "ATS-optimized layout"
    ]
  },
  {
    id: "andromeda",
    name: "Modern Professional",
    description: "Modern design that balances innovation with professionalism for today's dynamic and fastpace workplace.",
    category: "Modern",
    theme: "galaxy",
    color: "from-blue-600 to-blue-800",
    icon: "🌌",
    available: true,
    features: [
      "Modern visual hierarchy",
      "Strategic white space usage",
      "Professional accent elements",
      "Mobile-responsive design"
    ]
  },
  {
    id: "comet",
    name: "Executive Minimal",
    description: "Refined minimalism that lets your achievements speak loudly through sophisticated simplicity.",
    category: "Minimalist",
    theme: "galaxy",
    color: "from-gray-700 to-gray-900",
    icon: "☄️",
    available: true,
    features: [
      "Sophisticated simplicity",
      "Premium typography",
      "Strategic content focus",
      "Elegant spacing"
    ]
  },
  {
    id: "milky_way",
    name: "Creative Professional",
    description: "Innovative design that showcases creativity while maintaining the professionalism employers expect.",
    category: "Creative",
    theme: "galaxy",
    color: "from-purple-600 to-purple-800",
    icon: "🌠",
    available: true,
    features: [
      "Creative visual elements",
      "Professional presentation",
      "Unique layout design",
      "Industry-appropriate styling"
    ]
  },
  // Greek Gods Collection
  {
    id: "zeus",
    name: "Zeus Executive",
    description: "Command authority and respect with this powerful template designed for C-suite executives and industry leaders.",
    category: "Executive",
    theme: "greek",
    color: "from-amber-600 to-yellow-700",
    icon: "⚡",
    available: true,
    features: [
      "Commanding presence layout",
      "Leadership-focused sections",
      "Executive board presentation ready",
      "Premium gold accents"
    ]
  },
  {
    id: "athena",
    name: "Athena Strategic",
    description: "Showcase your strategic thinking and wisdom with this intellectually sophisticated design for consultants and analysts.",
    category: "Strategic",
    theme: "greek",
    color: "from-emerald-600 to-teal-700",
    icon: "🦉",
    available: true,
    features: [
      "Strategic framework layout",
      "Analytics-focused sections",
      "Consultant-grade formatting",
      "Wisdom-inspired typography"
    ]
  },
  {
    id: "apollo",
    name: "Apollo Creative",
    description: "Illuminate your creative talents with this inspiring template perfect for artists, designers, and creative professionals.",
    category: "Creative",
    theme: "greek",
    color: "from-orange-500 to-red-600",
    icon: "🎭",
    available: true,
    features: [
      "Creative portfolio integration",
      "Artistic visual hierarchy",
      "Performance-oriented sections",
      "Inspiration-driven design"
    ]
  },
  {
    id: "artemis",
    name: "Artemis Focused",
    description: "Sharp, precise, and goal-oriented design for professionals who value accuracy and targeted achievements.",
    category: "Focused",
    theme: "greek",
    color: "from-indigo-600 to-purple-700",
    icon: "🏹",
    available: true,
    features: [
      "Goal-oriented structure",
      "Achievement-focused layout",
      "Precision formatting",
      "Target-driven sections"
    ]
  },
  {
    id: "hermes",
    name: "Hermes Dynamic",
    description: "Fast-paced and versatile template for sales professionals, entrepreneurs, and dynamic business leaders.",
    category: "Dynamic",
    theme: "greek",
    color: "from-cyan-500 to-blue-600",
    icon: "🪶",
    available: false,
    features: [
      "Dynamic content flow",
      "Sales-oriented metrics",
      "Entrepreneurial sections",
      "Quick-scan formatting"
    ]
  },
  {
    id: "hera",
    name: "Hera Elegant",
    description: "Sophisticated elegance for senior management and executive positions requiring refined presentation.",
    category: "Elegant",
    theme: "greek",
    color: "from-rose-500 to-pink-600",
    icon: "👑",
    available: false,
    features: [
      "Elegant sophistication",
      "Management-focused layout",
      "Refined visual elements",
      "Executive presence design"
    ]
  }
];

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const [notification, setNotification] = useState<string>("");

  const themes = ["All", "Galaxy Collection", "Greek Gods Collection"];
  
  const filteredTemplates = templates.filter(template => {
    const matchesTheme = selectedTheme === "All" || 
      (selectedTheme === "Galaxy Collection" && template.theme === "galaxy") ||
      (selectedTheme === "Greek Gods Collection" && template.theme === "greek");
    return matchesTheme;
  });

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    // Check if template is available
    if (!template?.available) {
      showNotification(`"${template?.name}" template is not available yet. Coming soon!`);
      return;
    }
    
    showNotification(`Redirecting to "${template?.name}" template!`);
    setTimeout(() => {
      localStorage.setItem("template", templateId);
      navigate(`/preview?template=${templateId}`);
    }, 2000);
  };

  const handleCreateNew = () => {
    showNotification("Starting with our most popular template!");
    setTimeout(() => {
      localStorage.setItem("template", "zeus");
      navigate("/preview?template=zeus");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
          {notification}
        </div>
      )}

      {/* Enhanced Hero Section */}
      <header className="relative bg-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-amber-600/10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium mb-6">
              <span className="text-2xl mr-2">✨</span>
              Two Legendary Collections
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Professional Resume Templates
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Choose from our <strong>Galaxy Collection</strong> of modern classics or our new <strong>Greek Gods Collection</strong> 
              inspired by legendary power and wisdom. Each template is crafted to help you make an unforgettable impression.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Filters */}
        <div className="mb-16 space-y-8">
          {/* Theme Filter */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Your Collection</h3>
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg gap-2.5">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedTheme === theme
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collection Headers */}
        {selectedTheme === "All" && (
          <div className="space-y-16">
            {/* Galaxy Collection */}
            <section>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
                  <span className="text-2xl mr-3">🌌</span>
                  <span className="font-bold text-blue-900">Galaxy Collection</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Timeless Professional Designs</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our original collection of stellar templates, perfect for traditional industries and classic professional presentations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {templates.filter(t => t.theme === 'galaxy').map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isHovered={hoveredTemplate === template.id}
                    onHover={setHoveredTemplate}
                    onSelect={handleTemplateSelect}
                  />
                ))}
              </div>
            </section>

            {/* Greek Gods Collection */}
            <section>
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4">
                  <span className="text-2xl mr-3">⚡</span>
                  <span className="font-bold text-amber-900">Greek Gods Collection</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Legendary Power & Wisdom</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Channel the power of the gods with these commanding templates designed for modern leaders and ambitious professionals.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {templates.filter(t => t.theme === 'greek').map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isHovered={hoveredTemplate === template.id}
                    onHover={setHoveredTemplate}
                    onSelect={handleTemplateSelect}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Filtered Results */}
        {selectedTheme !== "All" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isHovered={hoveredTemplate === template.id}
                onHover={setHoveredTemplate}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>
        )}

        {/* Enhanced Bottom CTA */}
        <div className="mt-24 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 rounded-3xl p-1">
          <div className="relative bg-white rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-amber-50 rounded-3xl"></div>
            <div className="relative">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold text-lg mb-6">
                <span className="text-2xl mr-3">🚀</span>
                Ready to Launch Your Career?
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
                Join the Growing Community Turning Resumes Into Dream Careers
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Whether you choose the timeless elegance of our Galaxy Collection or the commanding presence of our Greek Gods Collection, 
                you'll have everything you need to stand out from the competition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button 
                  onClick={handleCreateNew}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
                >
                  <span className="text-xl mr-2">⚡</span>
                  Start with Zeus Executive
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                <div className="flex items-center text-gray-500">
                  <span className="text-sm">or browse all templates above</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">ATS Optimized</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">Easy Customization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-700">HR Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;