import { createRouter, createWebHistory } from 'vue-router';

// components
import Feed from '@/pages/Feed.vue';
import NewsDetails from '@/pages/NewsDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Feed },
    { path: '/news/:id', name: 'news-details', component: NewsDetails },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
