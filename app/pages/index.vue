<script setup lang="ts">
const pageStack = ref<(string | null)[]>([null]);
const currentPageIndex = ref(0);

const currentToken = computed(() => pageStack.value[currentPageIndex.value]);

const { data, status } = useFetchArticles(currentToken);

const articles = computed(() => data.value?.articles ?? []);

const canGoNext = computed(() => !!data.value?.nextPage);
const canGoPrev = computed(() => currentPageIndex.value > 0);

function goNext() {
  const nextToken = data.value?.nextPage;
  if (!nextToken) return;
  if (currentPageIndex.value === pageStack.value.length - 1) {
    pageStack.value = [...pageStack.value, nextToken];
  }
  currentPageIndex.value++;
}

function goPrev() {
  if (currentPageIndex.value === 0) return;
  currentPageIndex.value--;
}

useSeoMeta({
  title: "NewsHub — Latest News",
  description: "Stay up to date with the latest news from around the world.",
});
</script>

<template>
  <div class="news-list">
    <div class="news-list__header">
      <h1 class="news-list__title">Latest News</h1>
      <p class="news-list__subtitle">
        Stories from around the world, updated in real time
      </p>
    </div>

    <div v-if="status === 'pending'" class="news-list__loader">
      <div class="news-list__loader-grid">
        <div v-for="n in 10" :key="n" class="skeleton-card" />
      </div>
    </div>

    <div v-else-if="status === 'error'" class="news-list__error">
      <p>Failed to load articles. Please try again later.</p>
    </div>

    <div v-else>
      <div class="news-list__grid">
        <ArticleCard
          v-for="article in articles"
          :key="article.article_id"
          :article="article"
        />
      </div>

      <ThePagination
        :can-go-prev="canGoPrev"
        :can-go-next="canGoNext"
        @prev="goPrev"
        @next="goNext"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-list__header {
  margin-bottom: var(--space-xl);
}

.news-list__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-900);
  letter-spacing: var(--letter-spacing-tight);

  @media (max-width: 40rem) {
    font-size: var(--font-size-lg);
  }
}

.news-list__subtitle {
  margin-top: var(--space-xs);
  font-size: var(--font-size-base);
  color: var(--color-neutral-500);
}

.news-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--size-card-min), 1fr));
  gap: var(--space-lg);

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
  }
}

.news-list__loader-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--size-card-min), 1fr));
  gap: var(--space-lg);

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
  }
}

.skeleton-card {
  height: var(--size-skeleton-card);
  border-radius: var(--radius-md);
  background: linear-gradient(
    90deg,
    var(--color-neutral-200) 25%,
    var(--color-skeleton-shimmer-mid) 50%,
    var(--color-neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.news-list__error {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--color-neutral-500);
}
</style>
