"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, Bath, Square, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/lib/mock-data';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-white border-none">
          {property.type}
        </Badge>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-primary">
          ${property.price.toLocaleString()}
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-headline font-bold text-xl mb-1 line-clamp-1">{property.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 border-t pt-4">
          {property.bedrooms && (
            <div className="flex flex-col items-center gap-1">
              <BedDouble className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex flex-col items-center gap-1">
              <Bath className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <Square className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium">{property.squareFootage} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Link href={`/property/${property.id}`} className="w-full">
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
            View Details
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}