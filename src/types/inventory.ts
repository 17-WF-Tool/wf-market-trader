export interface Item {
  url_name: string
  name_en: string
  name_tc: string
  name_zh: string
  base_price: number
  current_price: number
  selected: boolean
  quantity: number
  mod_rank?: number
  image_url?: string
}

export type GroupedInventory = Record<string, Item[]>
export type LangMode = 'tc' | 'en' | 'zh'