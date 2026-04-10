import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import { useToast } from '../../Context/ToastContext';
import { createOrder } from '../../Services/orderService';
import FormInput from '../../Components/Shared/FormInput';
import Button from '../../Components/Shared/Button';

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '', phone: '', cardName: '', cardNumber: '', expiry: '', cvc: ''
  });

  if (cartItems.length === 0) {
    return <section className="container" style={{ padding: '3rem 0' }}><p>Your cart is empty.</p></section>;
  }
  if (!user) {
    return <section className="container" style={{ padding: '3rem 0' }}><p>Please log in to checkout.</p></section>;
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.cardNumber) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    
    try {
      await createOrder({
        totalAmount: cartTotal,
        deliveryAddress: formData.address,
        phone: formData.phone,
        items: cartItems.map(i => ({ menuItem: i.id, quantity: i.quantity }))
      });
      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate('/orders');
    } catch (err) {
      addToast('Checkout failed. Try again.', 'error');
    }
  };

  return (
    <section className="container" style={{ padding: '3rem 0', maxWidth: '600px' }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="form-card" style={{ marginTop: '2rem' }}>
        <h3>Delivery Details</h3>
        <FormInput label="Delivery Address" name="address" required value={formData.address} onChange={handleChange} />
        <FormInput label="Phone Number" name="phone" required value={formData.phone} onChange={handleChange} />

        <h3 style={{ marginTop: '2rem' }}>Payment (Mock)</h3>
        <FormInput label="Name on Card" name="cardName" required value={formData.cardName} onChange={handleChange} />
        <FormInput label="Card Number" name="cardNumber" required placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FormInput label="Expiry (MM/YY)" name="expiry" required value={formData.expiry} onChange={handleChange} />
          <FormInput label="CVC" name="cvc" type="password" required value={formData.cvc} onChange={handleChange} />
        </div>
        
        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Total to Pay: ${cartTotal.toFixed(2)}</h2>
          <Button type="submit" fullWidth>Place Order</Button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutPage;
