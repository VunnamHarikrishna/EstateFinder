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
    title: 'Skyline Luxury Apartment',
    type: 'Apartment',
    location: 'City Center',
    address: '123 Metropolitan Ave, Downtown',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1200,
    amenities: ['Pool', 'Gym', 'Parking', '24/7 Security'],
    description: 'A stunning luxury apartment in the heart of the city with panoramic views.',
    images: [PlaceHolderImages[3].imageUrl, PlaceHolderImages[4].imageUrl],
    availableUnits: 5,
    contact: { name: 'Pavan Kumar', phone: '+1 234 567 8901', email: 'sales@pavanestate.com' }
  },
  {
    id: '2',
    title: 'Serene Meadow Plot',
    type: 'Plot',
    location: 'Suburban',
    address: 'Plot 45, Green Meadows Township',
    price: 150000,
    squareFootage: 2400,
    amenities: ['Water Connection', 'Electricity', 'Gated Community'],
    description: 'Build your dream home on this perfectly located residential plot.',
    images: [PlaceHolderImages[5].imageUrl, PlaceHolderImages[6].imageUrl],
    availableUnits: 12,
    contact: { name: 'Anita Rao', phone: '+1 234 567 8902', email: 'anita@pavanestate.com' }
  },
  {
    id: '3',
    title: 'Heritage Villa',
    type: 'House',
    location: 'Old Town',
    address: '88 Cobblestone Rd',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 3200,
    amenities: ['Garden', 'Fireplace', 'Library', 'Garage'],
    description: 'A classic heritage villa with modern upgrades and a sprawling garden.',
    images: [PlaceHolderImages[4].imageUrl, PlaceHolderImages[7].imageUrl],
    availableUnits: 1,
    contact: { name: 'Pavan Kumar', phone: '+1 234 567 8901', email: 'sales@pavanestate.com' }
  },
  {
    id: '4',
    title: 'Prime Agricultural Land',
    type: 'Land',
    location: 'Rural',
    address: 'Sector 12, Outer Ring Road',
    price: 300000,
    squareFootage: 43560,
    amenities: ['Fencing', 'Irrigation System'],
    description: 'Expansive land suitable for agriculture or long-term investment.',
    images: [PlaceHolderImages[7].imageUrl, PlaceHolderImages[8].imageUrl],
    availableUnits: 2,
    contact: { name: 'Vijay Singh', phone: '+1 234 567 8903', email: 'vijay@pavanestate.com' }
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
    propertyName: 'Skyline Luxury Apartment',
    userName: 'John Doe',
    userPhone: '555-0101',
    userEmail: 'john@example.com',
    visitDate: '2024-05-20',
    needsTransportation: true,
    status: 'Pending',
    createdAt: '2024-05-15T10:00:00Z'
  }
];