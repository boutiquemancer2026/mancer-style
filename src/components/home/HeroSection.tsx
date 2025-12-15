import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      </div>

      <div className="container relative z-10" dir={dir}>
        <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          {/* Tagline */}
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground border border-border/50 rounded-full">
              Premium Fashion
            </span>
          </div>

          {/* Title */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight text-foreground leading-none">
              BOUTIQUE
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight leading-none">
              <span className="text-gold">MANCER</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            اكتشف أرقى تشكيلة من الأزياء العصرية والأناقة الفاخرة
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8 h-14 text-base rounded-full transition-all duration-300 hover:shadow-premium group"
            >
              <Link to="/category/women">
                {t('women')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium px-8 h-14 text-base rounded-full transition-all duration-300"
            >
              <Link to="/category/men">
                {t('men')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
