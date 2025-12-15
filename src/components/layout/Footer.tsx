import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Phone, MapPin, Instagram, Facebook, Edit2, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Footer: React.FC = () => {
  const { t, dir } = useLanguage();
  const { isAdmin } = useAuth();
  const currentYear = new Date().getFullYear();
  const [copyrightText, setCopyrightText] = useState('BOUTIQUE MANCER');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(copyrightText);

  useEffect(() => {
    const fetchStoreName = async () => {
      const { data } = await supabase
        .from('store_settings')
        .select('store_name')
        .single();
      
      if (data?.store_name) {
        setCopyrightText(data.store_name);
        setEditValue(data.store_name);
      }
    };
    fetchStoreName();
  }, []);

  const handleSave = async () => {
    try {
      const { data: existing } = await supabase
        .from('store_settings')
        .select('id')
        .single();

      if (existing) {
        await supabase
          .from('store_settings')
          .update({ store_name: editValue })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('store_settings')
          .insert({ store_name: editValue });
      }

      setCopyrightText(editValue);
      setIsEditing(false);
      toast.success('تم حفظ التغييرات');
    } catch (error) {
      toast.error('حدث خطأ أثناء الحفظ');
    }
  };

  return (
    <footer className="w-full border-t border-border/50 bg-secondary/30 mt-auto" dir={dir}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-xl font-display font-bold">
              BOUTIQUE <span className="text-gold">MANCER</span>
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              أفضل متجر للأزياء العصرية والأناقة الفاخرة
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">روابط سريعة</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/category/men" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('men')}
              </Link>
              <Link to="/category/women" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('women')}
              </Link>
              <Link to="/category/children" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                {t('children')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">تواصل معنا</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-gold" />
                <span>+213 XXX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-gold" />
                <span>الجزائر</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <div className="flex items-center justify-center gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="max-w-xs h-8 text-sm text-center"
                />
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSave}>
                  <Check className="w-4 h-4 text-green-500" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                © {currentYear} {copyrightText}. {t('copyright')}.
                {isAdmin && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 hover:bg-secondary rounded-md transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
