import React from 'react';
import { useNavigate } from 'react-router';
import { Gauge, Check, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { mockFlagpoles } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';

export function Flagpoles() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const flagpolesByHeight = {
    '5m': mockFlagpoles.filter(fp => fp.height === '5m'),
    '7m': mockFlagpoles.filter(fp => fp.height === '7m'),
    '9m': mockFlagpoles.filter(fp => fp.height === '9m'),
  };

  const features = [
    'Aluminium constructie',
    'Roterende top',
    'Grondanker inclusief',
    'Weerbestendig',
    'Eenvoudige montage',
    '5 jaar garantie',
  ];

  const specifications = [
    {
      height: '5 meter',
      suitable: 'Particulier gebruik',
      flagSize: 'Tot 150x225cm',
      weight: '8 kg',
      diameter: '50 mm',
    },
    {
      height: '7 meter',
      suitable: 'Bedrijven & verenigingen',
      flagSize: 'Tot 200x300cm',
      weight: '12 kg',
      diameter: '60 mm',
    },
    {
      height: '9 meter',
      suitable: 'Overheid & grote bedrijven',
      flagSize: 'Tot 250x375cm',
      weight: '18 kg',
      diameter: '75 mm',
    },
  ];

  const handleAddToCart = (product: typeof mockFlagpoles[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} toegevoegd aan winkelwagen!`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Gauge className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="mb-1">Vlaggenstokken</h1>
              <p className="text-muted-foreground">
                Professionele aluminium vlaggenstokken in 5, 7 en 9 meter
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-4">Kies de Juiste Hoogte</h2>
          <p className="text-muted-foreground">
            Onze vlaggenstokken zijn gemaakt van hoogwaardig aluminium en voorzien van een 
            roterende top. Inclusief grondanker en bevestigingsmateriaal.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h3 className="mb-6 text-center">Specificaties Vergelijking</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4"></th>
                  {specifications.map((spec) => (
                    <th key={spec.height} className="text-center py-4 px-4">
                      <div className="text-lg mb-1">{spec.height}</div>
                      <Badge variant="secondary" className="text-xs">{spec.suitable}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Geschikt voor vlag</td>
                  {specifications.map((spec) => (
                    <td key={spec.height} className="text-center py-4 px-4">{spec.flagSize}</td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Gewicht</td>
                  {specifications.map((spec) => (
                    <td key={spec.height} className="text-center py-4 px-4">{spec.weight}</td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">Diameter</td>
                  {specifications.map((spec) => (
                    <td key={spec.height} className="text-center py-4 px-4">{spec.diameter}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Products by Height */}
        <div className="space-y-16">
          {Object.entries(flagpolesByHeight).map(([height, products]) => (
            <div key={height}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="mb-2">{height.toUpperCase()} Vlaggenstokken</h2>
                  <p className="text-muted-foreground">
                    {specifications.find(s => s.height === `${height} meter`)?.suitable}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden group border-2 hover:border-primary transition-all">
                    <div 
                      className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-muted"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.bestseller && (
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                          Bestseller
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 
                          className="cursor-pointer hover:text-primary transition-colors flex-1"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          {product.name}
                        </h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">{product.material}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-muted-foreground">Inclusief grondanker</span>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-primary">€{product.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">incl. BTW</span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-5 pt-0">
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Toevoegen aan Winkelwagen
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-muted rounded-lg p-8">
          <h3 className="mb-6 text-center">Alle Vlaggenstokken Inclusief</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Flags */}
        <div className="mt-16 bg-gradient-to-br from-primary/5 via-background to-primary/10 rounded-lg p-8 text-center">
          <h3 className="mb-4">Combineer met een Vlag</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Bekijk ons assortiment vlaggen en vind de perfecte match voor jouw vlaggenstok
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/products?type=flag')}
          >
            Bekijk Vlaggen
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
