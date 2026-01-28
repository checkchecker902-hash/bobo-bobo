import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Bookings } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, User, Mail, Phone, Users, Clock, MessageSquare, CheckCircle, Clock3, XCircle } from 'lucide-react';

export default function BookingsDashboardPage() {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await BaseCrudService.getAll<Bookings>('bookings', {}, { limit: 100 });
        setBookings(result.items);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await BaseCrudService.update('bookings', {
        _id: bookingId,
        bookingStatus: newStatus,
      });
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, bookingStatus: newStatus } : b)
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.bookingStatus === filterStatus;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.bookingDate || 0).getTime() - new Date(b.bookingDate || 0).getTime();
      case 'date-desc':
        return new Date(b.bookingDate || 0).getTime() - new Date(a.bookingDate || 0).getTime();
      case 'name':
        return (a.customerName || '').localeCompare(b.customerName || '');
      default:
        return 0;
    }
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock3 size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
              Bookings Dashboard
            </h1>
            <p className="font-paragraph text-xl text-foreground">
              Manage and view all restaurant reservations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filters & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex-1">
              <label className="font-paragraph text-sm text-foreground/60 mb-2 block">
                Filter by Status
              </label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="font-paragraph">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="font-paragraph text-sm text-foreground/60 mb-2 block">
                Sort by
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="font-paragraph">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                  <SelectItem value="name">Customer Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="font-paragraph text-sm text-foreground/60">
                Total: <span className="font-bold text-primary">{sortedBookings.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-24">
              <LoadingSpinner />
            </div>
          )}

          {/* Bookings List */}
          {!isLoading && sortedBookings.length > 0 && (
            <div className="space-y-4">
              {sortedBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-foreground/5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Customer Name */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-soft-gold" />
                        <span className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">
                          Customer
                        </span>
                      </div>
                      <p className="font-heading text-lg text-primary">
                        {booking.customerName || 'N/A'}
                      </p>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-soft-gold" />
                        <span className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">
                          Date & Time
                        </span>
                      </div>
                      <p className="font-paragraph text-base text-primary">
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="font-paragraph text-sm text-foreground/60">
                        {booking.bookingTime || 'N/A'}
                      </p>
                    </div>

                    {/* Guests & Seating */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-soft-gold" />
                        <span className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">
                          Details
                        </span>
                      </div>
                      <p className="font-paragraph text-base text-primary">
                        {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'Guest' : 'Guests'}
                      </p>
                      <p className="font-paragraph text-sm text-foreground/60 capitalize">
                        {booking.seatingType || 'N/A'}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock3 size={16} className="text-soft-gold" />
                        <span className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider">
                          Status
                        </span>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-paragraph text-sm ${getStatusColor(booking.bookingStatus)}`}>
                        {getStatusIcon(booking.bookingStatus)}
                        <span className="capitalize">{booking.bookingStatus || 'pending'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Special Requests */}
                  <div className="border-t border-foreground/5 pt-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-soft-gold" />
                        <div>
                          <p className="font-paragraph text-xs text-foreground/60">Email</p>
                          <p className="font-paragraph text-sm text-primary break-all">
                            {booking.email || 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-soft-gold" />
                        <div>
                          <p className="font-paragraph text-xs text-foreground/60">Phone</p>
                          <p className="font-paragraph text-sm text-primary">
                            {booking.phone || 'N/A'}
                          </p>
                        </div>
                      </div>
                      {booking.specialRequests && (
                        <div className="flex items-center gap-3">
                          <MessageSquare size={16} className="text-soft-gold" />
                          <div>
                            <p className="font-paragraph text-xs text-foreground/60">Special Requests</p>
                            <p className="font-paragraph text-sm text-primary">
                              {booking.specialRequests}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() => handleStatusChange(booking._id, 'pending')}
                      variant={booking.bookingStatus === 'pending' ? 'default' : 'outline'}
                      className="font-paragraph text-xs py-2 px-4"
                    >
                      Pending
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(booking._id, 'confirmed')}
                      variant={booking.bookingStatus === 'confirmed' ? 'default' : 'outline'}
                      className="font-paragraph text-xs py-2 px-4"
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => handleStatusChange(booking._id, 'cancelled')}
                      variant={booking.bookingStatus === 'cancelled' ? 'default' : 'outline'}
                      className="font-paragraph text-xs py-2 px-4"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && sortedBookings.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-lg text-center"
            >
              <Calendar size={48} className="mx-auto mb-4 text-soft-gold/30" />
              <h3 className="font-heading text-2xl text-primary mb-2">No Bookings Found</h3>
              <p className="font-paragraph text-foreground/60">
                {filterStatus === 'all'
                  ? 'No bookings have been made yet.'
                  : `No ${filterStatus} bookings at this time.`}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
