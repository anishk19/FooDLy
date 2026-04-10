import { useEffect, useState } from 'react';
import FoodList from '../../Components/User/FoodList';
import Loader from '../../Components/Shared/Loader';
import { getFoods } from '../../Services/foodService';
import { useCart } from '../../Context/CartContext';
import { useToast } from '../../Context/ToastContext';

function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadFoods() {
      try {
        const result = await getFoods();
        setFoods(result);
      } catch (error) {
        console.error("Failed to load foods:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  const handleAddToCart = (food) => {
    addToCart(food);
    addToast(`${food.name} added to cart!`);
  };

  const categories = ['All', ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="container" style={{ padding: '3rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>Our Menu</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Explore all available food items.</p>
      </div>

      <div className="filters-section">
        <input 
          type="text" 
          placeholder="Search foods..." 
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="category-chips">
          {categories.map((category) => (
            <button 
              key={category} 
              className={`chip ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Loader /> : <FoodList foods={filteredFoods} onAddToCart={handleAddToCart} />}
    </section>
  );
}

export default MenuPage;