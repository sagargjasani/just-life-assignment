# Justlife Technical Case

## Demo Credentials

- **Email:** `sagar@justlife.com`
- **Password:** `12345678`

## Deployed Link

[example.com](https://example.com)

---

## Changes

### 1. `.gitignore`

- Added a `.gitignore` so `node_modules` and other generated files don't get pushed.

### 2. Example Environment File

- Added the missing `.env.example` file.

### 3. Fetching Logic

- Moved the news fetching logic to the server side so the API key doesn't leak on the frontend.
- Used **Zod** to validate data.
- **List News API caching:** Added a small `maxAge` (30 seconds) so the user gets the latest news while reducing third-party API key usage.
- **Get Article by ID API caching:** Added a larger `maxAge` (5 minutes), as an article rarely changes once published. This can be increased further as per requirements.
- Added validation for environment variables using Zod. This step ensures all environment variables are properly set and prevents unexpected errors on the server.
- Moved all API endpoint paths into a separate file to ensure reusability and maintainability.

### 4. Shared Types

- Created a `shared` folder and added types to it so they can be used by both the server and client. This ensures data/type safety across client and server.

### 5. API Protection / Security

- Added the **nuxt-security** module to enhance API protection on the server and improve security on the client.
- Configured rate limiting and size limiting for the server.
- CORS handling.
- Configured cross-site scripting (XSS) protection.

### 6. Image Optimization

- Added the **nuxt-image** module for better image optimization. This gives users a better experience and also benefits SEO.

### 7. Design System

- Moved all design tokens into a partial SCSS variables file and used them as CSS variables for consistent styling across the app.

### 8. Lazy Loading

- Added lazy API calls. This ensures that when client-side routing happens, the server/client doesn't block the UI and shows a loader properly.

### 9. Authentication

- Added an authentication module.
- Added conditional article data inside the auth module.
- Used global state to store data via `useState` and custom composables. Pinia could also be used to store all the data, but it was overkill for the current scope.

### 10. Bonus

- **Dark mode support:** Since this is a news website, users may spend a good amount of time reading, and dark mode is easier on the eyes.
- Added an **error page** to capture all other errors, such as 404s.

======================================================================================================

# NewsHub

News website built with Nuxt 4, TypeScript, and SCSS. Articles come from [NewsData.io](https://newsdata.io), pagination uses their cursor token system.

## Requirements

- Node.js 20+
- A NewsData.io API key — free tier is enough

## Getting started

```bash
npm install
cp .env.example .env
```

Edit `.env` and set your API key:

```
NUXT_PUBLIC_NEWS_API_KEY=your_key
```

```bash
npm run dev
```

App runs at `http://localhost:3000`.

## Scripts

|                    |                          |
| ------------------ | ------------------------ |
| `npm run dev`      | dev server               |
| `npm run build`    | production build         |
| `npm run preview`  | preview production build |
| `npm run generate` | static generation        |

## Structure

```
app/
├── assets/styles/       global styles
├── components/          AppNavbar, ArticleCard, ThePagination
├── composables/         useNewsApi.ts
├── layouts/             default.vue
├── pages/               index.vue, news/[id].vue
└── types/               news.ts
```

## Notes

- NewsData.io paginates with a cursor token (`nextPage`), not page numbers. Navigation history is kept in memory and resets on refresh.
- On the free tier, `content`, `sentiment`, and `ai_*` fields are unavailable. The detail page only shows `title`, `description`, and `image_url`.
- The API key ends up in the client bundle via `runtimeConfig.public`. Fine for development; in production it should go through a server route.
