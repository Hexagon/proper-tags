import { test } from 'uvu';
import * as assert from 'uvu/assert';

import * as testUtils from './index.js';
import { readFromFixture } from './readFromFixture/index.js';

test('exports readFromFixture', () => {
  assert.equal(testUtils.readFromFixture, readFromFixture);
});

test.run();