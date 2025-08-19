<template>
  <section>
    <div class="flex items-center justify-between">
      <b class="mb-2 text-base flex items-center text-emerald-500 border-b pe-5 gap-2"><i :class="icon"></i> {{ title }}</b>
      <RouterLink v-if="showMore" :to="type">
        <b class="text-base border-b ps-5 text-sky-500 mb-2 gap-2 flex items-center"> <i class="pi pi-external-link"></i> Show more </b>
      </RouterLink>
    </div>
    <section class="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
      <CardAnime
        v-for="(anime, index) in animes"
        :slug="anime.slug"
        :status="type"
        :key="index"
        :title="anime.title"
        :eps="anime?.episode || ''"
        :type="anime?.type_station || ''"
        :cover="anime.cover"
      />
    </section>
  </section>
</template>

<script setup lang="ts">
import type { AnimeItem } from '@/types/home'
import CardAnime from '../CardAnime.vue'

const { animes, title, icon, type } = defineProps<{
  animes: AnimeItem[]
  title: string
  icon: string
  type: 'completed' | 'ongoing' | 'recomendation'
  showMore?: boolean
}>()
</script>
