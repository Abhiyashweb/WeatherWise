
'use server';

/**
 * @fileOverview AI-powered feature that generates personalized weather tips based on current conditions and user preferences.
 *
 * - generateWeatherTips - A function that handles the weather tips generation process.
 * - WeatherTipsInput - The input type for the generateWeatherTips function.
 * - WeatherTipsOutput - The return type for the generateWeatherTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod'; // Changed from 'genkit'

const WeatherTipsInputSchema = z.object({
  location: z.string().describe('The location for which weather tips are needed.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  condition: z.string().describe('The current weather condition (e.g., sunny, rainy, cloudy).'),
  humidity: z.number().describe('The current humidity percentage.'),
  windSpeed: z.number().describe('The current wind speed in km/h.'),
  preferences: z.string().optional().describe('Optional user preferences or activities for more personalized tips.'),
});
export type WeatherTipsInput = z.infer<typeof WeatherTipsInputSchema>;

const WeatherTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized weather tips.'),
});
export type WeatherTipsOutput = z.infer<typeof WeatherTipsOutputSchema>;

export async function generateWeatherTips(input: WeatherTipsInput): Promise<WeatherTipsOutput> {
  return generateWeatherTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherTipsPrompt',
  input: {schema: WeatherTipsInputSchema},
  output: {schema: WeatherTipsOutputSchema},
  prompt: `You are a helpful weather assistant providing personalized tips based on the current weather conditions and user preferences.

  Current Weather Conditions for {{{location}}}:
  - Temperature: {{{temperature}}}°C
  - Condition: {{{condition}}}
  - Humidity: {{{humidity}}}%
  - Wind Speed: {{{windSpeed}}} km/h

  User Preferences: {{#if preferences}}{{{preferences}}}{{else}}No specific preferences provided.{{/if}}

  Based on these conditions and preferences, generate 3 concise and practical weather tips.
  Format the tips as an array of strings.

  For example:
  {
    "tips": [
      "Wear sunglasses and sunscreen due to the sunny conditions.",
      "Stay hydrated by drinking plenty of water.",
      "Consider outdoor activities like hiking or biking."
    ]
  }
  `,
});

const generateWeatherTipsFlow = ai.defineFlow(
  {
    name: 'generateWeatherTipsFlow',
    inputSchema: WeatherTipsInputSchema,
    outputSchema: WeatherTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
