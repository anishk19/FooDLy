export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthForm(formData, requireName = false) {
  const errors = {};

  if (requireName && !formData.name?.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}