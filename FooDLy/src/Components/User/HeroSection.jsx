import { Link } from 'react-router-dom';
import Button from '../Shared/Button';

function HeroSection() {
  return (
    <section className="hero-section container">
      <div className="hero-content">
        <h1 className="hero-title">
          Delicious Food, <br />
          <span className="highlight">Delivered To You</span>
        </h1>
        <p className="hero-subtitle">
          Experience the best dishes from our kitchen to your doorstep. Hot, fresh, and irresistibly tasty.
        </p>
        <div className="hero-actions">
          <Link to="/menu">
            <Button className="btn-primary hero-btn">Explore Menu</Button>
          </Link>
          <Link to="/register">
            <Button className="btn-secondary hero-btn">Join Now</Button>
          </Link>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div className="blob-shape"></div>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop"
          alt="Delicious food assortment"
          className="hero-image hover-scale"
        />
      </div>
    </section>
  );
}

export default HeroSection;
