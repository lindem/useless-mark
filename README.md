# useless-mark

Benchmark tool for yarn/ember.js build times

- navigate to a folder containing an ember-cli project
- execute benchmark.js
- comparable results are of course only obtained with the same repository, at the same commit.

The test is designed to impose the typical workload of using ember (install packages, run tests).

## Example Report

The benchmark report consists of

- repo, version, HEAD,
- then technical information about the computer,
- timing information.

```
test-repo 0.0.0 d0c679a74235558e7dc7e5b35c1d54a3a8f5531f refs/heads/master

Host: aphelion; linux(x64)
8x Intel(R) Core(TM) i7-4800MQ CPU @ 2.70GHz; (9.88 (free) / 15.32 (total) GB RAM)

   508 ms: 1st rimraf node_modules
  3250 ms: 1st yarn (cache potentially cold)
   401 ms: 2nd rimraf node_modules
  3279 ms: 2nd yarn (cache warm)
  3787 ms: ember test
----------------------------------------
 11225 ms total
```

## How to use

- clone this repository
- use `yarn`
- use `npm run build`
- you can now run benchmark.js, provided it is set executable (`+x`).
