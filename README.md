# `@ds-pack/theme-to-css-vars`

_Note: looking for a better package name, if you have ideas see #1_

A utility package for transforming a css-in-js theme object from raw values to
CSS custom properties (CSS variables).

## Installation:

```sh
yarn add @ds-pack/theme-to-css-vars
```

## Usage:

```tsx
import themeToCSSVars from '@ds-pack/theme-to-css-vars'

let cssVars = {}
let baseTheme = {
  colors: {
    blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
    get primary() {
      return this.blue[2]
    },
  },
}

let theme = themeToCSSVars(baseTheme, cssVars)

// theme ===
//   {
//     colors: {
//       blue: [
//         'var(--colors-blue-0, cadetblue)',
//         'var(--colors-blue-1, steelblue)',
//         'var(--colors-blue-2, cornflowerblue)',
//       ],
//     },
//   }

// cssVars ===
//   {
//     colors: {
//       blue: {
//         '--colors-blue-0': 'cadetblue',
//         '--colors-blue-1': 'steelblue',
//         '--colors-blue-2': 'cornflowerblue',
//       },
//     },
//   }
```

The utility function will return a new theme object that you can pass to your
`ThemeProvider` if you want to, additionally the function will mutate the
`cssVars` (second argument) to setup the css custom property mapping.

### Tools:

- Typescript
- Babel
- Jest
