import React from 'react';
import { useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

export function Cart() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const vatRate = 0.21; // 21% BTW
  const vat = total * vatRate;
  const shipping = total > 50 ? 0 : 5.99;
  const finalTotal = total + vat + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to add items to your cart
          </p>
          <Button onClick={() => navigate('/products')}>
            {t('shopNow')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="mb-8">{t('cart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{item.name}</h3>
                        {item.size && (
                          <p className="text-sm text-muted-foreground">
                            {t('size')}: {item.size}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-primary font-semibold">
                        €{item.price.toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
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
              {total < 50 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over €50
                </p>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>{t('total')}</span>
                <span className="text-primary">€{finalTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                {t('checkout')}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
