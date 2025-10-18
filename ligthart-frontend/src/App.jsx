import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import WikiPage from './pages/WikiPage';
import MapPage from './pages/MapPage';
import RpPage from './pages/RpPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import WikiDetailPage from './pages/WikiDetailPage';
import UpdatePage from './pages/UpdatePage';
import UpdateDetailPage from './pages/UpdateDetailPage';
import WikiArticleListPage from './pages/WikiArticleListPage';
import StaffPage from './pages/StaffPage';

import DashboardPage from './pages/admin/DashboardPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductFormPage from './pages/admin/ProductFormPage';
import CategoryListPage from './pages/admin/CategoryListPage';
import CategoryFormPage from './pages/admin/CategoryFormPage';
import UserListPage from './pages/admin/UserListPage';
import WikiListPage from './pages/admin/WikiListPage';
import WikiFormPage from './pages/admin/WikiFormPage';
import ResourcePackListPage from './pages/admin/ResourcePackListPage';
import ResourcePackFormPage from './pages/admin/ResourcePackFormPage';
import ServerInfoPage from './pages/admin/ServerInfoPage';
import WikiCategoryListPage from './pages/admin/WikiCategoryListPage';
import WikiCategoryFormPage from './pages/admin/WikiCategoryFormPage';
import UpdatePostListPage from './pages/admin/UpdatePostListPage';
import UpdatePostFormPage from './pages/admin/UpdatePostFormPage';
import UserEditPage from './pages/admin/UserEditPage';
import StaffListPage from './pages/admin/StaffListPage';
import StaffFormPage from './pages/admin/StaffFormPage';
import StaffCategoryListPage from './pages/admin/StaffCategoryListPage';
import StaffCategoryFormPage from './pages/admin/StaffCategoryFormPage';

const NotFoundPage = () => (
  <div style={{ textAlign: 'center', padding: '100px 15px' }}>
    <h1 className='title__text'>404 - Page Not Found</h1>
    <p>Trang bạn tìm kiếm không tồn tại.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />

          <Route path="wiki" element={<WikiPage />} />
          <Route path="wiki/:id" element={<WikiDetailPage />} />
          <Route path="wiki/category/:categoryId" element={<WikiArticleListPage />} />
          <Route path="wiki/article/:id" element={<WikiDetailPage />} />

          <Route path="updates" element={<UpdatePage />} />
          <Route path="updates/:id" element={<UpdateDetailPage />} />

          <Route path="staff" element={<StaffPage />} />

          <Route path="map" element={<MapPage />} />
          <Route path="rp" element={<RpPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="server-info" element={<ServerInfoPage />} />

          <Route path="products" element={<ProductListPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/edit/:id" element={<ProductFormPage />} />

          <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/edit/:id" element={<CategoryFormPage />} />

          <Route path="users" element={<UserListPage />} />

          <Route path="wiki-categories" element={<WikiCategoryListPage />} />
          <Route path="wiki-categories/new" element={<WikiCategoryFormPage />} />
          <Route path="wiki-categories/edit/:id" element={<WikiCategoryFormPage />} />

          <Route path="wiki" element={<WikiListPage />} />
          <Route path="wiki/new" element={<WikiFormPage />} />
          <Route path="wiki/edit/:id" element={<WikiFormPage />} />

          <Route path="updates" element={<UpdatePostListPage />} />
          <Route path="updates/new" element={<UpdatePostFormPage />} />
          <Route path="updates/edit/:id" element={<UpdatePostFormPage />} />

          <Route path="resource-packs" element={<ResourcePackListPage />} />
          <Route path="resource-packs/new" element={<ResourcePackFormPage />} />
          <Route path="resource-packs/edit/:id" element={<ResourcePackFormPage />} />

          <Route path="staff" element={<StaffListPage />} />
          <Route path="staff/new" element={<StaffFormPage />} />
          <Route path="staff/edit/:id" element={<StaffFormPage />} />

          <Route path="staff-categories" element={<StaffCategoryListPage />} />
          <Route path="staff-categories/new" element={<StaffCategoryFormPage />} />
          <Route path="staff-categories/edit/:id" element={<StaffCategoryFormPage />} />

          <Route path="users" element={<UserListPage />} />
          <Route path="users/edit/:id" element={<UserEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;