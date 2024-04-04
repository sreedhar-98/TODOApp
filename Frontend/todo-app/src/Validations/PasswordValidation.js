const PasswordValidation = (password) => {
  const pass_valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
    password
  );
  return pass_valid;
};

export default PasswordValidation;