import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Grid3X3, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/search', label: t('search'), icon: Search },
    { path: '/categories', label: t('categories'), icon: Grid3X3 },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'bottom-nav-item flex-1',
                isActive && 'active'
              )}
            >
              <Icon className={cn(
                'w-6 h-6 transition-colors',
                isActive && 'text-primary'
              )} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
