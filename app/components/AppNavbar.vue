<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth();
const { openAuthModal } = useAuthModal();
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <NuxtLink to="/" class="navbar__brand">
        <span class="navbar__brand-icon">N</span>
        <span class="navbar__brand-text">NewsHub</span>
      </NuxtLink>

      <nav class="navbar__nav">
        <NuxtLink
          to="/"
          class="navbar__nav-link"
          active-class="navbar__nav-link--active"
        >
          Home
        </NuxtLink>
      </nav>

      <div class="navbar__actions">
        <button
          type="button"
          class="navbar__theme-toggle"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="isDark"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <IconsSun v-if="isDark" class="navbar__theme-icon" />
          <IconsMoon v-else class="navbar__theme-icon" />
        </button>

        <div v-if="isLoggedIn" class="navbar__user">
          <span class="navbar__user-name">
            {{ user?.name }}
          </span>
        </div>
        <button
          type="button"
          class="navbar__login-btn"
          :class="{ 'navbar__login-btn--ghost': isLoggedIn }"
          @click="isLoggedIn ? logout() : openAuthModal()"
        >
          {{ isLoggedIn ? "Logout" : "Login" }}
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-navbar-bg);
  box-shadow: var(--shadow-md);
  height: var(--size-navbar-height);
  transition: background-color var(--transition-medium);
}

.navbar__inner {
  max-width: var(--size-container-max);
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.navbar__brand-icon {
  width: var(--size-brand-icon);
  height: var(--size-brand-icon);
  background-color: var(--color-accent-500);
  color: var(--color-navbar-fg);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-md);
}

.navbar__brand-text {
  color: var(--color-navbar-fg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;

  @media (max-width: 40rem) {
    display: none;
  }
}

.navbar__nav-link {
  color: var(--color-overlay-white-70);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);

  &:hover {
    color: var(--color-navbar-fg);
    background-color: var(--color-overlay-white-10);
  }

  &--active {
    color: var(--color-navbar-fg);
  }
}

.navbar__actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
}

.navbar__theme-toggle {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-navbar-fg);
  background-color: transparent;
  border: var(--border-width) solid var(--color-overlay-white-15);
  border-radius: var(--radius-pill);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);

  &:hover {
    background-color: var(--color-overlay-white-10);
    border-color: var(--color-overlay-white-70);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: var(--border-width-thick) solid var(--color-accent-500);
    outline-offset: 0.125rem;
  }
}

.navbar__theme-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.navbar__user {
  display: flex;
  align-items: center;
}

.navbar__user-name {
  color: var(--color-navbar-fg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navbar__login-btn {
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-accent-500);
  color: var(--color-navbar-fg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast),
    border-color var(--transition-fast);
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-accent-600);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &--ghost {
    background-color: transparent;
    border: var(--border-width) solid var(--color-overlay-white-15);

    &:hover {
      background-color: var(--color-overlay-white-10);
      border-color: var(--color-overlay-white-70);
    }
  }
}
</style>
