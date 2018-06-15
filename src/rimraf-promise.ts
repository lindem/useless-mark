import {timedPromise} from './timed-promise';
const rimraf = require('rimraf');

export function rimrafPromise(path: string, options: any) {
  return timedPromise(function(resolve, reject) {
    rimraf(path, options, function(err?: Error) {
      if (err) {
        reject(err);
      } else {
        resolve() as unaryFunc<void>;
      }
    });
  });
}
