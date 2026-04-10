import { NavLink } from 'react-router-dom';
import Button from '../Shared/Button';

function AdminSidebar({ onLogout }) {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/foods">Manage Foods</NavLink>
        <NavLink to="/admin/orders">Manage Orders</NavLink>
      </nav>
      <Button variant="secondary" onClick={onLogout}>
        Logout
      </Button>
    </aside>
  );
}

export default AdminSidebar;