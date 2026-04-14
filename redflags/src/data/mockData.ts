export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  sizes: string[];
  category: string;
  popularity: number;
  rating: number; // Average rating out of 5
  reviewCount: number; // Number of reviews
  type?: 'flag' | 'pennant' | 'flagpole' | 'custom'; // Product type
  material?: string; // Fabric material
  suitableFor?: string[]; // For which flagpole heights
  height?: string; // For flagpoles
  bestseller?: boolean; // Mark as bestseller
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Netherlands Flag',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1721824231627-010969984bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRoZXJsYW5kcyUyMGZsYWd8ZW58MXx8fHwxNzcwMjEyOTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Official Netherlands flag with vibrant colors. Made from durable polyester fabric.',
    inStock: true,
    sizes: ['60x90cm', '90x150cm', '120x180cm'],
    category: 'European',
    popularity: 95,
    rating: 4.8,
    reviewCount: 245,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
    bestseller: true,
  },
  {
    id: '2',
    name: 'USA Flag',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1726323473211-1667aa770847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGZsYWclMjB1c2F8ZW58MXx8fHwxNzcwMjk1NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'High-quality American flag with embroidered stars. Weather-resistant.',
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x240cm'],
    category: 'American',
    popularity: 98,
    rating: 4.9,
    reviewCount: 532,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
    bestseller: true,
  },
  {
    id: '3',
    name: 'German Flag',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1663493955721-110e7e1ae36c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBmbGFnfGVufDF8fHx8MTc3MDIwOTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'German flag featuring black, red, and gold stripes. Perfect for indoor and outdoor use.',
    inStock: true,
    sizes: ['60x90cm', '90x150cm', '120x180cm'],
    category: 'European',
    popularity: 88,
    rating: 4.7,
    reviewCount: 189,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
  },
  {
    id: '4',
    name: 'French Flag',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1626784008755-539a5985f872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmbGFnfGVufDF8fHx8MTc3MDIwOTA0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Classic French Tricolore flag. Made with fade-resistant fabric.',
    inStock: true,
    sizes: ['60x90cm', '90x150cm', '120x180cm'],
    category: 'European',
    popularity: 92,
    rating: 4.6,
    reviewCount: 312,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
  },
  {
    id: '5',
    name: 'UK Flag',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1698337927729-fac31eabbd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml0aXNoJTIwZmxhZyUyMHVrfGVufDF8fHx8MTc3MDI5NTU0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Union Jack flag with bold colors. Reinforced edges for durability.',
    inStock: true,
    sizes: ['90x150cm', '120x180cm', '150x240cm'],
    category: 'European',
    popularity: 94,
    rating: 4.8,
    reviewCount: 421,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
    bestseller: true,
  },
  {
    id: '6',
    name: 'Spanish Flag',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1652954884281-8fb97179c4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwZmxhZ3xlbnwxfHx8fDE3NzAyOTU1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Spanish flag with national coat of arms. Premium quality polyester.',
    inStock: true,
    sizes: ['60x90cm', '90x150cm', '120x180cm'],
    category: 'European',
    popularity: 87,
    rating: 4.5,
    reviewCount: 156,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
  },
  {
    id: '7',
    name: 'Italian Flag',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Italian Tricolore flag with vibrant green, white, and red colors.',
    inStock: false,
    sizes: ['60x90cm', '90x150cm'],
    category: 'European',
    popularity: 85,
    rating: 4.7,
    reviewCount: 203,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
  },
  {
    id: '8',
    name: 'Canadian Flag',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1519832979-6fa011b87667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    description: 'Canadian flag with iconic maple leaf. High-quality materials.',
    inStock: true,
    sizes: ['90x150cm', '120x180cm'],
    category: 'American',
    popularity: 90,
    rating: 4.9,
    reviewCount: 387,
    type: 'flag',
    material: 'polyester',
    suitableFor: ['10ft', '15ft'],
    bestseller: true,
  },
];

// Pennants (Wimpels)
export const mockPennants: Product[] = [
  {
    id: 'p1',
    name: 'Oranje Wimpel',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1602364557658-4d99d38b75d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBlbm5hbnQlMjBiYW5uZXJ8ZW58MXx8fHwxNzcwNzIxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Oranje wimpel voor feestelijke gelegenheden. Weerbestendig polyester.',
    inStock: true,
    sizes: ['30x45cm', '40x60cm', '50x75cm'],
    category: 'Feest',
    popularity: 92,
    rating: 4.7,
    reviewCount: 156,
    type: 'pennant',
    material: 'polyester',
    bestseller: true,
  },
  {
    id: 'p2',
    name: 'Decoratieve Wimpelslinger',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1657736704917-d05989c6006d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGVubmFudCUyMGZsYWd8ZW58MXx8fHwxNzcwNzIxOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Veelkleurige wimpelslinger voor binnen en buiten. Perfect voor feesten en evenementen.',
    inStock: true,
    sizes: ['5 meter', '10 meter', '15 meter'],
    category: 'Decoratie',
    popularity: 88,
    rating: 4.8,
    reviewCount: 203,
    type: 'pennant',
    material: 'polyester',
    bestseller: true,
  },
  {
    id: 'p3',
    name: 'Bedrijfswimpel Custom',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602364557658-4d99d38b75d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBlbm5hbnQlMjBiYW5uZXJ8ZW58MXx8fHwxNzcwNzIxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Op maat gemaakte bedrijfswimpel met uw logo. Hoogwaardige print.',
    inStock: true,
    sizes: ['50x75cm', '60x90cm', '80x120cm'],
    category: 'Zakelijk',
    popularity: 85,
    rating: 4.9,
    reviewCount: 97,
    type: 'pennant',
    material: 'premium polyester',
  },
  {
    id: 'p4',
    name: 'Sport Wimpel',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1657736704917-d05989c6006d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGVubmFudCUyMGZsYWd8ZW58MXx8fHwxNzcwNzIxOTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Sportclub wimpel in diverse kleuren. Ideaal voor verenigingen.',
    inStock: true,
    sizes: ['30x45cm', '40x60cm'],
    category: 'Sport',
    popularity: 79,
    rating: 4.5,
    reviewCount: 134,
    type: 'pennant',
    material: 'polyester',
  },
];

