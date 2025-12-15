import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage, Language, languageNames } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Moon, Sun, Globe, Palette, Sparkles } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="container py-12 max-w-2xl" dir={dir}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">تخصيص التطبيق</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            {t('settings')}
          </h1>
          <p className="text-muted-foreground">قم بتخصيص تجربتك في المتجر</p>
        </div>

        <div className="space-y-6">
          {/* Theme Setting */}
          <Card className="border-border/50 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  {isDark ? <Moon className="w-5 h-5 text-gold" /> : <Sun className="w-5 h-5 text-gold" />}
                </div>
                <div>
                  <span className="block">{t('darkMode')}</span>
                  <span className="text-sm font-normal text-muted-foreground">تغيير مظهر التطبيق</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                  <Label htmlFor="dark-mode" className="font-medium">
                    {isDark ? 'الوضع الداكن مفعل' : 'الوضع الفاتح مفعل'}
                  </Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-gold"
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Setting */}
          <Card className="border-border/50 shadow-soft rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="block">{t('language')}</span>
                  <span className="text-sm font-normal text-muted-foreground">اختر لغة التطبيق</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-full h-12 rounded-xl border-border/50 bg-secondary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <SelectItem key={lang} value={lang} className="rounded-lg">
                      {languageNames[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
