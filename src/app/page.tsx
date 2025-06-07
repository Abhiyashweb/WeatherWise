'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import LocationSearchForm from '@/components/weather/LocationSearchForm';
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard';
import WeatherChartDisplay from '@/components/weather/WeatherChartDisplay';
import AiWeatherTips from '@/components/weather/AiWeatherTips';
import type { WeatherData, WeatherForecastItem } from '@/types/weather';
import { fetchWeatherData, fetchWeatherForecast } from '@/lib/weather-api';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Globe } from 'lucide-react';
import TripPlannerForm from '@/components/trip-planner/TripPlannerForm';

export default function WeatherPage() {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<WeatherForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  const defaultLocation = "New York";

  useEffect(() => {
    setIsClient(true);
    // Fetch weather for a default location on initial load if no location is set
    if (!currentLocation) {
      handleSearch(defaultLocation);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on initial client mount

  const handleSearch = async (location: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null); 
    setForecastData([]); 

    try {
      const [currentWeather, forecast] = await Promise.all([
        fetchWeatherData(location),
        fetchWeatherForecast(location),
      ]);
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setCurrentLocation(location);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch weather data. Please try a different location or check your connection.');
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const WeatherContentSkeleton = () => (
    <div className="space-y-8">
      <CardSkeleton />
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );

  const CardSkeleton = () => (
    <div className="p-6 border rounded-lg shadow-lg bg-card">
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        <div className="flex flex-col items-center text-center">
          <Skeleton className="h-24 w-24 rounded-full mb-2" />
          <Skeleton className="h-12 w-24 mb-1" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="w-full sm:w-1/2 space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );

  const LocationSearchFormSkeleton = () => (
    <div className="flex gap-2 items-end w-full max-w-md">
      <div className="flex-grow space-y-2">
        <Skeleton className="h-4 w-1/4 mb-1" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-[100px]" />
    </div>
  );


  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-10">
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-headline mb-4 text-center">Find Weather Anywhere</h2>
          {isClient ? (
            <LocationSearchForm onSearch={handleSearch} isSearching={isLoading} />
          ) : (
            <LocationSearchFormSkeleton />
          )}
        </section>

        {isLoading && <WeatherContentSkeleton />}

        {error && !isLoading && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTitle>Error Fetching Weather</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && !weatherData && isClient && (
          <div className="text-center py-10">
            <Globe className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground font-headline">
              Welcome to WeatherWise!
            </p>
            <p className="text-muted-foreground">
              Search for a location to get started or see data for {currentLocation || defaultLocation}.
            </p>
          </div>
        )}

        {!isLoading && !error && weatherData && (
          <>
            <section>
              <CurrentWeatherCard weatherData={weatherData} />
            </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WeatherChartDisplay forecastData={forecastData} />
              <AiWeatherTips weatherData={weatherData} />
            </section>
          </>
        )}

        <section className="my-8 pt-8 border-t border-border">
          <TripPlannerForm />
        </section>

      </main>
      <footer className="py-6 text-center border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} WeatherWise. Powered by AI and Sunshine.
        </p>
      </footer>
    </>
  );
}
