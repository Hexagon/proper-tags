import id from './id';

test('returns whatever comes at it', () => {
  assert.equal(id`foo${42}bar`, 'foo42bar');
});

test('returns whatever comes at it (number version)', () => {
  assert.equal(id(42), 42);
});
