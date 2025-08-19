<template>
  <!-- Loading Page  -->
  <LoadingPage v-if="isPending" />

  <!-- Error Page  -->
  <ErrorPage v-else-if="isError" v-model:error="error" @refetch="refetch()" />

  <!-- Base Page  -->
  <div v-else>
    <!-- background  -->
    <BgAnime :image_src="data?.data.cover || ''" />

    <!-- information anime  -->
    <BaseContainer class="z-40 relative pt-20">
      <section class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-3 lg:gap-x-5">
        <!-- COLUMN 1 -->
        <section class="flex lg:col-span-1 flex-col gap-2">
          <CoverAnime class="!w-6/12 mx-auto lg:!w-full" :image_src="data?.data.cover || ''" />
          <RatingAnime :rating="data?.data.rating || 0" />
          <!-- TITLE for HP and TAB -->
          <TitleAnime
            class="!text-xl lg:!hidden text-center line-clamp-2 font-bold"
            :title="data?.data?.title || ''"
          />
          <!-- btn  -->
          <div class="grid grid-cols-2 gap-2 lg:grid-cols-1">
            <Button
              :unstyled="true"
              class="btn-secondary"
              label="Play now"
              icon="pi pi-play-circle"
              @click="router.push('/play/' + data?.data.first_episode.episode_slug)"
            />
            <Button
              v-if="!stores.animes.find((item) => item.title == data?.data.title)"
              :unstyled="true"
              class="btn-secondary"
              label="Bookmark"
              icon="pi pi-bookmark"
              @click="
                stores.setAnime({
                  cover: data?.data.cover || '',
                  title: data?.data.title || '',
                  slug: slug,
                  type_station:
                    data?.data?.spe?.find((item) => item.title.toLowerCase() == 'type')?.content ||
                    '',
                })
              "
            />
            <Button
              v-else
              :unstyled="true"
              class="btn-secondary"
              label="Bookmark"
              icon="pi pi-bookmark-fill"
              @click="
                stores.removeAnime({
                  cover: data?.data.cover || '',
                  title: data?.data.title || '',
                  slug: slug,
                  type_station:
                    data?.data?.spe?.find((item) => item.title.toLowerCase() == 'type')?.content ||
                    '',
                })
              "
            />
          </div>
          <!-- spe list  -->
          <CardSecondary>
            <div class="lg:grid-cols-1 grid-cols-2 grid gap-2">
              <SpeItem
                v-for="(spe, index) in data?.data.spe || []"
                :key="index"
                :title="spe.title"
                :text="spe.content"
                :slug="spe.slug"
              />
            </div>
          </CardSecondary>
          <CardSecondary title="Genres" icon="pi pi-th-large">
            <div class="grid grid-cols-2 text-xs gap-3">
              <Button
                class="!text-xs"
                size="small"
                v-for="(genre, index) in data?.data.gentres || []"
                :key="index"
                @click="router.push('/genre/' + genre.slug)"
              >
                {{ genre.title }}
              </Button>
            </div>
          </CardSecondary>
        </section>
        <!--END COLUMN 1 -->

        <!-- COLUMN 2 -->
        <section class="lg:col-span-3">
          <!-- TITLE for PC  -->
          <TitleAnime
            :title="data?.data.title || ''"
            class="hidden lg:!block line-clamp-1 font-bold"
          />
          <!-- RATING  -->
          <RatingAnime
            class="lg:!flex !hidden !justify-start !mb-3"
            :rating="data?.data.rating || 0"
          />
          <!-- TABS  -->
          <div class="flex flex-col gap-2 mt-3 lg:mt-0">
            <!-- tabs  -->
            <TabsDetail
              @changeToTrailer="changeTabToTrailer"
              @changeToEpisode="changeTabToEpisode"
              @changeToCharacters="changeTabToCharacter"
              v-model:tab_active="tab_active"
            />
            <!-- content tab  -->
            <div class="w-full p-2 border border-gray-900/40 dark:border-white/40 rounded-md">
              <YoutubePlayer
                v-if="tab_active == 'trailer'"
                :src="data?.data?.trailer?.split('/').filter(Boolean).pop() || ''"
              />
              <TabContentEpisode
                v-if="tab_active == 'episode'"
                v-model:search-keyword="search"
                v-model:episode-filter="episodeFilter"
                :cover="data?.data.cover || ''"
              />
              <TabContentCharacters
                v-if="tab_active == 'characters'"
                :character-and-actor="data?.data.character_and_actor || []"
              />
            </div>
          </div>
          <!-- SYNOPSYS  -->
          <SinopsysAnime :content="data?.data?.synopsis || ''" />
        </section>
        <!--END COLUMN 2 -->
      </section>
    </BaseContainer>
    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGetDetail } from '@/hooks/useGetDetail'
import { Button } from 'primevue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

// components
import ErrorPage from '@/components/layouts/ErrorPage.vue'
import BaseContainer from '@/components/shared/BaseContainer.vue'
import BgAnime from '@/components/shared/BgAnime.vue'
import CoverAnime from '@/components/shared/DetailAnime/CoverAnime.vue'
import SpeItem from '@/components/shared/DetailAnime/SpeItem.vue'
import TabsDetail from '@/components/shared/DetailAnime/TabsDetail.vue'
import TabContentEpisode from '@/components/shared/DetailAnime/TabContentEpisode.vue'
import RatingAnime from '@/components/shared/DetailAnime/RatingAnime.vue'
import TabContentCharacters from '@/components/shared/DetailAnime/TabContentCharacters.vue'
import LoadingPage from '@/components/layouts/LoadingPage.vue'
import FooterPage from '@/components/layouts/FooterPage.vue'
import YoutubePlayer from '@/components/shared/VideoPlayer/YoutubePlayer.vue'
import SinopsysAnime from '@/components/shared/DetailAnime/SinopsysAnime.vue'
import TitleAnime from '@/components/shared/DetailAnime/TitleAnime.vue'
import CardSecondary from '@/components/shared/card/CardSecondary.vue'
import { useBookmark } from '@/stores/bookmark'

const stores = useBookmark()
const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const tab_active = ref('trailer')
const { data, isPending, error, isError, refetch } = useGetDetail(slug)
const search = ref('')

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
