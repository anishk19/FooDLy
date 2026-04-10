import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Components/Shared/FormInput';
import Button from '../../Components/Shared/Button';
import { registerUser } from '../../Services/authService';
import { useToast } from '../../Context/ToastContext';
import { validateAuthForm } from '../../Utils/validation';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAuthForm(formData, true);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await registerUser(formData);
    addToast('Registration successful! Redirecting to login...', 'success');
    setFormData({ name: '', email: '', password: '' });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <section className="centered-section">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Create Account</h2>
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
        />
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
          placeholder="Create a password"
          error={errors.password}
        />
        <Button type="submit" fullWidth>
          Register
        </Button>
      </form>
    </section>
  );
}

export default RegisterPage;