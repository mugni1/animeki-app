<template>
  <button
    v-if="canInstall"
    @click="installApp"
    class="px-4 py-2 bg-green-500 text-white rounded-lg"
  >
    Install App
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Definisikan tipe untuk event sebelum install PWA
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const canInstall = ref(false)
let deferredPrompt: BeforeInstallPromptEvent | null = null

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    canInstall.value = true // tampilkan tombol
  })
})

const installApp = async () => {
  if (!deferredPrompt) return
  await deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  console.log(`User response: ${outcome}`)
  deferredPrompt = null
  canInstall.value = false // sembunyikan tombol setelah install
}
</script>
