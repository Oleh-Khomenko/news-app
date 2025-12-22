<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

// assets
import CalendarIcon from '@/assets/icons/calendar-icon.svg?component';

// components
import Image from '@/components/Image.vue';

// models
import type { NewsPreview } from '@/shared/models/news-details.ts';

// custom models
interface Props {
  data: NewsPreview,
}

// props
const props = defineProps<Props>();

// computed
const formattedDate = computed(() => dayjs(props.data.createdAt).format('DD.MM.YYYY'));
</script>

<template>
  <article class="news-card-wrapper">
    <RouterLink class="link" :to="`/news/${data.id}`">
      <Image :src="data.image" :alt="data.title" height="15rem" border-radius="0.5rem" />
    </RouterLink>

    <div class="content">
      <RouterLink class="link" :to="`/news/${data.id}`">
        <h2>{{ data.title }}</h2>
      </RouterLink>
      <p class="description">{{ data.description }}</p>
      <p class="date">
        <CalendarIcon />
        <span>{{ formattedDate }}</span>
        <span class="delimiter" />
        <span>written by {{ data.author }}</span>
      </p>
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

    p.date {
      @include typography.small-text-regular;

      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: colors.$color-light-gray-200;

      span.delimiter {
        width: 1px;
        height: 0.75rem;
        background: colors.$color-light-gray-200;
      }
    }
  }
}
</style>
