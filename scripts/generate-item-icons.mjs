import fs from 'node:fs';
import path from 'node:path';
import Items from '@wfcd/items';

const items = new Items({
  category: ['Mods', 'Warframes', 'Weapons', 'Relics', 'Resources']
});

const iconMap = {};

for (const item of items) {
  if (item.name && item.imageName) {
    iconMap[item.name.toLowerCase().trim()] = item.imageName;
  }
}

const outputDir = path.resolve('src/assets/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'item-icons.json');
fs.writeFileSync(outputPath, JSON.stringify(iconMap));

console.log(`成功產出 ${Object.keys(iconMap).length} 筆物品圖標對照表至: ${outputPath}`);