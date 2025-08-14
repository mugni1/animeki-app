<template>
  <!-- LOADING PAGE -->
  <LoadingPage v-if="isPending" />

  <!-- ERROR PAGE  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <div v-else>
    <BaseContainer>
      <ListAnime
        type="ongoing"
        :animes="data?.data || []"
        icon="pi pi-clock"
        title="Ongoing anime"
      />
      <BasePagination :total-records="totalRecords" v-model:page="page" />
    </BaseContainer>
    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { useGetOngoingAnime } from '@/hooks/useGetAnimeOngoing'
import { computed, ref, watchEffect } from 'vue'

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
const { data, error, isError, isPending, refetch } = useGetOngoingAnime(
  computed(() => page.value.toString()),
)

// watch effect
watchEffect(() => {
  if (page.value === 1 && data.value?.meta_data.total_records) {
    totalRecords.value = data.value.meta_data.total_records
  }
})
</script>
