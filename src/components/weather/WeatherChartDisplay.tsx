'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import type { WeatherForecastItem } from "@/types/weather";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useMemo } from "react";
import { format, parseISO } from "date-fns";

interface WeatherChartDisplayProps {
  forecastData: WeatherForecastItem[];
}

export default function WeatherChartDisplay({ forecastData }: WeatherChartDisplayProps) {
  const chartData = useMemo(() => 
    forecastData.map(item => ({
      date: format(parseISO(item.date), 'MMM d'),
      maxTemp: item.temp_max,
      minTemp: item.temp_min,
    })), [forecastData]);

  const chartConfig = {
    maxTemp: {
      label: "Max Temp (°C)",
      color: "hsl(var(--chart-1))",
    },
    minTemp: {
      label: "Min Temp (°C)",
      color: "hsl(var(--chart-2))",
    },
  };

  if (!forecastData || forecastData.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">5-Day Temperature Forecast</CardTitle>
          <CardDescription>No forecast data available.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Please search for a location to see the forecast.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">5-Day Temperature Forecast</CardTitle>
        <CardDescription>Temperature trend for the next 5 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                tickFormatter={(value) => value}
                style={{ fill: 'hsl(var(--foreground))', fontSize: '0.8rem' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                tickFormatter={(value) => `${value}°C`}
                style={{ fill: 'hsl(var(--foreground))', fontSize: '0.8rem' }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" labelClassName="text-sm" />} 
              />
              <Line 
                dataKey="maxTemp" 
                type="monotone" 
                stroke="var(--color-maxTemp)" 
                strokeWidth={2} 
                dot={{ r: 4, fill: "var(--color-maxTemp)" }}
                activeDot={{ r: 6 }}
              />
              <Line 
                dataKey="minTemp" 
                type="monotone" 
                stroke="var(--color-minTemp)" 
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--color-minTemp)" }}
                activeDot={{ r: 6 }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
