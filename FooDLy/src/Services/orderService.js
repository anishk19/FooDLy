import api from '../Utils/api';

export async function getUserOrders() {
  try {
    const { data } = await api.get('/orders');
    return Promise.resolve(data.map(order => ({ ...order, id: order._id })));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAdminOrders() {
  try {
    const { data } = await api.get('/orders/all');
    return Promise.resolve(data.map(order => ({ ...order, id: order._id })));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createOrder(orderData) {
  try {
    const { data } = await api.post('/orders', orderData);
    return Promise.resolve({ ...data, id: data._id });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const { data } = await api.put(`/orders/${orderId}`, { status });
    return Promise.resolve({ ...data, id: data._id });
  } catch (error) {
    return Promise.reject(error);
  }
}