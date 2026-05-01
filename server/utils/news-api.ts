import { z } from "zod";
import type { H3Event } from "h3";
import type { Article, NewsListResponse } from "~~/shared/types/news";

const ArticleSchema = z.object({
  article_id: z.string(),
  image_url: z.string().nullable().default(null),
  title: z.string().nullable().default(null),
  source_name: z.string().default(""),
  pubDate: z.string().default(""),
  category: z.array(z.string()).default([]),
  description: z.string().nullable().default(null),
  link: z.string().default(""),
  language: z.string().default(""),
});

const SuccessSchema = z.object({
  status: z.literal("success"),
  totalResults: z.number().optional(),
  results: z.array(ArticleSchema),
  nextPage: z.string().nullable().optional(),
});

const ErrorSchema = z.object({
  status: z.literal("error"),
  results: z.object({
    code: z.string().optional(),
    message: z.string(),
  }),
});

const NewsApiResponseSchema = z.discriminatedUnion("status", [
  SuccessSchema,
  ErrorSchema,
]);

interface QueryToSend {
  page?: string;
  id?: string;
  size?: number;
}

export async function fetchFromNewsApi(
  event: H3Event,
  query: QueryToSend,
): Promise<NewsListResponse> {
  const env = getServerEnv(event);

  const queryToSend: Record<string, string | number> = {
    apikey: env.newsApiKey,
    ...(query.size ? { size: query.size } : {}),
    ...(query.page ? { page: query.page } : {}),
    ...(query.id ? { id: query.id } : {}),
  };

  try {
    const raw = await $fetch(`${env.newsApiBaseUrl}/latest`, {
      query: queryToSend,
      retry: 1,
      retryDelay: 250,
      timeout: 10_000,
    });
    const parsed = NewsApiResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw createError({
        statusCode: 502,
        statusMessage: "Bad Gateway",
        message: "Unexpected response from upstream news provider",
      });
    }

    if (parsed.data.status === "error") {
      throw createError({
        statusCode: 502,
        statusMessage: "Bad Gateway",
        message: parsed.data.results.message,
      });
    }

    return {
      articles: parsed.data.results,
      nextPage: parsed.data.nextPage ?? null,
    };
  } catch (err) {
    throw createError({
      statusCode: 502,
      statusMessage: "Bad Gateway",
      message: "Upstream news provider is unavailable",
      cause: err,
    });
  }
}
