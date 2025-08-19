import { animeByStudioAPI } from '@/api/services'
import type { GetResponseAnimeByStudio } from '@/types/studio'
import { useQuery } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import type { Ref } from 'vue'

const fetch = async (slug: string, page?: string | number): Promise<GetResponseAnimeByStudio> => {
  try {
    const res = await animeByStudioAPI(slug, page)
    return res.data
  } catch (error) {
    let message = 'Something went wrong'
    if (error instanceof Error) {
      message = error.message
    } else if (error instanceof AxiosError) {
      message = error.response?.data?.data?.error || error.message
    }
    throw new Error(message)
  }
}

export const useGetAnimeByStudio = (slug: string, page: Ref<string>) => {
  return useQuery({
    queryKey: ['anime-by-studio', slug, page],
    queryFn: () => fetch(slug, page.value),
  })
}
