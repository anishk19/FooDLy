import { useEffect, useState } from 'react';
import OrderCard from '../../Components/User/OrderCard';
import Loader from '../../Components/Shared/Loader';
import { getUserOrders } from '../../Services/orderService';
import { useAuth } from '../../Context/AuthContext';

function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) {
        setLoading(false);
        return;
      }
      const result = await getUserOrders();
      // Filter orders by username (mock auth filtering)
      setOrders(result.filter(o => o.customer === user.name));
      setLoading(false);
    }
    loadOrders();
  }, [user]);

  if (!user) return <section className="container" style={{ padding: '3rem 0' }}><p>Please log in.</p></section>;

  return (
    <section className="container" style={{ padding: '3rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Order History</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid order-grid">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderHistoryPage;