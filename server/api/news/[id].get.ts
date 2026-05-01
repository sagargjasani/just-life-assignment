import { z } from "zod";
import type { NewsDetailResponse } from "~~/shared/types/news";

const ArticleIdSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9_-]+$/, "id must be a NewsData article id");

export default defineCachedEventHandler(
  async (event): Promise<NewsDetailResponse> => {
    const rawId = getRouterParam(event, "id");
    const parsed = ArticleIdSchema.safeParse(rawId);
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid article id",
      });
    }

    const { articles } = await fetchFromNewsApi(event, {
      id: parsed.data,
    });
    const article = articles[0];

    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: "Article not found",
      });
    }

    return article;
  },
  {
    name: "news-detail",
    group: "api",
    maxAge: 60 * 5,
    getKey: (event) => `id:${getRouterParam(event, "id")}`,
  },
);
