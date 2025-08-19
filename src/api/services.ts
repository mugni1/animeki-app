import type { AxiosResponse } from 'axios'
import { httpClient } from './httpClient'
import { ENDPOINT } from './endpoints'
import type { getAnimeHomeResponse } from '@/types/home'
import type { DetailResponse } from '@/types/detail'
import type { GetResponsePlay } from '@/types/play'
import type { getResponseOngoing } from '@/types/ongoing'
import type { SearchParams } from '@/types/search'
import type { getResponseGenres } from '@/types/genres'
import type { GetResponseAnimeByStudio, GetResponseStudio } from '@/types/studio'

export const animeHomeAPI = async (): Promise<AxiosResponse<getAnimeHomeResponse>> => {
  return httpClient.get(ENDPOINT.HOME)
}

export const animeDetailAPI = async (slug: string): Promise<AxiosResponse<DetailResponse>> => {
  return httpClient.get(ENDPOINT.DETAIL + '/' + slug)
}

export const playEpisodeAPI = async (slug: string): Promise<AxiosResponse<GetResponsePlay>> => {
  return httpClient.get(ENDPOINT.PLAY + '/' + slug)
}

export const ongoingAPI = async (
  page: string | null,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const currentPage = page || 1
  return httpClient.get(ENDPOINT.ONGOING + '?page=' + currentPage)
}

export const completedAPI = async (
  page: string | null,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const currentPage = page || 1
  return httpClient.get(ENDPOINT.COMPLETED + '?page=' + currentPage)
}

export const searchAPI = async (
  params: SearchParams,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const key = params.keyword || ''
  const currentPage = params.current_page || 1
  return httpClient.get(`${ENDPOINT.SEARCH}?keyword=${key}&page=${currentPage}`)
}

export const genresAPI = async (): Promise<AxiosResponse<getResponseGenres>> => {
  return httpClient.get(ENDPOINT.GENRES)
}

export const animeByGenre = async (
  slug: string,
  page?: string | number,
): Promise<AxiosResponse<getResponseOngoing>> => {
  const currentPage = page || 1
  return httpClient.get(`${ENDPOINT.GENRE}/${slug}?page=${currentPage}`)
}

export const studiosAPI = async (): Promise<AxiosResponse<GetResponseStudio>> => {
  return httpClient.get(ENDPOINT.STUDIOS)
}

export const animeByStudioAPI = async (
  slug: string,
  page?: string | number,
): Promise<AxiosResponse<GetResponseAnimeByStudio>> => {
  const currentPage = page || 1
  return httpClient.get(`${ENDPOINT.STUDIO}/${slug}?page=${currentPage}`)
}
