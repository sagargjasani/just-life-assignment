<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const { data, status } = await useFetchArticleById(id);

const article = computed(() => data.value);

useSeoMeta({
  title: () => article.value?.title ?? "Article",
  description: () => article.value?.description ?? "",
  ogImage: () => article.value?.image_url ?? undefined,
});

const { setArticleTitle, clearArticleTitle } = useAuthModal();

watch(
  () => article.value?.title,
  (title) => {
    if (title) setArticleTitle(title);
    else clearArticleTitle();
  },
  { immediate: true },
);

onBeforeUnmount(clearArticleTitle);
</script>

<template>
  <div class="article-detail">
    <NuxtLink to="/" class="article-detail__back">
      <span>←</span>
      Back to News
    </NuxtLink>

    <div v-if="status === 'pending'" class="article-detail__loader">
      <div class="skeleton skeleton--title" />
      <div class="skeleton skeleton--image" />
      <div class="skeleton skeleton--text" />
      <div class="skeleton skeleton--text skeleton--text-short" />
    </div>

    <div v-else-if="status === 'error'" class="article-detail__error">
      <p>Failed to load the article. Please try again later.</p>
      <NuxtLink to="/" class="article-detail__back-btn"
        >Return to Home</NuxtLink
      >
    </div>

    <article v-else-if="article" class="article-detail__content">
      <div class="article-detail__meta">
        <span class="article-detail__source">{{ article.source_name }}</span>
        <span class="article-detail__dot">·</span>
        <time class="article-detail__date">{{
          article.pubDate.slice(0, 10)
        }}</time>
        <span v-if="article.language" class="article-detail__lang">
          {{ article.language.toUpperCase() }}
        </span>
      </div>

      <h1 class="article-detail__title">{{ article.title }}</h1>

      <div class="article-detail__categories">
        <span
          v-for="cat in article.category"
          :key="cat"
          class="article-detail__category"
        >
          {{ cat }}
        </span>
      </div>

      <div v-if="article.image_url" class="article-detail__image-wrap">
        <NuxtImg
          :src="article.image_url"
          :alt="article.title!"
          class="article-detail__image"
          width="1280"
          height="720"
          sizes="sm:100vw md:780px"
          loading="eager"
        />
      </div>

      <p v-if="article.description" class="article-detail__description">
        {{ article.description }}
      </p>

      <a
        v-if="article.link"
        :href="article.link"
        target="_blank"
        rel="noopener noreferrer"
        class="article-detail__read-more"
      >
        Read full article
        <span>→</span>
      </a>
    </article>

    <div v-else class="article-detail__error">
      <p>Article not found.</p>
      <NuxtLink to="/" class="article-detail__back-btn"
        >Return to Home</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-detail {
  max-width: var(--size-article-max);
  margin: 0 auto;
}

.article-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-neutral-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-xl);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-accent-500);
  }
}

.article-detail__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.article-detail__meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.article-detail__source {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-500);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.article-detail__dot {
  color: var(--color-neutral-400);
}

.article-detail__date {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-400);
}

.article-detail__lang {
  font-size: var(--font-size-xs);
  color: var(--color-white);
  background-color: var(--color-primary-700);
  padding: var(--space-2xs) var(--space-xs);
  border-radius: var(--radius-sm);
  letter-spacing: var(--letter-spacing-wider);
}

.article-detail__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
  line-height: 1.25;
  letter-spacing: var(--letter-spacing-tight);

  @media (max-width: 40rem) {
    font-size: var(--font-size-lg);
  }
}

.article-detail__categories {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.article-detail__category {
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
  background-color: var(--color-neutral-50);
  border: var(--border-width) solid var(--color-neutral-200);
  padding: var(--space-2xs) var(--space-sm);
  border-radius: var(--radius-sm);
  text-transform: capitalize;
}

.article-detail__image-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.article-detail__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.article-detail__description {
  font-size: var(--font-size-md);
  color: var(--color-neutral-500);
  line-height: 1.75;
  border-left: var(--border-width-thick) solid var(--color-accent-500);
  padding-left: var(--space-lg);
}

.article-detail__read-more {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-accent-500);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition:
    background-color var(--transition-fast),
    transform var(--transition-fast);
  align-self: flex-start;

  &:hover {
    background-color: var(--color-accent-600);
    transform: translateY(-1px);
  }
}

.article-detail__loader {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.skeleton {
  border-radius: var(--radius-sm);
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-skeleton-shimmer-mid) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  &--title {
    height: var(--size-skeleton-title);
    width: 80%;
  }

  &--image {
    height: var(--size-skeleton-image);
    border-radius: var(--radius-md);

    @media (max-width: 40rem) {
      height: var(--size-skeleton-image-sm);
    }
  }

  &--text {
    height: var(--size-skeleton-text);
  }

  &--text-short {
    width: 60%;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.article-detail__error {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--color-neutral-500);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.article-detail__back-btn {
  padding: var(--space-sm) var(--space-lg);
  background-color: var(--color-primary-900);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-700);
  }
}
</style>
