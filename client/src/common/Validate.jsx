import React from 'react';
const error = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Validate = (data) => {
  if (data.password !== data.confirmPassword) {
    error.confirmPassword = 'not equal';
  }
  return error;
};

export default Validate;
