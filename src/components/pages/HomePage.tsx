// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Chefs, MenuItems, CustomerReviews, FrequentlyAskedQuestions, ReasonsToChooseUs, SeatingTypes } from '@/entities';
import { Image } from '@/components/ui/image';
import { Star, ChefHat, Coffee, Award, ArrowRight, MapPin, Clock, Quote } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// --- Utility Components for Motion & Layout ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const RevealOnScroll: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-12 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${className || ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string; speed?: number }> = ({ src, alt, className, speed = 0.5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image src={src} alt={alt} className="w-full h-full object-cover" width={1200} />
      </motion.div>
    </div>
  );
};

const VerticalDivider = () => (
  <div className="hidden md:block w-px h-full bg-primary/10 mx-auto" />
);

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [chefs, setChefs] = useState<Chefs[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [reviews, setReviews] = useState<CustomerReviews[]>([]);
  const [faqs, setFaqs] = useState<FrequentlyAskedQuestions[]>([]);
  const [reasons, setReasons] = useState<ReasonsToChooseUs[]>([]);
  const [seatingTypes, setSeatingTypes] = useState<SeatingTypes[]>([]);
  
  // --- Local State ---
  const [isPreloading, setIsPreloading] = useState(true);

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    const fetchData = async () => {
      const [chefsData, menuData, reviewsData, faqsData, reasonsData, seatingData] = await Promise.all([
        BaseCrudService.getAll<Chefs>('chefs'),
        BaseCrudService.getAll<MenuItems>('menuitems'),
        BaseCrudService.getAll<CustomerReviews>('customerreviews'),
        BaseCrudService.getAll<FrequentlyAskedQuestions>('faqs'),
        BaseCrudService.getAll<ReasonsToChooseUs>('reasonstochooseus'),
        BaseCrudService.getAll<SeatingTypes>('seatingtypes'),
      ]);

      setChefs(chefsData.items);
      setMenuItems(menuData.items.slice(0, 6));
      setReviews(reviewsData.items.slice(0, 3));
      setFaqs(faqsData.items.filter(f => f.isFeatured).slice(0, 4));
      setReasons(reasonsData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      setSeatingTypes(seatingData.items);
    };

    fetchData();
    
    // Preloader Logic
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-primary font-paragraph selection:bg-soft-gold selection:text-white overflow-x-clip">
      
      {/* --- Pre-landing Animation --- */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          >
            <div className="relative overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-6xl md:text-9xl text-soft-gold tracking-tighter"
              >
                Boho Boho
              </motion.h1>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-1 w-full bg-soft-gold mt-4 origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      {/* --- Hero Section --- */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/d59f5f_ad2869d223d34913a87a169b00916079~mv2.png?originWidth=1920&originHeight=1024"
            alt="Boho Boho Cafe Interior"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <motion.div style={{ opacity: heroOpacity }} className="max-w-5xl mx-auto space-y-8">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              className="inline-block text-white/90 text-lg md:text-xl tracking-[0.2em] uppercase"
            >
              Est. 2014
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 1 }}
              className="font-heading text-7xl md:text-9xl text-white leading-[0.9]"
            >
              A Taste of <br/><span className="italic text-soft-gold">Elegance</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
            >
              <Link
                to="/booking"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white hover:text-primary transition-all duration-500"
              >
                <span className="text-lg tracking-wide">Reserve Your Table</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* --- Tagline Section (Sticky Reveal) --- */}
      <section className="relative py-32 md:py-48 px-6 bg-background">
        <div className="max-w-[100rem] mx-auto">
          <RevealOnScroll>
            <div className="relative max-w-6xl mx-auto text-center">
              <Quote className="absolute -top-12 -left-4 md:-left-12 w-24 h-24 text-soft-gold/10 rotate-180" />
              <h2 className="font-heading text-4xl md:text-7xl leading-tight text-primary">
                "In every corner, a story. <br className="hidden md:block" />
                In every sip, a <span className="text-soft-gold italic">memory</span>."
              </h2>
              <div className="mt-12 flex justify-center">
                <div className="h-px w-32 bg-primary/20" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --- About Section (Asymmetrical Layout) --- */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <RevealOnScroll>
                <span className="text-soft-gold text-sm tracking-widest uppercase font-bold mb-4 block">Our Philosophy</span>
                <h2 className="font-heading text-5xl md:text-6xl mb-8 text-primary">Crafting Moments, <br/>Not Just Coffee</h2>
                <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
                  <p>
                    <span className="text-6xl float-left mr-3 mt-[-10px] font-heading text-soft-gold">B</span>
                    oho Boho was born from a passion for creating spaces where people connect, stories unfold, and memories are made. Our journey began with a simple vision: to craft a cafe that feels like home, tastes like heaven, and looks like art.
                  </p>
                  <p>
                    Every element in our cafe, from the carefully sourced beans to the handpicked decor, reflects our commitment to quality, sustainability, and the human touch that makes every visit special.
                  </p>
                </div>
                <div className="mt-10">
                  <Link to="/about" className="inline-flex items-center text-primary border-b border-primary/30 pb-1 hover:border-primary hover:text-soft-gold transition-colors">
                    Discover Our Full Story <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <RevealOnScroll delay={200}>
                <div className="relative aspect-[4/5] md:aspect-[16/10] w-full">
                  <ParallaxImage 
                    src="https://static.wixstatic.com/media/d59f5f_b7bd558f79d94f13965225dc950d94f7~mv2.png?originWidth=768&originHeight=960"
                    alt="Cafe Ambiance"
                    className="w-full h-full rounded-sm"
                  />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-background p-8 hidden md:flex items-center justify-center rounded-full z-10 shadow-xl">
                    <div className="text-center">
                      <span className="block font-heading text-5xl text-soft-gold">10+</span>
                      <span className="text-xs uppercase tracking-widest mt-1">Years of<br/>Excellence</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* --- Chefs Section (Grid) --- */}
      {chefs.length > 0 && (
        <section className="py-32 px-6 bg-background">
          <div className="max-w-[100rem] mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-primary/10 pb-8">
                <div>
                  <span className="text-soft-gold text-sm tracking-widest uppercase font-bold mb-2 block">The Team</span>
                  <h2 className="font-heading text-5xl text-primary">Culinary Artists</h2>
                </div>
                <p className="text-primary/60 max-w-md mt-4 md:mt-0">
                  Passionate creators who bring magic to every dish, blending tradition with modern innovation.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
              {chefs.map((chef, index) => (
                <RevealOnScroll key={chef._id} delay={index * 100}>
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden aspect-[3/4] mb-6">
                      {chef.chefPhoto && (
                        <Image
                          src={chef.chefPhoto}
                          alt={chef.chefName || 'Chef'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={600}
                        />
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                    </div>
                    <h3 className="font-heading text-3xl text-primary mb-1 group-hover:text-soft-gold transition-colors">{chef.chefName}</h3>
                    <p className="text-soft-gold text-sm uppercase tracking-wider mb-3">{chef.specialty}</p>
                    <p className="text-primary/70 text-sm leading-relaxed border-l-2 border-soft-gold/30 pl-4">
                      {chef.shortIntroduction}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Menu Highlights (Horizontal Scroll / Magazine Style) --- */}
      <section className="py-32 px-6 bg-primary text-background overflow-hidden">
        <div className="max-w-[100rem] mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <span className="text-soft-gold text-sm tracking-widest uppercase font-bold mb-4 block">Our Menu</span>
              <h2 className="font-heading text-5xl md:text-7xl text-white">Signature Selections</h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {menuItems.map((item, index) => (
              <RevealOnScroll key={item._id} delay={index * 50} className="bg-primary p-10 hover:bg-white/5 transition-colors duration-300 group relative">
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="font-heading text-2xl text-white group-hover:text-soft-gold transition-colors">{item.itemName}</h3>
                  <span className="font-paragraph text-lg text-soft-gold">${item.price?.toFixed(2)}</span>
                </div>
                <p className="text-white/60 mb-6 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  {item.category && (
                    <span className="text-xs uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-soft-gold" />
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/menus"
              className="inline-block border border-soft-gold text-soft-gold px-10 py-4 rounded-full hover:bg-soft-gold hover:text-primary transition-all duration-300 uppercase tracking-widest text-sm"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* --- Experience / Features (Icon Grid) --- */}
      <section className="py-24 px-6 bg-soft-gold/5">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
            <RevealOnScroll className="p-12 text-center group hover:bg-white transition-colors duration-500">
              <Coffee className="w-12 h-12 mx-auto mb-6 text-soft-gold group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-2xl mb-4">Artisan Coffee</h3>
              <p className="text-primary/70">Carefully selected beans roasted to perfection for a symphony of flavors.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={100} className="p-12 text-center group hover:bg-white transition-colors duration-500">
              <ChefHat className="w-12 h-12 mx-auto mb-6 text-soft-gold group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-2xl mb-4">Culinary Excellence</h3>
              <p className="text-primary/70">Dishes crafted with passion using locally sourced ingredients.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={200} className="p-12 text-center group hover:bg-white transition-colors duration-500">
              <Award className="w-12 h-12 mx-auto mb-6 text-soft-gold group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-heading text-2xl mb-4">Award-Winning</h3>
              <p className="text-primary/70">Recognized for quality, sustainability, and unforgettable experiences.</p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --- Seating Types (Alternating Layout) --- */}
      {seatingTypes.length > 0 && (
        <section className="py-32 px-6 bg-white">
          <div className="max-w-[100rem] mx-auto space-y-32">
            <RevealOnScroll>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6">Find Your Perfect Spot</h2>
                <p className="text-lg text-primary/60">Whether you seek a quiet corner for reflection or a vibrant table for connection, we have a space for you.</p>
              </div>
            </RevealOnScroll>

            {seatingTypes.map((seating, index) => (
              <div key={seating._id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                <div className="w-full lg:w-1/2">
                  <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-sm aspect-[16/10]">
                      {seating.image && (
                        <ParallaxImage 
                          src={seating.image}
                          alt={seating.seatingTypeName || 'Seating'}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  </RevealOnScroll>
                </div>
                <div className="w-full lg:w-1/2">
                  <RevealOnScroll delay={200}>
                    <h3 className="font-heading text-4xl text-primary mb-4">{seating.seatingTypeName}</h3>
                    <div className="w-12 h-px bg-soft-gold mb-6" />
                    <p className="text-lg text-primary/80 mb-6 leading-relaxed">{seating.description}</p>
                    {seating.maxCapacity && (
                      <div className="flex items-center gap-2 text-sm text-primary/60 uppercase tracking-wider">
                        <span className="w-2 h-2 bg-soft-gold rounded-full" />
                        Capacity: Up to {seating.maxCapacity} guests
                      </div>
                    )}
                  </RevealOnScroll>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Reviews (Masonry-ish) --- */}
      {reviews.length > 0 && (
        <section className="py-32 px-6 bg-background border-t border-primary/5">
          <div className="max-w-[100rem] mx-auto">
            <RevealOnScroll>
              <h2 className="font-heading text-5xl text-center mb-20">Guest Stories</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <RevealOnScroll key={review._id} delay={index * 100}>
                  <div className="bg-white p-10 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < (review.rating || 0) ? 'fill-soft-gold text-soft-gold' : 'text-gray-200'} />
                      ))}
                    </div>
                    <p className="font-heading text-2xl text-primary mb-8 flex-grow leading-snug">"{review.reviewText}"</p>
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-primary/5">
                      {review.customerPhoto ? (
                        <Image src={review.customerPhoto} alt={review.customerName || 'Guest'} className="w-12 h-12 rounded-full object-cover" width={48} />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-soft-gold/20 flex items-center justify-center text-soft-gold font-heading text-xl">
                          {review.customerName?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sm uppercase tracking-wider">{review.customerName}</p>
                        <p className="text-xs text-primary/50">{review.source}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- Reasons to Choose Us --- */}
      {reasons.length > 0 && (
        <section className="py-32 px-6 bg-primary text-white">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <RevealOnScroll>
                <div className="sticky top-32">
                  <span className="text-soft-gold text-sm tracking-widest uppercase font-bold mb-4 block">Why Us</span>
                  <h2 className="font-heading text-5xl md:text-7xl mb-8">The Boho<br/>Difference</h2>
                  <p className="text-white/60 text-lg max-w-md mb-12">
                    We believe in more than just serving food. We believe in creating an ecosystem of quality, sustainability, and community.
                  </p>
                  <Link to="/about" className="inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-soft-gold hover:text-soft-gold transition-colors">
                    Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </RevealOnScroll>

              <div className="space-y-12">
                {reasons.map((reason, index) => (
                  <RevealOnScroll key={reason._id} delay={index * 100}>
                    <div className="flex gap-6 md:gap-10 items-start group">
                      <span className="font-heading text-6xl text-white/10 group-hover:text-soft-gold transition-colors duration-500">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-3xl mb-3 text-white">{reason.reasonTitle}</h3>
                        <p className="text-white/60 leading-relaxed mb-4">{reason.reasonDescription}</p>
                        {reason.reasonImage && (
                          <div className="mt-6 overflow-hidden rounded-sm h-48 w-full">
                            <Image src={reason.reasonImage} alt={reason.reasonTitle || ''} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" width={400} />
                          </div>
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- FAQs & Location Split --- */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* FAQs */}
            <div>
              <RevealOnScroll>
                <h2 className="font-heading text-4xl mb-12">Common Questions</h2>
                <div className="space-y-8">
                  {faqs.map((faq) => (
                    <div key={faq._id} className="border-b border-primary/10 pb-8">
                      <h3 className="font-heading text-xl mb-3 text-primary">{faq.question}</h3>
                      <p className="text-primary/60 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link to="/faqs" className="text-sm uppercase tracking-widest text-soft-gold hover:text-primary transition-colors">
                    View All FAQs →
                  </Link>
                </div>
              </RevealOnScroll>
            </div>

            {/* Location */}
            <div>
              <RevealOnScroll delay={200}>
                <h2 className="font-heading text-4xl mb-12">Visit Us</h2>
                <div className="bg-background p-10 rounded-sm">
                  <div className="flex items-start gap-4 mb-8">
                    <MapPin className="w-6 h-6 text-soft-gold mt-1" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Address</h4>
                      <p className="text-primary/70">123 Bohemian Street<br/>Cafe District, City 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-8">
                    <Clock className="w-6 h-6 text-soft-gold mt-1" />
                    <div>
                      <h4 className="font-bold uppercase tracking-wider text-sm mb-2">Hours</h4>
                      <p className="text-primary/70">Mon-Fri: 7am - 9pm<br/>Sat-Sun: 8am - 10pm</p>
                    </div>
                  </div>
                  
                  <div className="aspect-video bg-primary/5 rounded-sm flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-soft-gold/10 group-hover:bg-soft-gold/20 transition-colors" />
                    <span className="font-heading text-2xl text-primary/40 group-hover:text-primary transition-colors z-10">Interactive Map Placeholder</span>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link to="/location" className="inline-block bg-primary text-white px-8 py-3 rounded-sm hover:bg-soft-gold transition-colors duration-300 uppercase tracking-widest text-xs">
                      Get Directions
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-32 px-6 bg-soft-gold/20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-soft-gold via-transparent to-transparent" />
        </div>
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-heading text-5xl md:text-7xl mb-8 text-primary">Ready for an Unforgettable Experience?</h2>
            <p className="text-xl text-primary/70 mb-12">Reserve your table today and discover why Boho Boho is more than just a cafe—it's a destination.</p>
            <Link
              to="/booking"
              className="inline-block bg-primary text-white font-paragraph text-lg px-12 py-5 rounded-full hover:bg-soft-gold hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Book Your Table Now
            </Link>
          </div>
        </RevealOnScroll>
      </section>

      <Footer />
    </div>
  );
}