import { useEffect, useState } from 'react';
import FoodList from '../../Components/User/FoodList';
import Loader from '../../Components/Shared/Loader';
import { getFoods } from '../../Services/foodService';
import HeroSection from './../../Components/User/HeroSection';


function HomePage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <HeroSection />
      <section className="container" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2>Our Popular Dishes</h2>
          <p style={{ color: 'var(--text-light)' }}>Order your favorite meals in just a few clicks.</p>
        </div>
        {loading ? <Loader /> : <FoodList foods={foods} />}
      </section>
    </>
  );
}

export default HomePage;