import * as service from '@/api/services'
import type { getResponseGenres } from '@/types/genres'
import { useQuery } from '@tanstack/vue-query'
import { AxiosError } from 'axios'

const fetch = async (): Promise<getResponseGenres> => {
  try {
    const res = await service.genresAPI()
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

export const useGetGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetch,
  })
}
