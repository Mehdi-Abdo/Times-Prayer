import { useState, useEffect } from 'react';

export const usePrayerTimes = (city) => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Morocco&method=2`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }
        
        const data = await response.json();
        setPrayerTimes(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchPrayerTimes();
    }
  }, [city]);

  // Auto-refresh at midnight
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      if (city) {
        const fetchPrayerTimes = async () => {
          try {
            const response = await fetch(
              `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Morocco&method=2`
            );
            const data = await response.json();
            setPrayerTimes(data.data);
          } catch (err) {
            console.error('Failed to refresh prayer times:', err);
          }
        };
        fetchPrayerTimes();
      }
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [city, prayerTimes]);

  return { prayerTimes, loading, error };
};