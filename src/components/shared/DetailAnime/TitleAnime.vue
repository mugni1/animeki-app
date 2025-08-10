<template>
  <h1 class="block lg:hidden text-2xl font-bold mb-2 line-clamp-1">
    {{ title }}
  </h1>
</template>
<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>
