'use server';
/**
 * @fileOverview An AI agent that generates detailed and engaging property descriptions.
 *
 * - generatePropertyDescription - A function that handles the property description generation process.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z
    .string()
    .describe('The type of property, e.g., "apartment", "house", "land", "commercial".'),
  location: z
    .string()
    .describe('The general location of the property, e.g., "city center", "suburban", "beachfront".'),
  address: z
    .string()
    .describe('The specific address or general area of the property.'),
  bedrooms: z.number().optional().describe('Number of bedrooms.'),
  bathrooms: z.number().optional().describe('Number of bathrooms.'),
  squareFootage: z.number().optional().describe('Total living area in square feet/meters.'),
  plotArea: z.number().optional().describe('Total plot area in square feet/meters (for land/plots).'),
  amenities: z
    .array(z.string())
    .optional()
    .describe('A list of amenities, e.g., "swimming pool", "gym", "balcony", "parking", "garden".'),
  uniqueSellingPoints: z
    .array(z.string())
    .optional()
    .describe('A list of unique selling points, e.g., "panoramic views", "close to public transport", "recently renovated", "smart home features".'),
  price: z.number().optional().describe('The price of the property (for context in description).'),
  nearbyAttractions: z
    .array(z.string())
    .optional()
    .describe('A list of nearby attractions or essential services, e.g., "schools", "hospitals", "shopping malls", "parks".'),
  targetAudience: z
    .string()
    .optional()
    .describe('The target audience for the property, e.g., "families", "young professionals", "investors", "retirees".'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated detailed and engaging property description.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter. Your task is to generate a detailed and engaging property description based on the provided features and selling points. The description should be compelling, highlight the property's best aspects, and appeal to potential buyers.

Property Type: {{{propertyType}}}
Location: {{{location}}}
Address: {{{address}}}
{{#if bedrooms}}Bedrooms: {{{bedrooms}}}{{/if}}
{{#if bathrooms}}Bathrooms: {{{bathrooms}}}{{/if}}
{{#if squareFootage}}Square Footage: {{{squareFootage}}}{{/if}}
{{#if plotArea}}Plot Area: {{{plotArea}}}{{/if}}
{{#if price}}Price: {{{price}}}{{/if}}
{{#if amenities}}Amenities: {{#each amenities}}- {{{this}}}{{/each}}{{/if}}
{{#if uniqueSellingPoints}}Unique Selling Points: {{#each uniqueSellingPoints}}- {{{this}}}{{/each}}{{/if}}
{{#if nearbyAttractions}}Nearby Attractions/Services: {{#each nearbyAttractions}}- {{{this}}}{{/each}}{{/if}}
{{#if targetAudience}}Target Audience: {{{targetAudience}}}{{/if}}

Generate a rich, descriptive, and persuasive property listing that would attract buyers:
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
