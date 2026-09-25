<script setup lang="ts">
import { computed } from 'vue'
import type { Item } from '@/types/inventory'
import ItemRow from './ItemRow.vue'

const props = defineProps<{
  groupName: string
  items: Item[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'publish', groupName: string, items: Item[]): void
  (e: 'toggleVisibility', groupName: string, visible: boolean, items: Item[]): void
}>()

// 全選 / 取消全選
const allSelected = computed({
  get: () => props.items.length > 0 && props.items.every(i => i.selected),
  set: (val: boolean) => props.items.forEach(i => i.selected = val)
})

const selectedItems = computed(() => props.items.filter(i => i.selected))
const selectedCount = computed(() => selectedItems.value.length)
</script>

<template>
  <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg">
    <div>
      <!-- 卡片頂部標題與計數 -->
      <div class="flex justify-between items-center mb-5 pb-3 border-b border-slate-800/80">
        <div class="flex items-center gap-3">
          <input 
            type="checkbox" 
            v-model="allSelected" 
            class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 cursor-pointer accent-sky-500"
            title="全選 / 取消全選"
          />
          <h2 class="text-base font-bold text-sky-400">【{{ groupName }}】全品項列表</h2>
        </div>
        <span class="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-mono border border-slate-700">
          已選 {{ selectedCount }} / {{ items.length }} 件
        </span>
      </div>

      <!-- 商品清單 (單列大面板) -->
      <div class="space-y-3 mb-6">
        <ItemRow 
          v-for="item in items" 
          :key="item.url_name" 
          :item="item" 
        />
      </div>
    </div>

    <!-- 底部控制按鈕區 -->
    <div class="border-t border-slate-800 pt-5 space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <button 
          @click="emit('toggleVisibility', groupName, true, selectedItems)"
          :disabled="loading || selectedCount === 0"
          class="py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 disabled:opacity-30 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-lg transition"
        >
          👁️ 公開顯示 ({{ selectedCount }})
        </button>
        <button 
          @click="emit('toggleVisibility', groupName, false, selectedItems)"
          :disabled="loading || selectedCount === 0"
          class="py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 disabled:opacity-30 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-lg transition"
        >
          🕶️ 隱藏掛單 ({{ selectedCount }})
        </button>
      </div>

      <button 
        @click="emit('publish', groupName, selectedItems)"
        :disabled="loading || selectedCount === 0"
        class="w-full py-3 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold tracking-wide rounded-lg transition shadow-md"
      >
        批次更新掛單 ({{ selectedCount }} 件)
      </button>
    </div>
  </div>
</template>