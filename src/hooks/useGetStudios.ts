import * as service from '@/api/services'
import type { GetResponseStudio } from '@/types/studio'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/vue-query'

const fetch = async (): Promise<GetResponseStudio> => {
  try {
    const res = await service.studiosAPI()
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

export const useGetStudios = () => {
  return useQuery({
    queryKey: ['studios'],
    queryFn: fetch,
  })
}
