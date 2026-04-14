import React from 'react';
import { useNavigate } from 'react-router';
import { Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function Orders() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Please log in to view your orders</h2>
        <Button onClick={() => navigate('/login')}>
          {t('login')}
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-600">{t('processing')}</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-600">{t('shipped')}</Badge>;
      case 'delivered':
        return <Badge className="bg-green-600">{t('delivered')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8">{t('myOrders')}</h1>

      {mockOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to place your first order
          </p>
          <Button onClick={() => navigate('/products')}>
            {t('shopNow')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.productName} {item.size && `(${item.size})`} x {item.quantity}
                        </span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>{t('total')}</span>
                    <span className="text-primary">€{order.total.toFixed(2)}</span>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t pt-2">
                    <p className="text-sm font-medium mb-1">Shipping Address:</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      <br />
                      {order.shippingAddress.address}
                      <br />
                      {order.shippingAddress.postalCode} {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.country}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/order-confirmation/${order.id}`)}
                    >
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Order Again
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
