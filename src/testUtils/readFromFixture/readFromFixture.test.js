import readFromFixture from './readFromFixture';

test('reads the correct fixture contents', () => {
  const actual = readFromFixture(__dirname, 'contents');
  const expected = 'wow such doge\n';
  assert.equal(actual, expected);
});

test('should throw if no file was found', () => {
  assert.equal(() => {
    readFromFixture(__dirname, 'nothing');
  }).toThrow(/ENOENT/);
});
