<template>
  <div>
    <span class="font-bold text-sm line-clamp-1"> {{ props.title }}</span>
    <p
      class="text-xs line-clamp-1"
      :class="
        props.slug != null
          ? 'text-emerald-400 cursor-pointer'
          : 'text-slate-900/60 dark:text-white/60'
      "
    >
      {{ props.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { required: true, type: String },
  text: { required: true, type: String },
  slug: { required: false },
})
</script>
