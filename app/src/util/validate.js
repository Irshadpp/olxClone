// validation.js
export const validateForm = (username, email, password, phone) => {
    if (!username) {
      return 'Username is required';
    }
    if (!email) {
      return 'Email is required';
    }
    // Regex for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    if (!phone) {
      return 'Phone number is required';
    }
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };
  