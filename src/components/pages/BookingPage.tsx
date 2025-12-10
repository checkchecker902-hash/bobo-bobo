import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, User, Mail, Phone, MessageSquare, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    seating: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.date && formData.time && formData.guests;
      case 2:
        return formData.seating;
      case 3:
        return formData.name && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];

  const seatingOptions = [
    { value: 'indoor', label: 'Indoor Dining', description: 'Cozy interior seating' },
    { value: 'outdoor', label: 'Outdoor Patio', description: 'Al fresco dining' },
    { value: 'bar', label: 'Bar Seating', description: 'Counter seating' },
    { value: 'private', label: 'Private Room', description: 'For groups of 8+' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">
              Reserve Your Table
            </h1>
            <p className="font-paragraph text-xl text-foreground">
              Secure your spot at Boho Boho in just a few steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 px-8 bg-white border-b border-foreground/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-paragraph text-sm transition-all ${
                      currentStep >= step
                        ? 'bg-soft-gold text-primary'
                        : 'bg-foreground/10 text-foreground/40'
                    }`}
                  >
                    {currentStep > step ? <Check size={20} /> : step}
                  </div>
                  <span
                    className={`font-paragraph text-xs mt-2 ${
                      currentStep >= step ? 'text-primary' : 'text-foreground/40'
                    }`}
                  >
                    {step === 1 && 'Date & Time'}
                    {step === 2 && 'Seating'}
                    {step === 3 && 'Details'}
                    {step === 4 && 'Confirm'}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`h-0.5 flex-1 transition-all ${
                      currentStep > step ? 'bg-soft-gold' : 'bg-foreground/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Date, Time & Guests */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-lg"
              >
                <h2 className="font-heading text-3xl text-primary mb-8">
                  When would you like to visit?
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="date" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <Calendar size={20} className="text-soft-gold" />
                      Select Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="font-paragraph text-base"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <Clock size={20} className="text-soft-gold" />
                      Select Time
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger className="font-paragraph text-base">
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="font-paragraph">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="guests" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <Users size={20} className="text-soft-gold" />
                      Number of Guests
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger className="font-paragraph text-base">
                        <SelectValue placeholder="How many guests?" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()} className="font-paragraph">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                        <SelectItem value="10+" className="font-paragraph">
                          10+ Guests (Group Booking)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Seating Preference */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-lg"
              >
                <h2 className="font-heading text-3xl text-primary mb-8">
                  Choose your seating preference
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {seatingOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('seating', option.value)}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        formData.seating === option.value
                          ? 'border-soft-gold bg-soft-gold/10'
                          : 'border-foreground/10 hover:border-soft-gold/50'
                      }`}
                    >
                      <h3 className="font-heading text-xl text-primary mb-2">
                        {option.label}
                      </h3>
                      <p className="font-paragraph text-base text-foreground">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-lg"
              >
                <h2 className="font-heading text-3xl text-primary mb-8">
                  Your contact information
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <User size={20} className="text-soft-gold" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="font-paragraph text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <Mail size={20} className="text-soft-gold" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="font-paragraph text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <Phone size={20} className="text-soft-gold" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (234) 567-890"
                      className="font-paragraph text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="requests" className="font-paragraph text-base text-foreground mb-2 flex items-center gap-2">
                      <MessageSquare size={20} className="text-soft-gold" />
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="requests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Any dietary restrictions, allergies, or special occasions?"
                      className="font-paragraph text-base min-h-32"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-lg text-center"
              >
                <div className="w-20 h-20 bg-soft-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-primary" />
                </div>

                <h2 className="font-heading text-4xl text-primary mb-4">
                  Reservation Confirmed!
                </h2>
                <p className="font-paragraph text-lg text-foreground mb-8">
                  Thank you for choosing Boho Boho. We can't wait to serve you!
                </p>

                <div className="bg-background p-8 rounded-lg mb-8 text-left max-w-2xl mx-auto">
                  <h3 className="font-heading text-2xl text-primary mb-6">
                    Reservation Details
                  </h3>
                  <div className="space-y-4 font-paragraph text-base text-foreground">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Date:</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Time:</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Guests:</span>
                      <span className="font-medium">{formData.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Seating:</span>
                      <span className="font-medium capitalize">{formData.seating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                  </div>
                </div>

                <p className="font-paragraph text-base text-foreground mb-8">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>

                <Button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="bg-primary text-primary-foreground font-paragraph text-base px-8 py-3 rounded-lg hover:bg-primary/90"
                >
                  Return to Home
                </Button>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 font-paragraph text-base py-6"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type={currentStep === 3 ? 'submit' : 'button'}
                  onClick={currentStep < 3 ? handleNext : undefined}
                  disabled={!isStepValid()}
                  className="flex-1 bg-primary text-primary-foreground font-paragraph text-base py-6 hover:bg-primary/90 disabled:opacity-50"
                >
                  {currentStep === 3 ? 'Confirm Reservation' : 'Continue'}
                </Button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Info Section */}
      {currentStep < 4 && (
        <section className="py-16 px-8 bg-soft-gold/10">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl text-primary mb-6 text-center">
              Good to Know
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="font-paragraph text-base text-foreground">
                  <strong>Cancellation Policy:</strong> Free cancellation up to 2 hours before reservation
                </p>
              </div>
              <div className="text-center">
                <p className="font-paragraph text-base text-foreground">
                  <strong>Group Bookings:</strong> For parties of 10+, please call us directly
                </p>
              </div>
              <div className="text-center">
                <p className="font-paragraph text-base text-foreground">
                  <strong>Wait Time:</strong> We hold reservations for 15 minutes past booking time
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
