import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertCircle, CheckCircle } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';

export const LocationDetector = ({ onLocationDetected, selectedCity }) => {
  const { location, loading, error, getCurrentLocation } = useGeolocation();
  const [hasDetected, setHasDetected] = useState(false);

  useEffect(() => {
    if (location && !hasDetected) {
      onLocationDetected(location.city);
      setHasDetected(true);
    }
  }, [location, onLocationDetected, hasDetected]);

  const handleDetectLocation = () => {
    setHasDetected(false);
    getCurrentLocation();
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-islamic-200 dark:border-gray-600 shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-islamic-100 dark:bg-islamic-800 rounded-lg transition-colors duration-300">
            <Navigation className="h-5 w-5 text-islamic-600 dark:text-islamic-400 animate-pulse-gentle" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">Auto-detect Location</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Find prayer times for your current location</p>
          </div>
        </div>
        
        <button
          onClick={handleDetectLocation}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-islamic-500 dark:bg-islamic-600 text-white rounded-lg hover:bg-islamic-600 dark:hover:bg-islamic-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="text-sm">Detecting...</span>
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Detect</span>
            </>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 transition-colors duration-300 animate-slide-up">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {location && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 transition-colors duration-300 animate-slide-up">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>
            {location.isInMorocco 
              ? `Location detected: ${location.city}` 
              : `You're outside Morocco. Showing times for ${location.city} (closest Moroccan city)`
            }
          </span>
        </div>
      )}
    </div>
  );
};