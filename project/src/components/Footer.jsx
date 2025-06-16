import React from 'react';
import { Heart, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-islamic-200 dark:border-gray-700 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-islamic-600 dark:text-islamic-400 animate-pulse-gentle" />
            <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">Prayer Times for Morocco</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
            Made with <Heart className="h-4 w-4 text-red-500 dark:text-red-400 inline animate-pulse" /> for the Moroccan Muslim community
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-arabic transition-colors duration-300">
            بارك الله فيكم - May Allah bless you
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Prayer times provided by Aladhan API • Times are calculated using Muslim World League method
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};