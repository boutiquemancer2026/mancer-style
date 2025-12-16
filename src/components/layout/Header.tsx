import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, ShieldCheck, LogOut, Lock, Loader2, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
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
import logo from '@/assets/logo.png';

const Header: React.FC = () => {
  const { dir } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50 pt-safe">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="BOUTIQUE MANCER" className="h-10 w-10 object-contain" />
            <span className="text-lg font-bold text-foreground">
              BOUTIQUE <span className="text-primary">MANCER</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleAdminClick}
              className="rounded-full"
            >
              <ShieldCheck className="w-5 h-5" />
            </Button>

            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="rounded-full text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Admin Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-sm mx-4 rounded-3xl" dir={dir}>
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <DialogTitle className="text-xl font-bold">تسجيل دخول الأدمن</DialogTitle>
            <DialogDescription>
              أدخل بيانات الدخول للوصول إلى لوحة الإدارة
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl gradient-primary font-semibold"
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
