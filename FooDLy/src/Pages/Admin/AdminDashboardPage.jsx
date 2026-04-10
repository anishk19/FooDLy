import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar';

function AdminDashboardPage({ setIsAdminLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/admin/login');
  };

  return (
    <section className="admin-layout">
      <AdminSidebar onLogout={handleLogout} />
      <div className="admin-content card">
        <h1>Dashboard</h1>
        <p>Welcome, Restaurant Manager.</p>
        <div className="stats-grid">
          <div className="card stat-box">
            <h3>Total Foods</h3>
            <p>12</p>
          </div>
          <div className="card stat-box">
            <h3>Pending Orders</h3>
            <p>5</p>
          </div>
          <div className="card stat-box">
            <h3>Completed Today</h3>
            <p>18</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboardPage;