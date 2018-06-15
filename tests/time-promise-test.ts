import {timedPromise, timedShellCommandPromise} from '../src/timed-promise';
import {suite, test} from 'mocha';
import {assert} from 'chai';

suite('timedPromise', function() {
  test('then() gets time information', async function() {
    const {elapsed, result} = await timedPromise(function(resolve) {
      setTimeout(function() {
        resolve('the result');
      }, 500);
    });

    assert.strictEqual(result, 'the result', 'Result is okay');
    assert.ok(
      elapsed > 490 && elapsed < 510,
      'time is approximately right (was ' + elapsed + ')'
    );
  });

  test('exceptions work as advertised', async function() {
    timedPromise(function(resolve, reject) {
      reject('ERROR');
    }).catch(err => assert.strictEqual(err, 'ERROR'));
  });
});
