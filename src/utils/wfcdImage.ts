import itemIconsData from '@/assets/data/item-icons.json';

const CDN_BASE_URL = 'https://cdn.warframestat.us/img/';
const FALLBACK_ICON = '/fallback-item.svg';

const iconMap: Record<string, string> = itemIconsData;

export function getWfcdIconUrl(englishName?: string): string {
  if (!englishName) return FALLBACK_ICON;
  
  const key = englishName.toLowerCase().trim();
  const imageName = iconMap[key];

  if (!imageName) {
    return FALLBACK_ICON;
  }

  return `${CDN_BASE_URL}${imageName}`;
}