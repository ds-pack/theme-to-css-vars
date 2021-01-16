# `@ds-pack/theme-to-css-vars`

_Note: looking for a better package name, if you have ideas see
[#1](https://github.com/ds-pack/theme-to-css-vars/issues/1)_

A utility package for transforming a css-in-js theme object from raw values to
CSS custom properties (CSS variables).

## Installation:

```sh
yarn add @ds-pack/theme-to-css-vars
```

## Usage:

```tsx
import themeToCSSVars from '@ds-pack/theme-to-css-vars'

let baseTheme = {
  colors: {
    blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
    get primary() {
      return this.blue[2]
    },
  },
}

let cssVariables = themeToCSSVars(baseTheme)

// cssVariables ===
//   [
//     ['--colors-blue-0', 'cadetblue' ],
//     ['--colors-blue-1', 'steelblue' ],
//     ['--colors-blue-2', 'cornflowerblue' ],
//   ]
```

The utility function will return an array of tuples representing the CSS
Variables for the theme.

### Tools:

- Typescript
- Babel
- Jest
