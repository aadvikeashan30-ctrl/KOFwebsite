import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KOF Chitradurga - Pure Oil, Pure Trust',
    short_name: 'KOF',
    description: "Karnataka Co-operative Oilseeds Growers' Federation - Premium AGMARK certified edible oils since 1984",
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5EC',
    theme_color: '#0E5A3A',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  };
}
