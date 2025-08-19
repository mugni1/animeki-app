export interface StudioItem {
  title: string
  total: string
  slug: string
}

export interface GetResponseStudio {
  status: number
  message: string
  data: StudioItem[]
  meta_data: null
}
