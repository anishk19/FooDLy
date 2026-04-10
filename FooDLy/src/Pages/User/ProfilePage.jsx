import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useFavorites } from '../../Context/FavoriteContext';
import { getFoods } from '../../Services/foodService';
import FoodList from '../../Components/User/FoodList';
import Loader from '../../Components/Shared/Loader';

function ProfilePage() {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const allFoods = await getFoods();
      setFavoriteFoods(allFoods.filter((f) => favorites.includes(f.id)));
      setLoading(false);
    }
    loadData();
  }, [favorites]);

  if (!user) return <section className="container"><p>Please log in.</p></section>;

  return (
    <section className="container" style={{ padding: '3rem 0' }}>
      <div className="form-card" style={{ marginBottom: '3rem' }}>
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div>
        <h3>My Favorites ({favorites.length})</h3>
        {loading ? (
          <Loader />
        ) : favoriteFoods.length > 0 ? (
          <FoodList foods={favoriteFoods} onAddToCart={() => {}} />
        ) : (
          <p className="hint">You have not saved any favorites yet.</p>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;
