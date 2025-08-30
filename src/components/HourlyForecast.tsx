import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  forecast: HourlyForecastType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Hourly Forecast
      </h3>
      
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {forecast.map((hour, index) => (
          <div 
            key={index}
            className="flex-shrink-0 text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 min-w-[100px]"
          >
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              {hour.time}
            </div>
            
            <div className="flex justify-center mb-2">
              <WeatherIcon condition={hour.icon} size="small" />
            </div>
            
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {hour.temp}°
            </div>
            
            <div className="text-xs text-blue-600 dark:text-blue-400">
              {hour.precipitation > 0 ? `${hour.precipitation}%` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};