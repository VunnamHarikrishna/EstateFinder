"use client";

import { useState } from 'react';
import UserNavbar from '@/components/UserNavbar';
import BannerCarousel from '@/components/BannerCarousel';
import PropertyCard from '@/components/PropertyCard';
import { MOCK_PROPERTIES, PropertyType } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  TreePine, 
  HomeIcon 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('low-to-high');

  const filteredProperties = MOCK_PROPERTIES
    .filter(p => 
      (searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (locationFilter === 'all' || p.location === locationFilter) &&
      (typeFilter === 'all' || p.type === typeFilter)
    )
    .sort((a, b) => {
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      return 0;
    });

  const locations = Array.from(new Set(MOCK_PROPERTIES.map(p => p.location)));

  return (
    <div className="min-h-screen flex flex-col pb-20">
      <UserNavbar />
      
      <main className="flex-grow container mx-auto px-4 pt-6">
        <BannerCarousel />

        {/* Search and Filters Section */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search properties, areas..." 
                className="pl-10 h-12 bg-background border-none focus-visible:ring-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-12">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-12">
                  <Filter className="w-4 h-4 mr-2 text-primary" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Plot">Plot</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full md:w-[180px] h-12">
                  {sortOrder === 'low-to-high' ? <TrendingUp className="w-4 h-4 mr-2 text-primary" /> : <TrendingDown className="w-4 h-4 mr-2 text-primary" />}
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-headline font-bold">Featured Properties</h2>
            <p className="text-muted-foreground">{filteredProperties.length} results found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-medium text-muted-foreground">No properties match your criteria.</h3>
                <Button variant="link" onClick={() => {
                  setSearchQuery('');
                  setLocationFilter('all');
                  setTypeFilter('all');
                }}>Clear all filters</Button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-headline font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Apartments', icon: Building2, type: 'Apartment' },
              { label: 'Houses', icon: HomeIcon, type: 'House' },
              { label: 'Plots', icon: MapPin, type: 'Plot' },
              { label: 'Lands', icon: TreePine, type: 'Land' },
            ].map((cat) => (
              <Button 
                key={cat.label} 
                variant="outline" 
                className="h-24 flex-col gap-2 hover:border-primary hover:text-primary"
                onClick={() => setTypeFilter(cat.type)}
              >
                <cat.icon className="w-8 h-8" />
                <span className="font-semibold">{cat.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="font-headline font-bold text-2xl text-primary">EstateFinder</span>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Providing premium real estate solutions since 2010. Your trust is our foundation.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">Terms of Service</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">Contact Us</Link>
          </div>
          <p className="text-xs text-muted-foreground mt-8">© 2024 Pavan EstateFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}