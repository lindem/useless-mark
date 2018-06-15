#!/usr/bin/env node
const shellcommands = require('./lib/do-bench').shellcommands;
const timedShellCommandPromise = require('./lib/timed-promise')
  .timedShellCommandPromise;
const fs = require('mz/fs');

const fehlermeldung = [
  'muss in einem ember-projekt, das git benutzt, ausgeführt werden.\n',
  'SCHLUSS.'
].join();

async function main() {
  const {
    result: {stdout: gitRev}
  } = await timedShellCommandPromise('git show-ref');

  const {name, version} = JSON.parse(await fs.readFile('./package.json'));
  console.log('\n', name, version, gitRev);
  if (!name || !version || !gitRev) {
    console.log();
    process.exit(1);
  }
  const state = (await shellcommands()).reduce(
    (acc, curr) => {
      const padded = String(curr.elapsed).padStart(6, ' ');
      acc.total += curr.elapsed;
      acc.messages.push(`${padded} ms: ${curr.name}`);
      return acc;
    },
    {total: 0, messages: []}
  );

  console.log(state.messages.join('\n'));
  console.log(''.padStart(40, '-'));
  console.log(String(state.total).padStart(6, ' ') + ' ms gesamt');
}

main();
