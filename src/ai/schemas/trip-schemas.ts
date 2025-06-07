
/**
 * @fileOverview Zod schemas and TypeScript types for the AI Trip Planner.
 *
 * Defines the input and output structures for planning a trip.
 * - PlanTripInputSchema: Zod schema for trip planning input.
 * - PlanTripInput: TypeScript type for trip planning input.
 * - WaypointSchema: Zod schema for a waypoint in a route.
 * - RouteSuggestionSchema: Zod schema for a route suggestion.
 * - PlanTripOutputSchema: Zod schema for trip planning output.
 * - PlanTripOutput: TypeScript type for trip planning output.
 */

import {z} from 'zod'; // Changed from 'genkit'

export const WaypointSchema = z.object({
  locationName: z.string().describe('Name of the waypoint or segment (e.g., "City Center", "Highway Section A1").'),
  instruction: z.string().describe('A brief driving instruction for this segment of the route.'),
  distanceToNext: z.string().optional().describe('Estimated distance to the next waypoint or end of this segment.'),
  estimatedWeather: z.object({
    condition: z.string().describe('A brief description of the estimated weather condition (e.g., Sunny, Light Rain, Cloudy).'),
    temperature: z.string().describe('Estimated temperature, including units (e.g., "22°C").'),
  }).describe('Simulated weather conditions for this waypoint.'),
});

export const RouteSuggestionSchema = z.object({
  summary: z.string().describe('A brief summary of the route (e.g., "Fastest route via NH48").'),
  totalDistance: z.string().describe('Estimated total distance of the route (e.g., "150 km").'),
  totalDuration: z.string().describe('Estimated total travel time (e.g., "3 hours 30 minutes").'),
  waypoints: z.array(WaypointSchema).describe('An array of waypoints or route segments with instructions and weather.'),
  mapImageUrl: z.string().url().describe("A placeholder image URL for a map of the route, using placehold.co (e.g., 'https://placehold.co/600x400.png'). Ensure it's a direct image URL without text parameters."),
  mapImageHint: z.string().describe('One or two keywords for the map image, like "route map" or "city highway". Max two words.'),
});

export const PlanTripInputSchema = z.object({
  origin: z.string().min(1, "Origin is required.").describe('The starting point of the trip (e.g., "Mumbai").'),
  destination: z.string().min(1, "Destination is required.").describe('The destination of the trip (e.g., "Pune").'),
  travelDate: z.string().optional().describe('Optional date of travel (e.g., "tomorrow", "next Monday", "2024-12-25"). This can influence weather suggestions.'),
});
export type PlanTripInput = z.infer<typeof PlanTripInputSchema>;

export const PlanTripOutputSchema = z.object({
  suggestedRoute: RouteSuggestionSchema.describe('The primary suggested route with details.'),
  alternativeRoute: RouteSuggestionSchema.optional().describe('An optional alternative route suggestion.'),
  generalAdvice: z.array(z.string()).optional().describe('General travel advice or tips for the trip.'),
});
export type PlanTripOutput = z.infer<typeof PlanTripOutputSchema>;
