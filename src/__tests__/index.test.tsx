import themeToCSSVars from '../index'

test('happy path', () => {
  let theme = {
    colors: {
      blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
    },
  }
  let vars = themeToCSSVars(theme)

  expect(vars).toMatchInlineSnapshot(`
    Array [
      Array [
        "--colors-blue-0",
        "cadetblue",
      ],
      Array [
        "--colors-blue-1",
        "steelblue",
      ],
      Array [
        "--colors-blue-2",
        "cornflowerblue",
      ],
    ]
  `)
})

test('works with getters', () => {
  let theme = {
    colors: {
      blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
      get primary() {
        return this.blue[2]
      },
    },
  }
  let vars = themeToCSSVars(theme)
  expect(vars).toMatchInlineSnapshot(`
    Array [
      Array [
        "--colors-blue-0",
        "cadetblue",
      ],
      Array [
        "--colors-blue-1",
        "steelblue",
      ],
      Array [
        "--colors-blue-2",
        "cornflowerblue",
      ],
      Array [
        "--colors-primary",
        "cornflowerblue",
      ],
    ]
  `)
})

test('works with nested paths', () => {
  let theme = {
    colors: {
      blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
      get primary() {
        return this.blue[2]
      },
    },
    buttons: {
      primary: {
        background: 'cornflowerblue',
        color: 'white',
        border: 'solid 2px',
      },
    },
  }
  let vars = themeToCSSVars(theme)
  expect(vars).toMatchInlineSnapshot(`
    Array [
      Array [
        "--colors-blue-0",
        "cadetblue",
      ],
      Array [
        "--colors-blue-1",
        "steelblue",
      ],
      Array [
        "--colors-blue-2",
        "cornflowerblue",
      ],
      Array [
        "--colors-primary",
        "cornflowerblue",
      ],
      Array [
        "--buttons-primary-background",
        "cornflowerblue",
      ],
      Array [
        "--buttons-primary-color",
        "white",
      ],
      Array [
        "--buttons-primary-border",
        "solid 2px",
      ],
    ]
  `)
})