// Flagpoles (Vlaggenstokken)
export const mockFlagpoles: Product[] = [
  {
    id: 'fp1',
    name: 'Vlaggenstok 5 Meter',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1767238534238-b3a01e9ff4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFncG9sZSUyMHBvbGUlMjBvdXRkb29yfGVufDF8fHx8MTc3MDcyMTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Aluminium vlaggenstok 5 meter. Inclusief grondanker en roterende top. Perfect voor particulier gebruik.',
    inStock: true,
    sizes: ['5m'],
    category: 'Vlaggenstokken',
    popularity: 94,
    rating: 4.8,
    reviewCount: 178,
    type: 'flagpole',
    height: '5m',
    material: 'aluminium',
    bestseller: true,
  },
  {
    id: 'fp2',
    name: 'Vlaggenstok 7 Meter',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1731778637347-3d7bc765de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFnJTIwcG9sZSUyMGFsdW1pbnVtfGVufDF8fHx8MTc3MDcyMTkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professionele aluminium vlaggenstok 7 meter. Robuuste constructie, geschikt voor grotere vlaggen.',
    inStock: true,
    sizes: ['7m'],
    category: 'Vlaggenstokken',
    popularity: 91,
    rating: 4.9,
    reviewCount: 142,
    type: 'flagpole',
    height: '7m',
    material: 'aluminium',
    bestseller: true,
  },
  {
    id: 'fp3',
    name: 'Vlaggenstok 9 Meter',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1767238534238-b3a01e9ff4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFncG9sZSUyMHBvbGUlMjBvdXRkb29yfGVufDF8fHx8MTc3MDcyMTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Extra hoge vlaggenstok 9 meter. Ideaal voor bedrijven en overheidsgebouwen. Zeer stevig en duurzaam.',
    inStock: true,
    sizes: ['9m'],
    category: 'Vlaggenstokken',
    popularity: 86,
    rating: 4.9,
    reviewCount: 98,
    type: 'flagpole',
    height: '9m',
    material: 'premium aluminium',
  },
  {
    id: 'fp4',
    name: 'Vlaggenstok 5 Meter Deluxe',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1731778637347-3d7bc765de10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFnJTIwcG9sZSUyMGFsdW1pbnVtfGVufDF8fHx8MTc3MDcyMTkyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Deluxe versie met extra stevige fundering en roestvrij stalen onderdelen. 5 meter hoog.',
    inStock: true,
    sizes: ['5m'],
    category: 'Vlaggenstokken',
    popularity: 82,
    rating: 4.7,
    reviewCount: 76,
    type: 'flagpole',
    height: '5m',
    material: 'premium aluminium',
  },
];

// Combine all products
export const allProducts: Product[] = [
  ...mockProducts,
  ...mockPennants,
  ...mockFlagpoles,
];

export const carouselImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1760372698094-c2add4053ee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpb25hbCUyMGZsYWdzJTIwd2F2aW5nfGVufDF8fHx8MTc3MDI5NTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'National Flags Waving',
    title: 'Quality Flags from Around the World',
    subtitle: 'Discover our extensive collection',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1661958260971-33ffbecd92c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGZsYWdzJTIwYmFubmVyfGVufDF8fHx8MTc3MDI5NTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Colorful Flag Banner',
    title: 'Celebrate Every Occasion',
    subtitle: 'Perfect for events and ceremonies',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1668120084348-efc2ba0ad31d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwZmxhZ3MlMjBkaXNwbGF5fGVufDF8fHx8MTc3MDI5NTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'International Flags Display',
    title: 'Premium Materials',
    subtitle: 'Weather-resistant and durable',
  },
];

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    size?: string;
  }[];
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2026-02-01',
    status: 'delivered',
    items: [
      {
        productId: '1',
        productName: 'Netherlands Flag',
        quantity: 2,
        price: 24.99,
        size: '90x150cm',
      },
    ],
    total: 49.98,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'Amsterdam',
      postalCode: '1012 AB',
      country: 'Netherlands',
    },
  },
  {
    id: 'ORD-002',
    date: '2026-02-03',
    status: 'processing',
    items: [
      {
        productId: '2',
        productName: 'USA Flag',
        quantity: 1,
        price: 29.99,
        size: '120x180cm',
      },
      {
        productId: '4',
        productName: 'French Flag',
        quantity: 1,
        price: 23.99,
        size: '90x150cm',
      },
    ],
    total: 53.98,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'Amsterdam',
      postalCode: '1012 AB',
      country: 'Netherlands',
    },
  },
];