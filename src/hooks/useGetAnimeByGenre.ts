import * as service from '@/api/services'
import type { getResponseOngoing } from '@/types/ongoing'
import { useQuery } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import type { Ref } from 'vue'

const fetch = async (slug: string, page?: string | number): Promise<getResponseOngoing> => {
  try {
    const res = await service.animeByGenre(slug, page)
    return res.data
  } catch (error: unknown) {
    let message = 'Something went wrong'
    if (error instanceof AxiosError) {
      message = error.response?.data?.data?.error || error.message
    } else if (error instanceof Error) {
      message = error.message
    }
    throw new Error(message)
  }
}

export const useGetAnimeByGenre = (slug: string, page: Ref<string>) => {
  return useQuery({
    queryKey: ['anime-by-genre', slug, page],
    queryFn: () => fetch(slug, page.value),
  })
}
