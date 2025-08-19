<script setup lang="ts">
// Import Swiper core dan module yang mau dipakai
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules'

// Import CSS Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import { Tag } from 'primevue'
import { useRouter } from 'vue-router'
import type { AnimeItem } from '@/types/home'

const router = useRouter()
const { animes } = defineProps<{ animes: AnimeItem[] }>()
</script>

<template>
  <Swiper
    :modules="[Pagination, Scrollbar, A11y, Autoplay, EffectFade]"
    :slides-per-view="1"
    :space-between="0"
    :fade-effect="{ crossFade: true }"
    effect="fade"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :allow-touch-move="true"
    loop
    :pagination="{ clickable: true }"
  >
    <SwiperSlide v-for="(item, index) in animes" :key="index">
      <div class="bg-white/5 text-white h-[28vh] md:h-[30vh] lg:h-[40vh] text-center rounded-lg overflow-hidden relative">
        <img :src="item.cover" class="w-full h-full object-cover object-center" alt="" />
        <div class="absolute -inset-1 backdrop-blur-xs bg-gray-900/20 dark:bg-gray-900/50 flex items-center px-5 lg:px-10">
          <div class="flex flex-col items-start gap-1 lg:gap-3">
            <h1 class="font-bold text-2xl lg:text-3xl text-start line-clamp-1">
              {{ item.title }}
            </h1>
            <div class="flex gap-2 text-sm lg:text-base mb-2">
              <Tag severity="info">
                <p class="text-xs lg:text-sm">{{ item.type_station }}</p>
              </Tag>
              <Tag severity="warn">
                <p class="text-xs lg:text-sm">Eps {{ item.episode }}</p>
              </Tag>
            </div>
            <div class="flex gap-3">
              <BaseButton
                :unstyled="true"
                class="btn-play !border-white/40 !bg-white/10 !px-4"
                size="small"
                label="Details"
                icon="pi pi-external-link"
                @click="router.push('/detail/' + item.slug)"
              />
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background-color: white;
}
</style>
