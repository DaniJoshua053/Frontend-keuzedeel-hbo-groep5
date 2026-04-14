import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Profile } from './pages/Profile';
import { Orders } from './pages/Orders';
import { Wishlist } from './pages/Wishlist';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Terms } from './pages/Terms';
import { Returns } from './pages/Returns';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
import { CustomDesigner } from './pages/CustomDesigner';
import { Flagpoles } from './pages/Flagpoles';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'products', Component: Products },
      { path: 'products/:id', Component: ProductDetail },
      { path: 'custom-designer', Component: CustomDesigner },
      { path: 'flagpoles', Component: Flagpoles },
      { path: 'cart', Component: Cart },
      { path: 'checkout', Component: Checkout },
      { path: 'order-confirmation/:orderId', Component: OrderConfirmation },
      { path: 'profile', Component: Profile },
      { path: 'orders', Component: Orders },
      { path: 'wishlist', Component: Wishlist },
      { path: 'contact', Component: Contact },
      { path: 'faq', Component: FAQ },
      { path: 'terms', Component: Terms },
      { path: 'returns', Component: Returns },
      { path: 'admin', Component: Admin },
      { path: '*', Component: NotFound },
    ],
  },
]);