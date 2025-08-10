<template>
  <section
    class="w-full fixed top-0 z-50 dark:bg-gray-900 bg-white backdrop-blur-md h-15 flex items-center"
  >
    <nav class="container mx-auto px-3 flex items-center justify-between">
      <div class="w-2/12 flex items-center gap-2">
        <b>Animeki</b>
      </div>
      <div class="h-full items-center gap-5 text-sm hidden lg:flex">
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/ongoing"> Ongoing </RouterLink>
        <RouterLink to="/completed"> Completed </RouterLink>
        <RouterLink to="/favorite"> Favorite </RouterLink>
      </div>
      <div class="lg:w-2/12 w-6/12 flex justify-end gap-2">
        <Button type="button" variant="outlined" severity="secondary" icon="pi pi-search" />
        <div class="lg:hidden">
          <Button
            type="button"
            variant="outlined"
            severity="secondary"
            icon="pi pi-bars"
            @click="toggle"
          />
          <Menu class="!bg-gray-900" ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { Button, Menu } from 'primevue'
import { ref } from 'vue'

const menu = ref()
const items = ref([
  {
    label: 'Menu',
    items: [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Ongoing',
        icon: 'pi pi-clock',
      },
      {
        label: 'Completed',
        icon: 'pi pi-check-circle',
      },
      {
        label: 'Bookmark',
        icon: 'pi pi-bookmark',
      },
    ],
  },
])

const toggle = (event: unknown) => {
  menu.value.toggle(event)
}
</script>
