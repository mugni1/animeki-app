<script setup lang="ts">
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useBookmark } from '@/stores/bookmark'

const stores = useBookmark()
</script>

<template>
  <main v-if="!stores.listAnime || stores.listAnime.length < 1">
    <BaseContainer class="flex justify-between items-center w-full min-h-screen !pt-0">
      <div class="text-center w-full flex flex-col space-y-3 text-base lg:text-xl font-extrabold">
        <i class="pi pi-inbox" style="font-size: 5rem"></i>
        <p>No Anime Found</p>
      </div>
    </BaseContainer>
    <FooterPage />
  </main>

  <main v-else>
    <BaseContainer class="min-h-screen">
      <ListAnime :animes="stores.listAnime" type="recomendation" icon="pi pi-bookmark-fill" :title="`Bookmark`" />
    </BaseContainer>
    <FooterPage />
  </main>
</template>
