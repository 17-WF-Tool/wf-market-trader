<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GroupedInventory, Item } from './types/inventory'
import { MOCK_INVENTORY } from './mocks/mockData'
import GroupCard from './components/GroupCard.vue'

const groups = ref<GroupedInventory>({})
const selectedGroupName = ref<string>('')
const isMock = ref(true)
const loading = ref(false)
const logs = ref<string[]>([])

const addLog = (msg: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${msg}`)
}

const groupNames = computed(() => Object.keys(groups.value))

const currentGroupItems = computed(() => {
  if (!selectedGroupName.value) return []
  return groups.value[selectedGroupName.value] || []
})

const loadData = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/inventory/groups')
    if (!res.ok) throw new Error()
    const data: GroupedInventory = await res.json()
    
    // 初始化為不選中
    for (const group of Object.values(data)) {
      group.forEach(item => item.selected = false)
    }
    groups.value = data
    isMock.value = false
    addLog('成功自後端同步商品資料')
  } catch {
    const mockCopy: GroupedInventory = JSON.parse(JSON.stringify(MOCK_INVENTORY))
    for (const group of Object.values(mockCopy)) {
      group.forEach(item => item.selected = false)
    }
    groups.value = mockCopy
    isMock.value = true
    addLog('未偵測到後端，已啟用 Mock 展示資料')
  } finally {
    // 預設選取第一個商人
    const names = Object.keys(groups.value)
    if (names.length > 0 && !selectedGroupName.value) {
      selectedGroupName.value = names[0]
    }
  }
}

const handlePublish = async (groupName: string, selectedItems: Item[]) => {
  loading.value = true
  addLog(`[操作] 開始更新【${groupName}】共 ${selectedItems.length} 件商品掛單...`)
  
  setTimeout(() => {
    selectedItems.forEach(i => {
      addLog(` -> 已送出 ${i.name_tc} (${i.name_en}) | 單價: ${i.current_price}p`)
    })
    addLog(`[完成] 【${groupName}】掛單更新完畢`)
    loading.value = false
  }, 400)
}

const handleToggleVisibility = async (groupName: string, visible: boolean, selectedItems: Item[]) => {
  loading.value = true
  const actionText = visible ? '公開顯示' : '暫時隱藏'
  addLog(`[狀態] 【${groupName}】${selectedItems.length} 件商品 -> ${actionText}`)
  
  setTimeout(() => {
    loading.value = false
  }, 300)
}

onMounted(loadData)
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans selection:bg-sky-500 selection:text-white">
    <div class="max-w-4xl mx-auto space-y-6">
      
      <header class="flex justify-between items-center border-b border-slate-800 pb-5">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold tracking-tight text-white">Warframe.Market 商品控制器</h1>
            <span 
              :class="isMock ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'"
              class="text-xs px-2.5 py-0.5 rounded-full border font-mono"
            >
              {{ isMock ? 'Mock 模式' : '已連線' }}
            </span>
          </div>
        </div>

        <button 
          @click="loadData" 
          class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md border border-slate-700 transition"
        >
          重新整理
        </button>
      </header>

      <section class="flex flex-wrap items-center gap-2.5 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
        <span class="text-xs font-semibold text-slate-400 px-2">商人類別：</span>
        <button
          v-for="name in groupNames"
          :key="name"
          @click="selectedGroupName = name"
          class="px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-2"
          :class="selectedGroupName === name
            ? 'bg-sky-600 text-white shadow-[0_0_12px_rgba(14,165,233,0.3)] ring-1 ring-sky-400'
            : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'"
        >
          <span>{{ name }}</span>
          <span 
            class="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
            :class="selectedGroupName === name ? 'bg-sky-800 text-sky-200' : 'bg-slate-800 text-slate-500'"
          >
            {{ groups[name]?.length || 0 }}
          </span>
        </button>
      </section>

      <main v-if="selectedGroupName && currentGroupItems.length > 0">
        <GroupCard 
          :group-name="selectedGroupName"
          :items="currentGroupItems"
          :loading="loading"
          @publish="handlePublish"
          @toggle-visibility="handleToggleVisibility"
        />
      </main>
      
      <hr class="border-t border-slate-800 my-6 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]" />

      <section class="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <h3 class="text-xs font-medium text-slate-400 mb-2">執行歷程記錄</h3>
        <div class="font-mono text-xs text-slate-300 space-y-1 max-h-36 overflow-y-auto pr-1">
          <div v-if="logs.length === 0" class="text-slate-600">無記錄...</div>
          <div v-for="(item, i) in logs" :key="i" class="leading-relaxed">{{ item }}</div>
        </div>
      </section>

    </div>
  </div>
</template>