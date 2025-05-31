'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <div className="container mx-auto flex justify-center space-x-6">
        <a
          href="https://github.com/kappaborg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          aria-label="GitHub"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/ismet-ozan-karab%C4%B1nar-85701a176/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer; 