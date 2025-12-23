import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Footer component with links, contact info, and social media
const Footer = () => {
  return (
    <footer className="bg-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 text-primary">
              Hastkala
            </h3>
            <p className="text-muted-foreground mb-4">
              Celebrating the timeless art of handloom textiles. Every thread tells a story of tradition and craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sarees" className="text-muted-foreground hover:text-primary transition-colors">
                  Sarees
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kurtas" className="text-muted-foreground hover:text-primary transition-colors">
                  Kurtas
                </Link>
              </li>
              <li>
                <Link to="/#story" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Subscribe to receive updates about new collections and special offers.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
              />
              <Button variant="default" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@hastkala.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Hastkala. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
