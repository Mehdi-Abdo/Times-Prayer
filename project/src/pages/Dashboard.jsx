import React, { useState, useEffect } from 'react';
import { Sunrise, Sun, CloudSun, Sunset, Moon } from 'lucide-react';
import { CitySelector } from '../components/CitySelector';
import { PrayerCard } from '../components/PrayerCard';
import { CountdownTimer } from '../components/CountdownTimer';
import { LocationDetector } from '../components/LocationDetector';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useAuth } from '../contexts/AuthContext';

const PRAYER_CONFIG = [
  { name: 'Fajr', arabic: 'الفجر', icon: Sunrise, key: 'Fajr' },
  { name: 'Dhuhr', arabic: 'الظهر', icon: Sun, key: 'Dhuhr' },
  { name: 'Asr', arabic: 'العصر', icon: CloudSun, key: 'Asr' },
  { name: 'Maghrib', arabic: 'المغرب', icon: Sunset, key: 'Maghrib' },
  { name: 'Isha', arabic: 'العشاء', icon: Moon, key: 'Isha' },
];

export const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCity, setSelectedCity] = useState('Casablanca');
  const { prayerTimes, loading, error } = usePrayerTimes(selectedCity);

  // Load user's preferred city from localStorage
  useEffect(() => {
    if (user) {
      const savedCity = localStorage.getItem(`preferredCity_${user.id}`);
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    }
  }, [user]);

  // Save user's preferred city
  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (user) {
      localStorage.setItem(`preferredCity_${user.id}`, city);
    }
  };

  const handleLocationDetected = (detectedCity) => {
    setSelectedCity(detectedCity);
    if (user) {
      localStorage.setItem(`preferredCity_${user.id}`, detectedCity);
    }
  };

  const getCurrentPrayerInfo = () => {
    if (!prayerTimes) return { current: null, next: null };

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < PRAYER_CONFIG.length; i++) {
      const prayer = PRAYER_CONFIG[i];
      const prayerTime = prayerTimes.timings[prayer.key];
      const [hours, minutes] = prayerTime.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (currentTime < prayerMinutes) {
        return {
          current: i > 0 ? PRAYER_CONFIG[i - 1] : null,
          next: prayer,
        };
      }
    }

    // If we're past all prayers for today, next is Fajr tomorrow
    return {
      current: PRAYER_CONFIG[PRAYER_CONFIG.length - 1],
      next: PRAYER_CONFIG[0],
    };
  };

  const { current, next } = getCurrentPrayerInfo();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-islamic-200 dark:border-islamic-600 border-t-islamic-600 dark:border-t-islamic-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Loading prayer times...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 transition-colors duration-300">
            <p className="text-red-600 dark:text-red-400 font-medium">Failed to load prayer times</p>
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      // Handle different date formats
      let date;
      if (typeof dateString === 'string') {
        // Try parsing as DD-MM-YYYY format first
        if (dateString.includes('-')) {
          const parts = dateString.split('-');
          if (parts.length === 3) {
            // Assume DD-MM-YYYY format
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          }
        } else {
          date = new Date(dateString);
        }
      } else {
        date = new Date(dateString);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const formatTime = (time) => {
    return time.substring(0, 5); // Remove seconds
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
          Prayer Times Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-arabic transition-colors duration-300">
          لوحة مواقيت الصلاة
        </p>
        {user && (
          <p className="text-lg text-islamic-600 dark:text-islamic-400 transition-colors duration-300 animate-pulse-gentle">
            Welcome back, {user.firstName}! ⭐
          </p>
        )}
        {prayerTimes && (
          <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300">
            {formatDate(prayerTimes.date.gregorian.date)}
          </p>
        )}
      </div>

      {/* Location Detector */}
      {user && (
        <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <LocationDetector
            onLocationDetected={handleLocationDetected}
            selectedCity={selectedCity}
          />
        </div>
      )}

      {/* City Selector */}
      <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CitySelector
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
      </div>

      {/* Countdown Timer */}
      {next && prayerTimes && (
        <div className="max-w-md mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CountdownTimer
            nextPrayerName={next.name}
            nextPrayerTime={formatTime(prayerTimes.timings[next.key])}
            nextPrayerArabic={next.arabic}
          />
        </div>
      )}

      {/* Prayer Times Grid */}
      {prayerTimes && (
        <div className="grid gap-4 md:gap-6">
          {PRAYER_CONFIG.map((prayer, index) => (
            <div 
              key={prayer.key} 
              className="animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <PrayerCard
                name={prayer.name}
                arabicName={prayer.arabic}
                time={formatTime(prayerTimes.timings[prayer.key])}
                icon={prayer.icon}
                isNext={next?.key === prayer.key}
                isActive={current?.key === prayer.key}
              />
            </div>
          ))}
        </div>
      )}

      {/* Additional Info */}
      {prayerTimes && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md animate-slide-up" style={{ animationDelay: '0.9s' }}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Today's Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Hijri Date:</span>
              <p className="font-medium font-arabic text-gray-800 dark:text-gray-200 transition-colors duration-300">
                {prayerTimes.date.hijri.day} {prayerTimes.date.hijri.month.ar} {prayerTimes.date.hijri.year}
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.1s' }}>
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Sunrise:</span>
              <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">{formatTime(prayerTimes.timings.Sunrise)}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Sunset:</span>
              <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">{formatTime(prayerTimes.timings.Sunset)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};