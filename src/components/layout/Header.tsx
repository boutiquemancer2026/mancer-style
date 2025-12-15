import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Baby, Settings, Shield, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/category/men', label: t('men'), icon: User },
    { path: '/category/women', label: t('women'), icon: User },
    { path: '/category/children', label: t('children'), icon: Baby },
    { path: '/settings', label: t('settings'), icon: Settings },
    { path: '/admin', label: t('admin'), icon: Shield },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || 
          (item.path.startsWith('/category/') && location.pathname === item.path);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsOpen(false)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
              'hover:bg-primary/10 hover:text-primary',
              isActive && 'bg-primary/10 text-primary font-medium',
              mobile && 'text-lg py-3'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="font-body">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-gold shadow-luxury">
            <span className="text-lg font-bold text-background font-display">BM</span>
          </div>
          <span className="hidden sm:block text-xl font-bold font-display text-gold">
            BOUTIQUE MANCER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" dir={dir}>
          <NavLinks />
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-[300px]">
            <div className="flex flex-col gap-4 mt-8" dir={dir}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-full gradient-gold">
                  <span className="text-lg font-bold text-background font-display">BM</span>
                </div>
                <span className="text-xl font-bold font-display text-gold">
                  BOUTIQUE MANCER
                </span>
              </div>
              <nav className="flex flex-col gap-2">
                <NavLinks mobile />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
