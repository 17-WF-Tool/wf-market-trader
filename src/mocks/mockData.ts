import type { GroupedInventory } from '../types/inventory'

export const MOCK_INVENTORY: GroupedInventory = {
  "Baro 商人": [
    {
      url_name: "primed_continuity",
      name_tc: "持久力 Prime",
      name_en: "Primed Continuity",
      name_zh: "持久力 Prime",
      base_price: 45,
      current_price: 45,
      selected: false,
      quantity: 1,
      mod_rank: 0,
      image_url: "https://cdn.warframestat.us/img/primed-continuity.png"
    },
    {
      url_name: "primed_target_cracker",
      name_tc: "弱點專精 Prime",
      name_en: "Primed Target Cracker",
      name_zh: "弱点专精 Prime",
      base_price: 50,
      current_price: 50,
      selected: false,
      quantity: 1,
      mod_rank: 0,
      image_url: "https://cdn.warframestat.us/img/primed-target-cracker.png"
    }
  ],
  "鋼鐵之路 (Teshin)": [
    {
      url_name: "primary_merciless",
      name_tc: "主要無情",
      name_en: "Primary Merciless",
      name_zh: "主要无情",
      base_price: 25,
      current_price: 25,
      selected: false,
      quantity: 1,
      mod_rank: 5,
      image_url: "https://cdn.warframestat.us/img/primary-merciless.png"
    }
  ]
}