<template>
  <section class="flex flex-col gap-2">
    <InputText
      size="small"
      variant="filled"
      placeholder="Search episode..."
      class="!bg-gray-900/5 dark:!bg-white/5 !rounded !border-gray-900/40 dark:!border-white/40 focus:!border-emerald-500"
      v-model="searchKeyword as string"
    />

    <p v-if="!episodeFilter || episodeFilter.length < 1" class="w-full text-center pt-2">
      No episodes found
    </p>

    <!-- list episode  -->
    <div
      class="max-h-[40vh] lg:max-h-[80vh] overflow-y-auto custom-scrollbar flex pe-2 flex-col gap-2 rounded"
    >
      <CardEpisode
        v-for="(episode, index) in episodeFilter"
        :key="index"
        :cover="cover"
        :date="episode.episode_date"
        :title="episode.episode_title"
        :slug="episode.episode_slug"
        :episode="episode.episode_number"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { InputText } from 'primevue'
import CardEpisode from './CardEpisode.vue'
import type { Episode } from '@/types/episode'

const searchKeyword = defineModel('searchKeyword')
const episodeFilter = defineModel<Episode[]>('episodeFilter')
const { cover } = defineProps({
  cover: { required: true, type: String },
})
</script>
