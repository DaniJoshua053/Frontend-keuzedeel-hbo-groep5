import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

export function ProfileData() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Netherlands',
  });

  const handleSave = () => {
    toast.success('Gegevens succesvol bijgewerkt!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Persoonlijke Gegevens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('firstName')}</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('lastName')}</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">{t('address')}</Label>
          <Input
            id="address"
            value={profileData.address}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">{t('city')}</Label>
            <Input
              id="city"
              value={profileData.city}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">{t('postalCode')}</Label>
            <Input
              id="postalCode"
              value={profileData.postalCode}
              onChange={(e) =>
                setProfileData({ ...profileData, postalCode: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">{t('country')}</Label>
          <Input
            id="country"
            value={profileData.country}
            onChange={(e) =>
              setProfileData({ ...profileData, country: e.target.value })
            }
          />
        </div>
        <Button onClick={handleSave}>{t('save')}</Button>
      </CardContent>
    </Card>
  );
}
