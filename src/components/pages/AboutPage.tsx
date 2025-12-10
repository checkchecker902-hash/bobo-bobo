import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Chefs } from '@/entities';
import { Image } from '@/components/ui/image';
import { Heart, Leaf, Users, Award, Globe, Sprout } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const [chefs, setChefs] = useState<Chefs[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      const { items } = await BaseCrudService.getAll<Chefs>('chefs');
      setChefs(items);
    };
    fetchChefs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://static.wixstatic.com/media/d59f5f_6270d5b1da6844b5aa5a88d4db067834~mv2.png?originWidth=1920&originHeight=704"
          alt="About Boho Boho"
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
            <h1 className="font-heading text-5xl md:text-7xl mb-4">Our Story</h1>
            <p className="font-paragraph text-xl md:text-2xl max-w-2xl mx-auto">
              A journey of passion, flavor, and community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                The Beginning
              </h2>
              <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                Boho Boho was born from a dream—a dream to create a space where coffee isn't just a beverage, but an experience. Our founder, inspired by travels across continents and countless conversations over steaming cups, envisioned a cafe that would become a second home for the community.
              </p>
              <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                What started as a small corner shop has blossomed into a beloved destination, where every detail—from the aroma that greets you at the door to the warmth of our staff—tells a story of dedication and love.
              </p>
              <p className="font-paragraph text-lg text-foreground leading-relaxed">
                Today, we continue to honor that original vision, creating moments of joy, connection, and comfort, one cup at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="https://static.wixstatic.com/media/d59f5f_c9cc8fd671bc48e3b82df630abf4d731~mv2.png?originWidth=768&originHeight=576"
                alt="Founder Story"
                className="w-full h-[600px] object-cover rounded-lg"
                width={800}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Origin & Philosophy */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              Our Philosophy
            </h2>
            <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
              We believe in the power of simple pleasures—quality ingredients, thoughtful preparation, and genuine hospitality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-soft-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-soft-gold" size={40} />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Made with Love</h3>
              <p className="font-paragraph text-base text-foreground">
                Every dish, every drink is crafted with care and attention, ensuring that what reaches your table is nothing short of exceptional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-soft-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-soft-gold" size={40} />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Sustainably Sourced</h3>
              <p className="font-paragraph text-base text-foreground">
                We partner with local farmers and ethical suppliers to bring you ingredients that are as good for the planet as they are for your palate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-soft-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-soft-gold" size={40} />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">Community First</h3>
              <p className="font-paragraph text-base text-foreground">
                We're more than a cafe—we're a gathering place where friendships form, ideas spark, and memories are made.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ingredients & Supply Chain */}
      <section className="py-24 px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Image
                src="https://static.wixstatic.com/media/d59f5f_4eac9ec51b7646f0874187d07e9495ea~mv2.png?originWidth=768&originHeight=448"
                alt="Fresh Ingredients"
                className="w-full h-[500px] object-cover rounded-lg"
                width={800}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                From Farm to Table
              </h2>
              <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                Our commitment to quality begins at the source. We work directly with local farmers, artisan producers, and ethical suppliers who share our values of sustainability and excellence.
              </p>
              <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                Every coffee bean is hand-selected from fair-trade farms. Our produce arrives fresh daily from organic gardens. Our dairy comes from family-owned farms that prioritize animal welfare.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Sprout className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Organic & Fresh</h4>
                    <p className="font-paragraph text-base text-foreground">
                      95% of our ingredients are organic and locally sourced
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="text-soft-gold mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-heading text-xl text-primary mb-2">Fair Trade</h4>
                    <p className="font-paragraph text-base text-foreground">
                      All our coffee and tea are certified fair trade
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef Passion */}
      {chefs.length > 0 && (
        <section className="py-24 px-8 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                The Heart of Our Kitchen
              </h2>
              <p className="font-paragraph text-xl text-foreground max-w-3xl mx-auto">
                Meet the passionate culinary artists who bring our vision to life
              </p>
            </motion.div>

            <div className="space-y-16">
              {chefs.map((chef, index) => (
                <motion.div
                  key={chef._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    {chef.chefPhoto && (
                      <Image
                        src={chef.chefPhoto}
                        alt={chef.chefName || 'Chef'}
                        className="w-full h-[500px] object-cover rounded-lg"
                        width={800}
                      />
                    )}
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="font-heading text-3xl text-primary mb-3">{chef.chefName}</h3>
                    <p className="font-paragraph text-xl text-soft-gold mb-6">{chef.specialty}</p>
                    <p className="font-paragraph text-lg text-foreground mb-6 leading-relaxed">
                      {chef.shortIntroduction}
                    </p>
                    {chef.passionAndStory && (
                      <p className="font-paragraph text-base text-foreground leading-relaxed italic">
                        "{chef.passionAndStory}"
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Uniqueness & Values */}
      <section className="py-24 px-8 bg-soft-gold/10">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg"
            >
              <Award className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">Award-Winning Quality</h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Our dedication to excellence has earned us recognition from culinary experts and food critics. But our greatest reward is the smile on our customers' faces and their return visits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <Leaf className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">Sustainability Commitment</h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We've eliminated single-use plastics, compost our organic waste, and use renewable energy. Our packaging is 100% biodegradable, and we donate surplus food to local shelters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg"
            >
              <Users className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">Community Impact</h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                We host weekly community events, support local artists by showcasing their work, and partner with schools to provide culinary education programs for young aspiring chefs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg"
            >
              <Heart className="text-soft-gold mb-4" size={48} />
              <h3 className="font-heading text-2xl text-primary mb-4">Human-Centered Design</h3>
              <p className="font-paragraph text-base text-foreground leading-relaxed">
                Every aspect of Boho Boho is designed with you in mind—from comfortable seating and natural lighting to accessible facilities and a welcoming atmosphere for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
              Our Mission
            </h2>
            <blockquote className="font-paragraph text-2xl text-foreground leading-relaxed italic mb-8">
              "To create a space where exceptional food and drink meet genuine hospitality, where sustainability is practiced not preached, and where every guest leaves feeling a little more connected to their community and themselves."
            </blockquote>
            <div className="h-1 w-32 bg-soft-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
