'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { WeatherData } from '@/types/weather';
import { generateWeatherTips, type WeatherTipsInput, type WeatherTipsOutput } from '@/ai/flows/generate-weather-tips';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AiWeatherTipsProps {
  weatherData: WeatherData | null;
}

export default function AiWeatherTips({ weatherData }: AiWeatherTipsProps) {
  const [preferences, setPreferences] = useState('');
  const [tips, setTips] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = async () => {
    if (!weatherData) {
      setError('Weather data is not available to generate tips.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTips(null);

    const input: WeatherTipsInput = {
      location: weatherData.locationName,
      temperature: weatherData.temperature,
      condition: weatherData.conditionText,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      preferences: preferences || undefined,
    };

    try {
      const result: WeatherTipsOutput = await generateWeatherTips(input);
      setTips(result.tips);
    } catch (e) {
      setError('Failed to generate AI weather tips. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-primary" />
          AI Weather Tips
        </CardTitle>
        <CardDescription>Get personalized tips based on current weather and your preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="preferences">Your Preferences (Optional)</Label>
            <Input
              id="preferences"
              type="text"
              placeholder="E.g., planning a run, sensitive to cold"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              disabled={!weatherData || isLoading}
            />
          </div>
          <Button onClick={handleGetTips} disabled={!weatherData || isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Generating Tips...' : 'Get AI Tips'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {tips && tips.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-lg">Here are your tips:</h4>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm">{tip}</li>
                ))}
              </ul>
            </div>
          )}
           {!isLoading && !error && !tips && weatherData && (
             <p className="text-sm text-muted-foreground text-center pt-2">Click the button above to get AI-powered tips!</p>
           )}
           {!weatherData && (
             <p className="text-sm text-muted-foreground text-center pt-2">Search for a location to enable AI tips.</p>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
