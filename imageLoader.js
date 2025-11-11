// imageLoader.js
export default function customLoader({ src, width, quality }) {
  return `/bellapassi/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}