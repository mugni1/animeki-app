<template>
  <div class="relative">
    <div
      v-if="isLoading"
      class="w-full aspect-video flex items-center justify-center bg-black/70 backdrop-blur-md z-10 absolute rounded"
    >
      <span
        class="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"
      ></span>
    </div>
    <iframe
      class="w-full aspect-video rounded"
      :src="'https://www.youtube.com/embed/' + src"
      frameborder="0"
      allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      @load="isLoading = false"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const { src } = defineProps({
  src: { required: true, type: String },
})

const isLoading = ref(true)
watch(
  () => src,
  () => {
    isLoading.value = true
  },
)
</script>
