import type {
  NewsDetailResponse,
  NewsListResponse,
} from "~~/shared/types/news";
import { ENDPOINTS } from "~/constants/endpoints";

export function useFetchArticles(pageToken: Ref<string | null | undefined>) {
  return useFetch<NewsListResponse>(ENDPOINTS.news.list, {
    query: computed(() => {
      const token = pageToken.value;
      return token ? { page: token } : {};
    }),
    lazy: true,
  });
}

export function useFetchArticleById(id: string) {
  return useFetch<NewsDetailResponse>(
    ENDPOINTS.news.detail.replace(":articleId", encodeURIComponent(id)),
    {
      lazy: true,
    },
  );
}
