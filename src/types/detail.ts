import type { CharAndActor } from './charAndActor'
import type { Episode } from './episode'
import type { Gentre } from './gentre'

export interface Spe {
  title: string
  content: string
  slug: null | string
}
export interface DetailResponse {
  status: number
  message: string
  data: {
    cover: string
    trailer: string
    rating: number
    title: string
    spe: Spe[]
    gentres: Gentre[]
    synopsis: string
    character_and_actor: CharAndActor[]
    first_episode: Episode
    last_episode: Episode
    episodes: Episode[]
  }
  meta_data: string | null
}
