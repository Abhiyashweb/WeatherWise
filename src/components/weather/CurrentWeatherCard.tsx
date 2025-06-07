import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { WeatherData } from '@/types/weather';
import WeatherIcon from './WeatherIcon';
import WeatherDetailsGrid from './WeatherDetailsGrid';
import { format } from 'date-fns';

interface CurrentWeatherCardProps {
  weatherData: WeatherData;
}

export default function CurrentWeatherCard({ weatherData }: CurrentWeatherCardProps) {
  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl font-headline">{weatherData.locationName}</CardTitle>
        <CardDescription className="text-sm">
          Last updated: {format(new Date(weatherData.timestamp), "PPP p")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 p-4">
          <div className="flex flex-col items-center text-center">
            <WeatherIcon conditionCode={weatherData.conditionCode} size={100} className="text-accent mb-2" />
            <p className="text-5xl font-bold text-foreground">{weatherData.temperature}°C</p>
            <p className="text-xl text-muted-foreground capitalize">{weatherData.conditionText}</p>
          </div>
          <div className="w-full sm:w-auto">
             <WeatherDetailsGrid weatherData={weatherData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
