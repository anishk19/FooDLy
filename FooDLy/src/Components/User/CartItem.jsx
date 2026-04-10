import Button from '../Shared/Button';

function CartItem({ item, onRemove }) {
  return (
    <article className="card cart-item">
      <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
      <div>
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <Button variant="danger" onClick={() => onRemove(item.id)}>
        Remove
      </Button>
    </article>
  );
}

export default CartItem;