<script setup lang="ts">

</script>

<template>
  <header>
    <div class="header-content">
      <img src="/img/logo.webp" alt="Test logo" :width="120" :height="32" />

      <div class="user">
        <p>Ronnie Radke</p>
        <img src="/img/avatar.jpg" alt="Test logo" loading="lazy" :width="44" :height="44" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';
@use '@/assets/styles/typography';
@use '@/assets/styles/colors';
@use '@/assets/styles/mixins';

header {
  box-shadow: 0 4px 10px 0 colors.$color-shadow;

  div.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: variables.$max-content-width;
    margin: 0 auto;
    padding: 1.375rem 2rem;

    @include mixins.for-md-width {
      padding: 1rem 1.5rem;
    }

    @include mixins.for-sm-width {
      padding: 0.875rem 1rem;
    }

    div.user {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      @include mixins.for-sm-width {
        gap: 0.5rem;
      }

      p {
        @include typography.main-text-regular;

        @include mixins.for-sm-width {
          display: none;
        }
      }

      img {
        object-fit: cover;
        border-radius: 50%;

        @include mixins.for-sm-width {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>
