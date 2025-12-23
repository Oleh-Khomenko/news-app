<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// assets
import ArrowUpIcon from '@/assets/icons/arrow-up.svg?component';

// refs
const isVisible = ref<boolean>(false);

// helpers
function handleScroll(): void {
  isVisible.value = document.body.scrollTop > 300;
}

function scrollToTop(): void {
  document.body.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// lifecycle hooks
onMounted(() => {
  document.body.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.body.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <Transition name="fade">
    <button v-if="isVisible" class="scroll-to-top" @click="scrollToTop">
      <ArrowUpIcon />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors';
@use '@/assets/styles/mixins';

.scroll-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;

  color: white;
  background: colors.$color-purple;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 12px colors.$color-shadow;
  transition: transform 0.3s ease-in-out;

  cursor: pointer;

  @include mixins.for-md-width {
    right: 1.5rem;
    bottom: 1.5rem;
    width: 2.75rem;
    height: 2.75rem;
  }

  @include mixins.for-sm-width {
    right: 1rem;
    bottom: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
