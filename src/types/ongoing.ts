import type { AnimeItem } from './home'
import type { MetaData } from './metaData'

export interface getResponseOngoing {
  status: number
  message: string
  data: AnimeItem[]
  meta_data: MetaData
}
