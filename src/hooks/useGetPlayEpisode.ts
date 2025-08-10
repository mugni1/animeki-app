import * as service from '@/api/services'
import { AxiosError } from 'axios'
import type { GetResponsePlay } from '@/types/play'

export const fetch = async (slug: string): Promise<GetResponsePlay> => {
  try {
    const response = await service.playEpisodeAPI(slug)
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
export const useGetPlayEpisode = (slug: string) => {
  return useQuery({
    queryKey: ['play-episode', slug], // tambahkan slug agar cache berbeda tiap anime
    queryFn: () => fetch(slug), // ✅ jangan langsung panggil, bungkus dalam arrow function
  })
}
