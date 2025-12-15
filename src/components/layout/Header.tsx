import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Baby, Settings, ShieldCheck, Menu, LogOut, X, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const { t, dir } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/category/men', label: t('men'), icon: Users },
    { path: '/category/women', label: t('women'), icon: Users },
    { path: '/category/children', label: t('children'), icon: Baby },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      
      toast.success('تم تسجيل الدخول بنجاح');
      setShowLoginDialog(false);
      setEmail('');
      setPassword('');
      
      // Check if user is admin after login
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
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
      {/* Admin Button */}
      <button
        onClick={() => {
          if (mobile) setIsOpen(false);
          handleAdminClick();
        }}
        className={cn(
          'flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium',
          location.pathname === '/admin'
            ? 'bg-gold text-primary-foreground shadow-soft' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
          mobile && 'text-base py-3.5 w-full'
        )}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>{t('admin')}</span>
      </button>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-effect">
        <div className="container flex h-20 items-center justify-between">
          {/* Logo - Text Only */}
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <span className="text-2xl font-display font-bold tracking-tight text-foreground">
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

      {/* Admin Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md border-border/50 rounded-3xl">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center shadow-luxury">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-display">تسجيل دخول الأدمن</DialogTitle>
            <DialogDescription>
              أدخل بيانات الدخول للوصول إلى لوحة الإدارة
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-5 mt-4" dir={dir}>
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-sm font-medium">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-border/50 bg-secondary/50"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-sm font-medium">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-12 rounded-xl border-border/50 bg-secondary/50"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-primary-foreground font-semibold h-12 rounded-xl shadow-luxury transition-all duration-300 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
