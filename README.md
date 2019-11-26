# eslint-plugin-immer-reducer

This plugin is made to complement the [immer-reducer](https://github.com/esamattis/immer-reducer#readme) package.

To use it:

```bash
yarn add -D eslint-plugin-immer-reducer
```

Then, edit your `.eslintrc.js` file and add in `'plugin:immer-reducer/recommended'` into your `extends` section:

```js
// example .eslintrc.js file

module.exports = {
  env: {
    node: true,
    browser: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",

    // this plugin
    "plugin:immer-reducer/recommended"
  ]
};
```

## What does this do?

The recommended config enables the one rule this plugin currently has: `immer-reducer/no-optional-or-default-value-params`.

This rule disallows having optional parameters or parameters with default values in immer-reducer extended classes. See [the warning in the main immer-reducer repo](https://github.com/esamattis/immer-reducer#-integrating-with-the-redux-ecosystem) for why this is necessary.
