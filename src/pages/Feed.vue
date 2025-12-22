<script setup lang="ts">
// components
import NewsList from '@/components/NewsList.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
</script>

<template>
  <div class="feed-wrapper">
    <h1>Last news</h1>

    <NewsList />
    <ScrollToTop />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/typography';
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

div.feed-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  width: 100%;
  max-width: variables.$max-content-width;
  margin: 0 auto;
  padding: 3rem 2rem 4.5rem;

  @include mixins.for-md-width {
    gap: 2rem;
    padding: 2rem 1.5rem 3rem;
  }

  @include mixins.for-sm-width {
    gap: 1.5rem;
    padding: 1.5rem 1rem 2rem;
  }

  h1 {
    @include typography.h1;
  }
}
</style>
