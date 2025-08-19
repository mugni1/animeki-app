import BookmarkView from '@/views/BookmarkView.vue'
import CompletedAnime from '@/views/CompletedAnime.vue'
import DetailView from '@/views/DetailView.vue'
import GenreAnimeView from '@/views/Genres/GenreAnimeView.vue'
import GenreView from '@/views/Genres/GenreView.vue'
import HomeView from '@/views/HomeView.vue'
import OngoingView from '@/views/OngoingView.vue'
import PlayView from '@/views/PlayView.vue'
import SearchView from '@/views/SearchView.vue'
import AnimeByStudioView from '@/views/Studios/AnimeByStudioView.vue'
import StudioView from '@/views/Studios/StudioView.vue'
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
    { path: '/search', name: 'search', component: SearchView },
    { path: '/genre', name: 'genre', component: GenreView },
    { path: '/genre/:slug', name: 'genre-anime', component: GenreAnimeView },
    { path: '/studio', name: 'studio', component: StudioView },
    { path: '/studio/:slug', name: 'anime-by-genre', component: AnimeByStudioView },
    { path: '/bookmark', name: 'bookmark', component: BookmarkView },
  ],
})

export default router
