import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Baby, ArrowUpRight } from 'lucide-react';

const CategorySection: React.FC = () => {
  const { t, dir } = useLanguage();

  const categories = [
    { id: 'men', label: t('men'), icon: Users, description: 'تشكيلة راقية من الأزياء الرجالية العصرية', gradient: 'from-primary/80 to-primary' },
    { id: 'women', label: t('women'), icon: Users, description: 'أحدث صيحات الموضة النسائية الأنيقة', gradient: 'from-gold/80 to-gold-dark' },
    { id: 'children', label: t('children'), icon: Baby, description: 'ملابس مريحة وأنيقة للأطفال', gradient: 'from-accent/80 to-accent' },
  ];

  return (
    <section className="py-20 bg-secondary/30" dir={dir}>
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">{t('categories')}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">اختر القسم المناسب واستمتع بتجربة تسوق فريدة</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={`/category/${category.id}`} className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 transition-all duration-500 hover:shadow-luxury hover:border-gold/30 hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3 group-hover:text-gold transition-colors">{category.label}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{category.description}</p>
                <div className="flex items-center gap-2 text-gold font-medium">
                  <span>تصفح الآن</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
