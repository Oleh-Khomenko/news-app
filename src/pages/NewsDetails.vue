<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// components
import Image from '@/components/Image.vue';
import Skeleton from '@/components/Skeleton.vue';
import NewsMetadata from '@/components/NewsMetadata.vue';

// hooks
import useNewsDetails from '@/composables/use-news-details';

// router
const route = useRoute();
const newsId = computed(() => Number(route.params.id));

// data
const { data: news, isLoading } = useNewsDetails(newsId.value);
</script>

<template>
  <div class="news-details-wrapper">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <RouterLink to="/">Last news</RouterLink>
      <span>/</span>
      <span>News details</span>
    </nav>

    <!-- Loading skeleton -->
    <template v-if="isLoading">
      <Skeleton height="25rem" border-radius="0.5rem" />
      <Skeleton height="3rem" width="80%" />
      <Skeleton height="1.5rem" width="40%" />
      <div class="content-skeleton">
        <Skeleton height="1.25rem" />
        <Skeleton height="1.25rem" />
        <Skeleton height="1.25rem" width="70%" />
      </div>
    </template>

    <!-- Content -->
    <div v-else-if="news" class="content">
      <!-- Banner -->
      <Image
        :src="news.image"
        :alt="news.title"
        height="25rem"
        border-radius="0.5rem"
      />

      <!-- Title -->
      <h1>{{ news.title }}</h1>

      <!-- Metadata -->
      <NewsMetadata :created-at="news.createdAt" :author="news.author" />

      <!-- Article content -->
      <article class="article-content">
        <template v-for="(item, index) in news.content" :key="index">
          <p v-if="item.type === 'paragraph'">{{ item.text }}</p>
          <blockquote v-else-if="item.type === 'quote'">
            {{ item.text }}
          </blockquote>
          <Image
            v-else-if="item.type === 'image'"
            height="35rem"
            :src="item.url"
            :alt="item.alt || 'Article image'"
          />
        </template>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/typography';
@use '@/assets/styles/colors';
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.news-details-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  width: 100%;
  max-width: variables.$max-content-width;
  margin: 0 auto;
  padding: 3rem 2rem 4.5rem;

  @include mixins.for-md-width {
    gap: 1.5rem;
    padding: 2rem 1.5rem 3rem;
  }

  @include mixins.for-sm-width {
    gap: 1.25rem;
    padding: 1.5rem 1rem 2rem;
  }

  .breadcrumbs {
    @include typography.main-text-regular;

    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: colors.$color-light-gray-200;

    a {
      color: colors.$color-purple;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .content-skeleton {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  div.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      @include typography.h1;
    }

    .article-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1rem;

      @include mixins.for-md-width {
        gap: 1.25rem;
      }

      p {
        @include typography.main-text-regular;
      }

      blockquote {
        @include typography.main-text-bold;

        margin: 0;
        padding-left: 0.5rem;
        border-left: 0.125rem solid colors.$color-purple;
      }

      img {
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
        object-fit: cover;
      }
    }
  }
}
</style>
