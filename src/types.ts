export interface ShoeProduct {
  id: string;
  name: string;
  pilar: 'street' | 'luxury' | 'earth';
  tagline: string;
  priceText: string;
  recycledPercent: number;
  carbonFootprintKg: number;
  materials: string[];
  personality: string;
  colorway: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarSeed: string;
  archetype: 'Street Artist' | 'Sustainability Advocate' | 'Creative Director';
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  coordinates: [number, number]; // [lat, lng]
}
