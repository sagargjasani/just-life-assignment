# Justlife Technical Case

## Demo Credentials

- **Email:** `sagar@justlife.com`
- **Password:** `12345678`

## Deployed Link

[JustLife Sagar Submission](https://justlife-sagar.netlify.app)

---

## Changes

### 1. `.gitignore`

- Added a `.gitignore` so `node_modules` and other generated files don't get pushed.

### 2. Dependencies

- Moved `nuxt` and `vue` from `devDependencies` to runtime `dependencies`.

### 3. Example Environment File

- Added the missing `.env.example` file.

### 4. Fetching Logic

- Moved the news fetching logic to the server side so the API key doesn't leak on the frontend.
- Used **Zod** to validate data.
- **List News API caching:** Added a small `maxAge` (30 seconds) so the user gets the latest news while reducing third-party API key usage.
- **Get Article by ID API caching:** Added a larger `maxAge` (5 minutes), as an article rarely changes once published. This can be increased further as per requirements.
- Added validation for environment variables using Zod. This step ensures all environment variables are properly set and prevents unexpected errors on the server.
- Moved all API endpoint paths into a separate file to ensure reusability and maintainability.

### 5. Shared Types

- Created a `shared` folder and added types to it so they can be used by both the server and client. This ensures data/type safety across client and server.

### 6. API Protection / Security

- Added the **nuxt-security** module to enhance API protection on the server and improve security on the client.
- Configured rate limiting and size limiting for the server.
- CORS handling.
- Configured cross-site scripting (XSS) protection.

### 7. Image Optimization

- Added the **nuxt-image** module for better image optimization. This gives users a better experience and also benefits SEO.

### 8. Design System

- Moved all design tokens into a partial SCSS variables file and used them as CSS variables for consistent styling across the app.

### 9. Lazy Loading

- Added lazy API calls. This ensures that when client-side routing happens, the server/client doesn't block the UI and shows a loader properly.

### 10. Authentication

- Added an authentication module.
- Added conditional article data inside the auth module.
- Used global state to store data via `useState` and custom composables. Pinia could also be used to store all the data, but it was overkill for the current scope.

### 11. Bonus

- **Dark mode support:** Since this is a news website, users may spend a good amount of time reading, and dark mode is easier on the eyes.
- Added an **error page** to capture all other errors, such as 404s.
