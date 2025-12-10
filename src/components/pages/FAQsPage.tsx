import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { FrequentlyAskedQuestions } from '@/entities';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchFAQs = async () => {
      const { items } = await BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs');
      const sortedItems = items.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      setFaqs(sortedItems);

      const uniqueCategories = Array.from(
        new Set(items.map(faq => faq.category).filter(Boolean))
      ) as string[];
      setCategories(['All', ...uniqueCategories]);
    };
    fetchFAQs();
  }, []);

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl text-primary mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-paragraph text-xl text-foreground">
              Everything you need to know about Boho Boho
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="py-8 px-8 bg-white border-b border-foreground/10">
          <div className="max-w-[100rem] mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-paragraph text-base px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground hover:bg-soft-gold/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Accordion */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={faq._id}
                    className="bg-white rounded-lg px-6 border border-foreground/10"
                  >
                    <AccordionTrigger className="font-heading text-xl text-primary hover:text-soft-gold transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-paragraph text-base text-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground">
                No FAQs found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured FAQs */}
      {faqs.filter(f => f.isFeatured).length > 0 && selectedCategory === 'All' && (
        <section className="py-24 px-8 bg-soft-gold/10">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
                Most Asked Questions
              </h2>
              <p className="font-paragraph text-lg text-foreground">
                Quick answers to our most common inquiries
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs
                .filter(f => f.isFeatured)
                .slice(0, 4)
                .map((faq, index) => (
                  <motion.div
                    key={faq._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-lg"
                  >
                    <h3 className="font-heading text-xl text-primary mb-4">
                      {faq.question}
                    </h3>
                    <p className="font-paragraph text-base text-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Info */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Quick Information
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-lg text-center"
            >
              <h3 className="font-heading text-2xl text-primary mb-4">Opening Hours</h3>
              <div className="font-paragraph text-base text-foreground space-y-2">
                <p>Monday - Friday: 7AM - 10PM</p>
                <p>Saturday: 8AM - 11PM</p>
                <p>Sunday: 8AM - 9PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background p-8 rounded-lg text-center"
            >
              <h3 className="font-heading text-2xl text-primary mb-4">Contact</h3>
              <div className="font-paragraph text-base text-foreground space-y-2">
                <p>Phone: +1 (234) 567-890</p>
                <p>Email: hello@bohoboho.com</p>
                <p>123 Bohemian Street</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background p-8 rounded-lg text-center"
            >
              <h3 className="font-heading text-2xl text-primary mb-4">Reservations</h3>
              <div className="font-paragraph text-base text-foreground space-y-2">
                <p>Walk-ins welcome</p>
                <p>Online booking available</p>
                <p>Group bookings: Call ahead</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              Still Have Questions?
            </h2>
            <p className="font-paragraph text-xl mb-8 text-primary-foreground/90">
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="inline-block bg-soft-gold text-primary font-paragraph text-lg px-8 py-4 rounded-lg hover:bg-soft-gold/90 transition-all"
              >
                Call Us
              </a>
              <a
                href="mailto:hello@bohoboho.com"
                className="inline-block bg-transparent border-2 border-primary-foreground text-primary-foreground font-paragraph text-lg px-8 py-4 rounded-lg hover:bg-primary-foreground/10 transition-all"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
