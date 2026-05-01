import { z } from "zod";
import type { NewsListResponse } from "~~/shared/types/news";

const QuerySchema = z.object({
  page: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9._-]+$/, "page must be a NewsData cursor token")
    .optional(),
});

export default defineCachedEventHandler(
  async (event): Promise<NewsListResponse> => {
    const parsed = QuerySchema.safeParse(getQuery(event));
    if (!parsed.success) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Invalid query parameters",
      });
    }

    return fetchFromNewsApi(event, { page: parsed.data.page, size: 10 });
  },
  {
    name: "news-list",
    group: "api",
    maxAge: 30,
    getKey: (event) => {
      const { page } = getQuery(event);
      return page ? `page:${page}` : "page:initial";
    },
  },
);
