import React from 'react';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { current, location } = data;

  const metrics = [
    { label: 'Feels like', value: `${current.feelsLike}°`, icon: Thermometer },
    { label: 'Humidity', value: `${current.humidity}%`, icon: Droplets },
    { label: 'Wind', value: `${current.windSpeed} km/h`, icon: Wind },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 rounded-3xl p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">{location.name}</h2>
          <p className="text-blue-100 dark:text-blue-200">{location.region}, {location.country}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-light mb-2">{current.temp}°</div>
          <div className="text-blue-100 dark:text-blue-200">{current.condition}</div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <WeatherIcon condition={current.icon} size="large" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <IconComponent className="h-5 w-5 text-blue-100" />
                <div>
                  <div className="text-sm text-blue-100">{metric.label}</div>
                  <div className="font-semibold">{metric.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};