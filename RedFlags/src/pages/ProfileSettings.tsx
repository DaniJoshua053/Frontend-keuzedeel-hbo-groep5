import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

export function ProfileSettings() {
  const { t } = useLanguage();

  const handlePasswordUpdate = () => {
    toast.success('Wachtwoord succesvol bijgewerkt!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Instellingen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-4">Wachtwoord Wijzigen</h3>
          <div className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Huidig Wachtwoord</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nieuw Wachtwoord</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Bevestig Nieuw Wachtwoord</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button onClick={handlePasswordUpdate}>Wachtwoord Bijwerken</Button>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="mb-2">Account Acties</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Beheer je account voorkeuren
          </p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full sm:w-auto">
              Download Mijn Gegevens
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto ml-0 sm:ml-2">
              Account Verwijderen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
