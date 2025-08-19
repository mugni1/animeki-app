import type { AnimeItem } from '@/types/home'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookmark = defineStore(
  'counter',
  () => {
    const listAnime = ref<AnimeItem[]>([])

    const setAnime = (data: AnimeItem) => {
      if (listAnime.value.find((item) => item.title == data.title)) {
        const index = listAnime.value.findIndex((item) => item.title == data.title)
        listAnime.value[index] = data
      } else {
        listAnime.value.push(data)
      }
    }

    const removeAnime = (data: AnimeItem) => {
      const index = listAnime.value.findIndex((item) => item.title == data.title)
      if (index !== -1) {
        listAnime.value.splice(index, 1) // hapus 1 elemen di posisi index
      }
    }

    return { listAnime, setAnime, removeAnime }
  },
  { persist: true },
)
