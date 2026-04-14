import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { allProducts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = allProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id + '-' + selectedSize,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} verwijderd uit favorieten!`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success(`${product.name} toegevoegd aan favorieten!`);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id && p.inStock)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/products')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.inStock ? (
            <Badge className="absolute top-4 right-4 bg-green-600">
              {t('inStock')}
            </Badge>
          ) : (
            <Badge variant="secondary" className="absolute top-4 right-4">
              {t('outOfStock')}
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-2">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-yellow-400'
                      : 'fill-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} beoordelingen)
            </span>
          </div>

          <div className="text-3xl font-bold text-primary mb-4">
            €{product.price.toFixed(2)}
          </div>
          
          <p className="text-muted-foreground mb-6">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-6">
            <Label className="mb-2 block">{t('size')}</Label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <Label className="mb-2 block">{t('quantity')}</Label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t('addToCart')}
            </Button>
            <Button
              variant={isInWishlist(product.id) ? 'default' : 'outline'}
              size="icon"
              onClick={handleToggleWishlist}
            >
              <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </Button>
          </div>

          {/* Product Details */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3">{t('productDetails')}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Available Sizes:</dt>
                  <dd>{product.sizes.join(', ')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Material:</dt>
                  <dd>Premium Polyester</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Features:</dt>
                  <dd>Weather-resistant, Fade-resistant</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(relatedProduct => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-3">
                  <h4 className="text-sm mb-1">{relatedProduct.name}</h4>
                  <p className="text-primary font-semibold text-sm">
                    €{relatedProduct.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}