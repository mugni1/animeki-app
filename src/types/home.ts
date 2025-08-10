export interface AnimeItem {
  title: string
  slug: string
  type_station?: string
  episode?: string
  cover: string
}

export interface getAnimeHomeResponse {
  status: number
  message: string
  data: {
    ongoing_anime: AnimeItem[]
    completed_anime: AnimeItem[]
  } | null
  meta_data: null
}
