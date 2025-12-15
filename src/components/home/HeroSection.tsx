import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" dir={dir}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gold/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rotate-45 border-2 border-gold/30 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full border-2 border-accent/30 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-sm font-medium text-gold">أناقة بلا حدود</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-slide-up">
            <span className="block text-foreground mb-2">BOUTIQUE</span>
            <span className="block text-gradient">MANCER</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s' }}>
            اكتشف أرقى تشكيلة من الأزياء العصرية للرجال والنساء والأطفال
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-primary-foreground font-semibold px-10 h-14 rounded-2xl shadow-luxury transition-all duration-300 hover:shadow-xl hover:scale-105 text-base">
              <Link to="/category/women">تسوق الآن</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-border hover:border-gold/50 font-semibold px-10 h-14 rounded-2xl transition-all duration-300 hover:bg-secondary text-base">
              <Link to="/category/men">استكشف المجموعات</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-12 mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gold">500+</div>
              <div className="text-sm text-muted-foreground mt-1">منتج متوفر</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gold">100%</div>
              <div className="text-sm text-muted-foreground mt-1">جودة مضمونة</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gold">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">دعم متواصل</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-10 h-10 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
