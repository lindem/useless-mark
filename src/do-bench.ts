import {timedShellCommandPromise} from './timed-promise';
import {rimrafPromise} from './rimraf-promise';

export async function shellcommands() {
  const timerecords: any[] = [];

  return rimrafPromise('node_modules', {})
    .then(({elapsed}) => {
      timerecords.push({name: 'rimraf node_modules', elapsed});
      return timedShellCommandPromise('yarn', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: 'yarn', elapsed});
      return rimrafPromise('node_modules', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: '2. rimraf node_modules', elapsed});
      return timedShellCommandPromise('yarn', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: '2. yarn (cache ist warm!)', elapsed});
      return timedShellCommandPromise('ember test', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: 'ember test', elapsed});
      return timerecords;
    });
}
