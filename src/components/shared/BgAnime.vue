<template>
  <div
    class="bg-gradient-to-b backdrop-blur from-white/50 dark:from-gray-900/70 to-white dark:to-gray-900 absolute z-30 top-0 left-0 right-0 -bottom-2"
  ></div>
  <img
    class="object-cover object-center w-full h-full absolute z-20"
    :src="props.image_src"
    alt="cover image"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  image_src: { required: true, type: String },
})
</script>
