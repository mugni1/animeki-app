<template>
  <div class="w-full flex gap-5">
    <button
      class="flex items-center gap-2 text-base cursor-pointer font-semibold border-b-2 transition-all duration-300"
      :class="
        tab_active == 'trailer' ? 'border-emerald-500 text-emerald-500' : 'border-transparent'
      "
      @click="emits('changeToTrailer')"
    >
      <i class="pi pi-youtube"></i> Trailer
    </button>
    <button
      class="flex items-center gap-2 text-base cursor-pointer font-semibold border-b-2 transition-all duration-300"
      :class="
        tab_active == 'characters' ? 'border-emerald-500 text-emerald-500' : 'border-transparent'
      "
      @click="emits('changeToCharacters')"
    >
      <i class="pi pi-users"></i> Characters
    </button>
    <button
      class="flex items-center gap-2 text-base cursor-pointer font-semibold border-b-2 transition-all duration-300"
      :class="
        tab_active == 'episode' ? 'border-emerald-500 text-emerald-500' : 'border-transparent'
      "
      @click="emits('changeToEpisode')"
    >
      <i class="pi pi-video"></i> Episode
    </button>
  </div>
</template>

<script lang="ts" setup>
const tab_active = defineModel('tab_active')
const emits = defineEmits<{
  (e: 'changeToTrailer'): void
  (e: 'changeToEpisode'): void
  (e: 'changeToCharacters'): void
}>()
</script>
