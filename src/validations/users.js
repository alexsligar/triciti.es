import { isEmail, isLength, equals } from 'validator';
export default {
  name: fields => {
    const val = fields.name;
    if (!val) return 'Name is required';
    if (!isLength(val, { min: 2, max: 30 }))
      return 'Name must be between 2 and 30 characters';
  },
  username: fields => {
    const val = fields.username;
    if (!val) return 'Username required';
    if (!val.match(/^[A-Za-z0-9_.]+$/))
      return 'Username must only contain letters, numbers, underscores and periods';
    if (!isLength(val, { min: 3, max: 30 }))
      return 'Username must be between 3 and 30 characters';
  },
  email: fields => {
    const val = fields.email;
    if (!val) return 'Email required';
    if (!isEmail(val)) return 'Invalid email';
  },
  password: fields => {
    const val = fields.password;
    if (!val) return 'Password required';
    if (!isLength(val, { min: 8, max: 30 }))
      return 'Password must be between 8 and 30 characters';
    if (!val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,31}$/))
      return 'Password must contain uppercase, lowercase, and number';
  },
  passwordConfirmation: fields => {
    const val = fields.passwordConfirmation;
    const password = fields.password;
    if (!equals(val, password))
      return 'Password confirmation must match password';
  },
  bio: fields => {
    const val = fields.bio;
    if (!isLength(val, { max: 255 }))
      return 'Bio must be 255 characters or less';
  },
};
