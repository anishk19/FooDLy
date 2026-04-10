import api from '../Utils/api';

export async function loginUser(credentials) {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return Promise.resolve({
      token: data.token,
      user: {
        id: data._id,
        name: data.username,
        email: data.email,
        role: data.role
      }
    });
  } catch (error) {
    return Promise.reject(new Error(error.response?.data?.message || 'Invalid email or password'));
  }
}

export async function registerUser(userData) {
  try {
    // The backend uses `username`, not `name`
    const payload = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user'
    };
    const { data } = await api.post('/auth/register', payload);
    return Promise.resolve({
      id: data._id,
      name: data.username,
      email: data.email,
    });
  } catch (error) {
    return Promise.reject(new Error(error.response?.data?.message || 'Registration failed'));
  }
}

export async function loginAdmin(credentials) {
  try {
    const { data } = await api.post('/auth/login', credentials);
    if (data.role !== 'admin') {
      return Promise.reject(new Error('Invalid admin credentials'));
    }
    return Promise.resolve({
      token: data.token,
      user: {
        id: data._id,
        name: data.username,
        email: data.email,
        role: data.role
      }
    });
  } catch (error) {
    return Promise.reject(new Error(error.response?.data?.message || 'Invalid admin credentials'));
  }
}