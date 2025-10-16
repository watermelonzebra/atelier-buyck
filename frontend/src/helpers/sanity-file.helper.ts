export function getSanityFileUrl(asset: { url: string }) {
  if (!asset?.url) return "";
  return asset.url;
}
