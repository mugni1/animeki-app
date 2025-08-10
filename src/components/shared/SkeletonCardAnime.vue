<script setup lang="ts">
import { Skeleton } from 'primevue'
</script>

<template>
  <div>
    <!-- cover  -->
    <div class="block md:hidden">
      <Skeleton height="15rem"></Skeleton>
    </div>
    <div class="hidden md:block xl:hidden">
      <Skeleton height="16rem"></Skeleton>
    </div>
    <div class="hidden xl:block">
      <Skeleton height="21rem"></Skeleton>
    </div>

    <div class="space-y-2 mt-2">
      <!-- title  -->
      <Skeleton width="100%" height="1.4rem"></Skeleton>
      <!-- 2 tags  -->
      <div class="grid-cols-2 grid gap-3">
        <Skeleton width="100%" height="2rem"></Skeleton>
        <Skeleton width="100%" height="2rem"></Skeleton>
      </div>
    </div>
  </div>
</template>
