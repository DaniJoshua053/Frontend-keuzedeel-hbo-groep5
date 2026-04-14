import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

export function CustomDesigner() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [designFile, setDesignFile] = useState<File | null>(null);
  
  const [config, setConfig] = useState({
    size: '90x150cm',
    material: 'polyester',
    finish: 'standard',
    quantity: 1,
  });

  const steps = [
    { id: 0, title: 'Formaat kiezen', description: 'Selecteer het gewenste formaat' },
    { id: 1, title: 'Ontwerp uploaden', description: 'Upload je logo of ontwerp' },
    { id: 2, title: 'Materiaal kiezen', description: 'Kies het materiaal' },
    { id: 3, title: 'Afwerking', description: 'Selecteer de afwerking' },
    { id: 4, title: 'Samenvatting', description: 'Controleer en bestel' },
  ];

  const sizes = [
    { value: '60x90cm', label: '60 x 90 cm', price: 34.99, popular: false },
    { value: '90x150cm', label: '90 x 150 cm', price: 49.99, popular: true },
    { value: '120x180cm', label: '120 x 180 cm', price: 69.99, popular: false },
    { value: '150x225cm', label: '150 x 225 cm', price: 89.99, popular: false },
  ];

  const materials = [
    { 
      value: 'polyester', 
      label: 'Polyester', 
      price: 0, 
      description: 'Standaard, weerbestendig',
      popular: true,
    },
    { 
      value: 'premium-polyester', 
      label: 'Premium Polyester', 
      price: 15, 
      description: 'Extra stevig en UV-bestendig',
      popular: false,
    },
    { 
      value: 'flag-fabric', 
      label: 'Vlaggendoek', 
      price: 25, 
      description: 'Professioneel vlaggendoek',
      popular: false,
    },
  ];

  const finishes = [
    { 
      value: 'standard', 
      label: 'Standaard', 
      price: 0, 
      description: 'Geniet met lussen',
    },
    { 
      value: 'reinforced', 
      label: 'Versterkte randen', 
      price: 10, 
      description: 'Extra duurzaam',
    },
    { 
      value: 'deluxe', 
      label: 'Deluxe', 
      price: 20, 
      description: 'Versterkt met metalen oogjes',
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDesignFile(file);
      toast.success('Bestand succesvol geüpload!');
    }
  };

  const calculatePrice = () => {
    const sizePrice = sizes.find(s => s.value === config.size)?.price || 0;
    const materialPrice = materials.find(m => m.value === config.material)?.price || 0;
    const finishPrice = finishes.find(f => f.value === config.finish)?.price || 0;
    return (sizePrice + materialPrice + finishPrice) * config.quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: `Custom Vlag - ${config.size}`,
      price: calculatePrice(),
      image: 'https://images.unsplash.com/photo-1765366417033-5d74f04ca77a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcwNzIxOTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      quantity: config.quantity,
    });
    toast.success('Custom vlag toegevoegd aan winkelwagen!');
    navigate('/cart');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1 && !designFile) return false;
    return true;
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="mb-1">Ontwerp Je Eigen Vlag</h1>
              <p className="text-muted-foreground">
                Maak een unieke vlag met jouw logo of ontwerp
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Stap {currentStep + 1} van {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% voltooid
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="hidden md:flex items-center justify-between mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                  index === currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : index < currentStep 
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <p className="text-xs text-center">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep].title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </CardHeader>
              <CardContent>
                {/* Step 0: Size */}
                {currentStep === 0 && (
                  <RadioGroup 
                    value={config.size} 
                    onValueChange={(value) => setConfig({ ...config, size: value })}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sizes.map((size) => (
                        <div key={size.value} className="relative">
                          <RadioGroupItem 
                            value={size.value} 
                            id={size.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={size.value}
                            className="flex flex-col p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span>{size.label}</span>
                              {size.popular && (
                                <Badge variant="secondary" className="text-xs">Populair</Badge>
                              )}
                            </div>
                            <span className="text-lg text-primary">€{size.price.toFixed(2)}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Step 1: Upload Design */}
                {currentStep === 1 && (
                  <div>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        id="design-upload"
                        className="hidden"
                        accept="image/*,.pdf,.ai,.eps"
                        onChange={handleFileUpload}
                      />
                      <Label htmlFor="design-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="mb-2">Upload je ontwerp</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Sleep een bestand hierheen of klik om te bladeren
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ondersteunde formaten: JPG, PNG, PDF, AI, EPS (max 10MB)
                          </p>
                        </div>
                      </Label>
                    </div>
                    
                    {designFile && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm">Bestand geüpload</p>
                            <p className="text-xs text-muted-foreground">{designFile.name}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-sm mb-2 text-blue-900">Design Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Gebruik een hoge resolutie (minimaal 300 DPI)</li>
                        <li>• Zorg voor voldoende contrast</li>
                        <li>• Vector formaten (AI, EPS) geven het beste resultaat</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 2: Material */}
                {currentStep === 2 && (
                  <RadioGroup 
                    value={config.material} 
                    onValueChange={(value) => setConfig({ ...config, material: value })}
                  >
                    <div className="space-y-4">
                      {materials.map((material) => (
                        <div key={material.value} className="relative">
                          <RadioGroupItem 
                            value={material.value} 
                            id={material.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={material.value}
                            className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span>{material.label}</span>
                                {material.popular && (
                                  <Badge variant="secondary" className="text-xs">Populair</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{material.description}</p>
                            </div>
                            <span className="text-lg text-primary">
                              {material.price > 0 ? `+€${material.price.toFixed(2)}` : 'Gratis'}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Step 3: Finish */}
                {currentStep === 3 && (
                  <RadioGroup 
                    value={config.finish} 
                    onValueChange={(value) => setConfig({ ...config, finish: value })}
                  >
                    <div className="space-y-4">
                      {finishes.map((finish) => (
                        <div key={finish.value} className="relative">
                          <RadioGroupItem 
                            value={finish.value} 
                            id={finish.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={finish.value}
                            className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-accent transition-colors"
                          >
                            <div>
                              <span className="block mb-1">{finish.label}</span>
                              <p className="text-sm text-muted-foreground">{finish.description}</p>
                            </div>
                            <span className="text-lg text-primary">
                              {finish.price > 0 ? `+€${finish.price.toFixed(2)}` : 'Gratis'}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Step 4: Summary */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4">Je Configuratie</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Formaat:</span>
                          <span>{sizes.find(s => s.value === config.size)?.label}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Materiaal:</span>
                          <span>{materials.find(m => m.value === config.material)?.label}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Afwerking:</span>
                          <span>{finishes.find(f => f.value === config.finish)?.label}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Ontwerp:</span>
                          <span>{designFile ? designFile.name : 'Niet geüpload'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        Levertijd: 7-10 werkdagen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Je ontvangt binnen 24 uur een digitale proof ter goedkeuring
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Vorige
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button
                      onClick={nextStep}
                      disabled={!canProceed()}
                    >
                      Volgende
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAddToCart}
                      disabled={!designFile}
                    >
                      Toevoegen aan Winkelwagen
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Preview & Price */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Samenvatting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="aspect-[3/2] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
                    {designFile ? (
                      <div className="text-center p-4">
                        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <p className="text-sm">Ontwerp geüpload</p>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Je ontwerp preview</p>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Basisprijs:</span>
                      <span>€{sizes.find(s => s.value === config.size)?.price.toFixed(2)}</span>
                    </div>
                    {materials.find(m => m.value === config.material)?.price! > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Materiaal:</span>
                        <span>+€{materials.find(m => m.value === config.material)?.price.toFixed(2)}</span>
                      </div>
                    )}
                    {finishes.find(f => f.value === config.finish)?.price! > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Afwerking:</span>
                        <span>+€{finishes.find(f => f.value === config.finish)?.price.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span>Totaalprijs:</span>
                        <span className="text-2xl text-primary">€{calculatePrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p>Gratis verzending vanaf €50</p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p>100% tevredenheidsgarantie</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
