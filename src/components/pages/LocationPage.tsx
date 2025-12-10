import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions, MenuItems } from '@/entities';
import { Image } from '@/components/ui/image';
import { MapPin, Car, Train, Bus, Clock, Phone, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

export default function LocationPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [signatureDishes, setSignatureDishes] = useState<MenuItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [faqsData, menuData] = await Promise.all([
        BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs'),
        BaseCrudService.getAll<MenuItems>('menuitems'),
      ]);

      setFaqs(faqsData.items.slice(0, 5));
      setSignatureDishes(menuData.items.slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/d59f5f_4f1f1dcb94f74ab3aea88c30ca20d799~mv2.png?originWidth=1920&originHeight=512"
          alt="Boho Boho Location"
          className="w-full h-full object-cover"
          width={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-8"
          >
            <h1 className="font-heading text-5xl md:text-7xl mb-4">Visit Us</h1>
            <p className="font-paragraph text-xl md:text-2xl">
              Your home away from home awaits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              Find Your Way to Boho Boho
            </h2>
            <p className="font-paragraph text-lg text-foreground leading-relaxed mb-8">
              Nestled in the heart of the city's most vibrant neighborhood, Boho Boho is more than just a destination—it's an experience waiting to unfold. Whether you're a local looking for your new favorite spot or a visitor seeking authentic flavors, we're here to welcome you with open arms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder & Address */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-secondary/20 h-[500px] rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="text-soft-gold mx-auto mb-4" size={64} />
                <p className="font-paragraph text-xl text-foreground">Interactive Map</p>
                <p className="font-paragraph text-base text-foreground/60 mt-2">
                  Map integration placeholder
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="font-heading text-3xl text-primary mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Address</h4>
                    <p className="font-paragraph text-base text-foreground">
                      123 Bohemian Street<br />
                      Cafe District, City 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Phone</h4>
                    <a href="tel:+1234567890" className="font-paragraph text-base text-foreground hover:text-soft-gold transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Email</h4>
                    <a href="mailto:hello@bohoboho.com" className="font-paragraph text-base text-foreground hover:text-soft-gold transition-colors">
                      hello@bohoboho.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Opening Hours</h4>
                    <div className="font-paragraph text-base text-foreground space-y-1">
                      <p>Monday - Friday: 7:00 AM - 10:00 PM</p>
                      <p>Saturday: 8:00 AM - 11:00 PM</p>
                      <p>Sunday: 8:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Landmarks & Getting Here */}
      <section className="py-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              How to Get Here
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-3xl mx-auto">
              We're conveniently located and easily accessible by various modes of transportation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg"
            >
              <Car className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">By Car</h3>
              <p className="font-paragraph text-base text-foreground mb-4">
                Take Highway 101 and exit at Bohemian Street. We're located 2 blocks from the exit on the right side.
              </p>
              <p className="font-paragraph text-sm text-foreground/80">
                <strong>Parking:</strong> Free parking available in our dedicated lot behind the building. Street parking also available.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <Train className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">By Train</h3>
              <p className="font-paragraph text-base text-foreground mb-4">
                Take the Blue Line to Central Station. We're a 5-minute walk from the station exit.
              </p>
              <p className="font-paragraph text-sm text-foreground/80">
                <strong>Walking directions:</strong> Exit the station, turn left on Main Street, then right on Bohemian Street.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg"
            >
              <Bus className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">By Bus</h3>
              <p className="font-paragraph text-base text-foreground mb-4">
                Routes 15, 22, and 45 stop directly in front of our cafe. Check local schedules for timing.
              </p>
              <p className="font-paragraph text-sm text-foreground/80">
                <strong>Bus stop:</strong> Bohemian Street & Arts Avenue
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Neighborhood Highlights */}
      <section className="py-24 px-8 bg-soft-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              Explore the Neighborhood
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-3xl mx-auto">
              Our location puts you at the heart of the city's cultural scene
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg"
            >
              <h3 className="font-heading text-2xl text-primary mb-4">Nearby Landmarks</h3>
              <ul className="space-y-3 font-paragraph text-base text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-soft-gold mt-1">•</span>
                  <span><strong>City Art Museum</strong> - 3 blocks away, featuring contemporary and classical exhibitions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soft-gold mt-1">•</span>
                  <span><strong>Riverside Park</strong> - 5-minute walk, perfect for a post-meal stroll</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soft-gold mt-1">•</span>
                  <span><strong>Historic Theater District</strong> - 2 blocks, catch a show before or after your visit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-soft-gold mt-1">•</span>
                  <span><strong>Artisan Market</strong> - Every Saturday, right across the street</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <h3 className="font-heading text-2xl text-primary mb-4">What Makes Our Area Special</h3>
              <p className="font-paragraph text-base text-foreground mb-4">
                The Bohemian District is known for its vibrant arts scene, eclectic boutiques, and diverse culinary offerings. Our neighborhood celebrates creativity, community, and culture.
              </p>
              <p className="font-paragraph text-base text-foreground">
                After visiting Boho Boho, explore the local galleries, vintage shops, and street art that make this area a must-visit destination for locals and tourists alike.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Menu Recommendations */}
      {signatureDishes.length > 0 && (
        <section className="py-24 px-8 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Local Favorites
              </h2>
              <p className="font-paragraph text-lg text-foreground max-w-3xl mx-auto">
                Don't leave without trying these signature dishes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {signatureDishes.map((dish, index) => (
                <motion.div
                  key={dish._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-primary mb-3">{dish.itemName}</h3>
                    <p className="font-paragraph text-base text-foreground mb-4">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-paragraph text-lg text-soft-gold font-medium">
                        ${dish.price?.toFixed(2)}
                      </span>
                      {dish.category && (
                        <span className="font-paragraph text-sm text-secondary">
                          {dish.category}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/menus"
                className="inline-block bg-primary text-primary-foreground font-paragraph text-base px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Location FAQs */}
      {faqs.length > 0 && (
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Common Questions
              </h2>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg"
                >
                  <h3 className="font-heading text-xl text-primary mb-3">{faq.question}</h3>
                  <p className="font-paragraph text-base text-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/faqs"
                className="inline-block bg-primary text-primary-foreground font-paragraph text-base px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Ready to Visit?
            </h2>
            <p className="font-paragraph text-xl mb-8 text-primary-foreground/90">
              Reserve your table and experience the warmth of Boho Boho
            </p>
            <Link
              to="/booking"
              className="inline-block bg-soft-gold text-primary font-paragraph text-lg px-10 py-4 rounded-lg hover:bg-soft-gold/90 transition-all"
            >
              Book Your Table
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
