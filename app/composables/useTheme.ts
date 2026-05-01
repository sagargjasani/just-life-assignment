export type Theme = "light" | "dark";

const COOKIE_KEY = "theme.preference";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function useTheme() {
  const themeCookie = useCookie<Theme>(COOKIE_KEY, {
    default: () => "light",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });

  const theme = computed<Theme>({
    get: () => (themeCookie.value === "dark" ? "dark" : "light"),
    set: (value) => {
      themeCookie.value = value;
    },
  });

  const isDark = computed(() => theme.value === "dark");

  useHead({
    htmlAttrs: { "data-theme": theme },
  });

  function setTheme(value: Theme) {
    theme.value = value;
  }

  function toggleTheme() {
    setTheme(isDark.value ? "light" : "dark");
  }

  return {
    theme: readonly(theme),
    isDark,
    setTheme,
    toggleTheme,
  };
}
