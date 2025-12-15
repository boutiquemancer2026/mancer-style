import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gold/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative" dir={dir}>
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo Icon */}
          <div className="animate-float">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold shadow-luxury">
              <span className="text-3xl font-bold text-background font-display">BM</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground animate-slide-up">
            <span className="text-gold">BOUTIQUE</span>
            <br />
            <span>MANCER</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            {t('latestProducts')}
          </p>

          {/* CTA Button */}
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button
              asChild
              size="lg"
              className="gradient-gold text-background font-semibold shadow-luxury hover:opacity-90 transition-opacity group"
            >
              <Link to="/category/men">
                <Sparkles className="w-5 h-5 mr-2" />
                {t('viewAll')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
