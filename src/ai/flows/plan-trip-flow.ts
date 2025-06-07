
'use server';
/**
 * @fileOverview AI-powered trip planner flow.
 * This file defines the Genkit flow for planning a trip, including suggesting routes
 * and estimating weather conditions along the way.
 *
 * Exports:
 * - planTrip: An asynchronous function that takes trip details (origin, destination, date)
 *             and returns a detailed trip plan including route suggestions and simulated weather.
 * - PlanTripInput: The TypeScript type for the input to the planTrip function.
 * - PlanTripOutput: The TypeScript type for the return value of the planTrip function.
 */

import {ai} from '@/ai/genkit';
import {
  PlanTripInputSchema,
  type PlanTripInput as PlanTripInputType,
  PlanTripOutputSchema,
  type PlanTripOutput as PlanTripOutputType
} from '@/ai/schemas/trip-schemas';

// Re-export types as per guideline
export type PlanTripInput = PlanTripInputType;
export type PlanTripOutput = PlanTripOutputType;

export async function planTrip(input: PlanTripInput): Promise<PlanTripOutput> {
  return planTripFlow(input);
}

const prompt = ai.definePrompt({
  name: 'planTripPrompt',
  input: {schema: PlanTripInputSchema},
  output: {schema: PlanTripOutputSchema},
  prompt: `You are an expert AI trip planner. Your task is to generate a plausible travel plan between an origin and a destination.

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  {{#if travelDate}}Travel Date: {{{travelDate}}}{{/if}}

  Please provide the following:
  1.  **Suggested Route:**
      *   A clear summary (e.g., "Fastest route via Expressway, expect some city traffic").
      *   Estimated total distance (e.g., "150 km").
      *   Estimated total duration (e.g., "3 hours").
      *   A list of 3-5 key waypoints or route segments. For each waypoint:
          *   \`locationName\`: A descriptive name (e.g., "Mumbai City Limits", "Lonavala Ghat Section", "Pune Entrance").
          *   \`instruction\`: A brief, plausible driving instruction (e.g., "Merge onto Mumbai-Pune Expressway", "Navigate ghat section carefully", "Exit towards Hinjewadi").
          *   \`distanceToNext\`: Estimated distance for this segment (e.g., "50 km", "30 km").
          *   \`estimatedWeather\`:
              *   \`condition\`: A simulated weather condition (e.g., "Sunny with light breeze", "Cloudy, chance of drizzle", "Warm and humid"). Be creative and consider the travel date if provided.
              *   \`temperature\`: A simulated temperature (e.g., "28°C", "22°C").
      *   \`mapImageUrl\`: Generate a placeholder map image URL using 'https://placehold.co/WIDTHxHEIGHT.png' format. Use a width like 600 or 800 and height like 400. Do NOT include text query parameters in the URL. For example: 'https://placehold.co/600x400.png'.
      *   \`mapImageHint\`: Provide one or two keywords (maximum two words) for the map image, such as "route map" or "city highway".

  2.  **Alternative Route (Optional but Recommended):**
      *   If feasible, suggest one alternative route with the same level of detail as above (summary, distance, duration, waypoints with weather, map image URL and hint). If not, you can omit this.

  3.  **General Advice (Optional):**
      *   Provide 2-3 general travel tips relevant to the trip (e.g., "Start early to avoid traffic", "Check for toll charges", "Carry water and snacks").

  Structure your output strictly according to the PlanTripOutputSchema. Ensure all text is plausible for a real trip between the given locations.
  The waypoints should represent logical segments of the journey.
  `,
});

const planTripFlow = ai.defineFlow(
  {
    name: 'planTripFlow',
    inputSchema: PlanTripInputSchema,
    outputSchema: PlanTripOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate trip plan.");
    }
    // Ensure mapImageHint is always present if mapImageUrl is.
    if (output.suggestedRoute && output.suggestedRoute.mapImageUrl && !output.suggestedRoute.mapImageHint) {
        output.suggestedRoute.mapImageHint = "route map";
    }
    if (output.alternativeRoute && output.alternativeRoute.mapImageUrl && !output.alternativeRoute.mapImageHint) {
        output.alternativeRoute.mapImageHint = "alternate route";
    }
    return output;
  }
);
