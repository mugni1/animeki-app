import type { AxiosResponse } from 'axios'
import { httpClient } from './httpClient'
import { EDNPOINT } from './endpoints'
import type { getAnimeHomeResponse } from '@/types/home'
import type { DetailResponse } from '@/types/detail'
import type { GetResponsePlay } from '@/types/play'

export const animeHomeAPI = async (): Promise<AxiosResponse<getAnimeHomeResponse>> => {
  return httpClient.get(EDNPOINT.HOME)
}

export const animeDetailAPI = async (slug: string): Promise<AxiosResponse<DetailResponse>> => {
  return httpClient.get(EDNPOINT.DETAIL + '/' + slug)
}

export const playEpisodeAPI = async (slug: string): Promise<AxiosResponse<GetResponsePlay>> => {
  return httpClient.get(EDNPOINT.PLAY + '/' + slug)
}
