'use server';
/**
 * @fileOverview A Genkit flow that explains why a given route is considered safe.
 *
 * - safestRouteExplanation - A function that generates a safety explanation for a route.
 * - SafestRouteExplanationInput - The input type for the safestRouteExplanation function.
 * - SafestRouteExplanationOutput - The return type for the safestRouteExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SafestRouteExplanationInputSchema = z.object({
  startLocation: z.string().describe('The starting point of the journey.'),
  endLocation: z.string().describe('The destination of the journey.'),
  safetyAssessment: z.string().describe(
    'A summary of the safety factors for the route, such as avoided high-crime areas, well-lit streets, and nearby safe havens. ' +
    'Example: "This route avoids known high-crime zones like Downtown East and passes through well-lit streets such as Main Street and Elm Avenue. ' +
    'It also has safe havens including Police Station Z and Hospital Q along the way."'
  ),
});
export type SafestRouteExplanationInput = z.infer<typeof SafestRouteExplanationInputSchema>;

const SafestRouteExplanationOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of why the route is safe.'),
});
export type SafestRouteExplanationOutput = z.infer<typeof SafestRouteExplanationOutputSchema>;

export async function safestRouteExplanation(input: SafestRouteExplanationInput): Promise<SafestRouteExplanationOutput> {
  return safestRouteExplanationFlow(input);
}

const safestRouteExplanationPrompt = ai.definePrompt({
  name: 'safestRouteExplanationPrompt',
  input: {schema: SafestRouteExplanationInputSchema},
  output: {schema: SafestRouteExplanationOutputSchema},
  prompt: `You are a helpful assistant for SHEROUTE, a women's safety system. Your goal is to provide clear, concise, and reassuring explanations for why a given route is considered safe.

The user is planning a journey from {{{startLocation}}} to {{{endLocation}}}.

Based on the following safety assessment, provide a clear and concise explanation of why this route is safe. Focus on factors that would make a user feel secure.

Safety Assessment:
{{{safetyAssessment}}}

Provide a positive and informative explanation. Structure your response directly as the safety explanation.`,
});

const safestRouteExplanationFlow = ai.defineFlow(
  {
    name: 'safestRouteExplanationFlow',
    inputSchema: SafestRouteExplanationInputSchema,
    outputSchema: SafestRouteExplanationOutputSchema,
  },
  async (input) => {
    const {output} = await safestRouteExplanationPrompt(input);
    if (!output) {
      throw new Error('Failed to get an explanation for the route safety.');
    }
    return output;
  }
);
