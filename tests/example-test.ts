import {suite, test} from 'mocha';
import {assert} from 'chai';
import {hello} from '../src/example';

suite('example-test', function() {
  /* 
   * important difference to qunit-based tests:
   * assert is imported, not a parameter.
   */
  test('example returns "Hello, World"', function() {
    assert.strictEqual(hello(), 'Hello, World');
  });
});
