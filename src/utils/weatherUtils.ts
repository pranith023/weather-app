import { WeatherData } from '../types/weather';

export const getWeatherBackground = (condition: string, isDarkMode: boolean): string => {
  const baseClasses = 'min-h-screen transition-all duration-500';

  if (isDarkMode) {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return `${baseClasses} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900`;
      case 'partly-cloudy':
        return `${baseClasses} bg-gradient-to-br from-gray-800 via-blue-900 to-indigo-900`;
      case 'cloudy':
      case 'overcast':
        return `${baseClasses} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700`;
      case 'rain':
      case 'drizzle':
        return `${baseClasses} bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900`;
      case 'thunderstorm':
        return `${baseClasses} bg-gradient-to-br from-gray-900 via-purple-900 to-black`;
      case 'snow':
        return `${baseClasses} bg-gradient-to-br from-blue-900 via-slate-800 to-gray-800`;
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-900 to-gray-800`;
    }
  } else {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return `${baseClasses} bg-gradient-to-br from-yellow-200 via-orange-300 to-red-400`;
      case 'partly-cloudy':
        return `${baseClasses} bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400`;
      case 'cloudy':
      case 'overcast':
        return `${baseClasses} bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500`;
      case 'rain':
      case 'drizzle':
        return `${baseClasses} bg-gradient-to-br from-gray-400 via-blue-500 to-indigo-600`;
      case 'thunderstorm':
        return `${baseClasses} bg-gradient-to-br from-gray-600 via-purple-700 to-indigo-800`;
      case 'snow':
        return `${baseClasses} bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300`;
      default:
        return `${baseClasses} bg-gradient-to-br from-blue-50 to-indigo-100`;
    }
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  const [hour] = timeString.split(':');
  const hourNum = parseInt(hour, 10);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const displayHour = hourNum % 12 || 12;
  return `${displayHour} ${ampm}`;
};

export const getUVIndexLevel = (uvIndex: number): { level: string; color: string } => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-600 dark:text-green-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-600 dark:text-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-600 dark:text-red-400' };
  return { level: 'Extreme', color: 'text-purple-600 dark:text-purple-400' };
};