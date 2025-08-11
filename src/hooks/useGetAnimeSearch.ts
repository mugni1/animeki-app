import * as service from '@/api/services'
import { AxiosError } from 'axios'

const fetch = async (params: SearchParams): Promise<getResponseOngoing> => {
  try {
    const response = await service.searchAPI(params)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let message = 'Something went wrong'
    if (error instanceof AxiosError) {
      message = error.response?.data?.data?.error || error.message
    } else if (error instanceof Error) {
      message = error.message
    }
    // ⛔ Penting: throw error agar masuk ke isError + error.message
    throw new Error(message)
  }
}

import { useQuery } from '@tanstack/vue-query'
import type { getResponseOngoing } from '@/types/ongoing'
import { computed, type Ref } from 'vue'
import type { SearchParams } from '@/types/search'
export const useGetAnimeSearch = (page: Ref<string>, keyword: Ref<string>) => {
  return useQuery({
    queryKey: computed(() => ['anime-search', page.value, keyword.value]),
    queryFn: () =>
      fetch({
        current_page: page.value,
        keyword: keyword.value,
      }),
  })
}
