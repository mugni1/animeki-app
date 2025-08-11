import * as service from '@/api/services'
import { AxiosError } from 'axios'

const fetch = async (page: string): Promise<getResponseOngoing> => {
  try {
    const response = await service.completedAPI(page)
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
import type { Ref } from 'vue'
export const useGetAnimeCompleted = (page: Ref<string>) => {
  return useQuery({
    queryKey: ['anime-completed', page],
    queryFn: () => fetch(page.value),
  })
}
