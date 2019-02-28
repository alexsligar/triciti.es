import userValidations from './users';

describe('user validations', () => {
  describe('name', () => {
    it('should not be blank', () => {
      const result = userValidations.name({});
      expect(result).toBe('Name is required');
    });
    it('should not be too short', () => {
      const result = userValidations.name({ name: 'a' });
      expect(result).toBe('Name must be between 2 and 30 characters');
    });
    it('should not be too long', () => {
      const name = 'abcdefghijklmnopqrstuvwxyzabcde';
      const result = userValidations.name({ name });
      expect(result).toBe('Name must be between 2 and 30 characters');
    });
  });

  describe('username', () => {
    it('should not be blank', () => {
      const result = userValidations.username({});
      expect(result).toBe('Username required');
    });
    it('should not contain invalid characters', () => {
      const result = userValidations.username({ username: 'abc$23' });
      expect(result).toBe(
        'Username must only contain letters, numbers, underscores and periods'
      );
    });
    it('should not be too short', () => {
      const result = userValidations.username({ username: 'ab' });
      expect(result).toBe('Username must be between 3 and 30 characters');
    });
    it('should not be too long', () => {
      const username = 'abcdefghijklmnopqrstuvwxyzabcde';
      const result = userValidations.username({ username });
      expect(result).toBe('Username must be between 3 and 30 characters');
    });
  });

  describe('email', () => {
    it('should not be blank', () => {
      const result = userValidations.email({});
      expect(result).toBe('Email required');
    });
    it('should be valid', () => {
      const result = userValidations.email({ email: 'abcatgmaildotcom' });
      expect(result).toBe('Invalid email');
    });
  });

  describe('password', () => {
    it('should not be blank', () => {
      const result = userValidations.password({});
      expect(result).toBe('Password required');
    });
    it('should not too short', () => {
      const result = userValidations.password({ password: 'aBc123' });
      expect(result).toBe('Password must be between 8 and 30 characters');
    });
    it('should not be too long', () => {
      const password = 'aBcdefghijklmnopqrstuvwxyzabcd5';
      const result = userValidations.password({ password });
      expect(result).toBe('Password must be between 8 and 30 characters');
    });
    it('should contain uppercase, lowercase, and a number', () => {
      const password = 'abcdefgh';
      const result = userValidations.password({ password });
      expect(result).toBe(
        'Password must contain uppercase, lowercase, and number'
      );
    });
  });

  describe('passwordConfirmation', () => {
    it('should match the password', () => {
      const password = 'abcd123B';
      const passwordConfirmation = 'abcd1234';
      const result = userValidations.passwordConfirmation({
        password,
        passwordConfirmation,
      });
      expect(result).toBe('Password confirmation must match password');
    });
  });

  describe('bio', () => {
    it('should not be too long', () => {
      const bio = 'abcdefghijklmonpqrstuvwxyz'.repeat(10);
      const result = userValidations.bio({ bio });
      expect(result).toBe('Bio must be 255 characters or less')
    });
  });
});
