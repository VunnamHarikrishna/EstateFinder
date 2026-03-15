"use client";

import { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import { MOCK_BOOKINGS, MOCK_PROPERTIES, SiteVisitRequest } from '@/lib/mock-data';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Phone, 
  Mail, 
  Car, 
  CheckCircle, 
  XCircle, 
  Clock,
  Plus,
  User,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<SiteVisitRequest[]>(MOCK_BOOKINGS);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const { toast } = useToast();

  const [newBooking, setNewBooking] = useState({
    propertyId: '',
    userName: '',
    userPhone: '',
    userEmail: '',
    visitDate: '',
    needsTransportation: 'no'
  });

  const updateStatus = (id: string, status: SiteVisitRequest['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
    toast({ title: "Status Updated", description: `Booking marked as ${status}.` });
  };

  const handleCreateBooking = () => {
    const selectedProp = MOCK_PROPERTIES.find(p => p.id === newBooking.propertyId);
    if (!selectedProp || !newBooking.userName || !newBooking.visitDate) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    const booking: SiteVisitRequest = {
      id: `b${Date.now()}`,
      propertyId: newBooking.propertyId,
      propertyName: selectedProp.title,
      userName: newBooking.userName,
      userPhone: newBooking.userPhone,
      userEmail: newBooking.userEmail,
      visitDate: newBooking.visitDate,
      needsTransportation: newBooking.needsTransportation === 'yes',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setBookings([booking, ...bookings]);
    setIsNewBookingOpen(false);
    toast({ title: "Booking Created", description: "A new site visit has been scheduled manually." });
    setNewBooking({
      propertyId: '',
      userName: '',
      userPhone: '',
      userEmail: '',
      visitDate: '',
      needsTransportation: 'no'
    });
  };

  return (
    <div className="min-h-screen bg-muted/20 pl-64">
      <AdminNavbar />
      
      <main className="p-8 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold">Booking Requests</h1>
            <p className="text-muted-foreground">Manage site visits and actual property bookings for Tirupati.</p>
          </div>
          
          <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4" />
                New Manual Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Manual Site Visit</DialogTitle>
                <DialogDescription>
                  Enter customer details to book a visit for them.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Property</Label>
                  <Select onValueChange={(val) => setNewBooking({...newBooking, propertyId: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PROPERTIES.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input className="pl-10" value={newBooking.userName} onChange={e => setNewBooking({...newBooking, userName: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={newBooking.userPhone} onChange={e => setNewBooking({...newBooking, userPhone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Visit Date</Label>
                    <Input type="date" value={newBooking.visitDate} onChange={e => setNewBooking({...newBooking, visitDate: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Transportation Required?</Label>
                  <Select onValueChange={(val) => setNewBooking({...newBooking, needsTransportation: val})} defaultValue="no">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, pickup needed</SelectItem>
                      <SelectItem value="no">No, own transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewBookingOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateBooking}>Confirm Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <Tabs defaultValue="site-visits" className="w-full">
          <TabsList className="bg-white border p-1 rounded-xl mb-6">
            <TabsTrigger value="site-visits" className="rounded-lg px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-white">
              Site Visit Requests
            </TabsTrigger>
            <TabsTrigger value="actual-bookings" className="rounded-lg px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-white">
              Actual Bookings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="site-visits">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Visit Date</TableHead>
                    <TableHead>Transportation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-bold">{booking.propertyName}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.userName}</span>
                          <span className="text-xs text-muted-foreground">{booking.userPhone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {booking.visitDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        {booking.needsTransportation ? (
                          <Badge className="bg-blue-50 text-blue-600 border-none gap-1">
                            <Car className="w-3 h-3" /> Required
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">Not needed</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "border-none",
                          booking.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                          booking.status === 'Confirmed' ? "bg-green-100 text-green-700" :
                          booking.status === 'Completed' ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        )}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-green-600"
                            onClick={() => updateStatus(booking.id, 'Confirmed')}
                            title="Confirm Visit"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-600"
                            onClick={() => updateStatus(booking.id, 'Cancelled')}
                            title="Cancel Request"
                          >
                            <XCircle className="w-5 h-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="actual-bookings">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border">
              <Clock className="w-12 h-12 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">No Actual Bookings Yet</h3>
              <p className="text-muted-foreground">Bookings appear here once site visits are converted to purchases.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}