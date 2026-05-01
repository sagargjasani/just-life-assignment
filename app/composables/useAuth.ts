import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
} from "~~/shared/types/auth";
import { ENDPOINTS } from "~/constants/endpoints";

const STORAGE_KEY = "auth.user";

export function useAuth() {
  const user = useState<AuthUser | null>(STORAGE_KEY, () => null);

  const isLoggedIn = computed(() => user.value !== null);

  function setUser(value: AuthUser | null) {
    user.value = value;
    if (!import.meta.client) return;
    if (value) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  function initialize() {
    if (!import.meta.client) return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as unknown as AuthUser;
        if (parsed) {
          user.value = parsed;
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }

  async function login(credentials: LoginRequest): Promise<AuthUser> {
    const response = await $fetch<LoginResponse>(ENDPOINTS.auth.login, {
      method: "POST",
      body: credentials,
    });
    setUser(response.user);
    return response.user;
  }

  function logout() {
    setUser(null);
  }

  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout,
    initialize,
  };
}
