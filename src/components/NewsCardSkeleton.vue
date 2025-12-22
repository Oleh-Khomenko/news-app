<script setup lang="ts">
// components
import Skeleton from '@/components/Skeleton.vue';
</script>

<template>
  <article class="news-card-skeleton">
    <Skeleton height="15rem" border-radius="0.5rem" />
    <div class="content">
      <Skeleton width="80%" height="2rem" />
      <Skeleton height="1.25rem" />
      <Skeleton width="60%" height="1.25rem" />
      <Skeleton width="40%" height="1rem" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.news-card-skeleton {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
