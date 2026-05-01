<script setup lang="ts">
import type { LoginRequest } from "~~/shared/types/auth";

const { isOpen, articleTitle, closeAuthModal } = useAuthModal();
const { login } = useAuth();

const form = reactive<LoginRequest>({ email: "", password: "" });
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

const emailInputRef = ref<HTMLInputElement | null>(null);

const canSubmit = computed(
  () =>
    !isSubmitting.value && form.email.length > 0 && form.password.length > 0,
);

function resetForm() {
  form.email = "";
  form.password = "";
  errorMessage.value = null;
  isSubmitting.value = false;
}

async function onSubmit() {
  if (!canSubmit.value) return;
  isSubmitting.value = true;
  errorMessage.value = null;
  try {
    await login({ email: form.email, password: form.password });
    resetForm();
    closeAuthModal();
  } catch (err) {
    const apiMessage = (err as { data?: { message?: string } }).data?.message;
    errorMessage.value = apiMessage ?? "Invalid credentials. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.stopPropagation();
    closeAuthModal();
    return;
  }
}

watch(isOpen, async (open) => {
  if (!import.meta.client) return;
  if (!open) {
    resetForm();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="login-modal" @after-enter="emailInputRef?.focus()">
      <div
        v-if="isOpen"
        class="login-modal__backdrop"
        @click.self="closeAuthModal"
        @keydown="onKeydown"
      >
        <div ref="dialogRef" class="login-modal__dialog" role="dialog">
          <button
            type="button"
            class="login-modal__close"
            @click="closeAuthModal"
          >
            <span>×</span>
          </button>

          <h2 class="login-modal__title">Sign in</h2>

          <p v-if="articleTitle" class="login-modal__context">
            Sign in to easily read more articles like
            <em>"{{ articleTitle }}"</em>
          </p>

          <form class="login-modal__form" @submit.prevent="onSubmit">
            <label class="login-modal__field">
              <span class="login-modal__label">Email</span>
              <input
                ref="emailInputRef"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                required
                :disabled="isSubmitting"
                class="login-modal__input"
              />
            </label>

            <label class="login-modal__field">
              <span class="login-modal__label">Password</span>
              <input
                v-model="form.password"
                type="password"
                name="password"
                autocomplete="current-password"
                required
                :disabled="isSubmitting"
                class="login-modal__input"
              />
            </label>

            <p v-if="errorMessage" class="login-modal__error">
              {{ errorMessage }}
            </p>

            <button
              type="submit"
              class="login-modal__submit"
              :disabled="!canSubmit"
            >
              {{ isSubmitting ? "Signing in…" : "Sign in" }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.login-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  background-color: var(--color-overlay-black-10);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

.login-modal__dialog {
  position: relative;
  width: 100%;
  max-width: 26rem;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.login-modal__close {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  color: var(--color-neutral-500);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);

  &:hover {
    background-color: var(--color-neutral-50);
    color: var(--color-primary-900);
  }

  &:focus-visible {
    outline: var(--border-width-thick) solid var(--color-accent-500);
    outline-offset: 0.125rem;
  }
}

.login-modal__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
  letter-spacing: var(--letter-spacing-tight);
}

.login-modal__context {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
  line-height: 1.5;

  em {
    color: var(--color-primary-900);
    font-style: italic;
  }
}

.login-modal__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.login-modal__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.login-modal__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-900);
}

.login-modal__input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-primary-900);
  background-color: var(--color-white);
  border: var(--border-width) solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover:not(:disabled) {
    border-color: var(--color-neutral-300);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--color-accent-500);
    box-shadow: 0 0 0 0.1875rem var(--color-overlay-white-15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.login-modal__error {
  font-size: var(--font-size-sm);
  color: var(--color-accent-600);
  background-color: var(--color-neutral-50);
  border-left: var(--border-width-thick) solid var(--color-accent-500);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
}

.login-modal__submit {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-accent-500);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast);

  &:hover:not(:disabled) {
    background-color: var(--color-accent-600);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: var(--border-width-thick) solid var(--color-primary-900);
    outline-offset: 0.125rem;
  }
}

.login-modal-enter-active,
.login-modal-leave-active {
  transition: opacity var(--transition-fast);

  .login-modal__dialog {
    transition:
      transform var(--transition-fast),
      opacity var(--transition-fast);
  }
}

.login-modal-enter-from,
.login-modal-leave-to {
  opacity: 0;

  .login-modal__dialog {
    transform: translateY(0.5rem);
    opacity: 0;
  }
}
</style>
