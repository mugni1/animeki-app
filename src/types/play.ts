export interface ServerItem {
  server_title: string
  server_src: string
}

export interface RecomendationAnimeItem {
  title: string
  slug: string
  type_station: string
  status: string
  cover: string
}

export interface GetResponsePlay {
  status: number
  message: string
  data: {
    title: string
    updated: string
    main_player: string
    mirror_server: ServerItem[]
    prev_episode: string
    next_episode: string
    recomended_animes: RecomendationAnimeItem[]
  } | null
  meta_data: null
}
