import React from 'react';
import { AlertTriangle, Info, AlertCircle, Zap } from 'lucide-react';
import { WeatherAlert } from '../types/weather';

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return {
          icon: Zap,
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          borderColor: 'border-red-300 dark:border-red-700',
          iconColor: 'text-red-600 dark:text-red-400',
          textColor: 'text-red-900 dark:text-red-100',
        };
      case 'severe':
        return {
          icon: AlertCircle,
          bgColor: 'bg-orange-100 dark:bg-orange-900/20',
          borderColor: 'border-orange-300 dark:border-orange-700',
          iconColor: 'text-orange-600 dark:text-orange-400',
          textColor: 'text-orange-900 dark:text-orange-100',
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          textColor: 'text-yellow-900 dark:text-yellow-100',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          borderColor: 'border-blue-300 dark:border-blue-700',
          iconColor: 'text-blue-600 dark:text-blue-400',
          textColor: 'text-blue-900 dark:text-blue-100',
        };
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Weather Alerts
      </h3>
      
      {alerts.map((alert) => {
        const config = getSeverityConfig(alert.severity);
        const IconComponent = config.icon;
        
        return (
          <div
            key={alert.id}
            className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start space-x-3">
              <IconComponent className={`h-5 w-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <h4 className={`font-semibold ${config.textColor} mb-1`}>
                  {alert.title}
                </h4>
                <p className={`text-sm ${config.textColor} opacity-90 mb-2`}>
                  {alert.description}
                </p>
                <div className={`text-xs ${config.textColor} opacity-75`}>
                  {new Date(alert.start).toLocaleDateString()} - {new Date(alert.end).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};