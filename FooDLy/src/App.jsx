import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Shared/Navbar';
import Footer from './Components/Shared/Footer';
import HomePage from './Pages/User/HomePage';
import LoginPage from './Pages/User/LoginPage';
import RegisterPage from './Pages/User/RegisterPage';
import MenuPage from './Pages/User/MenuPage';
import CartPage from './Pages/User/CartPage';
import CheckoutPage from './Pages/User/CheckoutPage';
import OrderHistoryPage from './Pages/User/OrderHistoryPage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminDashboardPage from './Pages/Admin/AdminDashboardPage';
import ManageFoodsPage from './Pages/Admin/ManageFoodsPage';
import ManageOrdersPage from './Pages/Admin/ManageOrdersPage';
import ProfilePage from './Pages/User/ProfilePage';

import { AuthProvider, useAuth } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { ToastProvider } from './Context/ToastContext';
import { FavoriteProvider } from './Context/FavoriteContext';

function AdminRoute({ children }) {
  const { isAdminLoggedIn } = useAuth();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavoriteProvider>
          <CartProvider>
            <div className="app-wrapper">
          <Navbar />
          <main className="main-content container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/foods"
                element={
                  <AdminRoute>
                    <ManageFoodsPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <ManageOrdersPage />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
          </CartProvider>
        </FavoriteProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;