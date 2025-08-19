import type { AnimeItem } from '@/types/home'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookmark = defineStore(
  'counter',
  () => {
    const animes = ref<AnimeItem[]>([])

    const setAnime = (data: AnimeItem) => {
      if (animes.value.find((item) => item.title == data.title)) {
        const index = animes.value.findIndex((item) => item.title == data.title)
        animes.value[index] = data
      } else {
        animes.value.push(data)
      }
    }

    return { animes, setAnime }
  },
  { persist: true },
)
