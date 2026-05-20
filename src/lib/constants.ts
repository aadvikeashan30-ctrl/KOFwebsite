export const COMPANY_INFO = {
  name: 'KOF Chitradurga',
  fullName: 'Regional Oilseeds Growers\' Co-operative Society Union Ltd.',
  parentOrg: 'Karnataka Co-operative Oilseeds Growers\' Federation Limited',
  tagline: 'Pure Oil, Pure Trust - Since 1984',
  description: 'Committed to farmers and quality edible oil production for over 40 years',
  email: 'kofcta2@gmail.com',
  phone: '+91 6366975382',
  address: '#29/1, KIADB Industrial Area, Kelagote, Old Bangalore Rd, Chitradurga, Karnataka - 577501',
  website: 'https://kofchitradurga.com',
  registeredDate: '26th October, 1984',
  socialMedia: {
    whatsapp: 'https://wa.me/916366975382',
    facebook: 'https://facebook.com/kofchitradurga',
    instagram: 'https://instagram.com/kofchitradurga',
  }
};

// NOTE: price_range field removed - prices are fetched LIVE from /api/public/pricing
// which the admin updates via /admin/pricing panel
export const PRODUCTS = [
  {
    id: 'sungold-sunflower',
    name: 'Sungold Refined Sunflower Oil',
    category: 'Refined Oil',
    description: 'AGMARK certified pure refined sunflower oil. Preferred by households and bulk users for its reusable quality.',
    sizes: ['500ml', '1L', '2L', '5L', '15L'],
    image: '/products/sunflower-oil.jpg',
    features: ['AGMARK Certified', 'Double Filtered', 'No Cholesterol', 'Reusable Quality'],
  },
  {
    id: 'safal-groundnut',
    name: 'Safal Groundnut Oil',
    category: 'Filtered Oil',
    description: 'Premium quality groundnut oil extracted from the finest oilseeds procured directly from cooperative societies.',
    sizes: ['500ml', '1L', '2L', '5L', '15L'],
    image: '/products/groundnut-oil.jpg',
    features: ['Cold Pressed', 'Farm Fresh', 'Rich Aroma', 'Traditional Taste'],
  },
  {
    id: 'safal-palmolein',
    name: 'Safal Palmolein Oil',
    category: 'Cooking Oil',
    description: 'High quality palmolein oil ideal for deep frying and commercial cooking applications.',
    sizes: ['1L', '2L', '5L', '15L'],
    image: '/products/palmolein-oil.jpg',
    features: ['High Smoke Point', 'Ideal for Frying', 'Economical', 'Bulk Available'],
  },
  {
    id: 'safal-soyabean',
    name: 'Safal Soyabean Oil',
    category: 'Refined Oil',
    description: 'Nutritious soyabean oil rich in omega-3 fatty acids, perfect for health-conscious families.',
    sizes: ['1L', '2L', '5L', '15L'],
    image: '/products/soyabean-oil.jpg',
    features: ['Omega-3 Rich', 'Heart Healthy', 'Light Texture', 'Versatile'],
  },
  {
    id: 'safal-ricebran',
    name: 'Safal Rice Bran Oil',
    category: 'Health Oil',
    description: 'Premium rice bran oil with balanced fatty acid composition, excellent for all types of cooking.',
    sizes: ['1L', '2L', '5L'],
    image: '/products/ricebran-oil.jpg',
    features: ['Oryzanol Rich', 'Low Absorption', 'Heart Friendly', 'Light & Healthy'],
  },
  {
    id: 'deoiled-cake',
    name: 'De-oiled Cake (DOC)',
    category: 'By-product',
    description: 'High protein de-oiled cake, excellent for cattle feed and organic farming applications.',
    sizes: ['25kg', '50kg'],
    image: '/products/deoiled-cake.jpg',
    features: ['High Protein', 'Cattle Feed', 'Organic Farming', 'Bulk Supply'],
  },
];

export const DEPARTMENTS = [
  'Administration',
  'Production',
  'Marketing',
  'Finance',
  'Procurement',
  'Quality',
  'Distribution',
  'Human Resources',
  'Warehouse',
  'IT',
];

export const DISTRICTS = [
  'Chitradurga',
  'Davangere',
  'Shimoga',
  'Haveri',
];
