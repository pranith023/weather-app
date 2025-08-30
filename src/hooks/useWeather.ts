import { useState, useEffect, useCallback } from 'react';
import { WeatherData, UserPreferences } from '../types/weather';
import { WeatherService } from '../services/weatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    units: {
      temperature: 'celsius',
      windSpeed: 'kmh',
      pressure: 'hPa',
    },
    theme: 'auto',
    locations: [],
  });

  const weatherService = WeatherService.getInstance();

  const fetchWeather = useCallback(async (lat?: number, lon?: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentWeather(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [weatherService]);

  const searchLocation = useCallback(async (query: string) => {
    try {
      const results = await weatherService.searchLocations(query);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations');
      return [];
    }
  }, [weatherService]);

  const getCurrentLocation = useCallback(async () => {
    try {
      const location = await weatherService.getUserLocation();
      await fetchWeather(location.lat, location.lon);
    } catch (err) {
      setError('Unable to get your location. Please search for a city manually.');
    }
  }, [fetchWeather, weatherService]);

  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  }, []);

  useEffect(() => {
    // OLD CODE: fetchWeather();
    getCurrentLocation(); // MODIFIED LINE
  }, [getCurrentLocation]);

  return {
    weatherData,
    loading,
    error,
    preferences,
    fetchWeather,
    searchLocation,
    getCurrentLocation,
    updatePreferences,
  };
};