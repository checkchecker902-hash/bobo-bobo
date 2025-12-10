import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-3xl mb-4 text-soft-gold">Boho Boho</h3>
            <p className="font-paragraph text-base text-primary-foreground/80 mb-6">
              A taste of elegance in every cup. Experience the warmth of our cafe where quality meets comfort.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-soft-gold">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/home" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                Home
              </Link>
              <Link to="/about" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                About Us
              </Link>
              <Link to="/menus" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                Menu
              </Link>
              <Link to="/booking" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                Book a Table
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-soft-gold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-soft-gold mt-1 flex-shrink-0" />
                <p className="font-paragraph text-base text-primary-foreground/80">
                  123 Bohemian Street, Cafe District, City 12345
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-soft-gold flex-shrink-0" />
                <a href="tel:+1234567890" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-soft-gold flex-shrink-0" />
                <a href="mailto:hello@bohoboho.com" className="font-paragraph text-base text-primary-foreground/80 hover:text-soft-gold transition-colors">
                  hello@bohoboho.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-soft-gold">Opening Hours</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-paragraph text-base text-primary-foreground/80">
                <span>Monday - Friday</span>
                <span>7AM - 10PM</span>
              </div>
              <div className="flex justify-between font-paragraph text-base text-primary-foreground/80">
                <span>Saturday</span>
                <span>8AM - 11PM</span>
              </div>
              <div className="flex justify-between font-paragraph text-base text-primary-foreground/80">
                <span>Sunday</span>
                <span>8AM - 9PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Boho Boho Cafe. All rights reserved. Crafted with love and coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}
