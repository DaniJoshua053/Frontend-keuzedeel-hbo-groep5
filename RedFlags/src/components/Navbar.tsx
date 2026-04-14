import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, ShoppingCart, Heart, User, Globe, ChevronDown, Flag, Sparkles, Gauge } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'nl' as const, name: 'Nederlands', flag: '🇳🇱' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru' as const, name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const productCategories = [
    {
      title: 'Vlaggen',
      description: 'Standaard landenvlaggen',
      icon: Flag,
      path: '/products?type=flag',
    },
    {
      title: 'Wimpels',
      description: 'Decoratieve wimpels & slingers',
      icon: Sparkles,
      path: '/products?type=pennant',
    },
    {
      title: 'Vlaggenstokken',
      description: '5m | 7m | 9m stokken',
      icon: Gauge,
      path: '/flagpoles',
    },
    {
      title: 'Custom Ontwerpen',
      description: 'Ontwerp je eigen vlag',
      icon: Sparkles,
      path: '/custom-designer',
      highlight: true,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded">
              <span className="font-bold text-lg">RedFlags</span>
            </div>
          </Link>

          {/* Desktop Navigation with Mega Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home Link */}
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Products Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Producten</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {productCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            className={`group block rounded-lg p-4 hover:bg-accent transition-colors ${
                              category.highlight ? 'bg-primary/5 border-2 border-primary/20' : 'border border-border'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                category.highlight ? 'bg-primary/10' : 'bg-muted'
                              }`}>
                                <category.icon className={`h-5 w-5 ${
                                  category.highlight ? 'text-primary' : 'text-muted-foreground'
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm group-hover:text-primary transition-colors">
                                    {category.title}
                                  </h4>
                                  {category.highlight && (
                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                                      Populair
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <Link
                          to="/products"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          Bekijk alle producten
                          <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Links */}
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map(lang => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/wishlist')}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* User Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    {t('profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    {t('myOrders')}
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        {t('admin')}
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/login')}
                className="hidden sm:inline-flex"
              >
                {t('login')}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] overflow-y-auto">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Home Link */}
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg hover:text-primary transition-colors"
                  >
                    Home
                  </Link>

                  {/* Product Categories */}
                  <div>
                    <h3 className="mb-3 text-sm text-muted-foreground">Producten</h3>
                    <div className="space-y-2">
                      {productCategories.map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors ${
                            category.highlight ? 'bg-primary/5' : ''
                          }`}
                        >
                          <category.icon className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-sm">{category.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {category.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Other Links */}
                  <div className="border-t border-border pt-4">
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg hover:text-primary transition-colors block"
                    >
                      Contact
                    </Link>
                  </div>

                  {!isAuthenticated && (
                    <div className="border-t border-border pt-4">
                      <Button
                        className="w-full mb-2"
                        onClick={() => {
                          navigate('/login');
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t('login')}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          navigate('/register');
                          setMobileMenuOpen(false);
                        }}
                      >
                        {t('register')}
                      </Button>
                    </div>
                  )}

                  {/* Language Selector */}
                  <div className="border-t border-border pt-4">
                    <div className="mb-2 text-sm text-muted-foreground">
                      {currentLanguage?.flag} {currentLanguage?.name}
                    </div>
                    <div className="space-y-1">
                      {languages.map(lang => (
                        <Button
                          key={lang.code}
                          variant={language === lang.code ? 'secondary' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => {
                            setLanguage(lang.code);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
