import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Bookings } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMember } from '@/integrations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';

export default function BookingsDashboardPage() {
  const { member } = useMember();
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Bookings>('bookings', [], { limit: 100 });
      setBookings(result.items || []);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await BaseCrudService.update<Bookings>('bookings', {
        _id: bookingId,
        bookingStatus: newStatus,
      });
      setBookings(bookings.map(b => 
        b._id === bookingId ? { ...b, bookingStatus: newStatus } : b
      ));
    } catch (error) {
      console.error('Failed to update booking:', error);
      loadBookings();
    }
  };

  const deleteBooking = async (bookingId: string) => {
    try {
      await BaseCrudService.delete('bookings', bookingId);
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking:', error);
      loadBookings();
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.bookingStatus?.toLowerCase() === filter;
  });

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 w-full max-w-[100rem] mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-2">Bookings Dashboard</h1>
          <p className="text-lg font-paragraph text-secondary">Manage all restaurant reservations</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(status => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              variant={filter === status ? 'default' : 'outline'}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Bookings Table */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-foreground text-lg">No bookings found</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map(booking => (
              <Card key={booking._id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Customer Name</p>
                    <p className="text-lg font-heading font-semibold text-foreground">{booking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Date & Time</p>
                    <p className="text-lg font-heading font-semibold text-foreground">
                      {booking.bookingDate ? format(new Date(booking.bookingDate), 'MMM dd, yyyy') : 'N/A'}
                      {booking.bookingTime && ` at ${booking.bookingTime}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Guests</p>
                    <p className="text-lg font-heading font-semibold text-foreground">{booking.numberOfGuests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Status</p>
                    <Badge className={`${getStatusColor(booking.bookingStatus)} capitalize`}>
                      {booking.bookingStatus || 'pending'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Email</p>
                    <p className="text-foreground">{booking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Phone</p>
                    <p className="text-foreground">{booking.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Seating Type</p>
                    <p className="text-foreground">{booking.seatingType || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-paragraph">Special Requests</p>
                    <p className="text-foreground">{booking.specialRequests || 'None'}</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {booking.bookingStatus !== 'confirmed' && (
                    <Button
                      onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                      variant="default"
                      size="sm"
                    >
                      Confirm
                    </Button>
                  )}
                  {booking.bookingStatus !== 'pending' && (
                    <Button
                      onClick={() => updateBookingStatus(booking._id, 'pending')}
                      variant="outline"
                      size="sm"
                    >
                      Mark Pending
                    </Button>
                  )}
                  {booking.bookingStatus !== 'cancelled' && (
                    <Button
                      onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteBooking(booking._id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive ml-auto"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
