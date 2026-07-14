import { defineCollection } from "astro:content";
import { z } from 'astro/zod';
import { glob, file } from "astro/loaders";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        tags: z.array(z.string()),
        date: z.coerce.date(),
        readTime: z.string()
    }),
});

export const collections = { blog };