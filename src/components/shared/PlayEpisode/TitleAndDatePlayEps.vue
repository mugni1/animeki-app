<template>
  <div
    class="p-3 rounded-md bg-gray-900/5 border border-gray-900/40 dark:bg-white/5 dark:border-white/40"
  >
    <h1 class="text-base lg:text-lg font-bold line-clamp-1 text-emerald-500">{{ title }}</h1>
    <p class="text-sm lg:text-base line-clamp-1 text-gray-900/80 dark:text-white/80">
      Updated : {{ date }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { title, date } = defineProps<{ title: string; date: string }>()
</script>
