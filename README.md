# Warframe.Market 商品控制器 (Frontend)

基於 **Vue 3 + Vite + Tailwind CSS v4** 開發的《Warframe.Market》庫存控制面板。主要用於針對特定集團（如中樞蘇達、均衡仲裁者等）進行群組化的批次調價、即時改價與掛單狀態（顯示 / 隱藏）管理。


## 核心特性

- **商人分類導覽**：以商人來源為維度的 Tab 視圖，針對單一勢力專屬商品面板展開。
- **三語即時對照**：單一商品直向堆疊展示「繁體中文」、「英文」與「簡體中文」，便於跨語系辨認道具。
- **多選與批次控制**：支援全選/反選與自選，所有批次操作（公開顯示、隱藏、更新掛單）僅作用於選取標籤。
- **即時獨立改價**：顯示原基準價格與動態輸入框，支援即時自訂單件商品的販售白金價格。
- **Mock 降級機制**：內建展示資料，在後端服務尚未連線時自動回退至 Mock 模式供介面預覽。

## 技術棧

<p align="left">
    <a href="https://vuejs.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" alt="vue3" width="36" height="36"/>
    </a>&nbsp;&nbsp;
    <a href="https://vite.dev/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" alt="vite" width="36" height="36"/>
    </a>
    <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="36" height="36"/>
    </a>&nbsp;&nbsp;
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="36" height="36"/>
    </a>&nbsp;&nbsp;
</p>


* **核心框架**：[Vue 3](https://vuejs.org/) 
    > Vue3 採用 Composition API / `<script setup>`。
* **建置核心**：[Vite](https://vite.dev/)
* **樣式**：[Tailwind CSS v4](https://tailwindcss.com/)
* **語言**：[TypeScript](https://www.typescriptlang.org/)
* **資料庫**：[Warframe Community Developers (WFCD)](https://github.com/WFCD/warframe-items)
    > 開放資料來源。


## 注意事項

### WFCD 資料更新

[圖片資料](./src/assets/data/)隨專案移動，若內容過期請參考下方指令更新內容：

```bash
   npm update @wfcd/items
```
與
```bash
   npm run generate:icons
```