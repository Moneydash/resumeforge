import type { Template } from "@/types/interface.template-card";
import React from "react";

const TemplateCard: React.FC<{
  template: Template;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}> = ({ template, isHovered, onHover, onSelect }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
      onMouseEnter={() => onHover(template.id)}
      onMouseLeave={() => onHover(null)}
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
            <div className="relative text-white text-center">
              <div className="text-4xl mb-4">{template.icon}</div>
              <p className="text-lg font-semibold opacity-90">{template.name}</p>
              <p className="text-sm opacity-70 mt-1">{template.theme === 'greek' ? 'Greek Gods' : 'Galaxy'} Collection</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full shadow-sm">
            {template.category}
          </span>
        </div>

        {/* Theme Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 backdrop-blur-sm text-white text-xs font-medium rounded-full ${
            template.theme === 'greek' ? 'bg-amber-600/80' : 'bg-blue-600/80'
          }`}>
            {template.theme === 'greek' ? '⚡ Greek' : '🌌 Galaxy'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">{template.icon}</span>
          {template.name}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{template.description}</p>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          {template.features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center transform transition-all duration-200"
              style={{
                transitionDelay: isHovered ? `${index * 50}ms` : '0ms'
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
          onClick={() => onSelect(template.id)}
          className={`w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg group ${
            template.theme === 'greek' 
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
              : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white'
          }`}
        >
          Select Template
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;