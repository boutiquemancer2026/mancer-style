import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Users, Baby, Shirt } from 'lucide-react';

const Categories: React.FC = () => {
  const { t, dir } = useLanguage();

  const categories = [
    { id: 'men', label: t('men'), icon: Users, color: 'bg-blue-500' },
    { id: 'women', label: t('women'), icon: Shirt, color: 'bg-pink-500' },
    { id: 'children', label: t('children'), icon: Baby, color: 'bg-green-500' },
  ];

  return (
    <Layout>
      <div className="px-4 py-6" dir={dir}>
        <h1 className="text-2xl font-bold mb-6">{t('categories')}</h1>
        
        <div className="grid gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card hover:shadow-app transition-all"
              >
                <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', category.color)}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-lg font-semibold">{category.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
