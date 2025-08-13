<script setup lang="ts">
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import CardSecondary from '@/components/shared/card/CardSecondary.vue'
import { useGetGenres } from '@/hooks/useGetGenres'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const { data, error, isError, isPending, refetch } = useGetGenres()

const router = useRouter()
</script>

<template>
  <LoadingPage v-if="isPending" />

  <ErrorPage v-else-if="isError" @refetch="refetch" v-model:error="error" />

  <BaseContainer v-else>
    <CardSecondary title="Genres" icon="pi pi-th-large">
      <div class="grid grid-cols-3 lg:grid-cols-5 gap-3">
        <Button
          v-for="(genre, index) in data?.data || []"
          :key="index"
          size="small"
          @click="router.push('genre/' + genre.slug)"
        >
          <div class="flex justify-between w-full">
            <span class="w-9/12 text-nowrap overflow-hidden text-ellipsis text-start">
              {{ genre.title }}
            </span>
            <span class="w-3/12 text-end text-white/80 dark:text-gray-900/80">
              {{ genre.total }}
            </span>
          </div>
        </Button>
      </div>
    </CardSecondary>
  </BaseContainer>
</template>
