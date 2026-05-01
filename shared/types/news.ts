export interface Article {
  article_id: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  link: string;
  source_name: string;
  pubDate: string;
  category: string[];
  language: string;
}

export interface NewsListResponse {
  articles: Article[];
  nextPage: string | null;
}

export type NewsDetailResponse = Article;
