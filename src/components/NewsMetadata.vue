<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs/esm';

// assets
import CalendarIcon from '@/assets/icons/calendar-icon.svg?component';

// models
interface Props {
  createdAt: number;
  author: string;
}

// props
const props = defineProps<Props>();

// computed
const formattedDate = computed(() => dayjs(props.createdAt).format('DD.MM.YYYY'));
</script>

<template>
  <p class="metadata">
    <CalendarIcon />
    <span>{{ formattedDate }}</span>
    <span class="delimiter" />
    <span>written by {{ author }}</span>
  </p>
</template>

<style scoped lang="scss">
@use '@/assets/styles/typography';
@use '@/assets/styles/colors';

.metadata {
  @include typography.small-text-regular;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: colors.$color-light-gray-200;

  .delimiter {
    width: 1px;
    height: 0.75rem;
    background: colors.$color-light-gray-200;
  }
}
</style>
