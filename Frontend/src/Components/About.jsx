import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">About ViewVerse</h1>
          <p className="text-lg text-gray-300">A Modern Video Streaming Platform</p>
        </div>

        {/* Project Description */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Project Overview</h2>
          <p className="text-gray-300 mb-6">
            View Verse is a full-stack video streaming application built from the ground up
            as a solo project. It provides users with a seamless video watching experience,
            featuring intuitive navigation and a modern user interface.
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-blue-200 mb-2">Frontend</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• React.js for UI components</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Router for navigation</li>
                </ul>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-blue-200 mb-2">Backend</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Node.js/Express.js server</li>
                  <li>• MongoDB database</li>
                  <li>• RESTful API architecture</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Key Features</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Responsive video player with custom controls</li>
              <li>• User authentication and profile management</li>
              <li>• Video upload and management capabilities</li>
              <li>• Real-time comments and interactions</li>
              <li>• Advanced search and filtering options</li>
            </ul>
          </div>

          {/* Future Enhancements */}
          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Future Enhancements</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Implementing video recommendations using AI</li>
              <li>• Adding live streaming capabilities</li>
              <li>• Introducing playlist and watch later features</li>
              <li>• Enhanced video analytics dashboard</li>
            </ul>
          </div>
        </div>

        {/* Connect Section */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-blue-300 mb-6">Let's Connect</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href="https://www.linkedin.com/in/t-teja-ba7213282/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Linkedin className="w-6 h-6 p-6" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/teja.246/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
            >
              <Instagram className="w-6 h-6 p-6" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com/teja-246"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6 p-6" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;