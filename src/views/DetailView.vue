<template>
  <LoadingPage v-if="isPending" />
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />
  <main v-else>
    <BgAnime :image_src="data?.data.cover || ''" />
    <BaseContainer class="z-40 relative pt-20">
      <section class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-3 lg:gap-x-5">
        <!-- COLUMN 1 -->
        <div class="flex lg:col-span-1 flex-col gap-2">
          <CoverAnime class="!w-6/12 mx-auto lg:!w-full" :image_src="data?.data.cover || ''" />
          <RatingAnime :rating="data?.data.rating || 0" />
          <h1 class="title-anime-detail-sm">{{ data?.data?.title || '' }}</h1>
          <!-- button-play-and-bookmark -->
          <div class="container-btn-play-and-bookmark">
            <BaseButton
              :unstyled="true"
              class="btn-secondary"
              label="Play now"
              icon="pi pi-play-circle"
              @click="router.push('/play/' + data?.data.first_episode.episode_slug)"
            />
            <BaseButton
              v-if="!stores.listAnime.find((item) => item.title == data?.data.title)"
              :unstyled="true"
              class="btn-secondary"
              label="Bookmark"
              icon="pi pi-bookmark"
              @click="setAnimeToBookmark(data)"
            />
            <BaseButton
              v-else
              :unstyled="true"
              class="btn-secondary"
              label="Bookmark"
              icon="pi pi-bookmark-fill"
              @click="removeAnimeInBookmark(data)"
            />
          </div>
          <!-- list-spe -->
          <CardSecondary>
            <div class="lg:grid-cols-1 grid-cols-2 grid gap-2">
              <SpeItem v-for="(spe, index) in data?.data.spe || []" :key="index" :title="spe.title" :text="spe.content" :slug="spe.slug" />
            </div>
          </CardSecondary>
          <!-- list-genre  -->
          <CardSecondary title="Genres" icon="pi pi-th-large">
            <div class="grid grid-cols-2 text-xs gap-3">
              <BaseButton
                v-for="(genre, index) in data?.data.gentres || []"
                class="!text-xs"
                size="small"
                :key="index"
                @click="router.push('/genre/' + genre.slug)"
              >
                {{ genre.title }}
              </BaseButton>
            </div>
          </CardSecondary>
        </div>

        <!-- COLUMN 2 -->
        <div class="lg:col-span-3">
          <h1 class="title-anime-detail-lg">{{ data?.data?.title || '' }}</h1>
          <RatingAnime class="lg:!flex !hidden !justify-start !mb-3" :rating="data?.data.rating || 0" />
          <!-- tab-header  -->
          <TabsHeader
            class="mb-2"
            @changeToTrailer="changeTabToTrailer"
            @changeToEpisode="changeTabToEpisode"
            @changeToCharacters="changeTabToCharacter"
            v-model:tab_active="tab_active"
          />
          <!-- tab content  -->
          <div class="w-full p-2 border border-gray-900/40 dark:border-white/40 rounded-md">
            <YoutubePlayer v-if="tab_active == 'trailer'" :src="data?.data?.trailer?.split('/').filter(Boolean).pop() || ''" />
            <TabContentEpisode
              v-if="tab_active == 'episode'"
              v-model:search-keyword="search"
              v-model:episode-filter="episodeFilter"
              :cover="data?.data.cover || ''"
            />
            <TabContentCharacters v-if="tab_active == 'characters'" :character-and-actor="data?.data.character_and_actor || []" />
          </div>
          <SynopsysAnime :content="data?.data?.synopsis || ''" />
        </div>
        <!--END COLUMN 2 -->
      </section>
    </BaseContainer>
    <FooterPage />
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGetDetail } from '@/hooks/useGetDetail'
import { useRoute, useRouter } from 'vue-router'
import { useBookmark } from '@/stores/bookmark'
import type { DetailResponse } from '@/types/detail'

// components
import BgAnime from '@/components/shared/BgAnime.vue'
import CoverAnime from '@/components/shared/DetailAnime/CoverAnime.vue'
import SpeItem from '@/components/shared/DetailAnime/SpeItem.vue'
import RatingAnime from '@/components/shared/DetailAnime/RatingAnime.vue'
import SynopsysAnime from '@/components/shared/DetailAnime/SynopsysAnime.vue'
import TabsHeader from '@/components/shared/DetailAnime/TabsHeader.vue'
import TabContentEpisode from '@/components/shared/DetailAnime/TabContentEpisode.vue'
import TabContentCharacters from '@/components/shared/DetailAnime/TabContentCharacters.vue'
import YoutubePlayer from '@/components/shared/VideoPlayer/YoutubePlayer.vue'

// state
const stores = useBookmark()
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const tab_active = ref('trailer')
const { data, isPending, error, isError, refetch } = useGetDetail(slug)
const search = ref('')

// getters
const episodeFilter = computed(() => {
  if (!search.value) {
    return data.value?.data.episodes || []
  }
  return (data.value?.data.episodes || []).filter((eps) => {
    const keyword = search.value.toLowerCase().trim()
    return eps.episode_title.toLowerCase().includes(keyword)
  })
})

// methods
const setAnimeToBookmark = (data: DetailResponse | undefined) => {
  stores.setAnime({
    cover: data?.data.cover || '',
    title: data?.data.title || '',
    slug: slug,
    type_station: data?.data?.spe?.find((item) => item.title.toLowerCase() == 'type')?.content || '',
  })
}
const removeAnimeInBookmark = (data: DetailResponse | undefined) => {
  stores.removeAnime({
    cover: data?.data.cover || '',
    title: data?.data.title || '',
    slug: slug,
    type_station: data?.data?.spe?.find((item) => item.title.toLowerCase() == 'type')?.content || '',
  })
}
const changeTabToTrailer = () => {
  tab_active.value = 'trailer'
}
const changeTabToCharacter = () => {
  tab_active.value = 'characters'
}
const changeTabToEpisode = () => {
  tab_active.value = 'episode'
}
</script>
