import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import OrderTable from '../../Components/Admin/OrderTable';
import Loader from '../../Components/Shared/Loader';
import { useAuth } from '../../Context/AuthContext';
import { useToast } from '../../Context/ToastContext';
import { getAdminOrders, updateOrderStatus } from '../../Services/orderService';

function ManageOrdersPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      addToast(`Order #${id.toString().slice(-4)} updated to ${newStatus}`, 'success');
    } catch {
      addToast('Failed to update status', 'error');
    }
  };

  useEffect(() => {
    async function loadOrders() {
      const result = await getAdminOrders();
      setOrders(result);
      setLoading(false);
    }

    loadOrders();
  }, []);

  return (
    <section className="admin-layout">
      <AdminSidebar onLogout={handleLogout} />
      <div className="admin-content">
        <h1>Manage Orders</h1>
        {loading ? <Loader /> : <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />}
      </div>
    </section>
  );
}

export default ManageOrdersPage;