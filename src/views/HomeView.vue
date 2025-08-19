<template>
  <LoadingPage v-if="isPending" />
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />
  <main v-else>
    <BaseContainer class="space-y-5">
      <BaseSwipper :animes="data?.data?.ongoing_anime || []" />
      <ListAnime type="ongoing" :animes="data?.data?.ongoing_anime || []" icon="pi pi-calendar-clock" title="Ongoing Anime" :show-more="true" />
      <ListAnime :animes="data?.data?.completed_anime || []" type="completed" icon="pi pi-check-square" title="Completed Anime" :show-more="true" />
    </BaseContainer>
    <FooterPage />
  </main>
</template>

<script setup lang="ts">
import BaseSwipper from '@/components/layouts/BaseSwipper.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useGetAnimeHome } from '@/hooks/useGetAnimeHome'

const { data, isPending, isError, error, refetch } = useGetAnimeHome()
</script>
