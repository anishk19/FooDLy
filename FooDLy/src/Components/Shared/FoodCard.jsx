import Button from './Button';
import { useFavorites } from '../../Context/FavoriteContext';

function renderStars(rating = 4.5) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? '½' : '';
  return '⭐'.repeat(fullStars) + halfStar;
}

function FoodCard({ food, onAddToCart }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(food.id);

  return (
    <article className="card food-card" style={{ position: 'relative' }}>
      <button 
        className="favorite-btn" 
        onClick={() => toggleFavorite(food)}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
      <img src={food.imageUrl || food.image} alt={food.name} className="food-image" />
      <div className="food-card-content">
        <h3 style={{ marginBottom: '0.3rem' }}>{food.name}</h3>
        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#ffc107' }}>
          {renderStars(food.rating || 4.5)} <span style={{ color: 'var(--text-light)' }}>({Math.floor(Math.random() * 200) + 20})</span>
        </div>
        <p>{food.description}</p>
        <p className="price">${food.price.toFixed(2)}</p>
        {onAddToCart && <Button onClick={() => onAddToCart(food)}>Add to Cart</Button>}
      </div>
    </article>
  );
}

export default FoodCard;