import api from '../Utils/api';

export async function getFoods() {
  try {
    const { data } = await api.get('/menu');
    return Promise.resolve(data.map(item => ({ ...item, id: item._id })));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addFood(foodData) {
  try {
    const { data } = await api.post('/menu', foodData);
    return Promise.resolve({ ...data, id: data._id });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateFood(foodId, foodData) {
  try {
    const { data } = await api.put(`/menu/${foodId}`, foodData);
    return Promise.resolve({ ...data, id: data._id });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteFood(foodId) {
  try {
    await api.delete(`/menu/${foodId}`);
    return Promise.resolve({ success: true, id: foodId });
  } catch (error) {
    return Promise.reject(error);
  }
}