import { createRouter, createWebHistory } from 'vue-router';

// components
import Feed from '@/pages/Feed.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Feed },
  ],
});

export default router;
