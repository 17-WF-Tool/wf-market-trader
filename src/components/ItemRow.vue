<script setup lang="ts">
import type { Item } from '@/types/inventory'
import { getWfcdIconUrl } from '@/utils/wfcdImage';

defineProps<{
  item: Item
}>()
</script>

<template>
  <div 
    class="relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-200"
    :class="item.selected 
      ? 'bg-slate-900/90 border-sky-500/60 shadow-[0_0_12px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/30' 
      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'"
  >
    <!-- 選定高光標籤 -->
    <span 
      v-if="item.selected" 
      class="absolute -top-2 right-3 px-1.5 py-0.5 text-[9px] font-mono tracking-wider text-sky-300 bg-sky-950 border border-sky-500/50 rounded shadow-sm"
    >
      選定
    </span>

    <!-- 選擇核取方塊 -->
    <input 
      type="checkbox" 
      v-model="item.selected"
      class="w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 cursor-pointer accent-sky-500 shrink-0"
    />

    <!-- 左側物品圖片 -->
    <div class="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center p-1 shrink-0 border border-slate-800">
      <img v-if="item.name_en" :src="getWfcdIconUrl(item.name_en)" :alt="item.name_tc" class="w-full h-full object-contain" />
      <span v-else class="text-[10px] text-slate-600">無圖</span>
    </div>

    <!-- 中間多語言名稱 (繁 -> 英 -> 簡) -->
    <div class="flex-1 min-w-0 py-0.5 space-y-0.5">
      <div class="text-xs font-bold text-slate-100 truncate">
        {{ item.name_tc }}
      </div>
      <div class="text-[11px] font-medium text-sky-400/90 truncate font-mono">
        {{ item.name_en }}
      </div>
      <div class="text-[10px] text-slate-400 truncate">
        {{ item.name_zh }}
      </div>
    </div>

    <!-- 右側價格操作區：上顯示當前價格，下為更改價位輸入框 -->
    <div class="flex flex-col items-end gap-1.5 shrink-0 pl-2">
      <!-- 1. 上方：當前原價/基準價 -->
      <div class="flex items-center gap-1">
        <span class="text-[10px] text-slate-400 font-medium">當前:</span>
        <span class="text-xs font-mono font-bold text-amber-400">{{ item.base_price }}</span>
        <span class="text-[10px] text-slate-500 font-mono">p</span>
      </div>

      <!-- 2. 下方：自訂改價輸入框 -->
      <div class="relative flex items-center">
        <input 
          type="number" 
          v-model.number="item.current_price" 
          min="1"
          placeholder="改價"
          class="w-20 px-2.5 py-1 text-center text-xs font-mono font-bold text-white bg-slate-950 border border-slate-700 rounded-md focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:outline-none transition shadow-inner"
        />
        <span class="absolute right-2 text-[10px] text-slate-400 font-mono pointer-events-none">p</span>
      </div>
    </div>

  </div>
</template>