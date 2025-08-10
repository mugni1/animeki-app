<template>
  <section class="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
    <div
      class="btn-play !cursor-auto !py-0 grid grid-cols-2"
      v-for="(character, index) in props.characterAndActor"
      :key="index"
    >
      <div class="flex text-sm">
        <div class="w-3/12 aspect-auto">
          <img
            class="object-cover object-center h-full w-full rounded-l"
            :src="character.charater_image || '/public/no_avatar.png'"
            alt="image"
          />
        </div>
        <div class="ps-2 pt-1">
          <p class="line-clamp-2">{{ character?.charater_name || 'Anonim' }}</p>
          <p class="text-xs">{{ character?.charater_role || 'No role' }}</p>
        </div>
      </div>
      <div class="flex text-sm">
        <div class="w-3/12 aspect-square">
          <img
            class="object-cover object-center h-full w-full"
            :src="character.actor_image || '/public/no_avatar.png'"
            alt="image"
          />
        </div>
        <div class="ps-2 pt-1">
          <p
            class="line-clamp-2"
            :class="character.actor_slug != null ? 'text-emerald-500 cursor-pointer' : ''"
          >
            {{ character?.actor_name || 'Anonim' }}
          </p>
          <p class="text-xs">{{ character?.actor_role || 'No role' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CharAndActor } from '@/types/charAndActor'

const props = defineProps<{
  characterAndActor: CharAndActor[]
}>()
</script>
