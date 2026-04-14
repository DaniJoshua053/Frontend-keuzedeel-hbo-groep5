import React from 'react';
import { useNavigate } from 'react-router';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl md:text-3xl mt-4 mb-2">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/')} size="lg">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/products')} size="lg">
            <Search className="h-4 w-4 mr-2" />
            Browse Products
          </Button>
        </div>
      </div>
    </div>
  );
}
