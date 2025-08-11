<template>
  <BaseNavbar />
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import BaseNavbar from '@/components/shared/BaseNavbar.vue'
import { useAppStore } from './stores/app'

const appStore = useAppStore()

onMounted(() => {
  if (appStore.isDark) {
    document.documentElement.classList.add('my-app-dark')
  } else {
    document.documentElement.classList.remove('my-app-dark')
  }
})
</script>
