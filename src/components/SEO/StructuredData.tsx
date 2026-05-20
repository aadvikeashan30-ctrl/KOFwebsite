export default function StructuredData() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Regional Oilseeds Growers' Co-operative Society Union Ltd.",
    alternateName: 'KOF Chitradurga',
    url: 'https://kofchitradurga.com',
    logo: 'https://kofchitradurga.com/favicon.ico',
    description: "Karnataka Co-operative Oilseeds Growers' Federation - Premium AGMARK certified edible oils since 1984",
    foundingDate: '1984-10-26',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KOF Complex, Near APMC Yard',
      addressLocality: 'Chitradurga',
      addressRegion: 'Karnataka',
      postalCode: '577501',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-6366975382',
      contactType: 'sales',
      email: 'kofcta2@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['English', 'Kannada'],
    },
    sameAs: [
      'https://facebook.com/kofchitradurga',
      'https://instagram.com/kofchitradurga',
    ],
  };

  const localBizSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KOF Chitradurga',
    image: 'https://kofchitradurga.com/favicon.ico',
    telephone: '+91-6366975382',
    email: 'kofcta2@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'KOF Complex',
      addressLocality: 'Chitradurga',
      addressRegion: 'Karnataka',
      postalCode: '577501',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 14.22, longitude: 76.38 },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '₹₹',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />
    </>
  );
}
