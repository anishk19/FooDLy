import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import api from '../Utils/api';

const FavoriteContext = createContext();

export function useFavorites() {
  return useContext(FavoriteContext);
}

export function FavoriteProvider({ children }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      if (user) {
        try {
          const { data } = await api.get('/users/favorites');
          setFavorites(data.map(item => item._id)); 
        } catch (error) {
          console.error('Failed to load favorites');
        }
      } else {
        setFavorites([]);
      }
    }
    loadFavorites();
  }, [user]);

  const toggleFavorite = async (food) => {
    if (!user) {
      addToast('Please log in to save favorites!', 'error');
      return;
    }
    
    const isFavorited = favorites.includes(food.id);
    const newFavorites = isFavorited 
      ? favorites.filter(id => id !== food.id)
      : [...favorites, food.id];
      
    setFavorites(newFavorites);
    
    if (isFavorited) {
      addToast(`${food.name} removed from favorites!`, 'info');
    } else {
      addToast(`${food.name} added to favorites!`, 'info');
    }

    try {
      await api.post('/users/favorites', { menuId: food.id });
    } catch (error) {
      setFavorites(favorites);
      addToast('Failed to sync favorite with server', 'error');
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
