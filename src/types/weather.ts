export interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    uvIndex: number;
    visibility: number;
    cloudCover: number;
  };
  forecast: {
    hourly: HourlyForecast[];
    daily: DailyForecast[];
  };
  airQuality: {
    aqi: number;
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
  alerts: WeatherAlert[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  start: string;
  end: string;
}

export interface UserPreferences {
  units: {
    temperature: 'celsius' | 'fahrenheit';
    windSpeed: 'kmh' | 'mph' | 'ms';
    pressure: 'hPa' | 'inHg' | 'mb';
  };
  theme: 'light' | 'dark' | 'auto';
  locations: SavedLocation[];
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  isDefault: boolean;
}