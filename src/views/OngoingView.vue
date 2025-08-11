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

      <Paginator
        class="mt-5"
        :rows="1"
        :totalRecords="totalRecords"
        :first="page - 1"
        @page="onPageChange"
      >
        <template #start="slotProps">
          Page: {{ slotProps.state.page + 1 }} Rows:
          {{ data?.data.length }}
        </template>
      </Paginator>
    </BaseContainer>

    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { useGetOngoingAnime } from '@/hooks/useGetAnimeOngoing'
import { Paginator, type PageState } from 'primevue'
import { computed, ref, watch, watchEffect } from 'vue'

// components
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'

// state
const page = ref(1)
const totalRecords = ref(0)
const { data, error, isError, isPending, refetch } = useGetOngoingAnime(
  computed(() => page.value.toString()),
)

// methods
function onPageChange(event: PageState) {
  page.value = event.page + 1
}

// watchers
watch(
  () => page.value,
  () => {
    refetch() // Query otomatis pakai page terbaru
  },
)
watchEffect(() => {
  if (page.value === 1 && data.value?.meta_data.total_records) {
    totalRecords.value = data.value.meta_data.total_records
  }
})
</script>

<style scoped>
:deep(.p-paginator) {
  background-color: transparent;
  border: 1px solid #10b981; /* emerald-500 */
}
</style>
