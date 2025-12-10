import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { CustomerReviews } from '@/entities';
import { Image } from '@/components/ui/image';
import { Star } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { items } = await BaseCrudService.getAll<CustomerReviews>('customerreviews');
      setReviews(items);
      
      if (items.length > 0) {
        const total = items.reduce((sum, review) => sum + (review.rating || 0), 0);
        setAverageRating(total / items.length);
      }
    };
    fetchReviews();
  }, []);

  const getRatingCount = (rating: number) => {
    return reviews.filter(r => r.rating === rating).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/d59f5f_e468ecd7250b482c9360220beb86aac5~mv2.png?originWidth=1920&originHeight=512"
          alt="Customer Reviews"
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
            <h1 className="font-heading text-5xl md:text-7xl mb-4">Guest Reviews</h1>
            <p className="font-paragraph text-xl md:text-2xl">
              Hear from those who've experienced our hospitality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                What Our Guests Think
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <span className="font-heading text-6xl text-soft-gold">
                  {averageRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={i < Math.round(averageRating) ? 'fill-soft-gold text-soft-gold' : 'text-foreground/20'}
                      />
                    ))}
                  </div>
                  <p className="font-paragraph text-base text-foreground">
                    Based on {reviews.length} reviews
                  </p>
                </div>
              </div>
              <p className="font-paragraph text-lg text-foreground leading-relaxed">
                Our guests consistently praise our warm atmosphere, exceptional coffee, and attentive service. We're honored to be part of your daily routine and special moments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = getRatingCount(rating);
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-24">
                      <span className="font-paragraph text-base text-foreground">{rating}</span>
                      <Star size={16} className="fill-soft-gold text-soft-gold" />
                    </div>
                    <div className="flex-1 h-3 bg-foreground/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-soft-gold transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="font-paragraph text-sm text-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Customer Stories
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
              Real experiences from real people
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-8 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < (review.rating || 0) ? 'fill-soft-gold text-soft-gold' : 'text-foreground/20'}
                    />
                  ))}
                </div>

                <p className="font-paragraph text-base text-foreground mb-6 leading-relaxed italic">
                  "{review.reviewText}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
                  {review.customerPhoto && (
                    <Image
                      src={review.customerPhoto}
                      alt={review.customerName || 'Customer'}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-heading text-base text-primary">
                      {review.customerName}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-foreground/60">
                      {review.reviewDate && (
                        <span className="font-paragraph">
                          {format(new Date(review.reviewDate), 'MMM dd, yyyy')}
                        </span>
                      )}
                      {review.source && (
                        <>
                          <span>•</span>
                          <span className="font-paragraph">{review.source}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="py-24 px-8 bg-soft-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-heading text-3xl md:text-4xl text-primary italic mb-8 leading-relaxed">
              "Boho Boho isn't just a cafe—it's a feeling. From the moment you walk in, you're embraced by warmth, quality, and genuine care. It's become my sanctuary."
            </blockquote>
            <div className="flex items-center gap-1 justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-soft-gold text-soft-gold" />
              ))}
            </div>
            <p className="font-paragraph text-lg text-foreground">
              - Sarah M., Regular Guest
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              Join Our Community
            </h2>
            <p className="font-paragraph text-lg text-foreground max-w-2xl mx-auto">
              Follow us on social media to see what our guests are sharing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-background rounded-lg"
            >
              <p className="font-heading text-5xl text-soft-gold mb-4">10K+</p>
              <p className="font-paragraph text-lg text-foreground">Instagram Followers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 bg-background rounded-lg"
            >
              <p className="font-heading text-5xl text-soft-gold mb-4">500+</p>
              <p className="font-paragraph text-lg text-foreground">5-Star Reviews</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-background rounded-lg"
            >
              <p className="font-heading text-5xl text-soft-gold mb-4">15K+</p>
              <p className="font-paragraph text-lg text-foreground">Happy Customers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Experience It Yourself
            </h2>
            <p className="font-paragraph text-xl mb-8 text-primary-foreground/90">
              Join the thousands who've made Boho Boho their favorite destination
            </p>
            <a
              href="/booking"
              className="inline-block bg-soft-gold text-primary font-paragraph text-lg px-10 py-4 rounded-lg hover:bg-soft-gold/90 transition-all"
            >
              Reserve Your Table
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
