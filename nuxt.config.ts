export default defineNuxtConfig({
  modules: ["nuxt-security", "@nuxt/image"],
  css: ["~/assets/styles/main.scss"],

  runtimeConfig: {
    newsApiKey: "",
    newsApiBaseUrl: "https://newsdata.io/api/1",
  },

  image: {
    provider: "none",
  },

  nitro: {
    storage: {
      cache: { driver: "memory" },
    },
  },

  security: {
    strict: true,
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https:"],
        "style-src": ["'self'", "'unsafe-inline'", "'nonce-{{nonce}}'"],
        "script-src-attr": ["'unsafe-inline'"],
      },
    },

    rateLimiter: {
      tokensPerInterval: 150,
      interval: 60_000,
      throwError: true,
    },
    requestSizeLimiter: {
      maxRequestSizeInBytes: 1024 * 1024,
      throwError: true,
    },
    xssValidator: {
      throwError: true,
    },
    corsHandler: {
      origin: [],
    },
  },
});
