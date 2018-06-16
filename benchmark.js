#!/usr/bin/env node
const shellcommands = require('./lib/do-bench').shellcommands;
const timedShellCommandPromise = require('./lib/timed-promise')
  .timedShellCommandPromise;
const fs = require('mz/fs');
const os = require('os');

function cpus() {
  const processors = os
    .cpus()
    .map(cpu => cpu.model)
    .reduce((acc, cpumodel) => {
      if (acc[cpumodel]) {
        acc[cpumodel] += 1;
      } else {
        acc[cpumodel] = 1;
      }
      return acc;
    }, {});
  return Object.keys(processors)
    .reduce((acc, curr) => {
      acc.push(`${processors[curr]}x ${curr}`);
      return acc;
    }, [])
    .join(', ');
}

const fehlermeldung = [
  'to be used in the root of an ember project using git. EXIT.'
].join();

const GB_DIV = Math.pow(1024, 3);

async function main() {
  const {
    result: {stdout: gitRev}
  } = await timedShellCommandPromise('git show-ref');

  const {name, version, devDependencies} = JSON.parse(
    await fs.readFile('./package.json')
  );
  if (Object.keys(devDependencies).indexOf('ember-cli') === -1) {
    console.log(fehlermeldung);
    process.exit(1);
  }
  console.log(name, version, gitRev);
  const mem = (os.totalmem() / GB_DIV).toFixed(2);
  const freemem = (os.freemem() / GB_DIV).toFixed(2);
  console.log(`Host: ${os.hostname()}; ${os.platform()}(${os.arch()})`);
  console.log(`${cpus()}; (${freemem} (free) / ${mem} (total) GB RAM)\n`);
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
  console.log(String(state.total).padStart(6, ' ') + ' ms total');
}

main();
