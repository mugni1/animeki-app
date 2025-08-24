<template>
  <div>
    <RouterLink :to="`/detail/${props.slug}`">
      <div class="h-auto rounded-md overflow-hidden mb-2 relative cursor-pointer">
        <img :src="cover" alt="" class="w-full h-full object-center object-cover" />
        <div class="hover:bg-black/30 absolute -inset-1 hover:backdrop-blur-sm transition-all flex items-center justify-center group">
          <span
            class="hidden group-hover:flex group-hover:translate-0 translate-y-40 transition-all flex-col gap-3 justify-center items-center text-white"
          >
            <IconPlayCircle class="size-15" />
            <b>Play Anime</b>
          </span>
        </div>
      </div>
    </RouterLink>
    <div class="space-y-2">
      <div class="flex items-center overflow-hidden gap-3">
        <div class="relative flex items-center justify-center ms-2">
          <span
            :class="[
              'absolute h-2 w-2 rounded-full animate-ping',
              { 'bg-yellow-500/70': props.status == 'recomendation' },
              { 'bg-green-500/70': props.status == 'completed' },
              { 'bg-sky-500/70': props.status == 'ongoing' },
            ]"
          ></span>
          <span
            :class="[
              'absolute h-2 w-2 rounded-full',
              { 'bg-yellow-500': props.status == 'recomendation' },
              { 'bg-green-500': props.status == 'completed' },
              { 'bg-sky-500': props.status == 'ongoing' },
            ]"
          ></span>
        </div>
        <b class="overflow-hidden text-nowrap text-ellipsis text-xs lg:text-sm">
          {{ props.title }}
        </b>
      </div>
      <div class="gap-2 flex items-center">
        <span
          v-if="props.type"
          class="px-2 py-1 text-xs dark:bg-gray-700/80 bg-gray-700/20 text-black dark:text-white rounded font-semibold flex items-center gap-1"
        >
          {{ props.type }}
        </span>
        <span
          v-if="props.eps"
          class="px-2 py-1 text-xs dark:bg-gray-700/80 bg-gray-700/20 text-black dark:text-white rounded font-semibold flex items-center gap-1"
        >
          <i class="pi pi-angle-double-right"></i> {{ props.eps }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import IconPlayCircle from '../icon/IconPlayCircle.vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  status: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  eps: { type: String, required: true },
  cover: { type: String, required: true },
  slug: { type: String, required: true },
})
</script>
