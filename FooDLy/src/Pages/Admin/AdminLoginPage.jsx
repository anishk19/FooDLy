import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Components/Shared/FormInput';
import Button from '../../Components/Shared/Button';
import { validateAuthForm } from '../../Utils/validation';
import { useAuth } from '../../Context/AuthContext';

function AdminLoginPage() {
  const { loginAdmin } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    const validationErrors = validateAuthForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await loginAdmin(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <section className="centered-section">
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Admin Login</h2>
        <p className="hint">Demo: admin@foodly.com / admin123</p>
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter admin email"
          error={errors.email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          error={errors.password}
        />
        <Button type="submit" fullWidth>
          Login as Admin
        </Button>
        {apiError && <p className="error-message">{apiError}</p>}
      </form>
    </section>
  );
}

export default AdminLoginPage;