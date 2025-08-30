import React, { useState } from 'react';
import { Header } from './components/Header';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { WeatherMap } from './components/WeatherMap';
import { WeatherChart } from './components/WeatherChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import Footer from './components/Footer';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { getWeatherBackground } from './utils/weatherUtils';

function App() {
  const {
    weatherData,
    loading,
    error,
    fetchWeather,
    searchLocation,
    getCurrentLocation
  } = useWeather();

  const { isDarkMode, toggleTheme } = useTheme();

  const [searchResults, setSearchResults] = useState<Array<{ name: string; lat: number; lon: number; }>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = async (query: string) => {
    if (query.length > 0) {
      const results = await searchLocation(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeather(lat, lon);
    setShowSearchResults(false);
  };

  const backgroundClass = weatherData
    ? getWeatherBackground(weatherData.current.condition, isDarkMode)
    : 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800';

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !weatherData) {
    return (
      <div className={backgroundClass}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl">
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">
              {error || 'Failed to load weather data'}
            </p>
            <button
              onClick={() => getCurrentLocation()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={backgroundClass}>
      <Header
        onSearch={handleSearch}
        onLocationRequest={getCurrentLocation}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />

      {/* Search Results Dropdown */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 mt-2">
            {searchResults.map((result, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(result.lat, result.lon)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {result.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <CurrentWeather data={weatherData} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HourlyForecast forecast={weatherData.forecast.hourly} />
            <WeatherChart hourlyData={weatherData.forecast.hourly} />
          </div>

          <DailyForecast forecast={weatherData.forecast.daily} />
          <WeatherMap location={weatherData.location} />
          {/* Pollen Forecast Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pollen Forecast
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tree Pollen</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Medium</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Grass Pollen</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Low</span>
                </div>
              </div>
              {/* <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Weed Pollen</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">High</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>

      {/* Click outside to close search results */}
      {showSearchResults && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSearchResults(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;