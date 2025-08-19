<script setup lang="ts">
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import CardSecondary from '@/components/shared/card/CardSecondary.vue'
import { useGetStudios } from '@/hooks/useGetStudios'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const { data, error, isError, isPending, refetch } = useGetStudios()
const router = useRouter()
</script>

<template>
  <LoadingPage v-if="isPending" />
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch" />
  <main v-else>
    <BaseContainer>
      <CardSecondary title="List Studio" icon="pi pi-th-large">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <Button
            v-for="(studio, index) in data?.data || []"
            :key="index"
            size="small"
            @click="router.push('studio/' + studio.slug)"
          >
            <div class="flex justify-between w-full">
              <span class="w-9/12 text-nowrap overflow-hidden text-ellipsis text-start">
                {{ studio.title }}
              </span>
              <span class="w-3/12 text-end text-white/80 dark:text-gray-900/80">
                {{ studio.total }}
              </span>
            </div>
          </Button>
        </div>
      </CardSecondary>
    </BaseContainer>
    <FooterPage />
  </main>
</template>
