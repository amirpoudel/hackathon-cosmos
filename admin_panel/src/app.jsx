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

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const OrderPage = lazy(() => import('src/pages/orders'));
export const MenuPage = lazy(() => import('src/pages/menu'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/login" element={<LoginPage />} />
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
