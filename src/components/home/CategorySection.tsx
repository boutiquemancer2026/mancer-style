import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop',
    icon: User,
  },
  {
    id: 'women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    icon: User,
  },
  {
    id: 'children',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&h=800&fit=crop',
    icon: Baby,
  },
];

const CategorySection: React.FC = () => {
  const { t } = useLanguage();

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case 'men':
        return t('men');
      case 'women':
        return t('women');
      case 'children':
        return t('children');
      default:
        return id;
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-8 text-foreground">
          {t('categories')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={cn(
                  'group relative aspect-[3/4] overflow-hidden rounded-xl',
                  'transition-all duration-500 hover:shadow-luxury hover:-translate-y-2',
                  'animate-slide-up'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={getCategoryLabel(category.id)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground group-hover:text-gold transition-colors">
                    {getCategoryLabel(category.id)}
                  </h3>
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
