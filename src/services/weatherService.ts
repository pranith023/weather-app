import { WeatherData } from '../types/weather';

const API_BASE_URL = 'https://api.open-meteo.com/v1';
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

const getWeatherConditionFromCode = (code: number): string => {
  if (code >= 51 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code === 95) return 'thunderstorm';
  if (code >= 80 && code <= 86) return 'rain'; // Showers
  if (code === 0) return 'clear';
  if (code >= 1 && code <= 3) return 'cloudy';
  return 'partly-cloudy';
};

export class WeatherService {
  private static instance: WeatherService;

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getCurrentWeather(lat?: number, lon?: number): Promise<WeatherData> {
    if (!lat || !lon) {
      throw new Error('Latitude and longitude are required to fetch weather data.');
    }
    const response = await fetch(`${API_BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,relative_humidity_2m_max&timezone=auto`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data from API.');
    }
    const data = await response.json();

    // Reverse geocoding to get location name
    const locationResponse = await fetch(`${NOMINATIM_BASE_URL}/reverse?lat=${lat}&lon=${lon}&format=jsonv2`);
    if (!locationResponse.ok) {
      console.error("Failed to fetch location name.");
    }
    const locationData = await locationResponse.json();

    const locationName = locationData.address.city || locationData.address.town || locationData.address.village || 'Current Location';
    const countryName = locationData.address.country || '';
    const regionName = locationData.address.state || '';

    return {
      location: {
        name: locationName,
        country: countryName,
        region: regionName,
        lat: data.latitude,
        lon: data.longitude,
      },
      current: {
        temp: data.current.temperature_2m,
        feelsLike: data.current.temperature_2m,
        condition: getWeatherConditionFromCode(data.current.weather_code),
        icon: getWeatherConditionFromCode(data.current.weather_code),
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        windDirection: 'N/A',
        pressure: 0,
        uvIndex: 0,
        visibility: 0,
        cloudCover: 0,
      },
      forecast: {
        hourly: data.hourly.time.slice(0, 6).map((time: string, index: number) => ({
          time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
          temp: data.hourly.temperature_2m[index],
          condition: getWeatherConditionFromCode(data.hourly.weather_code[index]),
          icon: getWeatherConditionFromCode(data.hourly.weather_code[index]),
          precipitation: 0,
          windSpeed: data.hourly.wind_speed_10m[index],
        })),
        daily: data.daily.time.slice(0, 7).map((date: string, index: number) => ({
          date: date,
          tempHigh: data.daily.temperature_2m_max[index],
          tempLow: data.daily.temperature_2m_min[index],
          condition: getWeatherConditionFromCode(data.daily.weather_code[index]),
          icon: getWeatherConditionFromCode(data.daily.weather_code[index]),
          precipitation: 0,
          humidity: 0,
          windSpeed: data.daily.wind_speed_10m_max[index],
        })),
      },
      airQuality: {
        aqi: 0, co: 0, no2: 0, o3: 0, pm2_5: 0, pm10: 0,
      },
      alerts: [],
    };
  }

  async searchLocations(query: string): Promise<Array<{ name: string; lat: number; lon: number; }>> {
    const response = await fetch(`${NOMINATIM_BASE_URL}/search?q=${query}&format=json&limit=5`);
    if (!response.ok) {
      throw new Error('Failed to search locations.');
    }
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));
  }

  async getUserLocation(): Promise<{ lat: number; lon: number; }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}