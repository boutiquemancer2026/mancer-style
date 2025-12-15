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
import { Moon, Sun, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, language, setLanguage, dir } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <Layout>
      <div className="container py-8 max-w-2xl" dir={dir}>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 text-foreground">
          {t('settings')}
        </h1>

        <div className="space-y-6">
          {/* Theme Setting */}
          <Card className="border-border/40 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                {isDark ? <Moon className="w-5 h-5 text-gold" /> : <Sun className="w-5 h-5 text-gold" />}
                {t('darkMode')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-muted-foreground">
                  {isDark ? 'Dark' : 'Light'}
                </Label>
                <Switch
                  id="dark-mode"
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language Setting */}
          <Card className="border-border/40 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Globe className="w-5 h-5 text-gold" />
                {t('language')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <SelectItem key={lang} value={lang}>
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
