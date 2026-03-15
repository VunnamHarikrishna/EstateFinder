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
  Building,
  Edit
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/select";
import { cn } from '@/lib/utils';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<SiteVisitRequest[]>(MOCK_BOOKINGS);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<SiteVisitRequest | null>(null);
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
    toast({ 
      title: "Status Updated", 
      description: `Booking marked as ${status}.` 
    });
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

  const handleUpdateBooking = () => {
    if (!editingBooking) return;
    
    setBookings(bookings.map(b => b.id === editingBooking.id ? editingBooking : b));
    setEditingBooking(null);
    toast({ 
      title: "Booking Updated", 
      description: "The site visit details have been successfully modified." 
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
                    <input 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newBooking.userName} 
                      onChange={e => setNewBooking({...newBooking, userName: e.target.value})} 
                    />
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
                          {/* Edit / Reschedule Action */}
                          {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-primary"
                              onClick={() => setEditingBooking(booking)}
                              title="Edit / Postpone"
                            >
                              <Edit className="w-5 h-5" />
                            </Button>
                          )}

                          {booking.status === 'Pending' ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-green-600"
                                  title="Confirm Visit"
                                >
                                  <CheckCircle className="w-5 h-5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirm Site Visit Request?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to confirm the site visit for {booking.userName} on {booking.visitDate}? This will notify the relationship manager.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Go Back</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => updateStatus(booking.id, 'Confirmed')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Confirm Visit
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : booking.status === 'Confirmed' ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-blue-600"
                              onClick={() => updateStatus(booking.id, 'Completed')}
                              title="Mark as Completed"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </Button>
                          ) : null}

                          {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-red-600"
                                  title="Cancel Request"
                                >
                                  <XCircle className="w-5 h-5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Site Visit?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will cancel the scheduled visit for {booking.userName}. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => updateStatus(booking.id, 'Cancelled')}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Cancel Visit
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
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

        {/* Edit Booking Dialog */}
        <Dialog open={!!editingBooking} onOpenChange={(open) => !open && setEditingBooking(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Reschedule / Edit Visit</DialogTitle>
              <DialogDescription>
                Modify visit details for {editingBooking?.userName}.
              </DialogDescription>
            </DialogHeader>
            {editingBooking && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Visit Date</Label>
                  <Input 
                    type="date" 
                    value={editingBooking.visitDate} 
                    onChange={e => setEditingBooking({...editingBooking, visitDate: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Transportation Required?</Label>
                  <Select 
                    value={editingBooking.needsTransportation ? 'yes' : 'no'}
                    onValueChange={(val) => setEditingBooking({...editingBooking, needsTransportation: val === 'yes'})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, pickup needed</SelectItem>
                      <SelectItem value="no">No, own transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Customer Contact Info</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" /> {editingBooking.userPhone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" /> {editingBooking.userEmail}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingBooking(null)}>Cancel</Button>
              <Button onClick={handleUpdateBooking}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
