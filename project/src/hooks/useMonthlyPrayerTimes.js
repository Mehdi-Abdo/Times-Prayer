import { useState, useEffect } from 'react';

export const useMonthlyPrayerTimes = (city, month, year) => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonthlyTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=Morocco&method=2&month=${month}&year=${year}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch monthly prayer times');
        }
        
        const data = await response.json();
        setMonthlyData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city && month && year) {
      fetchMonthlyTimes();
    }
  }, [city, month, year]);

  return { monthlyData, loading, error };
};