function getProgress(status) {
  switch (status) {
    case 'Pending': return 25;
    case 'Preparing': return 50;
    case 'Out for Delivery': return 75;
    case 'Delivered': return 100;
    default: return 0;
  }
}

function OrderCard({ order }) {
  const progress = getProgress(order.status);

  return (
    <article className="card order-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Order #{order.id.toString().slice(-4)}</h3>
        <span style={{ fontWeight: 600, color: progress === 100 ? 'var(--success)' : 'var(--primary)' }}>
          {order.status}
        </span>
      </div>
      <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Date: {new Date(order.createdAt || order.date).toLocaleDateString()}</p>
      <p style={{ fontWeight: 600 }}>Total: ${(order.totalAmount || order.total || 0).toFixed(2)}</p>
      
      <div className="order-progress-bg">
        <div 
          className="order-progress-fill" 
          style={{ width: `${progress}%`, background: progress === 100 ? 'var(--success)' : 'var(--primary)' }}
        ></div>
      </div>
    </article>
  );
}

export default OrderCard;