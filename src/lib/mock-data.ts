import { PlaceHolderImages } from './placeholder-images';

export type PropertyType = 'Apartment' | 'House' | 'Land' | 'Plot';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  location: string;
  address: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage: number;
  amenities: string[];
  description: string;
  images: string[];
  availableUnits: number;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Luxury Residency',
    type: 'Apartment',
    location: 'Mumbai',
    address: 'Worli Sea Face, Mumbai, Maharashtra',
    price: 45000000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1800,
    amenities: ['Infinity Pool', 'Gym', 'Parking', '24/7 Security', 'Clubhouse'],
    description: 'A stunning luxury apartment in the heart of Mumbai with breathtaking views of the Arabian Sea.',
    images: [PlaceHolderImages[3].imageUrl, PlaceHolderImages[4].imageUrl],
    availableUnits: 5,
    contact: { name: 'Pavan Kumar', phone: '+91 98765 43210', email: 'sales@pavanestate.com' }
  },
  {
    id: '2',
    title: 'Green Valley Premium Plot',
    type: 'Plot',
    location: 'Bangalore',
    address: 'Devanahalli, near International Airport, Bangalore',
    price: 8500000,
    squareFootage: 2400,
    amenities: ['Water Connection', 'Underground Electricity', 'Gated Community', 'Jogging Track'],
    description: 'Invest in your future with this premium residential plot in one of Bangalore fastest growing corridors.',
    images: [PlaceHolderImages[5].imageUrl, PlaceHolderImages[6].imageUrl],
    availableUnits: 12,
    contact: { name: 'Anita Rao', phone: '+91 98765 43211', email: 'anita@pavanestate.com' }
  },
  {
    id: '3',
    title: 'Royal Heritage Villa',
    type: 'House',
    location: 'Jaipur',
    address: 'Vaishali Nagar, Jaipur, Rajasthan',
    price: 25000000,
    bedrooms: 4,
    bathrooms: 4,
    squareFootage: 3500,
    amenities: ['Private Garden', 'Courtyard', 'Solar Heating', 'Staff Quarters'],
    description: 'A classic heritage-style villa blending traditional Rajasthani architecture with modern luxury.',
    images: [PlaceHolderImages[4].imageUrl, PlaceHolderImages[7].imageUrl],
    availableUnits: 1,
    contact: { name: 'Pavan Kumar', phone: '+91 98765 43210', email: 'sales@pavanestate.com' }
  },
  {
    id: '4',
    title: 'Prime Agricultural Farmhouse Land',
    type: 'Land',
    location: 'Delhi NCR',
    address: 'Sector 150, Noida-Greater Noida Expressway',
    price: 55000000,
    squareFootage: 10890,
    amenities: ['Fencing', 'Borewell', 'Fruit Trees'],
    description: 'Expansive land parcel ideal for building a weekend farmhouse or long-term land bank investment.',
    images: [PlaceHolderImages[7].imageUrl, PlaceHolderImages[8].imageUrl],
    availableUnits: 2,
    contact: { name: 'Vijay Singh', phone: '+91 98765 43212', email: 'vijay@pavanestate.com' }
  }
];

export interface SiteVisitRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  visitDate: string;
  needsTransportation: boolean;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export const MOCK_BOOKINGS: SiteVisitRequest[] = [
  {
    id: 'b1',
    propertyId: '1',
    propertyName: 'Skyline Luxury Residency',
    userName: 'John Doe',
    userPhone: '9988776655',
    userEmail: 'john@example.in',
    visitDate: '2024-10-20',
    needsTransportation: true,
    status: 'Pending',
    createdAt: '2024-10-15T10:00:00Z'
  }
];