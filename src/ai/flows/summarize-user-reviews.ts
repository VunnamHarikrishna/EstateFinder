'use server';
/**
 * @fileOverview A Genkit flow for summarizing user reviews.
 *
 * - summarizeUserReviews - A function that handles the user review summarization process.
 * - SummarizeUserReviewsInput - The input type for the summarizeUserReviews function.
 * - SummarizeUserReviewsOutput - The return type for the summarizeUserReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserReviewsInputSchema = z.object({
  reviews: z.array(z.string()).describe('An array of user reviews to summarize.'),
});
export type SummarizeUserReviewsInput = z.infer<typeof SummarizeUserReviewsInputSchema>;

const SummarizeUserReviewsOutputSchema = z.object({
  keyThemes: z.string().describe('A summary of the key themes identified in the reviews.'),
  overallSentiment: z.enum(['Positive', 'Negative', 'Mixed']).describe('The overall sentiment of the reviews.'),
});
export type SummarizeUserReviewsOutput = z.infer<typeof SummarizeUserReviewsOutputSchema>;

export async function summarizeUserReviews(input: SummarizeUserReviewsInput): Promise<SummarizeUserReviewsOutput> {
  return summarizeUserReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUserReviewsPrompt',
  input: {schema: SummarizeUserReviewsInputSchema},
  output: {schema: SummarizeUserReviewsOutputSchema},
  prompt: `You are an AI assistant tasked with analyzing user reviews for a real estate booking application.
Your goal is to extract the key themes and determine the overall sentiment from a collection of reviews.

Here are the user reviews:

{{#each reviews}}
- {{{this}}}
{{/each}}

Based on the provided reviews, identify the main themes or recurring topics discussed by users and determine the overall sentiment (Positive, Negative, or Mixed).
Format your output as a JSON object with 'keyThemes' and 'overallSentiment' fields, as described in the output schema.`,
});

const summarizeUserReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeUserReviewsFlow',
    inputSchema: SummarizeUserReviewsInputSchema,
    outputSchema: SummarizeUserReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate summary and sentiment for user reviews.');
    }
    return output;
  }
);
