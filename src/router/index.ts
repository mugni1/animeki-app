import CompletedAnime from '@/views/CompletedAnime.vue'
import DetailView from '@/views/DetailView.vue'
import HomeView from '@/views/HomeView.vue'
import OngoingView from '@/views/OngoingView.vue'
import PlayView from '@/views/PlayView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/detail/:slug', name: 'detail-anime', component: DetailView },
    { path: '/play/:slug', name: 'play-episode', component: PlayView },
    { path: '/ongoing', name: 'ongoing', component: OngoingView },
    { path: '/completed', name: 'completed', component: CompletedAnime },
  ],
})

export default router
