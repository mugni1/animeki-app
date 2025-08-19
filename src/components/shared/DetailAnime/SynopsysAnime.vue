<template>
  <section class="border border-gray-900/40 dark:border-white/40 p-2 my-3 rounded-md">
    <h3
      class="font-bold text-base lg:text-xl pb-2 border-b mb-2 border-gray-900/40 dark:border-white/40"
    >
      <i class="pi pi-book"></i> Sinopsys
    </h3>
    <div
      class="max-h-[20vh] w-full pe-2 overflow-y-auto custom-scrollbar text-sm text-shadow-gray-900/80 dark:text-white/80 font-medium"
    >
      <p>{{ content }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { content } = defineProps<{ content: string }>()
</script>
