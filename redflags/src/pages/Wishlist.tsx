import React from 'react';
import { useNavigate } from 'react-router';
import { Heart, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';

export function Wishlist() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <Heart className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding items you love to your wishlist
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
      <h1 className="mb-8">{t('wishlist')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <Card key={product.id} className="overflow-hidden group">
            <div
              className="relative aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                  toast.success(`${product.name} removed from wishlist`);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3
                className="mb-2 cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.name}
              </h3>
              <p className="text-primary font-semibold">
                €{product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                onClick={() => handleAddToCart(product)}
              >
                {t('addToCart')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
