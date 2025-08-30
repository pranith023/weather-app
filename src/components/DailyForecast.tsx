import React from 'react';
import { DailyForecast as DailyForecastType } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ forecast }) => {
  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        7-Day Forecast
      </h3>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-20 text-sm font-medium text-gray-900 dark:text-white">
                {getDayName(day.date)}
              </div>
              
              <WeatherIcon condition={day.condition} size="small" />
              
              <div className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                {day.condition}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {day.precipitation > 0 && (
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  {day.precipitation}%
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {day.tempHigh}°
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {day.tempLow}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};