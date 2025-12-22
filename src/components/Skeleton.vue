<script setup lang="ts">
// models
interface Props {
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  borderRadius?: string;
}

// props
const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  variant: 'rectangular',
  borderRadius: '0.25rem',
});

// computed
const getBorderRadius = () => {
  if (props.variant === 'circular') return '50%';
  if (props.variant === 'text') return '0.25rem';
  return props.borderRadius;
};
</script>

<template>
  <div
    class="skeleton"
    :style="{
      width: props.width,
      height: props.height,
      borderRadius: getBorderRadius(),
    }"
  />
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors';

.skeleton {
  background: linear-gradient(
    90deg,
    colors.$color-light-gray-100 0%,
    colors.$color-light-gray-200 50%,
    colors.$color-light-gray-100 100%
  );
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
