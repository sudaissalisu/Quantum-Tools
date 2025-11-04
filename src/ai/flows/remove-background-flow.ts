'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BackgroundRemoverInputSchema = z.object({
  image: z.string().describe("A base64 encoded image data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});

const BackgroundRemoverOutputSchema = z.object({
  image: z.string().describe("A base64 encoded image data URI with a transparent background."),
});

export async function removeBackground(input: z.infer<typeof BackgroundRemoverInputSchema>): Promise<z.infer<typeof BackgroundRemoverOutputSchema>> {
  return removeBackgroundFlow(input);
}

const removeBackgroundFlow = ai.defineFlow(
  {
    name: 'removeBackgroundFlow',
    inputSchema: BackgroundRemoverInputSchema,
    outputSchema: BackgroundRemoverOutputSchema,
  },
  async ({ image }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        { media: { url: image } },
        { text: 'Make the background of this image transparent. Return only the subject. Do not add any background color, it must be transparent.' },
      ],
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return { image: media.url };
  }
);
