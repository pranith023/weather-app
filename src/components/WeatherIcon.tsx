import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Cog as Fog, Wind } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  size = 'medium',
  className = ''
}) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return Sun;
      case 'partly-cloudy':
      case 'partly-sunny':
        return Cloud;
      case 'cloudy':
      case 'overcast':
        return Cloud;
      case 'rain':
      case 'light-rain':
        return CloudRain;
      case 'drizzle':
        return CloudDrizzle;
      case 'snow':
      case 'light-snow':
        return CloudSnow;
      case 'thunderstorm':
      case 'storm':
        return Zap;
      case 'fog':
      case 'mist':
        return Fog;
      case 'windy':
        return Wind;
      default:
        return Sun;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-6 w-6';
      case 'medium':
        return 'h-8 w-8';
      case 'large':
        return 'h-16 w-16';
      default:
        return 'h-8 w-8';
    }
  };

  const IconComponent = getIcon();

  return (
    <IconComponent
      className={`${getSizeClass()} ${className} animate-pulse`}
    />
  );
};