import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as loginUserService, loginAdmin as loginAdminService } from '../Services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodly_user');
    const token = localStorage.getItem('foodly_token');
    
    if (savedUser && token) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'admin') {
        setIsAdminLoggedIn(true);
      }
    }

    setLoading(false);
  }, []);

  const loginUser = async (credentials) => {
    const response = await loginUserService(credentials);
    setUser(response.user);
    localStorage.setItem('foodly_user', JSON.stringify(response.user));
    localStorage.setItem('foodly_token', response.token);
    return response;
  };

  const loginAdmin = async (credentials) => {
    const response = await loginAdminService(credentials);
    setUser(response.user);
    setIsAdminLoggedIn(true);
    localStorage.setItem('foodly_user', JSON.stringify(response.user));
    localStorage.setItem('foodly_token', response.token);
    return response;
  };

  const logout = () => {
    setUser(null);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('foodly_user');
    localStorage.removeItem('foodly_token');
  };

  const value = {
    user,
    isAdminLoggedIn,
    loginUser,
    loginAdmin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
