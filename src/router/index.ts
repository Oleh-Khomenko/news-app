import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Feed.vue'),
    },
    {
      path: '/news/:id',
      name: 'news-details',
      component: () => import('@/pages/NewsDetails.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
