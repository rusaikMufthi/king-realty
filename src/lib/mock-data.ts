import { Property, BlogPost, Testimonial, Inquiry, Appointment } from '@/types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Sovereign Residence – Ultra-Luxury Penthouse',
    slug: 'sovereign-residence-penthouse-colombo-3',
    description: 'An architectural masterpiece offering uninterrupted 360-degree views of the Indian Ocean and Colombo Skyline. Featuring private elevator access, double-height ceilings, a private rooftop plunge pool, Italian marble flooring, and smart home automation by Creston. Located in the heart of Kollupitiya (Colombo 3).',
    priceLKR: 485000000, // LKR 485 Million
    priceUSD: 1610000,
    propertyType: 'LUXURY_APARTMENT',
    status: 'AVAILABLE',
    address: 'Galle Road, Kollupitiya',
    city: 'Colombo',
    district: 'Colombo 3',
    province: 'Western Province',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5200,
    features: [
      'Private Rooftop Plunge Pool',
      'Oceanfront Balcony',
      'Italian Boffi Kitchen',
      '24/7 Concierge & Security',
      '3 Dedicated Basement Parking Bays',
      'Smart Home Automation',
      'Private Elevator Access',
      'Infinity Gym & Spa Access'
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample',
    isFeatured: true,
    viewsCount: 1420,
    createdAt: '2026-07-15T10:00:00Z',
    updatedAt: '2026-07-28T14:30:00Z'
  },
  {
    id: 'prop-2',
    title: 'Horton Sanctuary Manor – Colombo 7 Colonial Estate',
    slug: 'horton-sanctuary-manor-colombo-7',
    description: 'A rare heritage colonial bungalow meticulously restored with contemporary luxury finishes in Sri Lanka’s most prestigious neighborhood, Cinnamon Gardens (Colombo 7). Set on 45 perches of landscaped tropical gardens with a 50ft lap pool, courtyard fountains, and separate staff quarters.',
    priceLKR: 720000000, // LKR 720 Million
    priceUSD: 2400000,
    propertyType: 'RESIDENTIAL_HOUSE',
    status: 'AVAILABLE',
    address: 'Horton Place, Cinnamon Gardens',
    city: 'Colombo',
    district: 'Colombo 7',
    province: 'Western Province',
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 6800,
    landSizePerch: 45.0,
    features: [
      'Colonial Heritage Architecture',
      '50ft Private Swimming Pool',
      'Landscaped Tropical Gardens',
      'Solar Power System (30kW)',
      'Dual Kitchens (Chef & Wet)',
      'Security Patrol & CCTV',
      'Driver & Maid Quarters',
      'High Ceilings & Teak Flooring'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    viewsCount: 2150,
    createdAt: '2026-06-20T09:15:00Z',
    updatedAt: '2026-08-01T11:00:00Z'
  },
  {
    id: 'prop-3',
    title: 'Mirissa Ocean Cliffside Luxury Villa',
    slug: 'mirissa-ocean-cliffside-villa',
    description: 'Perched on an elevated cliff overlooking Mirissa Bay, this tropical modern sanctuary offers direct access to a private cove, an infinity edge pool overlooking dolphin migration routes, floor-to-ceiling glass walls, and full hospitality licensing for high-yield luxury rental returns.',
    priceLKR: 590000000, // LKR 590 Million
    priceUSD: 1960000,
    propertyType: 'BEACHFRONT_VILLA',
    status: 'AVAILABLE',
    address: 'Coconut Tree Hill Road',
    city: 'Mirissa',
    district: 'Matara / Galle Coast',
    province: 'Southern Province',
    bedrooms: 6,
    bathrooms: 7,
    areaSqft: 7500,
    landSizePerch: 60.0,
    features: [
      'Panoramic Oceanfront Views',
      'Infinity Cliffside Pool',
      'Boutique Resort License Included',
      'Solar Powered & Off-Grid Ready',
      'Private Cove Access',
      'Outdoor Dining Pavilion',
      'Full Staff Setup'
    ],
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    viewsCount: 3400,
    createdAt: '2026-07-02T12:00:00Z',
    updatedAt: '2026-08-02T08:20:00Z'
  },
  {
    id: 'prop-4',
    title: 'Royal Waterway Villa – Rajagiriya Lakefront',
    slug: 'royal-waterway-villa-rajagiriya',
    description: 'Exclusive waterfront residence situated on Diyawanna Lake in Rajagiriya. Features custom timber decks, private boat dock, lush tropical gardens, a wine cellar, and high-efficiency solar battery setup.',
    priceLKR: 340000000, // LKR 340 Million
    priceUSD: 1130000,
    propertyType: 'RESIDENTIAL_HOUSE',
    status: 'UNDER_NEGOTIATION',
    address: 'Diyawanna Lake Road',
    city: 'Rajagiriya',
    district: 'Colombo Suburbs',
    province: 'Western Province',
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 4500,
    landSizePerch: 30.0,
    features: [
      'Private Boat Dock',
      'Lakefront Sunset View Deck',
      'Wine Tasting Cellar',
      'Full Backup Generator',
      'Custom Teak Wood Interior'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    viewsCount: 980,
    createdAt: '2026-05-18T16:00:00Z',
    updatedAt: '2026-07-30T10:00:00Z'
  },
  {
    id: 'prop-5',
    title: 'Galle Fort Heritage Merchant House',
    slug: 'galle-fort-heritage-merchant-house',
    description: 'A 17th-century UNESCO World Heritage Dutch colonial town house located inside Galle Fort. Fully restored with internal courtyard pool, high vaulted ceilings, satinwood staircases, and operating as a luxury boutique stay.',
    priceLKR: 410000000, // LKR 410 Million
    priceUSD: 1360000,
    propertyType: 'COMMERCIAL',
    status: 'AVAILABLE',
    address: 'Lighthouse Street, Galle Fort',
    city: 'Galle',
    district: 'Galle',
    province: 'Southern Province',
    bedrooms: 5,
    bathrooms: 5,
    areaSqft: 4100,
    landSizePerch: 18.5,
    features: [
      'UNESCO Heritage Property',
      'Internal Courtyard Plunge Pool',
      'Commercial Hospitality License',
      'Satinwood & Jackwood Finishes',
      'High Walking Traffic Zone'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    viewsCount: 1890,
    createdAt: '2026-06-10T14:20:00Z',
    updatedAt: '2026-07-25T09:40:00Z'
  },
  {
    id: 'prop-6',
    title: 'Nawala Prime Residential Land Plot',
    slug: 'nawala-prime-residential-land-plot',
    description: 'Clear title, prime rectangular land plot located in a quiet private cul-de-sac off Nawala Road. Ideal for a multi-story luxury villa or high-end residential development.',
    priceLKR: 185000000, // LKR 185 Million
    priceUSD: 615000,
    propertyType: 'LAND_PLOTS',
    status: 'AVAILABLE',
    address: 'Koswatta Road, Nawala',
    city: 'Rajagiriya',
    district: 'Colombo Suburbs',
    province: 'Western Province',
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 0,
    landSizePerch: 25.0,
    features: [
      '40ft Road Access',
      'Rectangular Plot Shape',
      '3 Phase Electricity & City Water',
      '100% Clear Title Deed',
      'Close to Hospitals & International Schools'
    ],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    viewsCount: 760,
    createdAt: '2026-07-20T11:00:00Z',
    updatedAt: '2026-08-01T15:00:00Z'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Navigating Luxury Real Estate Investments in Colombo: 2026 & Beyond',
    slug: 'navigating-luxury-real-estate-investments-colombo-2026',
    excerpt: 'An in-depth analysis of Colombo 3, 5, and 7 price appreciation trends, tax incentives for foreign buyers, and high-yield rental hotspots.',
    content: `
# Navigating Luxury Real Estate Investments in Colombo: 2026 & Beyond

The luxury real estate landscape in Sri Lanka has undergone a remarkable evolution over recent years. Driven by infrastructure developments, growing interest from the Sri Lankan diaspora, and foreign investor confidence in coastal and Colombo prime residential sectors, market yields remain exceptionally competitive compared to regional hubs like Singapore or Dubai.

## Key Growth Drivers in Colombo Prime Zones

### 1. Cinnamon Gardens & Kollupitiya (Colombo 7 & 3)
Cinnamon Gardens continues to command the highest land values per perch in Sri Lanka, averaging between LKR 15M to LKR 25M per perch depending on road width and exact location. The demand for legacy single-family bungalows and luxury boutique residential units remains high.

### 2. High-Yield Oceanfront Apartments
High-rise luxury apartments along Galle Face and Marine Drive offer rental yields ranging between 6.5% to 8.5% per annum in USD terms, particularly when listed on corporate leasing frameworks.

### 3. Expatriate & Foreign Buyer Tax Frameworks
Foreign nationals can purchase condominium apartments above the 4th floor directly. Recent regulatory streamlining has made capital repatriation and property titling significantly smoother for overseas buyers.

## Strategy for Investors
- Focus on properties with 100% clear freehold titles.
- Prioritize locations within 10 minutes of international schools and major private health institutions (Lanka Hospitals, Asiri Surgical, Durdans).
- Engage an independent licensed broker who offers end-to-end legal verification and tenant management services.
    `,
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    category: 'Investment Advice',
    tags: ['Colombo Real Estate', 'Foreign Investment', 'Property Market', 'Sri Lanka'],
    authorName: 'KING Realty',
    published: true,
    publishedAt: '2026-07-25T08:00:00Z',
    viewsCount: 1250
  },
  {
    id: 'blog-2',
    title: 'Essential Legal Checklist When Purchasing Land in Sri Lanka',
    slug: 'essential-legal-checklist-purchasing-land-sri-lanka',
    excerpt: 'Avoid costly legal pitfalls. Learn how to verify street line certificates, non-vesting documents, title search histories, and surveyor extracts.',
    content: `
# Essential Legal Checklist When Purchasing Land in Sri Lanka

Purchasing land in Sri Lanka represents one of the safest long-term wealth preservation vehicles if conducted with meticulous legal due diligence.

## 1. Title Search (Extracts)
Always request an extract search from the relevant Land Registry for at least 30 to 104 years. Ensure there are no unremoved mortgages, lis pendens (pending court actions), or caveats registered against the volume and folio.

## 2. Street Line & Building Line Certificate
Issued by the relevant Municipal Council or Pradeshiya Sabha. This document verifies whether any portion of the land is earmarked for future road expansion.

## 3. Non-Vesting Certificate
Confirms that the property has not been acquired by the government under the Land Acquisition Act or Urban Development Authority (UDA) schemes.

## 4. Surveyor Plan Assessment
Hire a licensed surveyor to re-trace the boundaries against the registered plan. Ensure the boundaries match physical fences and adjacent property claims.
    `,
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    category: 'Legal Advice',
    tags: ['Legal Checklist', 'Land Buying', 'Sri Lanka Law', 'Property Title'],
    authorName: 'KING Realty',
    published: true,
    publishedAt: '2026-07-10T10:00:00Z',
    viewsCount: 940
  },
  {
    id: 'blog-3',
    title: 'Why Southern Province Beachfront Villas are Outperforming Traditional Stocks',
    slug: 'southern-province-beachfront-villas-outperforming-stocks',
    excerpt: 'Discover why coastal properties in Galle, Mirissa, and Ahangama are attracting international luxury buyers and generating double-digit ROI.',
    content: `
# Why Southern Province Beachfront Villas are Outperforming Traditional Stocks

Sri Lanka's Southern Coast has cemented its reputation as a global boutique tourism hotspot. Investors who acquired beachfront or cliffside plots in Galle, Ahangama, and Mirissa over the past 5 years have enjoyed capital appreciation exceeding 20% annually.

## Factors Driving Southern Coast ROI
- **High Occupancy Rates**: Year-round demand driven by surf culture, digital nomads, and high-end European tourists.
- **Boutique Hospitality Monetization**: Villas yielding $500 - $1,500 per night during peak season.
- **Improved Connectivity**: The Southern Expressway connects Colombo to Galle in under 1.5 hours.
    `,
    coverImage: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    category: 'Market Trends',
    tags: ['Galle', 'Mirissa', 'Beachfront Villa', 'ROI'],
    authorName: 'KING Realty',
    published: true,
    publishedAt: '2026-06-18T14:00:00Z',
    viewsCount: 1820
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Deshabandu Dr. Asantha Perera',
    roleTitle: 'Buyer – Colombo 7 Colonial Estate',
    content: 'KING Realty delivered absolute discretion and unparalleled local expertise. Buying a heritage property in Horton Place requires complex legal and municipal navigating, and the principal agent handled every single detail smoothly.',
    rating: 5,
    isApproved: true,
    createdAt: '2026-06-15T00:00:00Z'
  },
  {
    id: 'test-2',
    clientName: 'Samantha & David Miller',
    roleTitle: 'Expat Investors – Mirissa Beachfront Villa',
    content: 'As Sri Lankan expats residing in Melbourne, finding a trustworthy local partner was critical. KING Realty guided us through virtual tours, legal title checks, and bank escrow payments seamlessly. Highly recommended!',
    rating: 5,
    isApproved: true,
    createdAt: '2026-07-04T00:00:00Z'
  },
  {
    id: 'test-3',
    clientName: 'Kanishka Jayawardena',
    roleTitle: 'Seller – Kollupitiya Penthouse',
    content: 'The property marketing, high-end photography, and selective qualified buyer screening by KING Realty sold our penthouse within 3 weeks at top valuation. Remarkable service!',
    rating: 5,
    isApproved: true,
    createdAt: '2026-07-22T00:00:00Z'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    propertyId: 'prop-1',
    name: 'Rohan de Silva',
    email: 'rohan.desilva@example.lk',
    phone: '+94 77 123 4567',
    message: 'Interested in scheduling a private evening viewing for the Sovereign Residence Penthouse in Colombo 3.',
    type: 'Property Inquiry',
    status: 'NEW',
    createdAt: '2026-08-01T09:30:00Z',
    propertyTitle: 'The Sovereign Residence – Ultra-Luxury Penthouse'
  },
  {
    id: 'inq-102',
    propertyId: 'prop-2',
    name: 'Nisha Wickramasinghe',
    email: 'nisha.w@example.com',
    phone: '+94 71 987 6543',
    message: 'Looking for legal consultation and valuation regarding the Horton Sanctuary Manor.',
    type: 'Valuation',
    status: 'CONTACTED',
    createdAt: '2026-07-29T14:15:00Z',
    propertyTitle: 'Horton Sanctuary Manor – Colombo 7 Colonial Estate'
  },
  {
    id: 'inq-103',
    propertyId: 'prop-3',
    name: 'Marcus Vance',
    email: 'marcus.vance@uk-invest.co.uk',
    phone: '+44 7911 123456',
    message: 'Requesting full ROI financial breakdown and villa management options for Mirissa Ocean Villa.',
    type: 'Property Inquiry',
    status: 'VIEWING_SCHEDULED',
    createdAt: '2026-07-26T11:00:00Z',
    propertyTitle: 'Mirissa Ocean Cliffside Luxury Villa'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-201',
    propertyId: 'prop-1',
    clientName: 'Rohan de Silva',
    clientEmail: 'rohan.desilva@example.lk',
    clientPhone: '+94 77 123 4567',
    preferredDate: '2026-08-05',
    preferredTime: '16:00',
    notes: 'Would like to view during sunset to evaluate ocean balcony view.',
    status: 'CONFIRMED',
    createdAt: '2026-08-01T10:00:00Z',
    propertyTitle: 'The Sovereign Residence – Ultra-Luxury Penthouse'
  },
  {
    id: 'appt-202',
    propertyId: 'prop-3',
    clientName: 'Marcus Vance',
    clientEmail: 'marcus.vance@uk-invest.co.uk',
    clientPhone: '+44 7911 123456',
    preferredDate: '2026-08-10',
    preferredTime: '11:00',
    notes: 'Arriving in Sri Lanka on August 9th.',
    status: 'PENDING',
    createdAt: '2026-07-27T15:30:00Z',
    propertyTitle: 'Mirissa Ocean Cliffside Luxury Villa'
  }
];
