import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Components/Shared/FormInput';
import Button from '../../Components/Shared/Button';
import { useAuth } from '../../Context/AuthContext';
import { useToast } from '../../Context/ToastContext';
import { validateAuthForm } from '../../Utils/validation';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { loginUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAuthForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await loginUser(formData);
      addToast('Login successful!', 'success');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      addToast(err.message || 'Invalid credentials', 'error');
    }
  };

  return (
    <section className="centered-section">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>User Login</h2>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
        />
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </section>
  );
}

export default LoginPage;