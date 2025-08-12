<template>
  <div class="card-secondary space-y-2">
    <h1 v-if="title" class="flex items-center gap-2">
      <i v-if="icon" :class="icon"></i> {{ title }}
    </h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { title, icon } = defineProps<{ title?: string; icon?: string }>()
</script>
