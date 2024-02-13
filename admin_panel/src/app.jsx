import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'src/global.css';

import DashboardLayout from './layouts/dashboard';
import PrivateRoute from './routes/private_route';
import RootLayout from './layouts/root/root_layout';

export const IndexPage = lazy(() => import('src/pages/app'));
export const TablePage = lazy(() => import('src/pages/table'));
export const ItemListPage = lazy(() => import('src/pages/item_page'));
export const OrderPage = lazy(() => import('src/pages/orders_page'));
export const MenuPage = lazy(() => import('src/pages/menu'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register_page'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const ROLES = {
  ADMIN: 'admin',
};

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<PrivateRoute allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="/itemlist" element={<ItemListPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/order" element={<OrderPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    )
  );

  return (
    <div>
      <ToastContainer
        position="top-right"
        transition={Flip}
        autoClose={1200}
        limit={4}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <RouterProvider router={router} />
    </div>
  );
}
