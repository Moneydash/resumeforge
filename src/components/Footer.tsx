import { FileText } from "lucide-react";
import React from "react";
import '@/styles/footer.css';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="footer bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 text-gray-700 dark:text-gray-200">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ResumeForge</span>
            </div>
            <div className="text-white text-sm">
              © 2025 ResumeForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;