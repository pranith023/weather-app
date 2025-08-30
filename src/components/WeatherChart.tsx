import React from 'react';
import { TrendingUp } from 'lucide-react';
import { HourlyForecast } from '../types/weather';

interface WeatherChartProps {
  hourlyData: HourlyForecast[];
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
  const maxTemp = Math.max(...hourlyData.map(h => h.temp));
  const minTemp = Math.min(...hourlyData.map(h => h.temp));
  const tempRange = maxTemp - minTemp;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Temperature Trend
        </h3>
      </div>

      <div className="relative h-40">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={32 * i}
              x2="400"
              y2={32 * i}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.1"
              className="text-gray-400"
            />
          ))}

          {/* Temperature line */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={hourlyData.map((hour, index) => {
              const x = (index / (hourlyData.length - 1)) * 380 + 10;
              const y = 140 - ((hour.temp - minTemp) / tempRange) * 120;
              return `${x},${y}`;
            }).join(' ')}
          />

          {/* Area fill */}
          <polygon
            fill="url(#tempGradient)"
            points={`${hourlyData.map((hour, index) => {
              const x = (index / (hourlyData.length - 1)) * 380 + 10;
              const y = 140 - ((hour.temp - minTemp) / tempRange) * 120;
              return `${x},${y}`;
            }).join(' ')} 390,140 10,140`}
          />

          {/* Data points */}
          {hourlyData.map((hour, index) => {
            const x = (index / (hourlyData.length - 1)) * 380 + 10;
            const y = 140 - ((hour.temp - minTemp) / tempRange) * 120;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3B82F6"
                className="hover:r-6 transition-all duration-200"
              />
            );
          })}
        </svg>

        {/* Time labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
          {hourlyData.map((hour, index) => (
            <span key={index} className={index % 2 === 0 ? '' : 'opacity-60'}>
              {hour.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};