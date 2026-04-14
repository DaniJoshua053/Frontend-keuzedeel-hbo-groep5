import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded inline-block mb-4">
              <span className="font-bold text-lg">RedFlags</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for quality flags from around the world.
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
            <h3 className="mb-4">Producten</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?type=flag" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vlaggen
                </Link>
              </li>
              <li>
                <Link to="/products?type=pennant" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Wimpels
                </Link>
              </li>
              <li>
                <Link to="/flagpoles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vlaggenstokken
                </Link>
              </li>
              <li>
                <Link to="/custom-designer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Custom Ontwerpen
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('returns')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Flag Street<br />Amsterdam, 1012 AB</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+31 20 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@redflags.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RedFlags. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}