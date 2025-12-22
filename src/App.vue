<script setup lang="ts">
// components
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header />

  <main>
    <router-view />
  </main>

  <Footer />
</template>

<style scoped>
main {
  flex: 1;
}
</style>
