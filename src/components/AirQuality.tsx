import React from 'react';
import { Leaf, AlertCircle } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface AirQualityProps {
  airQuality: WeatherData['airQuality'];
}

export const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: 'Good', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/20' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/20' };
    return { level: 'Hazardous', color: 'text-red-800 dark:text-red-300', bg: 'bg-red-200 dark:bg-red-900/30' };
  };

  const aqiInfo = getAQILevel(airQuality.aqi);

  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm2_5, unit: 'μg/m³' },
    { name: 'PM10', value: airQuality.pm10, unit: 'μg/m³' },
    { name: 'CO', value: airQuality.co, unit: 'mg/m³' },
    { name: 'NO₂', value: airQuality.no2, unit: 'μg/m³' },
    { name: 'O₃', value: airQuality.o3, unit: 'μg/m³' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Air Quality
        </h3>
      </div>

      <div className={`${aqiInfo.bg} rounded-xl p-4 mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {airQuality.aqi}
            </div>
            <div className={`text-sm font-medium ${aqiInfo.color}`}>
              {aqiInfo.level}
            </div>
          </div>
          {airQuality.aqi > 100 && (
            <AlertCircle className={`h-6 w-6 ${aqiInfo.color}`} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {pollutants.map((pollutant, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {pollutant.name}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {pollutant.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {pollutant.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};