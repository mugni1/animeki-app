<template>
  <!-- LOADING PAGE -->
  <LoadingPage v-if="isPending" />

  <!-- ERROR PAGE  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <!-- BASE CONTENT  -->
  <main v-else>
    <div>
      <BaseContainer>
        <h1
          class="font-extrabold text-4xl lg:text-5xl pt-8 text-center mb-2 text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text"
        >
          Come explore the world of anime
        </h1>

        <div
          class="dark:bg-gray-800 border-2 border-gray-900/10 dark:border-white/10 my-10 rounded-2xl p-5 lg:p-10 flex flex-col lg:flex-row gap-3"
        >
          <InputText
            size="large"
            variant="filled"
            placeholder="Search Anime..."
            class="!bg-gray-900/5 dark:!bg-white/5 !rounded-xl !border-gray-900/10 dark:!border-white/10 focus:!border-emerald-500 w-full"
            v-model="searchKeyword"
          />
          <Button
            icon="pi pi-search"
            label="Search"
            class="!rounded-xl !px-5"
            size="large"
            @click="handleSearch"
          />
        </div>

        <div v-if="!data?.data || data.data.length < 1">
          <h1 class="text-center">No Results</h1>
        </div>
        <div v-else>
          <ListAnime
            type="completed"
            :animes="data?.data || []"
            icon="pi pi-search"
            title="Search results"
          />
          <Paginator
            v-if="totalRecords > 0"
            class="mt-5"
            :rows="1"
            :totalRecords="totalRecords"
            :first="page - 1"
            :pageLinkSize="pageLinkSize"
            @page="onPageChange"
          >
          </Paginator>
        </div>
      </BaseContainer>
      <FooterPage />
    </div>
  </main>
</template>

<script setup lang="ts">
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import ListAnime from '@/components/shared/List/ListAnime.vue'
import { useGetAnimeSearch } from '@/hooks/useGetAnimeSearch'
import { Button, InputText, Paginator, type PageState } from 'primevue'
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'

// state
const page = ref(1)
const keyword = ref('')
const searchKeyword = ref('')
const totalRecords = ref(0)
const pageLinkSize = ref(6) // default untuk layar besar
const { data, error, isError, isPending, refetch } = useGetAnimeSearch(
  computed(() => page.value.toString()),
  computed(() => keyword.value),
)

// methods
function updatePageLinkSize() {
  if (window.innerWidth < 640) {
    pageLinkSize.value = 3
  } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
    pageLinkSize.value = 6
  } else {
    pageLinkSize.value = 10
  }
}

function onPageChange(event: PageState) {
  page.value = event.page + 1
}

const handleSearch = async () => {
  keyword.value = searchKeyword.value
  page.value = 1 // reset ke page pertama setiap kali search
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
