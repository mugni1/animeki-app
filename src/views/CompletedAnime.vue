<template>
  <!-- LOADING PAGE -->
  <LoadingPage v-if="isPending" />

  <!-- ERROR PAGE  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <div v-else>
    <BaseContainer>
      <ListAnime
        type="completed"
        :animes="data?.data || []"
        icon="pi pi-check-circle"
        title="Completed anime"
      />
      <BasePagination v-model:page="page" :total-records="totalRecords" />
    </BaseContainer>
    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { useGetAnimeCompleted } from '@/hooks/useGetAnimeCompleted'
import { computed, ref, watch, watchEffect } from 'vue'

// components
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import BasePagination from '@/components/layouts/BasePagination.vue'

// state
const page = ref(1)
const totalRecords = ref(0)
const { data, error, isError, isPending, refetch } = useGetAnimeCompleted(
  computed(() => page.value.toString()),
)

// watchers
watch(page, () => {
  refetch() // Query otomatis pakai page terbaru
})
watchEffect(() => {
  if (page.value === 1 && data.value?.meta_data.total_records) {
    totalRecords.value = data.value.meta_data.total_records
  }
})
</script>
