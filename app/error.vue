<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const isNotFound = computed(() => props.error?.statusCode === 404);

const title = computed(() =>
  isNotFound.value ? "Page not found" : "Something went wrong",
);

const description = computed(() => {
  if (isNotFound.value) {
    return "The page you're looking for doesn't exist or has been moved.";
  }
  return (
    props.error?.statusMessage ||
    props.error?.message ||
    "An unexpected error occurred. Please try again."
  );
});

useSeoMeta({
  title: () => `${props.error?.statusCode ?? "Error"} — NewsHub`,
  description: () => description.value,
  robots: "noindex",
});

function handleHome() {
  clearError({ redirect: "/" });
}

function handleRetry() {
  clearError();
}
</script>

<template>
  <NuxtLayout>
    <div class="error-page">
      <div class="error-page__content">
        <p class="error-page__status">{{ error?.statusCode ?? "Error" }}</p>
        <h1 class="error-page__title">{{ title }}</h1>
        <p class="error-page__description">{{ description }}</p>

        <div class="error-page__actions">
          <button
            type="button"
            class="error-page__btn error-page__btn--primary"
            @click="handleHome"
          >
            Back to Home
          </button>
          <button
            v-if="!isNotFound"
            type="button"
            class="error-page__btn error-page__btn--ghost"
            @click="handleRetry"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl) var(--space-md);
}

.error-page__content {
  max-width: var(--size-article-max);
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.error-page__status {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-500);
  letter-spacing: var(--letter-spacing-wider);
  line-height: 1;
}

.error-page__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
  letter-spacing: var(--letter-spacing-tight);

  @media (max-width: 40rem) {
    font-size: var(--font-size-lg);
  }
}

.error-page__description {
  font-size: var(--font-size-base);
  color: var(--color-neutral-500);
  max-width: 32rem;
  line-height: 1.6;
}

.error-page__actions {
  margin-top: var(--space-md);
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
}

.error-page__btn {
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: var(--border-width-thick) solid var(--color-accent-500);
    outline-offset: 0.125rem;
  }

  &--primary {
    background-color: var(--color-accent-500);
    color: var(--color-white);

    &:hover {
      background-color: var(--color-accent-600);
      transform: translateY(-1px);
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--color-primary-900);
    border: var(--border-width) solid var(--color-neutral-300);

    &:hover {
      background-color: var(--color-overlay-black-08);
      border-color: var(--color-neutral-400);
      transform: translateY(-1px);
    }
  }
}
</style>
