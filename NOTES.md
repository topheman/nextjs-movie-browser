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
- [Limitations of using @babel/preset-typescript](https://kulshekhar.github.io/ts-jest/user/babel7-or-ts)

## Jest support

Since transpiling is done with babel in development, in test, we do the same with [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest).

- The "test" section of the [`.babelrc`](.babelrc) file will be used
- The `jest.config.js` file is taken in account by default by jest
- I configured the `src/setupTests.js` file like in CRA to be loaded before tests start

With shipped version of `babel-core` (different packages using v6 - not `@babel/core`), I had the following error:

> Test suite failed to run
>
> Plugin 0 specified in "~/nextjs-movie-browser/node_modules/next/babel.js" provided an invalid property of "default" (While processing preset: "~/nextjs-movie-browser/node_modules/next/babel.js")

I fixed it with:

```shell
yarn add babel-core@^7.0.0-bridge --dev
```

In order to fix the peerDependencie to `babel-core` I used `babel-core@^7.0.0-bridge`, a version of `babel-core` that requires `@babel/core` under the hood - [see full explanation](https://github.com/babel/babel-bridge#solution).

Resources:

- [Example app with Jest tests inside a NextJS TypeScript app](https://github.com/zeit/next.js/tree/canary/examples/with-jest-typescript)
- [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest)

## Custom Server

By default, you start your app with `next start`. If you need to **customize routes**, **use route patterns**, you will have to make your own server entry point.

- [Custom server and routing](https://nextjs.org/docs/#custom-server-and-routing)

### Custom Server JavaScript

Resources:

- [next.js/examples/custom-server-express](https://github.com/zeit/next.js/tree/canary/examples/custom-server-express)
- [async-labs/saas - NextJS with custom server](https://github.com/async-labs/saas/tree/master/app)

### Custom Server TypeScript

Resources:

- [next.js/examples/custom-server-typescript](https://github.com/zeit/next.js/tree/canary/examples/custom-server-typescript)
- [ts-node](https://github.com/TypeStrong/ts-node)
