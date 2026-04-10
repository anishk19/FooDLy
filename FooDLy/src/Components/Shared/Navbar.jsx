import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useCart } from '../../Context/CartContext';

function Navbar() {
  const { user, isAdminLoggedIn, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <NavLink to="/" className="logo">
          Foodly
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Cart {cartItemCount > 0 && `(${cartItemCount})`}</NavLink>
          {user && <NavLink to="/profile" style={{color: 'var(--primary)', fontWeight: 'bold'}}>{user.name}</NavLink>}
          {user && <NavLink to="/orders">Orders</NavLink>}
          {!user && !isAdminLoggedIn && <NavLink to="/login">Login</NavLink>}
          {!user && !isAdminLoggedIn && <NavLink to="/admin/login">Admin</NavLink>}
          {isAdminLoggedIn && <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>}
          {(user || isAdminLoggedIn) && <a href="/" onClick={handleLogout}>Logout</a>}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;