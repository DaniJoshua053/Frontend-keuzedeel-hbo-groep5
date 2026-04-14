import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Edit, Trash2, Package, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts, mockOrders, carouselImages } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export function Admin() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [carousel, setCarousel] = useState(carouselImages);

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page
        </p>
        <Button onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </div>
    );
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'processing' | 'shipped' | 'delivered') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success('Order status updated');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-600">{t('processing')}</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-600">{t('shipped')}</Badge>;
      case 'delivered':
        return <Badge className="bg-green-600">{t('delivered')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1>{t('admin')} Dashboard</h1>
        <Badge variant="secondary">Admin Mode</Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {products.filter(p => p.inStock).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Carousel Slides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{carousel.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="carousel">
            <ImageIcon className="h-4 w-4 mr-2" />
            Carousel
          </TabsTrigger>
        </TabsList>

        {/* Products Management */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{t('manageProducts')}</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input placeholder="e.g. Italian Flag" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price (€)</Label>
                          <Input type="number" placeholder="24.99" />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="european">European</SelectItem>
                              <SelectItem value="american">American</SelectItem>
                              <SelectItem value="asian">Asian</SelectItem>
                              <SelectItem value="african">African</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Product description..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Available Sizes (comma-separated)</Label>
                        <Input placeholder="60x90cm, 90x150cm, 120x180cm" />
                      </div>
                      <Button className="w-full">Add Product</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>€{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          {product.inStock ? (
                            <Badge className="bg-green-600">{t('inStock')}</Badge>
                          ) : (
                            <Badge variant="secondary">{t('outOfStock')}</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Management */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>{t('manageOrders')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>Order {order.id}</h4>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                          <div className="text-sm">
                            <p>Customer: {order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                            <p>Items: {order.items.length}</p>
                            <p className="font-semibold">Total: €{order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm">Update Status</Label>
                          <Select
                            value={order.status}
                            onValueChange={(value: 'processing' | 'shipped' | 'delivered') =>
                              handleUpdateOrderStatus(order.id, value)
                            }
                          >
                            <SelectTrigger className="w-full md:w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="processing">{t('processing')}</SelectItem>
                              <SelectItem value="shipped">{t('shipped')}</SelectItem>
                              <SelectItem value="delivered">{t('delivered')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carousel Management */}
        <TabsContent value="carousel">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Carousel</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Slide
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Carousel Slide</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input placeholder="Slide title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input placeholder="Slide subtitle" />
                      </div>
                      <Button className="w-full">Add Slide</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carousel.map((slide) => (
                  <Card key={slide.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={slide.url}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="mb-1">{slide.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {slide.subtitle}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
