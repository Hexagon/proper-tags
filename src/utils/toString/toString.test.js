import toString from './toString';

test('transforms values to string as per spec', () => {
  const get = jest
    .fn()
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, Symbol.toPrimitive);
    })
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, 'toString');
    })
    .mockImplementationOnce((target, prop) => {
      assert.equal(prop, 'valueOf');
      return () => 42;
    });

  const val = new Proxy({}, { get });
  const result = toString(val);

  assert.equal(get).toHaveBeenCalledTimes(3);
  assert.equal(result, '42');
});
