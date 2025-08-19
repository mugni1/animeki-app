<template>
  <div>
    <span class="font-bold text-sm line-clamp-1"> {{ props.title }}</span>
    <p
      v-if="props.title.toLowerCase() == 'studio' && props.slug"
      class="text-xs line-clamp-1 text-emerald-400 cursor-pointer"
      @click="router.push(`/studio/${props.slug}`)"
    >
      {{ props.text }}
    </p>
    <p
      v-else-if="props.title.toLowerCase() == 'season' && props.slug"
      class="text-xs line-clamp-1 text-emerald-400 cursor-pointer"
      @click="router.push(`/season/${props.slug}`)"
    >
      {{ props.text }}
    </p>
    <p v-else class="text-xs line-clamp-1 text-slate-900/60 dark:text-white/60">
      {{ props.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps({
  title: { required: true, type: String },
  text: { required: true, type: String },
  slug: { required: false },
})

const router = useRouter()
</script>
