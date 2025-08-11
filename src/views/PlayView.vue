<template>
  <!-- Loading Page  -->
  <LoadingPage v-if="isPending" />

  <!-- Error Page  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <main v-else>
    <BaseContainer class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- COLUMN 1  -->
      <section class="lg:col-span-2 space-y-3">
        <TitleAndDatePlayEps
          :title="data?.data?.title || 'No Title'"
          :date="data?.data?.updated || 'No Date'"
        />
        <EpisodePlayer :src="mainPlayer || ''" />
        <Message severity="warn" icon="pi pi-exclamation-triangle">
          <p class="text-xs lg:text-base">
            Hati-hati kegocek iklan, Jika halaman berpindah tekan tombol back saja!
          </p>
        </Message>
        <Message severity="info" icon="pi pi-refresh">
          <p class="text-xs lg:text-base">
            Jika pemutar tidak bekerja atau terus buffering, coba ganti dengan server di bawah ini
          </p>
        </Message>
        <div class="grid grid-cols-2 gap-2">
          <Button
            v-if="data?.data?.prev_episode"
            label="Prev episode"
            icon="pi pi-angle-double-left"
            variant="outlined"
            @click="slug = data?.data?.prev_episode"
          />
          <Button
            v-else
            class="!cursor-not-allowed"
            label="Prev episode"
            icon="pi pi-angle-double-left"
            variant="outlined"
            severity="secondary"
          />
          <Button
            v-if="data?.data?.next_episode"
            label="Next episode"
            icon="pi pi-angle-double-right"
            iconPos="right"
            variant="outlined"
            @click="slug = data?.data?.next_episode"
          />
          <Button
            v-else
            class="!cursor-not-allowed"
            label="Next episode"
            icon="pi pi-angle-double-right"
            iconPos="right"
            variant="outlined"
            severity="secondary"
          />
        </div>
        <ListServer
          v-model:main-player="mainPlayer"
          :listServer="data?.data?.mirror_server || []"
        />
      </section>
      <!-- END COLUMN 1  -->

      <!-- COLUMN 2  -->
      <section class="lg:col-span-1">
        <div class="flex">
          <h2
            class="mb-2 font-bold text-base flex items-center gap-2 text-emerald-500 border-b pe-5"
          >
            <i class="pi pi-thumbs-up"></i> Recomendation anime
          </h2>
        </div>
        <div class="w-full grid grid-cols-3 gap-3">
          <CardAnime
            v-for="(anime, index) in data?.data?.recomended_animes || []"
            :slug="anime.slug"
            :status="'recomendation'"
            :key="index"
            :title="anime.title"
            :type="anime.type_station"
            :cover="anime.cover"
            :eps="''"
          />
        </div>
      </section>
      <!-- END COLUMN 1  -->
    </BaseContainer>
    <FooterPage />
  </main>
</template>

<script setup lang="ts">
import { useGetPlayEpisode } from '@/hooks/useGetPlayEpisode'
import { Button, Message } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// components
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import CardAnime from '@/components/shared/CardAnime.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import EpisodePlayer from '@/components/shared/VideoPlayer/EpisodePlayer.vue'
import TitleAndDatePlayEps from '@/components/shared/PlayEpisode/TitleAndDatePlayEps.vue'
import ListServer from '@/components/shared/PlayEpisode/ListServer.vue'
import router from '@/router'

// state
const route = useRoute()
const mainPlayer = ref('')
const slug = ref('')
const { data, error, isError, isPending, refetch } = useGetPlayEpisode(computed(() => slug.value))

// Watch perubahan data
watch(
  () => data.value,
  (newData) => {
    if (newData?.data?.main_player) {
      mainPlayer.value = newData.data.main_player
    }
  },
  { immediate: true }, // langsung dijalankan saat mount
)
watch(
  () => slug.value,
  (newVal) => {
    router.push('/play/' + newVal)
    refetch() // Query otomatis pakai page terbaru
  },
)
onMounted(() => {
  slug.value = route.params.slug as string
})
</script>
