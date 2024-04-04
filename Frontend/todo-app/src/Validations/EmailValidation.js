const EmailValidation = (email) => {
  // eslint-disable-next-line no-useless-escape
  const email_valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  return email_valid;
};


export default EmailValidation;