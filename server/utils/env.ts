import { z } from "zod";
import type { H3Event } from "h3";

const ServerEnvSchema = z.object({
  newsApiKey: z.string().min(1, "NUXT_NEWS_API_KEY is required"),
  newsApiBaseUrl: z.url("NUXT_NEWS_API_BASE_URL must be a valid URL"),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;

export function getServerEnv(event?: H3Event): ServerEnv {
  const config = useRuntimeConfig(event);
  const parsed = ServerEnvSchema.safeParse({
    newsApiKey: config.newsApiKey,
    newsApiBaseUrl: config.newsApiBaseUrl,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map(
        (issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
      )
      .join("\n");
    throw new Error(`Invalid server runtime config:\n${issues}`);
  }

  return parsed.data;
}
