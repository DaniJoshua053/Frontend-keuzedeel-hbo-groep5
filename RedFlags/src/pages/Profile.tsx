import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { User, Package, Settings as SettingsIcon, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProfileData } from './ProfileData';
import { ProfileOrders } from './ProfileOrders';
import { ProfileSettings } from './ProfileSettings';

export function Profile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Determine active tab from URL or default to 'data'
  const getActiveTab = () => {
    if (location.pathname.includes('/orders')) return 'orders';
    if (location.pathname.includes('/settings')) return 'settings';
    return 'data';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Log in om je profiel te bekijken</h2>
        <Button onClick={() => navigate('/login')}>
          {t('login')}
        </Button>
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8">{t('myAccount')}</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Gegevens</span>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('myOrders')}</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('settings')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data">
          <ProfileData />
        </TabsContent>

        <TabsContent value="orders">
          <ProfileOrders />
        </TabsContent>

        <TabsContent value="settings">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}