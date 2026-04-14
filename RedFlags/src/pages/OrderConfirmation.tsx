import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="mb-2">{t('orderConfirmation')}</h1>
        <p className="text-muted-foreground">
          Thank you for your order! Your order has been received.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-semibold">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('orderStatus')}</p>
              <Badge className="bg-blue-600">{t('processing')}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-semibold">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full mr-4 flex-shrink-0">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h4>{t('processing')}</h4>
                <p className="text-sm text-muted-foreground">
                  Your order is being prepared
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full mr-4 flex-shrink-0">
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-muted-foreground">{t('shipped')}</h4>
                <p className="text-sm text-muted-foreground">
                  Your order will be shipped soon
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full mr-4 flex-shrink-0">
                <Home className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-muted-foreground">{t('delivered')}</h4>
                <p className="text-sm text-muted-foreground">
                  Your order will arrive at your doorstep
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-accent p-6 rounded-lg mb-8">
        <h3 className="mb-2">What's Next?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• You will receive a confirmation email shortly</li>
          <li>• Track your order status in your account</li>
          <li>• You'll receive another email when your order ships</li>
          <li>• Contact us if you have any questions</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => navigate('/orders')}>
          View All Orders
        </Button>
        <Button variant="outline" onClick={() => navigate('/products')}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
