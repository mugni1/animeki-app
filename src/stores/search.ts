import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore(
  'store',
  () => {
    const keyword = ref('')
    const inputKeyword = ref('')

    const updateKeyword = () => {
      keyword.value = inputKeyword.value
    }

    return { keyword, inputKeyword, updateKeyword }
  },
  { persist: true },
)
