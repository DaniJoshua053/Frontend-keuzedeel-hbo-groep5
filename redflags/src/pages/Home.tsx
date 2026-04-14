import React from 'react';
import { useNavigate } from 'react-router';
import { Flag, Gauge, Sparkles, Truck, Award, Shield, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    {
      id: 'flags',
      title: 'Vlaggen',
      description: 'Standaard vlaggen in alle formaten',
      image: 'https://images.unsplash.com/photo-1648413528603-7aea2072e324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFncyUyMHdhdmluZyUyMHNreXxlbnwxfHx8fDE3NzA3MjE5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/products?type=flag',
      icon: Flag,
    },
    {
      id: 'pennants',
      title: 'Wimpels',
      description: 'Decoratieve wimpels en slingers',
      image: 'https://images.unsplash.com/photo-1602364557658-4d99d38b75d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBlbm5hbnQlMjBiYW5uZXJ8ZW58MXx8fHwxNzcwNzIxOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/products?type=pennant',
      icon: Sparkles,
    },
    {
      id: 'flagpoles',
      title: 'Vlaggenstokken',
      description: '5m | 7m | 9m stokken',
      image: 'https://images.unsplash.com/photo-1767238534238-b3a01e9ff4a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFncG9sZSUyMHBvbGUlMjBvdXRkb29yfGVufDF8fHx8MTc3MDcyMTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/flagpoles',
      icon: Gauge,
    },
    {
      id: 'custom',
      title: 'Custom Ontwerpen',
      description: 'Ontwerp je eigen vlag',
      image: 'https://images.unsplash.com/photo-1765366417033-5d74f04ca77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNzIxOTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      path: '/custom-designer',
      icon: Sparkles,
      badge: 'Populair',
    },
  ];

  const usps = [
    {
      icon: Truck,
      title: 'Snelle Levering',
      description: 'Gratis verzending vanaf €50',
    },
    {
      icon: Award,
      title: 'Topkwaliteit',
      description: 'Premium materialen',
    },
    {
      icon: Shield,
      title: 'Custom Productie',
      description: 'Op maat gemaakt',
    },
    {
      icon: Star,
      title: '4.8 / 5 Sterren',
      description: '2.500+ tevreden klanten',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-from)_0%,_transparent_50%)]" style={{ '--tw-gradient-from': '#DC2626' } as any} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 text-sm px-4 py-2">Standaard & Custom Made</Badge>
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl">
              Vlaggen, Wimpels<br />& Vlaggenstokken
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Van standaard landenvlaggen tot op maat gemaakte designs. 
              Topkwaliteit voor particulier en zakelijk gebruik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/products')}
              >
                Bekijk Collectie
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/custom-designer')}
              >
                Ontwerp Je Eigen Vlag
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* USP Bar */}
      <div className="bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {usps.map((usp, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <usp.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm mb-1">{usp.title}</h3>
                <p className="text-xs text-muted-foreground">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Shop per Categorie</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kies uit ons uitgebreide assortiment vlaggen, wimpels en vlaggenstokken. 
            Of ontwerp je eigen unieke vlag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group overflow-hidden cursor-pointer border-2 hover:border-primary transition-all duration-300"
              onClick={() => navigate(category.path)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {category.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {category.badge}
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="h-6 w-6" />
                    <h3 className="text-2xl">{category.title}</h3>
                  </div>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <Button 
                    variant="secondary" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Bekijk Collectie
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Waarom Voor Ons Kiezen?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Al meer dan 15 jaar dé specialist in vlaggen en vlaggenstokken
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3">Premium Kwaliteit</h3>
                <p className="text-muted-foreground">
                  Alleen de beste materialen zoals UV-bestendig polyester en hoogwaardige prints. 
                  Jarenlang kleurvastheid gegarandeerd.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3">Maatwerk Mogelijk</h3>
                <p className="text-muted-foreground">
                  Upload je eigen ontwerp of logo en wij produceren een unieke vlag of wimpel 
                  voor jouw bedrijf of evenement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3">Snelle Levering</h3>
                <p className="text-muted-foreground">
                  Standaard producten binnen 2-3 werkdagen geleverd. Custom producties binnen 7-10 werkdagen. 
                  Gratis verzending vanaf €50.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trustpilot Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Wat Onze Klanten Zeggen</h2>
          <div className="flex items-center justify-center mb-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-7 h-7 fill-green-600 text-green-600" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">
            4.8 uit 5 gebaseerd op 2,547 beoordelingen op Trustpilot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-green-600 text-green-600" />
                ))}
              </div>
              <h4 className="mb-3">Uitstekende kwaliteit!</h4>
              <p className="text-muted-foreground mb-4">
                De Nederlandse vlag die ik besteld heb is van zeer goede kwaliteit. 
                De kleuren zijn levendig en het materiaal voelt stevig aan. Heel tevreden!
              </p>
              <p className="text-sm text-muted-foreground">- Jan P., Amsterdam</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-green-600 text-green-600" />
                ))}
              </div>
              <h4 className="mb-3">Snelle custom service</h4>
              <p className="text-muted-foreground mb-4">
                Onze bedrijfsvlag was binnen een week klaar en ziet er fantastisch uit. 
                Precies zoals we verwacht hadden. Top service!
              </p>
              <p className="text-sm text-muted-foreground">- Maria S., Rotterdam</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-green-600 text-green-600" />
                ))}
              </div>
              <h4 className="mb-3">Aanrader voor evenementen!</h4>
              <p className="text-muted-foreground mb-4">
                Wimpels voor ons bedrijfsfeest besteld en ze waren perfect. 
                Prachtige kleuren en goede prijs-kwaliteit verhouding.
              </p>
              <p className="text-sm text-muted-foreground">- Peter V., Utrecht</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_white_0%,_transparent_50%)]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="mb-4 text-white">Klaar om te Beginnen?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Ontdek ons volledige assortiment of ontwerp vandaag nog je eigen unieke vlag
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/products')}
            >
              Bekijk Alle Producten
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent hover:bg-white/10 text-white border-white"
              onClick={() => navigate('/contact')}
            >
              Neem Contact Op
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
