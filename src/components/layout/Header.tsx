import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Baby, Settings, ShieldCheck, Menu, LogOut, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/category/men', label: t('men'), icon: Users },
    { path: '/category/women', label: t('women'), icon: Users },
    { path: '/category/children', label: t('children'), icon: Baby },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: t('admin'), icon: ShieldCheck });
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsOpen(false)}
            className={cn(
              'flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium',
              active 
                ? 'bg-gold text-primary-foreground shadow-soft' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
              mobile && 'text-base py-3.5 w-full'
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
          <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center shadow-soft group-hover:shadow-luxury transition-all duration-300">
            <span className="text-lg font-display font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-foreground">
            BOUTIQUE <span className="text-gold">MANCER</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2" dir={dir}>
          <NavLinks />
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="ml-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={dir === 'rtl' ? 'right' : 'left'} className="w-[320px] border-border/50 p-0">
            <div className="flex flex-col h-full" dir={dir}>
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <span className="text-lg font-display font-bold">
                  BOUTIQUE <span className="text-gold">MANCER</span>
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <X className="w-5 h-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* Mobile Nav */}
              <nav className="flex flex-col gap-2 p-4 flex-1">
                <NavLinks mobile />
              </nav>

              {/* Mobile Footer */}
              {user && (
                <div className="p-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
