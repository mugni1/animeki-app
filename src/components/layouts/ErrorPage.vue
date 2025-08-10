<script setup lang="ts">
import { Button } from 'primevue'
import BaseContainer from '../shared/BaseContainer.vue'
import { defineModel, defineEmits } from 'vue'

const error = defineModel('error')
const emits = defineEmits<{ (e: 'refetch'): void }>()
</script>

<template>
  <BaseContainer class="w-full h-screen flex flex-col items-center justify-center !pt-0 gap-3">
    <p class="text-red-500 font-bold text-2xl text-center">
      Opps, {{ error instanceof Error ? error.message : 'Terjadi kesalahan tidak terduga' }}
    </p>
    <div class="flex items-center gap-3">
      <Button label="Try Again" icon="pi pi-refresh" raised @click="emits('refetch')" />
      <Button
        v-if="$route.fullPath != '/'"
        label="Back"
        icon="pi pi-home"
        raised
        variant="outlined"
      />
    </div>
  </BaseContainer>
</template>
