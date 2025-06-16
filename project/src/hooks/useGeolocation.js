import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (!response.ok) {
            throw new Error('Failed to get location details');
          }
          
          const data = await response.json();
          
          // Find the closest Moroccan city
          const moroccanCities = [
            'Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 
            'Agadir', 'Oujda', 'Kenitra', 'Tetouan', 'Meknes',
            'Mohammedia', 'Safi', 'El Jadida', 'Khouribga', 'Nador'
          ];
          
          let detectedCity = 'Casablanca'; // Default fallback
          
          // Check if the detected city is in Morocco
          if (data.countryName === 'Morocco' || data.countryCode === 'MA') {
            const cityName = data.city || data.locality || data.principalSubdivision;
            const matchedCity = moroccanCities.find(city => 
              cityName && cityName.toLowerCase().includes(city.toLowerCase())
            );
            if (matchedCity) {
              detectedCity = matchedCity;
            }
          }
          
          setLocation({
            latitude,
            longitude,
            city: detectedCity,
            country: data.countryName,
            countryCode: data.countryCode,
            isInMorocco: data.countryCode === 'MA'
          });
        } catch (err) {
          setError('Failed to determine your city');
          // Set default location
          setLocation({
            city: 'Casablanca',
            isInMorocco: false
          });
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
        // Set default location
        setLocation({
          city: 'Casablanca',
          isInMorocco: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  return { location, loading, error, getCurrentLocation };
};