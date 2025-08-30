import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-400 dark:border-t-blue-300"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Loading weather data...
        </p>
      </div>
    </div>
  );
};