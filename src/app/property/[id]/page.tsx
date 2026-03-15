"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UserNavbar from '@/components/UserNavbar';
import { MOCK_PROPERTIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User, 
  CalendarIcon, 
  Car,
  ChevronLeft
} from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  const router = useRouter();
  const { toast } = useToast();
  
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Button onClick={() => router.push('/')}>Go back home</Button>
      </div>
    );
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Success!",
      description: "Your site visit request has been submitted. We'll contact you soon.",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pb-20">
      <UserNavbar />
      
      <main className="container mx-auto px-4 pt-6">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2 text-muted-foreground hover:text-primary"
          onClick={() => router.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg md:col-span-2">
                <Image 
                  src={property.images[0]} 
                  alt={property.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              {property.images.slice(1).map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                  <Image src={img} alt={`${property.title} - ${idx + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <Badge className="bg-secondary mb-2">{property.type}</Badge>
                  <h1 className="text-3xl md:text-4xl font-headline font-bold">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-lg">{property.address}</span>
                  </div>
                </div>
                <div className="bg-background p-4 rounded-xl border-l-4 border-primary">
                  <p className="text-muted-foreground text-sm uppercase font-bold">Starting Price</p>
                  <p className="text-3xl font-headline font-bold text-primary">${property.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-xl">
                {property.bedrooms && (
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg"><BedDouble className="w-6 h-6 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Bedrooms</p>
                      <p className="font-bold">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg"><Bath className="w-6 h-6 text-primary" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Bathrooms</p>
                      <p className="font-bold">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg"><Square className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Area</p>
                    <p className="font-bold">{property.squareFootage} sqft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg"><CheckCircle2 className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Status</p>
                    <p className="font-bold">{property.availableUnits > 0 ? 'Available' : 'Sold Out'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-headline font-bold">Description</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-headline font-bold">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact and Booking */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Book Site Visit
                </h3>
                
                <form className="space-y-4" onSubmit={handleBooking}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="name" required placeholder="John Doe" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="mobile" type="tel" required placeholder="+1 234 567 8900" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" required placeholder="john@example.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Visit Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                    <Checkbox id="transport" />
                    <Label 
                      htmlFor="transport" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                    >
                      <Car className="w-4 h-4 text-primary" />
                      Do you need transportation?
                    </Label>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg font-bold" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Schedule Visit"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    By clicking "Schedule Visit" you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>

                <div className="mt-8 pt-8 border-t space-y-4">
                  <h4 className="font-bold text-sm uppercase text-muted-foreground">Property Consultant</h4>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-primary">
                      {property.contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{property.contact.name}</p>
                      <p className="text-sm text-muted-foreground">Premium Consultant</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2 border-primary text-primary hover:bg-primary/10">
                      <Phone className="w-4 h-4" />
                      {property.contact.phone}
                    </Button>
                    <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {property.contact.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}