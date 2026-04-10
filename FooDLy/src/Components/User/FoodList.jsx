import FoodCard from '../Shared/FoodCard';

function FoodList({ foods, onAddToCart }) {
  return (
    <section className="grid food-grid">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}

export default FoodList;