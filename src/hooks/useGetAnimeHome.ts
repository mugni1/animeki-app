import * as service from '@/api/services'
import type { getAnimeHomeResponse } from '@/types/home'
import { AxiosError } from 'axios'

export const fetchAnimeHome = async (): Promise<getAnimeHomeResponse> => {
  try {
    const response = await service.animeHomeAPI()
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
export const useGetAnimeHome = () => {
  return useQuery({
    queryKey: ['anime-home'],
    queryFn: fetchAnimeHome,
  })
}
