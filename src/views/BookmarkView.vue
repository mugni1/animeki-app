<script setup lang="ts">
import FooterPage from '@/components/layouts/FooterPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useBookmark } from '@/stores/bookmark'

const stores = useBookmark()
</script>

<template>
  <main v-if="!stores.animes || stores.animes.length < 1">
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
      <ListAnime
        :animes="stores.animes"
        type="recomendation"
        icon="pi pi-bookmark"
        :title="`Bookmark`"
      />
    </BaseContainer>
    <FooterPage />
  </main>
</template>
