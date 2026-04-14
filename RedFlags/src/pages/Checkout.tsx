import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner@2.0.3';

export function Checkout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<'cart' | 'details' | 'payment'>('cart');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('ideal');
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Netherlands',
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Netherlands',
  });

  const vatRate = 0.21;
  const vat = total * vatRate;
  const shipping = total > 50 ? 0 : 5.99;
  const finalTotal = total + vat + shipping;

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Please log in to continue</h2>
        <Button onClick={() => navigate('/login')}>
          {t('login')}
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/products')}>
          {t('shopNow')}
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    // Mock order placement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderId = 'ORD-' + Date.now();
    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/order-confirmation/${orderId}`);
  };

  const canProceedToPayment = 
    shippingAddress.firstName &&
    shippingAddress.lastName &&
    shippingAddress.email &&
    shippingAddress.phone &&
    shippingAddress.address &&
    shippingAddress.city &&
    shippingAddress.postalCode;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8">{t('checkout')}</h1>

      {/* Progress Tabs */}
      <Tabs value={currentStep} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cart" onClick={() => setCurrentStep('cart')}>
            1. {t('cart')}
          </TabsTrigger>
          <TabsTrigger value="details" onClick={() => setCurrentStep('details')}>
            2. Details
          </TabsTrigger>
          <TabsTrigger value="payment" disabled={!canProceedToPayment}>
            3. {t('payment')}
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Cart Review */}
            <TabsContent value="cart">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4>{item.name}</h4>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            {t('size')}: {item.size}
                          </p>
                        )}
                        <p className="text-sm">
                          {t('quantity')}: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => setCurrentStep('details')}
                    >
                      Continue to Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Shipping & Billing Details */}
            <TabsContent value="details">
              <div className="space-y-6">
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('shippingAddress')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t('firstName')}</Label>
                        <Input
                          id="firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t('lastName')}</Label>
                        <Input
                          id="lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('phone')}</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">{t('address')}</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">{t('city')}</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">{t('postalCode')}</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('billingAddress')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsBilling}
                        onCheckedChange={(checked) => setSameAsBilling(!!checked)}
                      />
                      <Label htmlFor="sameAsBilling">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsBilling && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingFirstName">{t('firstName')}</Label>
                            <Input
                              id="billingFirstName"
                              value={billingAddress.firstName}
                              onChange={(e) =>
                                setBillingAddress({ ...billingAddress, firstName: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingLastName">{t('lastName')}</Label>
                            <Input
                              id="billingLastName"
                              value={billingAddress.lastName}
                              onChange={(e) =>
                                setBillingAddress({ ...billingAddress, lastName: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">{t('address')}</Label>
                          <Input
                            id="billingAddress"
                            value={billingAddress.address}
                            onChange={(e) =>
                              setBillingAddress({ ...billingAddress, address: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">{t('city')}</Label>
                            <Input
                              id="billingCity"
                              value={billingAddress.city}
                              onChange={(e) =>
                                setBillingAddress({ ...billingAddress, city: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingPostalCode">{t('postalCode')}</Label>
                            <Input
                              id="billingPostalCode"
                              value={billingAddress.postalCode}
                              onChange={(e) =>
                                setBillingAddress({ ...billingAddress, postalCode: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('cart')}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setCurrentStep('payment')}
                    disabled={!canProceedToPayment}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Payment */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>{t('payment')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="ideal" id="ideal" />
                      <Label htmlFor="ideal" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <Smartphone className="h-5 w-5 mr-2" />
                          iDEAL
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Credit Card
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center">
                          <span className="h-5 w-5 mr-2">💳</span>
                          PayPal
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                    This is a demo checkout. No actual payment will be processed.
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('details')}
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handlePlaceOrder}
                    >
                      {t('placeOrder')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{t('subtotal')}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('vat')} (21%)</span>
                  <span>€{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('shipping')}</span>
                  <span>{shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t('total')}</span>
                  <span className="text-primary">€{finalTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
