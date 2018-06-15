import {timedShellCommandPromise} from '../src/timed-promise';
import {suite, test} from 'mocha';
import {assert} from 'chai';

suite('timedShellCommandPromise', function() {
  test('cat package.json', function() {
    timedShellCommandPromise('cat package.json').then(
      ({elapsed, result: {stdout}}) => {
        const json = JSON.parse(stdout);
        assert.ok(/useless-mark/.test(json.name), 'yep, package.json alright');
        assert.ok(elapsed > 0 && elapsed < 500, 'was not slow either');
      }
    );
  });
  test('stderr test', function() {
    timedShellCommandPromise('cat hackage.json').catch(err => {
      assert.ok(err, String(err));
    });
  });

  test('non-existing shell command', function() {
    timedShellCommandPromise('adrexakilaf')
      .then(() => assert.ok(false, 'must fail'))
      .catch(err => assert.ok(err, String(err)));
  });
});
