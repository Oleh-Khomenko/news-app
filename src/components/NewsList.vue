<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

// hooks
import useInfiniteNews from '@/composables/use-infinite-news.ts';

// components
import NewsCard from '@/components/NewsCard.vue';
import NewsCardSkeleton from '@/components/NewsCardSkeleton.vue';

// common
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteNews();

// computed
const items = computed(() => data.value?.pages.flatMap((page) => page.data) || []);

// refs
const loadMoreTrigger = ref<HTMLElement | null>(null);

// lifecycle
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
        fetchNextPage();
      }
    },
    {
      rootMargin: '100px',
    }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <div>
    <div class="news-list">
      <NewsCard
        v-for="item in items"
        class="news-item"
        :data="item"
        :key="item.id"
      />
      <NewsCardSkeleton
        v-for="n in (isLoading || isFetchingNextPage) ? 3 : 0"
        :key="`skeleton-${n}`"
      />
    </div>
    <div ref="loadMoreTrigger" class="load-more-trigger" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/mixins';

.news-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.875rem;
  row-gap: 2.5rem;

  @include mixins.for-lg-width {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
    row-gap: 2rem;
  }

  @include mixins.for-md-width {
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1.5rem;
  }
}

.load-more-trigger {
  height: 1px;
  margin-top: 2.5rem;

  @include mixins.for-lg-width {
    margin-top: 2rem;
  }

  @include mixins.for-md-width {
    margin-top: 1.5rem;
  }
}
</style>
