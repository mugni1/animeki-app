<template>
  <div class="border border-gray-900/40 dark:border-white/40 p-2 rounded-md">
    <h3
      class="font-bold flex items-center gap-2 pb-2 border-b border-gray-900/40 dark:border-white/40 mb-2 text-base lg:text-lg"
    >
      <i class="pi pi-server"></i> List Server Streaming
    </h3>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Button
        v-for="(server, index) in listServer"
        :unstyled="true"
        class="btn-play text-sm transition-all duration-700"
        :class="
          mainPlayer == server.server_src
            ? '!border-emerald-500 !bg-emerald-500/5 !text-emerald-500'
            : ''
        "
        :label="server.server_title"
        :key="index"
        @click="mainPlayer = server.server_src"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServerItem } from '@/types/play'
import { Button } from 'primevue'

const mainPlayer = defineModel('mainPlayer')
const { listServer } = defineProps<{ listServer: ServerItem[] }>()
</script>
