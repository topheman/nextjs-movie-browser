# nextjs-movie-browser/notes

- [TypeScript support](#typescript-support)
- [Jest support](#jest-support)
- [Custom Server](#custom-server)
  - [Custom Server JavaScript](#custom-server-javascript)
  - [Custom Server TypeScript](#custom-server-typescript)
- [i18n - Internationalization](#i18n---internationalization)
  - [next-i18next](#next-i18next)
  - [Features missing](#features-missing)
    - [Handle missing language](#handle-missing-language)
    - [Override language codes with variations](#override-language-codes-with-variations)
  - [i18n - Implementation](#i18n---implementation)
  - [i18n - Unit tests](#i18n---unit-tests)
- [Heroku](#heroku)
- [Tslint](#tslint)

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
- [deptno/next.js-typescript-starter-kit](https://github.com/deptno/next.js-typescript-starter-kit)
- [Limitations of using @babel/preset-typescript](https://kulshekhar.github.io/ts-jest/user/babel7-or-ts)

## Jest support

Since transpiling is done with babel in development, in test, we do the same with [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest).

- The "test" section of the [`.babelrc`](.babelrc) file will be used
- The `jest.config.js` file is taken in account by default by jest
- I configured the `src/setupTests.js` file like in CRA to be loaded before tests start

With shipped version of `babel-core` (different packages using v6 - not `@babel/core`), I had the following error:

> Test suite failed to run
>
> Plugin 0 specified in "\~/nextjs-movie-browser/node_modules/next/babel.js" provided an invalid property of "default" (While processing preset: "\~/nextjs-movie-browser/node_modules/next/babel.js")

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

## i18n - Internationalization

I'm relying on [next-i18next](https://www.npmjs.com/package/next-i18next), a next.js plugin based on [i18next](https://www.i18next.com/) and [react-i18next](https://github.com/i18next/react-i18next).

### next-i18next

It handles SSR out of the box as well as namespace codesplitting (only sends down to the client the translations that it needs).

### Features missing

#### Handle missing language

The [tmdb API](https://developers.themoviedb.org/3) offers a lot of languages. I wanted to be able to consume all of them without having to translate my UI for each of them. I managed to properly fallback the UI to a default language (english) when translations were missing but still render the API content in the language the user asked for (all that with SSR working).

#### Override language codes with variations

The translation files of your UI are in `static/locales/${languageCode}/`.

For the UI, I wanted to be able to handle language codes like "en", "fr" ... ([ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).

For the API calls, since it handles it, I wanted to handle more specific codes: a combination of [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (languages) and [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (countries), to be able to be more granular - some languages are available in different regions around the world, we might want to expose specific versions. Example:

- "fr-FR" is french
- "pt-PT" is portuguese
- "pt-BR" is portuguese (bresilian variation)

[Resource about language codes](https://developers.themoviedb.org/3/getting-started/languages)

### i18n - Implementation

Reusable code is in [src/services/i18n](src/services/i18n).

When you use `next-i18next`, you wrap your root page (`_app.tsx`) with the HOC `appWithTranslation` which will pass via context the i18n instance.

Then you use the `withNamespaces` HOC to expose `t` (the translate function) to the component you want to translate.

And I added a specific [`LanguageManager`](src/services/i18n/LanguageManager.tsx) that lets you manage language codes / change language on the fly.

### i18n - Unit tests

You can test a translated component by using the [`renderI18nNamespacesWrappedComponent`](src/testUtils.tsx) utility which mocks `appWithTranslation`.

You can test a translated component that also uses the specific feature I added like language codes and switch language with [`renderI18nWithLanguageManagerProvider`](src/testUtils.tsx).

Anyway, you'll have to mock `withNamespaces` from `next-i18next` with my own [`withNamespacesMock`](src/services/i18n/NamespaceMock.tsx):

```js
// src/setupTests.js
const { withNamespacesMock } = require("./services/i18n/NamespaceMock");
jest.mock("react-i18next", () => ({
  withNamespaces: withNamespacesMock
}));
```

Note: If you use shallow rendering (like Enzyme), you don't need everything I explained above. Since you will be rendering only ONE component deep, you can settle with exporting undecorated version of your components (without `withNamespaces`) and inject a stub of `t` prop - [read more](https://react.i18next.com/misc/testing).

Since I'm using [react-testing-library](https://github.com/kentcdodds/react-testing-library), I'm rendering a whole tree in jsdom, which is why I had to mock the context to pass the `i18n` instance accross the whole tree.

## Http Mocking

When you test a code base that contains calls to an external api server, you have to make a choice in your [test strategy](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies).

### Testing strategies

#### Without mocks

- You're making real api calls, so you're also testing the server
  - 👍 Guaranteed to work in production, once tests pass
  - 👎 Much slower, false negative (network failures ...)
- You don't need to create/record any fixtures nor setup a mocking system

#### With mocks

- You're not making api calls, so
  - 👍 Very fast, determinist (response won't change unless you change the mock)
  - 👎 Result may differ in production if mocks aren't up to date

### Solution

I wrote a library [axios-mock-manager](./src/libs/axios-mock-manager) to solve this problem.

## Heroku

### Trigger build on deploy

In ordre to trigger the build of your Next app on each deploy, add the following:

```json
{
  "scripts": {
    "heroku-postbuild": "next build"
  }
}
```

Sources:

- [Heroku docs](https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps)
- [mars/heroku-nextjs](https://github.com/mars/heroku-nextjs)

### Heroku Environment variables

- `heroku config:set NPM_CONFIG_PRODUCTION=false`: Make sure to also download dev dependencies (like babel, typescript ...) or hoist them in your regular dependencies.
- `heroku config:set NEXTJS_APP_CLIENT_TMDB_API_KEY=your-api-key`: Set your api key

## Tslint

[Tslint](https://palantir.github.io/tslint/) is a linter for both `.ts` and `.js` files, if you know [eslint](https://eslint.org/), it works the same way (with configurable rules and sharable configurations).

On this project, I'm using the following configs:

- [tslint:recommended](https://palantir.github.io/tslint/usage/configuration/#configuration-presets)
- [tslint-config-airbnb](https://www.npmjs.com/package/tslint-config-airbnb) - a TypeScript version of the eslint-config-airbnb
- [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier) - a config that disables all conflicting rules between Tslint and prettier (Tslint is for linting, prettier is for formatting)

### Lint JavaScript files with Tslint

To your [tslint.json](tslint.json) file, add:

```json
{
  "jsRules": true
}
```

Make sure you lint the js files in your linting script in your [package.json](package.json):

```json
{
  "scripts": {
    "lint": "npx tslint --project tsconfig.json -c tslint.json '**/*.{js,ts,tsx}'"
  }
}
```

### Get linting error feedback in vscode

Install the [Tslint plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin).

If you want feedback for js files as well as for ts ones, to your [.vscode/settings.json](.vscode/settings.json), add:

```json
{
  "tslint.jsEnable": true
}
```
