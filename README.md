# TS-Mod-Example

This setup is an example on how to do TS-Modules.

## Instructions

- Place TS library code in `src`.
- the `typescript` package, along with the `tsconfig.json`, configures build output.
  - JavaScript code is going to be in `lib` after compilation.
  - compile the project with `npm run build`
- the `ts-node` package is used for your tests.
  - files containing tests must end in `-test.ts` (like `my-thing-test.ts`)
  - run `npm run test` for running the tests.
  - run `npm run test-coverage` if you want a coverage report.
- place declarations in `src`. I usually use `src/project.d.ts`.
  - the compiler will output all inferred declarations in `lib`.
- other projects can use `import` statements against the JS files in `lib`. If there is an `index.js` file in the project root, this file can reexport things from there as usual.
- place a `types` key in `package.json`, pointing to the path of the main `.d.ts` file.
