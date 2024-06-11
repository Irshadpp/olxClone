export const validateSignupForm = (username, email, password, phone) => {
    if (!username || username.trim() === '' ) {
      return 'Username is required';
    }
    if (!email || email.trim() === '') {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    if (!phone || phone.trim() === '') {
      return 'Phone number is required';
    }
    if (!password || password.trim() === '') {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  export const validateCreateForm = (name, category, price) => {
  
    if (!name || name.trim() === '') {
      return 'Name is required';
    }
  
    if (!category || category.trim() === '') {
      return 'Category is required';
    }
  
    if (!price || isNaN(price) || price <= 0) {
      return 'Price must be a positive number';
    }
    return
  
  }