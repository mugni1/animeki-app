<template>
  <div class="w-full rounded-md overflow-hidden">
    <img :src="props.image_src" alt="" class="w-full" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image_src: { required: true, type: String },
})
</script>
