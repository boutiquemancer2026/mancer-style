import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-card mt-auto">
      <div className="container py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full gradient-gold">
              <span className="text-sm font-bold text-background font-display">BM</span>
            </div>
            <span className="text-lg font-bold font-display text-gold">
              BOUTIQUE MANCER
            </span>
          </div>

          {/* Copyright - Always in Latin script */}
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} BOUTIQUE MANCER. {t('copyright')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
