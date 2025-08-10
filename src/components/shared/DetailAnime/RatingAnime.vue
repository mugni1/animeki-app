<script setup lang="ts">
import { Rating } from 'primevue'

const props = defineProps({
  rating: { required: true, type: Number },
})
</script>

<template>
  <section class="flex lg:hidden items-center gap-2 justify-center">
    <Rating name="Rating" :default-value="props.rating" :stars="10" readonly />
    <span class="font-bold"> / {{ props.rating }}</span>
  </section>
</template>
