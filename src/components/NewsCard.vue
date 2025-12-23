<script setup lang="ts">
// components
import Image from '@/components/Image.vue';
import NewsMetadata from '@/components/NewsMetadata.vue';

// models
import type { NewsPreview } from '@/shared/models/news-details.ts';

// custom models
interface Props {
  data: NewsPreview,
  priority?: boolean,
}

// props
defineProps<Props>();
</script>

<template>
  <article class="news-card-wrapper">
    <RouterLink class="link" :to="`/news/${data.id}`">
      <Image scale-animation height="15rem" border-radius="0.5rem" :src="data.image" :alt="data.title" :priority="priority" />
    </RouterLink>

    <div class="content">
      <RouterLink class="link" :to="`/news/${data.id}`">
        <h2>{{ data.title }}</h2>
      </RouterLink>
      <p class="description">{{ data.description }}</p>
      <NewsMetadata :created-at="data.createdAt" :author="data.author" />
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '@/assets/styles/typography';
@use '@/assets/styles/colors';

article.news-card-wrapper {

  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;


  .link {
    display: flex;
    color: colors.$color-purple;
  }

  div.content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
      @include typography.h2;
    }

    p.description {
      @include typography.main-text-regular;
    }
  }
}
</style>
