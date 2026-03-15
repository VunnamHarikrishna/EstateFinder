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
    title: 'Tirumala View Residency',
    type: 'Apartment',
    location: 'Alipiri',
    address: 'Near Alipiri Footpath, Tirupati, Andhra Pradesh',
    price: 7500000,
    bedrooms: 3,
    bathrooms: 3,
    squareFootage: 1650,
    amenities: ['Tirumala View', 'Gym', 'Covered Parking', '24/7 Water Supply', 'Community Hall'],
    description: 'A premium apartment offering a divine view of the Tirumala hills. Located right at the foothills for a peaceful lifestyle.',
    images: [PlaceHolderImages[3].imageUrl, PlaceHolderImages[4].imageUrl],
    availableUnits: 4,
    contact: { name: 'Pavan Kumar', phone: '+91 98765 43210', email: 'sales@pavanestate.com' }
  },
  {
    id: '2',
    title: 'Seven Hills Premium Plots',
    type: 'Plot',
    location: 'Renigunta Road',
    address: 'Renigunta Road, Near Tirupati Airport, Tirupati',
    price: 4500000,
    squareFootage: 1800,
    amenities: ['BT Roads', 'Underground Drainage', 'Street Lights', 'Park Area'],
    description: 'TUDA approved residential plots in a fast-developing area close to the airport and railway station.',
    images: [PlaceHolderImages[5].imageUrl, PlaceHolderImages[6].imageUrl],
    availableUnits: 15,
    contact: { name: 'Anita Rao', phone: '+91 98765 43211', email: 'anita@pavanestate.com' }
  },
  {
    id: '3',
    title: 'Heritage Spiritual Villa',
    type: 'House',
    location: 'Kapila Teertham',
    address: 'KT Road, Near Kapila Teertham Temple, Tirupati',
    price: 18000000,
    bedrooms: 4,
    bathrooms: 4,
    squareFootage: 3200,
    amenities: ['Pooja Room', 'Private Terrace', 'Solar Power', 'Garden'],
    description: 'A spacious independent villa located in the prestigious Kapila Teertham area, perfect for families seeking tranquility.',
    images: [PlaceHolderImages[4].imageUrl, PlaceHolderImages[7].imageUrl],
    availableUnits: 1,
    contact: { name: 'Pavan Kumar', phone: '+91 98765 43210', email: 'sales@pavanestate.com' }
  },
  {
    id: '4',
    title: 'Chandragiri Orchard Land',
    type: 'Land',
    location: 'Chandragiri',
    address: 'Near Chandragiri Fort, Tirupati Bypass Road',
    price: 12000000,
    squareFootage: 21780,
    amenities: ['Fencing', 'Drip Irrigation', 'Electricity Connection'],
    description: 'Beautiful agricultural land suitable for a farmhouse, located near the historic Chandragiri Fort with excellent road connectivity.',
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
    propertyName: 'Tirumala View Residency',
    userName: 'Ravi Teja',
    userPhone: '9988776655',
    userEmail: 'ravi@example.in',
    visitDate: '2024-11-05',
    needsTransportation: true,
    status: 'Pending',
    createdAt: '2024-10-28T10:00:00Z'
  }
];