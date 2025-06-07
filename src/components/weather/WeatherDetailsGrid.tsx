import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind as WindIcon, Umbrella, Gauge } from "lucide-react"; // Using Gauge for precipitation
import type { WeatherData } from "@/types/weather";

interface WeatherDetailsGridProps {
  weatherData: Pick<WeatherData, 'humidity' | 'windSpeed' | 'precipitation'>;
}

const DetailItem = ({ icon: Icon, label, value, unit }: { icon: React.ElementType, label: string, value: string | number, unit: string }) => (
  <div className="flex flex-col items-center p-3 bg-secondary/50 rounded-lg shadow">
    <Icon className="h-8 w-8 text-primary mb-2" />
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-xl font-semibold text-foreground">{value} <span className="text-xs">{unit}</span></p>
  </div>
);

export default function WeatherDetailsGrid({ weatherData }: WeatherDetailsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <DetailItem icon={Droplets} label="Humidity" value={weatherData.humidity} unit="%" />
      <DetailItem icon={WindIcon} label="Wind Speed" value={weatherData.windSpeed} unit="km/h" />
      <DetailItem icon={Gauge} label="Precipitation" value={weatherData.precipitation} unit="mm" />
    </div>
  );
}
