export const ENDPOINTS = {
  news: {
    list: "/api/news",
    detail: "/api/news/:articleId",
  },
  auth: {
    login: "/api/auth/login",
  },
} as const;
