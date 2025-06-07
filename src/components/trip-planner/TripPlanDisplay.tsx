
'use client';

import type { PlanTripOutput, RouteSuggestion } from '@/ai/flows/plan-trip-flow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapIcon, RouteIcon, ClockIcon, SparklesIcon, NavigationIcon, CloudyIcon, SunIcon, ZapIcon, SnowflakeIcon, UmbrellaIcon, WindIcon, ThermometerIcon } from 'lucide-react';
import Image from 'next/image';


interface TripPlanDisplayProps {
  plan: PlanTripOutput;
}

function getWaypointWeatherIcon(condition: string): JSX.Element {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return <SunIcon className="h-5 w-5 text-yellow-400" />;
  if (lowerCondition.includes('cloud')) return <CloudyIcon className="h-5 w-5 text-gray-400" />;
  if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return <UmbrellaIcon className="h-5 w-5 text-blue-400" />;
  if (lowerCondition.includes('snow')) return <SnowflakeIcon className="h-5 w-5 text-sky-300" />;
  if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) return <ZapIcon className="h-5 w-5 text-orange-400" />;
  if (lowerCondition.includes('wind')) return <WindIcon className="h-5 w-5 text-slate-400" />;
  if (lowerCondition.includes('fog')) return <CloudyIcon className="h-5 w-5 text-gray-500" />;
  return <ThermometerIcon className="h-5 w-5 text-gray-400" />;
}


function RouteDetails({ route, title }: { route: RouteSuggestion; title: string }) {
  return (
    <Card className="mb-6 shadow-md border-border bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center text-card-foreground">
            <MapIcon className="mr-2 h-6 w-6 text-primary"/>
            {title}
        </CardTitle>
        <CardDescription>{route.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/30 p-3 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center"><RouteIcon className="mr-1.5 h-4 w-4"/>Total Distance</p>
            <p className="font-semibold text-lg text-foreground">{route.totalDistance}</p>
          </div>
          <div className="bg-secondary/30 p-3 rounded-md">
            <p className="text-sm text-muted-foreground flex items-center"><ClockIcon className="mr-1.5 h-4 w-4"/>Total Duration</p>
            <p className="font-semibold text-lg text-foreground">{route.totalDuration}</p>
          </div>
        </div>

        {route.mapImageUrl && (
          <div className="my-4 rounded-lg overflow-hidden border border-border shadow-sm aspect-[16/9] relative bg-muted">
            <Image
              src={route.mapImageUrl}
              alt={`Map for ${title}`}
              fill
              className="object-cover"
              data-ai-hint={route.mapImageHint || "route map"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <h4 className="font-semibold text-md mb-2 mt-6 text-foreground">Waypoints & Estimated Weather:</h4>
        <Accordion type="single" collapsible className="w-full">
          {route.waypoints.map((waypoint, index) => (
            <AccordionItem value={`waypoint-${index}`} key={index} className="border-border">
              <AccordionTrigger className="hover:no-underline py-3 text-card-foreground">
                <div className="flex items-center gap-3 w-full">
                  <NavigationIcon className="h-5 w-5 text-accent"/>
                  <span className="font-medium flex-1 text-left text-sm">{waypoint.locationName}</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {getWaypointWeatherIcon(waypoint.estimatedWeather.condition)}
                    <span>{waypoint.estimatedWeather.temperature}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4 pt-1 pb-3 space-y-1 bg-secondary/20 rounded-b-md">
                <p className="text-xs text-foreground"><span className="font-medium text-muted-foreground">Instruction:</span> {waypoint.instruction}</p>
                {waypoint.distanceToNext && <p className="text-xs text-foreground"><span className="font-medium text-muted-foreground">Segment Dist:</span> {waypoint.distanceToNext}</p>}
                <p className="text-xs text-foreground"><span className="font-medium text-muted-foreground">Est. Weather:</span> {waypoint.estimatedWeather.condition}, {waypoint.estimatedWeather.temperature}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function TripPlanDisplay({ plan }: TripPlanDisplayProps) {
  return (
    <div className="mt-8 space-y-8">
      <h3 className="text-2xl font-headline text-center mb-2 text-foreground">Your AI Trip Plan</h3>
      
      <RouteDetails route={plan.suggestedRoute} title="Suggested Route" />

      {plan.alternativeRoute && (
        <RouteDetails route={plan.alternativeRoute} title="Alternative Route" />
      )}

      {plan.generalAdvice && plan.generalAdvice.length > 0 && (
        <Card className="shadow-md border-border bg-card">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center text-card-foreground">
                <SparklesIcon className="mr-2 h-6 w-6 text-primary"/>
                General Travel Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground">
              {plan.generalAdvice.map((advice, index) => (
                <li key={index}>{advice}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
