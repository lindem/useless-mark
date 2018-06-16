import {timedShellCommandPromise} from './timed-promise';
import {rimrafPromise} from './rimraf-promise';

export async function shellcommands() {
  const timerecords: any[] = [];

  return rimrafPromise('node_modules', {})
    .then(({elapsed}) => {
      timerecords.push({name: '1st rimraf node_modules', elapsed});
      return timedShellCommandPromise('yarn', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: '1st yarn (cache potentially cold)', elapsed});
      return rimrafPromise('node_modules', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: '2nd rimraf node_modules', elapsed});
      return timedShellCommandPromise('yarn', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: '2nd yarn (cache warm)', elapsed});
      return timedShellCommandPromise('ember test', {});
    })
    .then(({elapsed}) => {
      timerecords.push({name: 'ember test', elapsed});
      return timerecords;
    });
}
