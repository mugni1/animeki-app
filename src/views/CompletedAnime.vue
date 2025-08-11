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

      <Paginator
        class="mt-5"
        :rows="1"
        :totalRecords="totalRecords"
        :first="page - 1"
        :pageLinkSize="pageLinkSize"
        @page="onPageChange"
      >
      </Paginator>
    </BaseContainer>

    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { useGetAnimeCompleted } from '@/hooks/useGetAnimeCompleted'
import { Paginator, type PageState } from 'primevue'
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'

// components
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'

// state
const page = ref(1)
const totalRecords = ref(0)
const pageLinkSize = ref(6) // default untuk layar besar
const { data, error, isError, isPending, refetch } = useGetAnimeCompleted(
  computed(() => page.value.toString()),
)

// methods
function onPageChange(event: PageState) {
  page.value = event.page + 1
}

function updatePageLinkSize() {
  if (window.innerWidth < 640) {
    pageLinkSize.value = 3
  } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
    pageLinkSize.value = 6
  } else {
    pageLinkSize.value = 10
  }
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

// mounted dan sebelum UnMounted
onMounted(() => {
  updatePageLinkSize()
  window.addEventListener('resize', updatePageLinkSize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePageLinkSize)
})
</script>

<style scoped>
:deep(.p-paginator) {
  background-color: transparent;
  border: 1px solid #10b981; /* emerald-500 */
}
</style>
