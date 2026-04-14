import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { allProducts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';

type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'name';

export function Products() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize filters from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam) {
      setSelectedTypes([typeParam]);
    }
  }, [searchParams]);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    return {
      types: Array.from(new Set(allProducts.map(p => p.type).filter(Boolean))),
      categories: Array.from(new Set(allProducts.map(p => p.category))),
      materials: Array.from(new Set(allProducts.map(p => p.material).filter(Boolean))),
    };
  }, []);

  const typeLabels: Record<string, string> = {
    flag: 'Vlaggen',
    pennant: 'Wimpels',
    flagpole: 'Vlaggenstokken',
    custom: 'Custom',
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(p => p.type && selectedTypes.includes(p.type));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => p.material && selectedMaterials.includes(p.material));
    }

    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedTypes, selectedCategories, selectedMaterials, showInStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFilter = (
    type: 'types' | 'categories' | 'materials',
    value: string
  ) => {
    const setters = {
      types: setSelectedTypes,
      categories: setSelectedCategories,
      materials: setSelectedMaterials,
    };
    const setter = setters[type];
    const current = {
      types: selectedTypes,
      categories: selectedCategories,
      materials: selectedMaterials,
    }[type];

    setter(
      current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
    );
    setCurrentPage(1);
  };

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} toegevoegd aan winkelwagen!`);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Stock Filter */}
      <div>
        <h4 className="mb-3">Voorraad</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => {
              setShowInStockOnly(!!checked);
              setCurrentPage(1);
            }}
          />
          <Label htmlFor="inStock">Alleen op voorraad</Label>
        </div>
      </div>

      {/* Type Filter */}
      {filterOptions.types.length > 0 && (
        <div>
          <h4 className="mb-3">Product Type</h4>
          <div className="space-y-2">
            {filterOptions.types.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleFilter('types', type)}
                />
                <Label htmlFor={`type-${type}`}>
                  {typeLabels[type] || type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      {filterOptions.categories.length > 0 && (
        <div>
          <h4 className="mb-3">Categorie</h4>
          <div className="space-y-2">
            {filterOptions.categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleFilter('categories', category)}
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Material Filter */}
      {filterOptions.materials.length > 0 && (
        <div>
          <h4 className="mb-3">Materiaal</h4>
          <div className="space-y-2">
            {filterOptions.materials.map(material => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => toggleFilter('materials', material)}
                />
                <Label htmlFor={`material-${material}`}>
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">
          {selectedTypes.length === 1 
            ? typeLabels[selectedTypes[0]] || 'Alle Producten'
            : 'Alle Producten'
          }
        </h1>
        <p className="text-muted-foreground">
          Ontdek ons volledige assortiment van {filteredProducts.length} producten
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Zoek producten..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sorteer op" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Populariteit</SelectItem>
            <SelectItem value="price-asc">Prijs (Laag naar Hoog)</SelectItem>
            <SelectItem value="price-desc">Prijs (Hoog naar Laag)</SelectItem>
            <SelectItem value="name">Naam (A-Z)</SelectItem>
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="sm:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden sm:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <Card className="p-4">
              <FilterContent />
            </Card>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Geen producten gevonden</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTypes([]);
                  setSelectedCategories([]);
                  setSelectedMaterials([]);
                  setShowInStockOnly(false);
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map((product) => (
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
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        {product.bestseller && (
                          <Badge className="bg-primary text-primary-foreground">
                            Bestseller
                          </Badge>
                        )}
                        {product.inStock ? (
                          <Badge className="bg-green-600">
                            Op voorraad
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            Niet op voorraad
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3
                        className="mb-2 cursor-pointer hover:text-primary transition-colors line-clamp-1"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      
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
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-primary">€{product.price.toFixed(2)}</span>
                        {product.type && (
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[product.type] || product.type}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        Toevoegen aan Winkelwagen
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          addToWishlist({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                          toast.success(`${product.name} toegevoegd aan favorieten!`);
                        }}
                      >
                        ♥ Toevoegen aan Favorieten
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Vorige
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Pagina {currentPage} van {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Volgende
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
