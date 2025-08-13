export interface GenreItem {
  title: string
  total: string
  slug: string
}

export interface getResponseGenres {
  status: number
  message: string
  data: GenreItem[]
  meta_data: null
}
