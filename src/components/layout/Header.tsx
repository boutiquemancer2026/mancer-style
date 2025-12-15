import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Baby, Settings, Shield, Menu, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/category/men', label: t('men'), icon: User },
    { path: '/category/women', label: t('women'), icon: User },
    { path: '/category/children', label: t('children'), icon: Baby },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  // Only show admin link if user is admin
  if (isAdmin) {
    navItems.push({ path: '/admin', label: t('admin'), icon: Shield });
  }

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
              'flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 text-sm font-medium tracking-wide',
              'hover:bg-primary/5',
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground',
              mobile && 'text-base py-3'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-effect">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
        >
          <span className="text-2xl font-display font-semibold tracking-tight text-foreground group-hover:text-gold transition-colors">
            BOUTIQUE MANCER
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" dir={dir}>
          <NavLinks />
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-[300px] border-border/50">
            <div className="flex flex-col gap-6 mt-8" dir={dir}>
              <span className="text-xl font-display font-semibold tracking-tight text-foreground">
                BOUTIQUE MANCER
              </span>
              <nav className="flex flex-col gap-2">
                <NavLinks mobile />
                {user && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="justify-start gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </Button>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
