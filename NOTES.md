# nextjs-movie-browser/notes

## TypeScript support

Thanks to [@zeit/next-typescript](https://github.com/zeit/next-plugins/tree/master/packages/next-typescript), we can add TypeScript support to NextJS very simply.

Since next@7 relies on babel@7, this plugin relies on [@babel/preset-typescript](https://github.com/babel/babel/tree/master/packages/babel-preset-typescript) which means that:

- you leave the transpiling to babel (which will strip off the TypeScript types)
- you only do the type checking with TypeScript either:
  - in your IDE
  - in the command line with `tsc`
  - with [fork-ts-checker-webpack-plugin](https://github.com/zeit/next-plugins/tree/master/packages/next-typescript#type-checking)

The plugin ships a preset to add to your `.babelrc` (`@zeit/next-typescript/babel`), containing the different preset that will match TypeScript config.

Basic install:

```shell
yarn add --dev @zeit/next-typescript @types/react @types/next
```

To add basic type checking: `yarn add --dev typescript` (and add a `type-check` task executing: `tsc --noEmit`).

Resources:

- [@zeit/next-typescript](https://github.com/zeit/next-plugins/tree/master/packages/next-typescript)
- [Microsoft/TypeScript-Babel-Starter](https://github.com/Microsoft/TypeScript-Babel-Starter)
- [deptno/next.js-typescript-starter-kit](deptno/next.js-typescript-starter-kit)
