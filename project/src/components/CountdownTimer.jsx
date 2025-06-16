import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export const CountdownTimer = ({
  nextPrayerName,
  nextPrayerTime,
  nextPrayerArabic,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const today = now.toDateString();
      const nextPrayer = new Date(`${today} ${nextPrayerTime}`);
      
      // If the prayer time has passed today, set it for tomorrow
      if (nextPrayer <= now) {
        nextPrayer.setDate(nextPrayer.getDate() + 1);
      }
      
      const difference = nextPrayer.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextPrayerTime]);

  const totalSeconds = timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progress = Math.max(0, Math.min(100, 100 - (totalSeconds / (24 * 3600)) * 100));

  return (
    <div className="bg-gradient-to-r from-islamic-500 to-islamic-600 dark:from-islamic-600 dark:to-islamic-700 rounded-xl p-6 text-white shadow-lg animate-fade-in transition-all duration-500 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 animate-pulse" />
          <span className="text-lg font-semibold">Next Prayer</span>
        </div>
        <Calendar className="h-5 w-5 opacity-80 animate-pulse-gentle" />
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-1 animate-fade-in">{nextPrayerName}</h3>
        <p className="text-islamic-200 dark:text-islamic-300 font-arabic text-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>{nextPrayerArabic}</p>
        <p className="text-3xl font-bold mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>{nextPrayerTime}</p>
      </div>
      
      <div className="flex justify-center space-x-6 mb-4">
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-3xl font-bold animate-pulse">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm text-islamic-200 dark:text-islamic-300">Hours</div>
        </div>
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-3xl font-bold animate-pulse">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm text-islamic-200 dark:text-islamic-300">Minutes</div>
        </div>
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="text-3xl font-bold animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-sm text-islamic-200 dark:text-islamic-300">Seconds</div>
        </div>
      </div>
      
      <div className="bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-1000 ease-out animate-pulse-gentle"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};