import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles, ShoppingBag, Crown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image - Hijabi Fashion Model */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1920&h=1080&fit=crop&crop=faces"
          alt="Elegant Hijabi Fashion"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-gold/20 rounded-full animate-pulse-slow" />
      <div className="absolute bottom-40 right-20 w-48 h-48 border border-gold/10 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold rounded-full animate-glow" />

      <div className="container relative z-10" dir={dir}>
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold tracking-wide">Premium Collection</span>
          </div>

          {/* Title */}
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-tight">
              BOUTIQUE
              <br />
              <span className="text-gradient">MANCER</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              اكتشفي أرقى تشكيلة من الأزياء العصرية والأناقة الفاخرة المصممة خصيصاً لك
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-dark text-primary-foreground font-semibold px-8 h-14 text-base rounded-xl shadow-luxury transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <Link to="/category/women" className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                {t('women')}
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background font-semibold px-8 h-14 text-base rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              <Link to="/category/men">
                {t('men')}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-gold">500+</p>
              <p className="text-sm text-muted-foreground">منتج متوفر</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-gold">100%</p>
              <p className="text-sm text-muted-foreground">جودة عالية</p>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-display font-bold text-gold">24/7</p>
              <p className="text-sm text-muted-foreground">خدمة العملاء</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
