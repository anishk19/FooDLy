function OrderTable({ orders, onUpdateStatus }) {
  const statuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];
  return (
    <div className="table-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.username || order.customer || 'Guest'}</td>
              <td>${(order.totalAmount || order.total || 0).toFixed(2)}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;