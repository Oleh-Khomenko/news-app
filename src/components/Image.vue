<script setup lang="ts">
import { ref } from 'vue';

// components
import Skeleton from '@/components/Skeleton.vue';

// models
interface Props {
  src: string;
  alt: string;
  height?: string;
  borderRadius?: string;
}

// props
const props = withDefaults(defineProps<Props>(), {
  height: '15rem',
  borderRadius: '0.5rem',
});

// refs
const isLoading = ref(true);
const hasError = ref(false);

// methods
const onLoad = () => {
  isLoading.value = false;
};

const onError = () => {
  isLoading.value = false;
  hasError.value = true;
};
</script>

<template>
  <div class="image-wrapper">
    <Skeleton
      v-if="isLoading && !hasError"
      :height="props.height"
      :border-radius="props.borderRadius"
    />
    <div
      v-else-if="hasError"
      class="image-error"
      :style="{
        height: props.height,
        borderRadius: props.borderRadius,
      }"
    >
      No image available
    </div>
    <img
      v-show="!isLoading && !hasError"
      :src="props.src"
      :alt="props.alt"
      :style="{
        height: props.height,
        borderRadius: props.borderRadius,
      }"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors';
@use '@/assets/styles/typography';

.image-wrapper {
  width: 100%;

  img {
    display: block;
    width: 100%;
    object-fit: cover;
  }

  .image-error {
    @include typography.main-text-regular;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    color: colors.$color-light-gray-200;
    background: colors.$color-light-gray-100;
  }
}
</style>
