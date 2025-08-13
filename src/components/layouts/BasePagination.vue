<script setup lang="ts">
import { Paginator, type PageState } from 'primevue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// state
const page = defineModel<number>('page', { default: 1 })
const { totalRecords } = defineProps<{ totalRecords: number }>()
const pageLinkSize = ref(3)

// methods
function onPageChange(event: PageState) {
  page.value = event.page + 1
}

function updatePageLinkSize() {
  if (window.innerWidth < 640) {
    pageLinkSize.value = 3
  } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
    pageLinkSize.value = 6
  } else {
    pageLinkSize.value = 10
  }
}

// mounted dan sebelum UnMounted
onMounted(() => {
  updatePageLinkSize()
  window.addEventListener('resize', updatePageLinkSize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePageLinkSize)
})
</script>

<template>
  <Paginator
    class="mt-5"
    :rows="1"
    :totalRecords="totalRecords"
    :first="page - 1"
    :pageLinkSize="pageLinkSize"
    @page="onPageChange"
  >
  </Paginator>
</template>

<style scoped>
:deep(.p-paginator) {
  background-color: transparent;
  border: 1px solid #10b981; /* emerald-500 */
}
</style>
