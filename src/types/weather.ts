export type WeatherConditionCode = 
  | 'sunny' 
  | 'cloudy' 
  | 'partly-cloudy' 
  | 'rainy' 
  | 'snowy' 
  | 'thunderstorm' 
  | 'windy' 
  | 'foggy'
  | 'unknown';

export interface WeatherData {
  locationName: string;
  temperature: number; // Celsius
  humidity: number; // Percentage
  windSpeed: number; // km/h
  precipitation: number; // mm (e.g., last hour or probability)
  conditionCode: WeatherConditionCode;
  conditionText: string;
  timestamp: number; // UNIX timestamp
  icon?: string; // Optional direct icon string, if API provides
}

export interface WeatherForecastItem {
  date: string; // YYYY-MM-DD
  temp_max: number; // Celsius
  temp_min: number; // Celsius
  conditionCode: WeatherConditionCode;
  conditionText: string;
}

export interface WeatherChartDataPoint {
  date: string;
  temperature?: number;
  precipitation?: number;
}

export interface LocationSuggestion {
  id: string;
  name: string;
  country: string;
}
