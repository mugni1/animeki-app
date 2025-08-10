<template>
  <!-- LOADING PAGE -->
  <LoadingPage v-if="isPending" />

  <!-- ERROR PAGE  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <!-- CONTENT PAGE  -->
  <section v-else>
    <BaseContainer class="space-y-5">
      <ListAnime
        type="ongoing"
        :animes="data?.data?.ongoing_anime || []"
        icon="pi pi-clock"
        title="Ongoing anime"
      />
      <ListAnime
        :animes="data?.data?.completed_anime || []"
        type="completed"
        icon="pi pi-check-circle"
        title="Completed anime"
      />
    </BaseContainer>
    <FooterPage />
  </section>
</template>

<script setup lang="ts">
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useGetAnimeHome } from '@/hooks/useGetAnimeHome'

const { data, isPending, isError, error, refetch } = useGetAnimeHome()
</script>
