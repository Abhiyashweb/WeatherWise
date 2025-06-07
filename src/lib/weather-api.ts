import type { WeatherData, WeatherForecastItem, WeatherConditionCode, LocationSuggestion } from '@/types/weather';

// Mock function to simulate fetching current weather data
export async function fetchWeatherData(location: string): Promise<WeatherData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (location.toLowerCase() === 'error') {
        reject(new Error('Failed to fetch weather data for this location.'));
        return;
      }
      
      const conditions: Array<{ code: WeatherConditionCode, text: string, tempRange: [number, number], humidityRange: [number, number], windRange: [number,number], precip: number }> = [
        { code: 'sunny', text: 'Clear sky', tempRange: [25, 35], humidityRange: [30, 50], windRange: [5, 15], precip: 0 },
        { code: 'partly-cloudy', text: 'Partly cloudy', tempRange: [20, 30], humidityRange: [40, 60], windRange: [10, 20], precip: 0.1 },
        { code: 'cloudy', text: 'Cloudy', tempRange: [15, 25], humidityRange: [50, 70], windRange: [10, 20], precip: 0.2 },
        { code: 'rainy', text: 'Light rain', tempRange: [10, 20], humidityRange: [70, 90], windRange: [15, 25], precip: 5 },
        { code: 'thunderstorm', text: 'Thunderstorm', tempRange: [18, 28], humidityRange: [60, 80], windRange: [20, 30], precip: 10 },
        { code: 'snowy', text: 'Snowy', tempRange: [-5, 2], humidityRange: [80, 95], windRange: [10, 20], precip: 3 },
        { code: 'windy', text: 'Windy', tempRange: [15, 25], humidityRange: [40,60], windRange: [30,50], precip: 0.1},
        { code: 'foggy', text: 'Foggy', tempRange: [5,15], humidityRange: [90,100], windRange: [0,10], precip: 0.5}
      ];
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      resolve({
        locationName: location,
        temperature: Math.floor(Math.random() * (randomCondition.tempRange[1] - randomCondition.tempRange[0] + 1)) + randomCondition.tempRange[0],
        humidity: Math.floor(Math.random() * (randomCondition.humidityRange[1] - randomCondition.humidityRange[0] + 1)) + randomCondition.humidityRange[0],
        windSpeed: Math.floor(Math.random() * (randomCondition.windRange[1] - randomCondition.windRange[0] + 1)) + randomCondition.windRange[0],
        precipitation: randomCondition.precip,
        conditionCode: randomCondition.code,
        conditionText: randomCondition.text,
        timestamp: Date.now(),
      });
    }, 1000);
  });
}

// Mock function to simulate fetching weather forecast
export async function fetchWeatherForecast(location: string): Promise<WeatherForecastItem[]> {
   return new Promise((resolve) => {
    setTimeout(() => {
      const forecast: WeatherForecastItem[] = [];
      const today = new Date();
      const conditions: WeatherConditionCode[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy'];
      const conditionTexts: {[key in WeatherConditionCode]?: string} = {
        'sunny': 'Clear sky',
        'partly-cloudy': 'Partly cloudy',
        'cloudy': 'Overcast',
        'rainy': 'Showers'
      };

      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const conditionCode = conditions[Math.floor(Math.random() * conditions.length)];
        forecast.push({
          date: date.toISOString().split('T')[0],
          temp_max: 20 + Math.floor(Math.random() * 10) - i, // Gets cooler over days
          temp_min: 10 + Math.floor(Math.random() * 5) - i,
          conditionCode: conditionCode,
          conditionText: conditionTexts[conditionCode] || "Mixed weather",
        });
      }
      resolve(forecast);
    }, 1200);
  });
}

// Mock function for location suggestions
export async function fetchLocationSuggestions(query: string): Promise<LocationSuggestion[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }
      const mockLocations: LocationSuggestion[] = [
        { id: '1', name: `${query} City`, country: 'US' },
        { id: '2', name: `${query}ville`, country: 'CA' },
        { id: '3', name: `Old ${query} Town`, country: 'GB' },
        { id: '4', name: `New ${query}port`, country: 'AU' },
      ].filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()));
      resolve(mockLocations.slice(0, 5));
    }, 300);
  });
}
