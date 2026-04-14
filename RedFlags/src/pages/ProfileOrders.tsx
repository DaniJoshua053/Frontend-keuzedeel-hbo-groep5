import React from 'react';
import { useNavigate } from 'react-router';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockOrders } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export function ProfileOrders() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600';
      case 'shipped':
        return 'bg-blue-600';
      case 'processing':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return t('delivered');
      case 'shipped':
        return t('shipped');
      case 'processing':
        return t('processing');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Je hebt nog geen bestellingen</p>
            <Button onClick={() => navigate('/products')}>
              Start met Winkelen
            </Button>
          </CardContent>
        </Card>
      ) : (
        mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-lg">Bestelling {order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Besteld op: {new Date(order.date).toLocaleDateString('nl-NL')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Aantal: {item.quantity} {item.size && `• Formaat: ${item.size}`}
                      </p>
                    </div>
                    <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-bold">
                  <span>Totaal:</span>
                  <span className="text-primary">€{order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
