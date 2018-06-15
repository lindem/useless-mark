import {millis} from './dateutils';
import {exec} from 'child_process';
import {makeDefaultReject} from './default-reject';

/**
 * timePromises work just like normal promises, but instead of handing the
 * result to .then(), it wraps the result in an object containing the elapsed
 * time since the promise has started.
 */
export function timedPromise(promiseFn: PromiseExecutor): Promise<any> {
  return new Promise(function(
    resolve,
    reject = makeDefaultReject('timedPromise')
  ) {
    const before = millis();
    function wrappedResolve(result?: any) {
      const after = millis();
      resolve({elapsed: after - before, result});
    }
    return promiseFn(wrappedResolve, reject);
  } as TimedPromiseExecutor);
}

export function timedPromiseWrap(promise: Promise<any>) {
  return timedPromise(function(resolve, reject) {
    return promise //
      .then(result => resolve(result)) //
      .catch(err => reject(err));
  });
}

export function timedShellCommandPromise(command: string, options?: any) {
  return timedPromise(function(
    resolve,
    reject = makeDefaultReject('timedShellCommandPromise')
  ) {
    exec(command, options, function(
      err: Error | null,
      stdout: string,
      stderr: string
    ) {
      if (err) {
        if (reject) {
          (reject as rejectFunc)(err);
        } else {
          throw new Error('shell failed: err');
        }
      } else {
        // provide everything we can to the callback. Doesn't cost anything.
        resolve({stdout, stderr, command});
      }
    });
  });
}
