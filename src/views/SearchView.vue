<template>
  <!-- LOADING PAGE -->
  <LoadingPage v-if="isPending" />

  <!-- ERROR PAGE  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <!-- BASE CONTENT  -->
  <main v-else>
    <div>
      <BaseContainer class="min-h-screen">
        <h1
          class="font-extrabold text-4xl lg:text-5xl pt-8 text-center mb-2 text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text"
        >
          Come explore the world of anime
        </h1>

        <form
          class="dark:bg-gray-800 border-2 border-gray-900/10 dark:border-white/10 my-10 rounded-2xl p-5 lg:p-10 flex flex-col lg:flex-row gap-3"
          @submit.prevent="handleSearch"
        >
          <InputText
            size="large"
            variant="filled"
            placeholder="Search Anime..."
            class="!bg-gray-900/5 dark:!bg-white/5 !rounded-xl !border-gray-900/10 dark:!border-white/10 focus:!border-emerald-500 w-full"
            v-model="stores.inputKeyword"
          />
          <Button
            icon="pi pi-search"
            label="Search"
            class="!rounded-xl !px-5"
            size="large"
            type="submit"
          />
        </form>

        <div v-if="!data?.data || data.data.length < 1">
          <h1 class="text-center text-base lg:text-lg">No Results</h1>
        </div>
        <div v-else>
          <ListAnime
            type="completed"
            :animes="data?.data || []"
            icon="pi pi-search"
            title="Search results"
          />
          <BasePagination
            v-if="totalRecords > 0"
            v-model:page="page"
            :total-records="totalRecords"
          />
        </div>
      </BaseContainer>
      <FooterPage />
    </div>
  </main>
</template>

<script setup lang="ts">
import BasePagination from '@/components/layouts/BasePagination.vue'
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useGetAnimeSearch } from '@/hooks/useGetAnimeSearch'
import { useSearchStore } from '@/stores/search'
import { Button, InputText } from 'primevue'
import { computed, ref, watchEffect } from 'vue'

// state
const stores = useSearchStore()
const page = ref(1)
const totalRecords = ref(0)
const { data, error, isError, isPending, refetch } = useGetAnimeSearch(
  computed(() => page.value.toString()),
  computed(() => stores.keyword),
)

// methods
const handleSearch = async () => {
  stores.updateKeyword()
  page.value = 1
  const result = await refetch()
  if (result.data?.meta_data.total_records) {
    totalRecords.value = result.data.meta_data.total_records
  } else {
    totalRecords.value = 0
  }
}

// watchers
watchEffect(() => {
  if (page.value === 1 && data.value?.meta_data.total_records) {
    totalRecords.value = data.value.meta_data.total_records
  }
})
</script>
