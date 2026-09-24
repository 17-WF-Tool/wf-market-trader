import type { GroupedInventory } from '../types/inventory'
import { MOCK_INVENTORY } from '../mocks/mockData'

const API_BASE = 'http://127.0.0.1:8000/api/inventory'

export async function fetchInventoryGroups(): Promise<{ data: GroupedInventory; isMock: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/groups`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return { data, isMock: false }
  } catch {
    return { data: MOCK_INVENTORY, isMock: true }
  }
}

export async function publishGroupApi(groupName: string, multiplier: number): Promise<{ count: number }> {
  const res = await fetch(`${API_BASE}/groups/${groupName}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ multiplier })
  })
  if (!res.ok) throw new Error(`發布失敗: HTTP ${res.status}`)
  return await res.json()
}