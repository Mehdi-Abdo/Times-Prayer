import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { CitySelector } from '../components/CitySelector';
import { useMonthlyPrayerTimes } from '../hooks/useMonthlyPrayerTimes';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export const MonthlyView = () => {
  const [selectedCity, setSelectedCity] = useState('Casablanca');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const { monthlyData, loading, error } = useMonthlyPrayerTimes(
    selectedCity,
    currentMonth,
    currentYear
  );

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 1) {
        setCurrentMonth(12);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 12) {
        setCurrentMonth(1);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const formatTime = (time) => {
    return time.substring(0, 5); // Remove seconds
  };

  const isToday = (dayData) => {
    try {
      const today = new Date();
      const dayNumber = parseInt(dayData.date.gregorian.day);
      
      return (
        today.getDate() === dayNumber &&
        today.getMonth() + 1 === currentMonth &&
        today.getFullYear() === currentYear
      );
    } catch (error) {
      console.error('Error checking if today:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-islamic-200 dark:border-islamic-600 border-t-islamic-600 dark:border-t-islamic-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Loading monthly prayer times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 transition-colors duration-300">
            <p className="text-red-600 dark:text-red-400 font-medium">Failed to load monthly prayer times</p>
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
          Monthly Prayer Times
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-arabic transition-colors duration-300">
          المواقيت الشهرية للصلاة
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="w-full lg:w-auto">
          <CitySelector
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 sm:p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 hover:bg-islamic-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5 text-islamic-600 dark:text-islamic-400" />
          </button>

          <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
            <Calendar className="h-5 w-5 text-islamic-600 dark:text-islamic-400" />
            <span className="font-medium text-gray-800 dark:text-white text-sm sm:text-base transition-colors duration-300">
              {MONTHS[currentMonth - 1]} {currentYear}
            </span>
          </div>

          <button
            onClick={() => navigateMonth('next')}
            className="p-2 sm:p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 hover:bg-islamic-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            <ChevronRight className="h-5 w-5 text-islamic-600 dark:text-islamic-400" />
          </button>
        </div>
      </div>

      {/* Monthly Calendar */}
      {monthlyData && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-colors duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Table Header */}
          <div className="bg-gradient-to-r from-islamic-500 to-islamic-600 dark:from-islamic-600 dark:to-islamic-700 text-white px-3 sm:px-6 py-4 transition-colors duration-300">
            <div className="grid grid-cols-6 gap-2 sm:gap-4 font-medium text-xs sm:text-sm">
              <div className="text-center">Date</div>
              {PRAYER_NAMES.map((prayer) => (
                <div key={prayer} className="text-center">{prayer}</div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 sm:max-h-none overflow-y-auto">
            {monthlyData.map((dayData, index) => (
              <div
                key={`${dayData.date.gregorian.day}-${index}`}
                className={`grid grid-cols-6 gap-2 sm:gap-4 px-3 sm:px-6 py-3 hover:bg-islamic-50 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-in ${
                  isToday(dayData)
                    ? 'bg-gold-50 dark:bg-gold-900/20 border-l-4 border-gold-500 dark:border-gold-400'
                    : ''
                }`}
                style={{ animationDelay: `${0.3 + index * 0.02}s` }}
              >
                <div className="flex flex-col">
                  <span className={`font-semibold text-sm sm:text-base ${isToday(dayData) ? 'text-gold-700 dark:text-gold-400' : 'text-gray-800 dark:text-gray-200'} transition-colors duration-300`}>
                    {dayData.date.gregorian.day}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    {dayData.date.gregorian.weekday.en.substring(0, 3)}
                  </span>
                </div>
                {PRAYER_NAMES.map((prayer) => (
                  <div key={prayer} className="text-center">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      {formatTime(dayData.timings[prayer])}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};