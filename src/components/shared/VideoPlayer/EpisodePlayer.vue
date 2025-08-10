<template>
  <div class="border border-gray-900/40 dark:border-white/40 p-2 rounded-md relative">
    <!-- Spinner overlay -->
    <div
      v-if="isLoading"
      class="absolute inset-2 rounded flex items-center justify-center bg-black/70 backdrop-blur-md z-10"
    >
      <span
        class="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"
      ></span>
    </div>

    <!-- Iframe selalu ada -->
    <iframe
      :src="src"
      class="w-full aspect-video rounded"
      frameborder="0"
      allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      @load="isLoading = false"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { src } = defineProps({
  src: { type: String, required: true },
})

const isLoading = ref(true)
watch(
  () => src,
  () => {
    isLoading.value = true
  },
)
</script>
