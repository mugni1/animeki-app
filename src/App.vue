<template>
  <BaseNavbar />
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/app'
import BaseNavbar from './components/layouts/BaseNavbar.vue'

const appStore = useAppStore()

onMounted(() => {
  if (appStore.isDark) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
})
</script>
