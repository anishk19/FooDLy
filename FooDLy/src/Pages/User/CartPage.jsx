import { useCart } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from "../../Components/User/CartItem";
import Button from '../../Components/Shared/Button';

function CartPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <section>
      <h1>Your Cart</h1>
      <div className="stack">
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <Button onClick={() => navigate('/checkout')} disabled={cartItems.length === 0}>Proceed to Checkout</Button>
      </div>
    </section>
  );
}

export default CartPage;