<template>
  <RouterLink :to="'/play/' + slug">
    <div class="card-secondary flex gap-2 !p-0 group">
      <div class="lg:w-2/12 w-4/12 aspect-square overflow-hidden relative rounded-l">
        <img :src="cover" class="object-cover object-top w-full h-full" />
        <div
          class="absolute rounded-l -inset-1 items-center justify-center hidden group-hover:flex backdrop-blur-sm transition-all duration-700 ease-linear"
        >
          <IconPlayCircle class="size-20" />
        </div>
      </div>
      <div
        class="w-10/12 flex flex-col py-2 justify-between group-hover:text-emerald-500 text-sm md:text-base"
      >
        <div class="flex flex-col">
          <b class="line-clamp-1">{{ title }}</b>
          <b class="line-clamp-1">Episode {{ episode }}</b>
        </div>
        <p class="line-clamp-1">{{ date }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import IconPlayCircle from '@/components/icon/IconPlayCircle.vue'
import { RouterLink } from 'vue-router'

const { title, date, episode, slug, cover } = defineProps({
  cover: { required: true, type: String },
  title: { required: true, type: String },
  episode: { required: true, type: String },
  date: { required: true, type: String },
  slug: { required: true, type: String },
})
</script>
