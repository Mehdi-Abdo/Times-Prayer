import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const MOROCCAN_CITIES = [
  { name: 'Casablanca', arabic: 'الدار البيضاء' },
  { name: 'Rabat', arabic: 'الرباط' },
  { name: 'Marrakech', arabic: 'مراكش' },
  { name: 'Fes', arabic: 'فاس' },
  { name: 'Tangier', arabic: 'طنجة' },
  { name: 'Agadir', arabic: 'أكادير' },
  { name: 'Oujda', arabic: 'وجدة' },
  { name: 'Kenitra', arabic: 'القنيطرة' },
  { name: 'Tetouan', arabic: 'تطوان' },
  { name: 'Meknes', arabic: 'مكناس' },
  { name: 'Mohammedia', arabic: 'المحمدية' },
  { name: 'Safi', arabic: 'آسفي' },
  { name: 'El Jadida', arabic: 'الجديدة' },
  { name: 'Khouribga', arabic: 'خريبكة' },
  { name: 'Nador', arabic: 'الناظور' },
];

export const CitySelector = ({ selectedCity, onCityChange }) => {
  return (
    <div className="relative group animate-fade-in">
      <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
        <MapPin className="h-5 w-5 text-islamic-600 dark:text-islamic-400 animate-pulse-gentle" />
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="bg-transparent outline-none cursor-pointer text-gray-800 dark:text-gray-200 font-medium pr-8 appearance-none w-full transition-colors duration-300"
        >
          {MOROCCAN_CITIES.map((city) => (
            <option key={city.name} value={city.name} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {city.name} - {city.arabic}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-islamic-600 dark:text-islamic-400 absolute right-3 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
      </div>
    </div>
  );
};