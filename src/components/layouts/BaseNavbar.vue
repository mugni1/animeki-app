<template>
  <section
    class="w-full fixed top-0 z-50 dark:bg-gray-900/50 bg-white/50 backdrop-blur-md h-15 flex items-center"
  >
    <nav class="container mx-auto ps-2 pe-3 flex items-center justify-between">
      <div class="w-2/12">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="/pwa-192x192.png" alt="logo" class="h-10 aspect-square" /> <b>ANIMEKI</b>
        </RouterLink>
      </div>
      <div class="h-full items-center gap-5 text-sm hidden lg:flex">
        <RouterLink
          :to="item.to"
          v-for="(item, index) in items[0].items"
          :key="index"
          class="flex items-center gap-2 transition-all duration-300"
          :class="item.to == $route.fullPath && 'text-emerald-500'"
        >
          <i :class="item.icon"></i> {{ item.label }}
        </RouterLink>
      </div>
      <div class="lg:w-2/12 w-6/12 flex justify-end gap-2">
        <Button
          v-if="appStore.isDark"
          :unstyled="true"
          class="btn-play h-10 w-10 !rounded-full !p-0 flex items-center justify-center"
          icon="pi pi-moon"
          @click="appStore.changeToLightMode"
        />
        <Button
          v-else
          :unstyled="true"
          class="btn-play h-10 w-10 !rounded-full !p-0 flex items-center justify-center"
          icon="pi pi-sun"
          @click="appStore.changeToDarkMode"
        />
        <Button
          :unstyled="true"
          class="btn-play h-10 w-10 !rounded-full !p-0 flex items-center justify-center"
          icon="pi pi-search"
          @click="router.push({ name: 'search' })"
        />
        <div class="lg:hidden">
          <Button
            :unstyled="true"
            class="btn-play h-10 w-10 !rounded-full !p-0 flex items-center justify-center"
            icon="pi pi-bars"
            @click="toggle"
          />
          <Menu
            class="dark:!bg-gray-900"
            ref="menu"
            id="overlay_menu"
            :model="items"
            :popup="true"
            :router="true"
          />
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { Button, Menu } from 'primevue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
// const route = useRoute()
const menu = ref()
const items = ref([
  {
    label: 'Menu',
    items: [
      {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/',
        // get class() {
        //   return `flex items-center gap-2 transition-all duration-300 ${route.currentRoute.value.fullPath == '/' ? 'text-emerald-500' : ''}`
        // },
        command: () => router.push('/'),
      },
      {
        label: 'Ongoing',
        icon: 'pi pi-clock',
        to: '/ongoing',
        command: () => router.push('/ongoing'),
      },
      {
        label: 'Completed',
        icon: 'pi pi-check-circle',
        to: '/completed',
        command: () => router.push('/completed'),
      },
      {
        label: 'Genre',
        icon: 'pi pi-th-large',
        to: '/genre',
        command: () => router.push('/genre'),
      },
      {
        label: 'Studio',
        icon: 'pi pi-building',
        to: '/studio',
        command: () => router.push('/studio'),
      },
      {
        label: 'Bookmark',
        icon: 'pi pi-bookmark',
        to: '/bookmark',
        command: () => router.push('/bookmark'),
      },
    ],
  },
])

const toggle = (event: unknown) => {
  menu.value.toggle(event)
}

const appStore = useAppStore()
</script>
