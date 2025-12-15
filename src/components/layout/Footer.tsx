import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 bg-secondary/30 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-lg font-display font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-display font-bold">
                BOUTIQUE <span className="text-gold">MANCER</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              أفضل متجر للأزياء العصرية والأناقة الفاخرة
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">روابط سريعة</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/category/men" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('men')}
              </Link>
              <Link to="/category/women" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('women')}
              </Link>
              <Link to="/category/children" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('children')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">تواصل معنا</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                <span>+213 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                <span>الجزائر</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} BOUTIQUE MANCER. {t('copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
