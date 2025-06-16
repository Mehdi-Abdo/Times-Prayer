import React from 'react';

export const PrayerCard = ({
  name,
  arabicName,
  time,
  icon: Icon,
  isNext,
  isActive,
}) => {
  return (
    <div
      className={`relative p-6 rounded-xl border transition-all duration-500 transform hover:scale-102 ${
        isActive
          ? 'bg-gradient-to-br from-islamic-500 to-islamic-600 dark:from-islamic-600 dark:to-islamic-700 text-white shadow-lg scale-105 animate-pulse-gentle'
          : isNext
          ? 'bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20 border-gold-200 dark:border-gold-700 shadow-md hover:shadow-lg'
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:border-islamic-200 dark:hover:border-islamic-600 hover:shadow-md'
      }`}
    >
      {isNext && (
        <div className="absolute -top-2 -right-2 bg-gold-500 dark:bg-gold-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md animate-bounce">
          Next
        </div>
      )}
      
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
            isActive
              ? 'bg-white/20 animate-pulse-gentle'
              : isNext
              ? 'bg-gold-500 dark:bg-gold-600 text-white'
              : 'bg-islamic-100 dark:bg-islamic-800 text-islamic-600 dark:text-islamic-400'
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
        
        <div className="flex-1">
          <h3
            className={`text-lg font-bold transition-colors duration-300 ${
              isActive ? 'text-white' : isNext ? 'text-gold-700 dark:text-gold-300' : 'text-gray-800 dark:text-gray-200'
            }`}
          >
            {name}
          </h3>
          <p
            className={`text-sm font-arabic transition-colors duration-300 ${
              isActive ? 'text-white/80' : isNext ? 'text-gold-600 dark:text-gold-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {arabicName}
          </p>
        </div>
        
        <div className="text-right">
          <p
            className={`text-2xl font-bold transition-colors duration-300 ${
              isActive ? 'text-white' : isNext ? 'text-gold-700 dark:text-gold-300' : 'text-gray-800 dark:text-gray-200'
            }`}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};