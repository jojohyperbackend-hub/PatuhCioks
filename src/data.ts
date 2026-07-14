import { ShoeProduct, Testimonial, StoreLocation } from './types';

import showroomImg from './assets/images/showroom_jakarta_1784054299369.jpg';
import showcaseImg from './assets/images/sneaker_showcase_1784054314046.jpg';
import craftsmanshipImg from './assets/images/craftsmanship_materials_1784054326482.jpg';
import phantomImg from './assets/images/shoe_phantom_1784054356626.jpg';
import clayLuxImg from './assets/images/shoe_clay_lux_1784054369456.jpg';
import mossBioImg from './assets/images/shoe_moss_bio_1784054382893.jpg';

export const SHOWROOM_IMAGE = showroomImg;
export const SNEAKER_SHOWCASE_IMAGE = showcaseImg;
export const CRAFTSMANSHIP_IMAGE = craftsmanshipImg;

export const FLAGSHIP_SHOES: ShoeProduct[] = [
  {
    id: 'cioks-phantom',
    name: 'PatuhCioks Phantom',
    pilar: 'street',
    tagline: 'Born in the shadows. Made for the streets.',
    priceText: 'IDR 2.499.000',
    recycledPercent: 84.6,
    carbonFootprintKg: 4.8,
    materials: [
      'Recycled motorsport tire tread outer-sole',
      'Discarded ballistic nylon upper skeleton',
      'Bio-foam high-impact insole'
    ],
    personality: 'An avant-garde triple-black silhouette engineered for concrete exploration. Zero compromises on durability, maximum attitude.',
    colorway: 'Stealth Black / Asphalt Gray / Charcoal',
    imageUrl: phantomImg
  },
  {
    id: 'cioks-clay-lux',
    name: 'PatuhCioks Clay-Lux',
    pilar: 'luxury',
    tagline: 'Quiet luxury. Grounded in raw craftsmanship.',
    priceText: 'IDR 3.299.000',
    recycledPercent: 72.3,
    carbonFootprintKg: 5.2,
    materials: [
      'Naturally-tanned bone-white bio-leather',
      'Hand-stitched raw ochre clay suede panels',
      'Recycled organic cork inner footbed',
      'Matte solid brass speed-hooks'
    ],
    personality: 'A seamless integration of clean architectural curves and luxury handcrafting. Sourced responsibly, styled for eternity.',
    colorway: 'Bone White / Clay Ochre / Matte Brass',
    imageUrl: clayLuxImg
  },
  {
    id: 'cioks-moss-bio',
    name: 'PatuhCioks Moss-Bio',
    pilar: 'earth',
    tagline: 'Unbleached nature. Engineered to dissolve.',
    priceText: 'IDR 1.999.000',
    recycledPercent: 96.8,
    carbonFootprintKg: 3.1,
    materials: [
      'Recycled seaweed mesh ventilation zones',
      'Organic unbleached linen structure',
      'Biodegradable natural latex sole compound',
      'Moss-dyed recycled wool detailing'
    ],
    personality: 'Our most ecological model. Formed from fully circular, breathable, organic compounds designed to step lightly on the earth.',
    colorway: 'Unbleached Natural / Forest Moss / Sand',
    imageUrl: mossBioImg
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rian Gozali',
    role: 'Street Muralist & Visual Artist',
    quote: 'Sneakers biasa hancur dalam 3 bulan di jalanan aspal Jakarta yang keras. PatuhCioks Phantom sudah bertahan 8 bulan melukis tembok, sol ban bekasnya benar-benar tidak bisa habis. Dan rasanya sangat nyaman di kaki.',
    avatarSeed: 'rian',
    archetype: 'Street Artist'
  },
  {
    id: 't2',
    name: 'Andi "Milo" Baswedan',
    role: 'Founder of Yayasan Hijau Bumi',
    quote: 'Sangat jarang ada brand streetwear yang mau jujur memaparkan carbon footprint mereka hingga angka desimal spesifik. PatuhCioks membuktikan bahwa kemewahan tidak perlu membunuh ekosistem kita.',
    avatarSeed: 'milo',
    archetype: 'Sustainability Advocate'
  },
  {
    id: 't3',
    name: 'Sabrina Widjaja',
    role: 'Creative Director, Studio Sembilan',
    quote: 'Saya menyukai bagaimana mereka memadukan material tanah liat (clay) dan brass metal redup. Sepatu ini terasa seperti patung brutalist yang bisa dipakai. Keseimbangan visual yang sangat memuaskan.',
    avatarSeed: 'sabrina',
    archetype: 'Creative Director'
  },
  {
    id: 't4',
    name: 'Viko Pratama',
    role: 'BMX Athlete & Urban Designer',
    quote: 'Grip dari sol ban motorsport daur ulang ini gila. Saya mengendarai sepeda dan melompat di tangga beton basah tanpa slip sama sekali. Ditambah lagi, tampilannya luar biasa di bawah lampu jalan kota.',
    avatarSeed: 'viko',
    archetype: 'Street Artist'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'jakarta-flagship',
    name: 'PatuhCioks Flagship Showroom - Jakarta',
    address: 'Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan',
    city: 'Jakarta Selatan',
    hours: 'Senin - Minggu: 10:00 - 22:00 WIB',
    phone: '+62 21 555 4242',
    coordinates: [-6.223847, 106.808169] // Kebayoran Baru / Senopati area, highly accurate
  },
  {
    id: 'bandung-atelier',
    name: 'PatuhCioks Atelier - Bandung',
    address: 'Jl. Dago No. 102, Coblong, Bandung',
    city: 'Bandung',
    hours: 'Senin - Minggu: 10:00 - 21:00 WIB',
    phone: '+62 22 420 4212',
    coordinates: [-6.891107, 107.616315] // Dago Bandung, highly accurate
  }
];
