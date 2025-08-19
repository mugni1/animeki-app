<script setup lang="ts">
import BasePagination from '@/components/layouts/BasePagination.vue'
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useGetAnimeByStudio } from '@/hooks/useGetAnimeByStudio'
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string
const page = ref(1)
const totalRecords = ref(1)
const { data, error, isError, isPending, refetch } = useGetAnimeByStudio(
  slug,
  computed(() => page.value.toString()),
)

watchEffect(() => {
  if (page.value == 1 && data.value?.meta_data.list_page?.pop()) {
    totalRecords.value = data.value?.meta_data.list_page?.pop() || 0
  }
})
</script>

<template>
  <LoadingPage v-if="isPending" />
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch" />
  <main v-else>
    <BaseContainer>
      <ListAnime
        :animes="data?.data || []"
        type="recomendation"
        icon="pi pi-th-large"
        :title="`Anime - ${slug?.split('-').join(' ')}`"
      />
      <BasePagination v-if="totalRecords > 1" v-model:page="page" :total-records="totalRecords" />
    </BaseContainer>
    <FooterPage />
  </main>
</template>
