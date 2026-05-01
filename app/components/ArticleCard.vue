<script setup lang="ts">
import type { Article } from '~~/shared/types/news'

defineProps<{
  article: Article
}>()
</script>

<template>
  <NuxtLink :to="`/news/${article.article_id}`" class="article-card">
    <div class="article-card__image-wrap">
      <NuxtImg
        v-if="article.image_url"
        :src="article.image_url"
        :alt="article.title ?? ''"
        class="article-card__image"
        loading="lazy"
        width="640"
        height="360"
        sizes="sm:100vw md:50vw lg:33vw"
      />
      <div v-else class="article-card__image-placeholder">
        <span class="article-card__image-placeholder-icon">N</span>
      </div>
    </div>

    <div class="article-card__body">
      <div class="article-card__meta">
        <span class="article-card__source">{{ article.source_name }}</span>
        <span class="article-card__dot">·</span>
        <time class="article-card__date">{{ article.pubDate.slice(0, 10) }}</time>
      </div>
      <h2 class="article-card__title">{{ article.title }}</h2>
      <div class="article-card__categories">
        <span
          v-for="cat in article.category.slice(0, 2)"
          :key="cat"
          class="article-card__category"
        >
          {{ cat }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.article-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: var(--border-width) solid var(--color-neutral-200);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast),
    border-color var(--transition-fast);
  height: 100%;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--color-neutral-300);
  }
}

.article-card__image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--color-neutral-50);
  flex-shrink: 0;
}

.article-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-medium);

  .article-card:hover & {
    transform: scale(1.03);
  }
}

.article-card__image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary-900) 0%,
    var(--color-primary-700) 100%
  );
}

.article-card__image-placeholder-icon {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-overlay-white-15);
}

.article-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
  flex: 1;
}

.article-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.article-card__source {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-500);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.article-card__dot {
  color: var(--color-neutral-400);
  font-size: var(--font-size-xs);
}

.article-card__date {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-400);
}

.article-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-900);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card__categories {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
  margin-top: auto;
}

.article-card__category {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
  background-color: var(--color-neutral-50);
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-sm);
  text-transform: capitalize;
}
</style>
