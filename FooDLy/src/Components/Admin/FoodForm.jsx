import { useState, useEffect } from 'react';
import FormInput from '../Shared/FormInput';
import Button from '../Shared/Button';

const initialState = {
  name: '',
  price: '',
  category: '',
  description: '',
  imageUrl: '',
};

function FoodForm({ onSubmit, initialValues = null, submitLabel = 'Save Food' }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData(initialState);
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Food name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.imageUrl?.trim()) newErrors.imageUrl = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });

    if (submitLabel.toLowerCase().includes('add')) {
      setFormData(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <FormInput
        label="Food Name"
        name="name"
        value={formData.name || ''}
        onChange={handleChange}
        placeholder="Enter food name"
        error={errors.name}
      />
      <FormInput
        label="Price"
        name="price"
        type="number"
        value={formData.price || ''}
        onChange={handleChange}
        placeholder="Enter price"
        error={errors.price}
      />
      <FormInput
        label="Category"
        name="category"
        value={formData.category || ''}
        onChange={handleChange}
        placeholder="Enter category"
        error={errors.category}
      />
      <FormInput
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl || ''}
        onChange={handleChange}
        placeholder="Enter Image URL directly (e.g. https://...)"
        error={errors.imageUrl}
      />
      <FormInput
        label="Description"
        name="description"
        value={formData.description || ''}
        onChange={handleChange}
        placeholder="Enter description"
        error={errors.description}
      />
      <Button type="submit" fullWidth>
        {submitLabel}
      </Button>
    </form>
  );
}

export default FoodForm;