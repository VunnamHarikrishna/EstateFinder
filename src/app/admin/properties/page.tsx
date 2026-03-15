
"use client";

import { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { MOCK_PROPERTIES, Property } from '@/lib/mock-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Sparkles, 
  Search,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generatePropertyDescription } from '@/ai/flows/generate-property-description-flow';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const COMMON_AMENITIES = [
  "Tirumala View",
  "Power Backup",
  "Lift",
  "24/7 Security",
  "Car Parking",
  "Gym",
  "Club House",
  "Pooja Room",
  "Vastu Compliant"
];

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    location: '',
    price: '',
    description: '',
    imageUrl: 'https://picsum.photos/seed/new/800/600',
    amenities: [] as string[]
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Apartment',
      location: '',
      price: '',
      description: '',
      imageUrl: 'https://picsum.photos/seed/new/800/600',
      amenities: []
    });
    setEditingId(null);
  };

  const handleAIDescription = async () => {
    if (!formData.title || !formData.location) {
      toast({ 
        title: "Missing Info", 
        description: "Please fill in title and location first for AI to work.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generatePropertyDescription({
        propertyType: formData.type,
        location: formData.location,
        address: formData.location, 
        price: Number(formData.price) || 0,
        amenities: formData.amenities.length > 0 ? formData.amenities : ['Modern Amenities', 'Prime Location'],
        uniqueSellingPoints: ['Prime location in Tirupati', 'Excellent ROI'],
      });
      setFormData(prev => ({ ...prev, description: result.description }));
      toast({ title: "Success!", description: "AI generated a localized description for you." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate AI description.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const startEdit = (prop: Property) => {
    setFormData({
      title: prop.title,
      type: prop.type,
      location: prop.location,
      price: prop.price.toString(),
      description: prop.description,
      imageUrl: prop.images[0] || 'https://picsum.photos/seed/new/800/600',
      amenities: prop.amenities
    });
    setEditingId(prop.id);
    setIsDialogOpen(true);
  };

  const saveProperty = () => {
    if (!formData.title || !formData.location || !formData.price) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (editingId) {
      setProperties(properties.map(p => p.id === editingId ? {
        ...p,
        title: formData.title,
        type: formData.type as any,
        location: formData.location,
        price: Number(formData.price),
        description: formData.description,
        amenities: formData.amenities,
        images: [formData.imageUrl, ...p.images.slice(1)]
      } : p));
      toast({ title: "Property Updated", description: "Listing details have been successfully updated." });
    } else {
      const newProperty: Property = {
        id: `p${Date.now()}`,
        title: formData.title,
        type: formData.type as any,
        location: formData.location,
        address: formData.location,
        price: Number(formData.price),
        squareFootage: 1200,
        description: formData.description,
        amenities: formData.amenities,
        images: [formData.imageUrl],
        availableUnits: 5,
        contact: { name: 'Admin', phone: '+91 00000 00000', email: 'admin@estatefinder.com' }
      };
      setProperties([newProperty, ...properties]);
      toast({ title: "Property Saved", description: "New listing added to inventory." });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
    toast({ title: "Deleted", description: "Property removed successfully." });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-muted/20 pl-64">
      <AdminNavbar />
      
      <main className="p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Property Inventory</h1>
            <p className="text-muted-foreground">Manage your Tirupati property listings and descriptions.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg">
                <Plus className="w-4 h-4" />
                Add New Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                <DialogDescription>
                  Fill in the details below. Use the AI tool to generate high-converting descriptions for the Tirupati market.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g. Skyline Apartments" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <select 
                      id="type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="House">House</option>
                      <option value="Plot">Plot</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Area</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g. Alipiri" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="Price in Rupees" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Property Image URL
                  </Label>
                  <Input 
                    placeholder="https://images.unsplash.com/..." 
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  />
                  <p className="text-[10px] text-muted-foreground italic">Provide a direct link to the property image.</p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Key Amenities
                  </Label>
                  <div className="grid grid-cols-3 gap-3 border p-4 rounded-lg bg-muted/20">
                    {COMMON_AMENITIES.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`amenity-${amenity}`} 
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="text-xs font-normal cursor-pointer">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">Description</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-secondary hover:text-secondary hover:bg-secondary/10"
                      onClick={handleAIDescription}
                      disabled={isGenerating}
                    >
                      <Sparkles className="w-3 h-3" />
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </Button>
                  </div>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the property..." 
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={saveProperty}>
                  {editingId ? 'Update Property' : 'Save Property'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-muted/5 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search listings..." className="pl-9 h-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export CSV</Button>
              <Button variant="outline" size="sm">Bulk Actions</Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-bold">{prop.title}</TableCell>
                  <TableCell>{prop.type}</TableCell>
                  <TableCell>{prop.location}</TableCell>
                  <TableCell>{formatPrice(prop.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {prop.availableUnits > 0 ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> {prop.availableUnits} left
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Sold Out
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => startEdit(prop)}>
                          <Edit className="w-4 h-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => deleteProperty(prop.id)}>
                          <Trash2 className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
