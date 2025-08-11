import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDark = ref(true)

  const changeToDarkMode = () => {
    document.documentElement.classList.add('my-app-dark')
    isDark.value = true
  }
  const changeToLightMode = () => {
    document.documentElement.classList.remove('my-app-dark')
    isDark.value = false
  }

  return { isDark, changeToDarkMode, changeToLightMode }
})
