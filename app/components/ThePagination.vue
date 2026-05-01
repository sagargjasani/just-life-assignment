<script setup lang="ts">
defineProps<{
  canGoPrev: boolean
  canGoNext: boolean
}>()

defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      :class="{ 'pagination__btn--disabled': !canGoPrev }"
      :disabled="!canGoPrev"
      @click="$emit('prev')"
    >
      <span class="pagination__arrow">←</span>
      Prev
    </button>

    <button
      class="pagination__btn"
      :class="{ 'pagination__btn--disabled': !canGoNext }"
      :disabled="!canGoNext"
      @click="$emit('next')"
    >
      Next
      <span class="pagination__arrow">→</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-xl) 0;
}

.pagination__btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-white);
  color: var(--color-primary-900);
  border: var(--border-width) solid var(--color-neutral-200);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover:not(:disabled) {
    background-color: var(--color-primary-900);
    border-color: var(--color-primary-900);
    color: var(--color-white);
    box-shadow: var(--shadow-sm);
  }

  &--disabled,
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.pagination__arrow {
  font-size: var(--font-size-base);
  line-height: 1;
}
</style>
