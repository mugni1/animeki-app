import type { AxiosResponse } from 'axios'
import { httpClient } from './httpClient'
import { EDNPOINT } from './endpoints'
import type { getAnimeHomeResponse } from '@/types/home'
import type { DetailResponse } from '@/types/detail'
import type { GetResponsePlay } from '@/types/play'
import type { getResponseOngoing } from '@/types/ongoing'

export const animeHomeAPI = async (): Promise<AxiosResponse<getAnimeHomeResponse>> => {
  return httpClient.get(EDNPOINT.HOME)
}

export const animeDetailAPI = async (slug: string): Promise<AxiosResponse<DetailResponse>> => {
  return httpClient.get(EDNPOINT.DETAIL + '/' + slug)
}

export const playEpisodeAPI = async (slug: string): Promise<AxiosResponse<GetResponsePlay>> => {
  return httpClient.get(EDNPOINT.PLAY + '/' + slug)
}

export const ongoingAPI = async (
  page: string | null,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const currentPage = page || 1
  return httpClient.get(EDNPOINT.ONGOING + '?page=' + currentPage)
}

export const completedAPI = async (
  page: string | null,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const currentPage = page || 1
  return httpClient.get(EDNPOINT.COMPLETED + '?page=' + currentPage)
}
