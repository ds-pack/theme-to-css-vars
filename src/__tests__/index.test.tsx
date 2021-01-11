import themeToCSSVars from '../index'

test('happy path', () => {
  let vars = {}
  let theme = {
    colors: {
      blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
    },
  }
  let resultingTheme = themeToCSSVars(theme, vars)

  expect(resultingTheme).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "blue": Array [
          "var(--colors-blue-0, cadetblue)",
          "var(--colors-blue-1, steelblue)",
          "var(--colors-blue-2, cornflowerblue)",
        ],
      },
    }
  `)
  expect(vars).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "blue": Object {
          "--colors-blue-0": "cadetblue",
          "--colors-blue-1": "steelblue",
          "--colors-blue-2": "cornflowerblue",
        },
      },
    }
  `)
})

test('works with getters', () => {
  let vars = {}
  let theme = {
    colors: {
      blue: ['cadetblue', 'steelblue', 'cornflowerblue'],
      get primary() {
        return this.blue[2]
      },
    },
  }
  let resultingTheme = themeToCSSVars(theme, vars)
  expect(resultingTheme).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "blue": Array [
          "var(--colors-blue-0, cadetblue)",
          "var(--colors-blue-1, steelblue)",
          "var(--colors-blue-2, cornflowerblue)",
        ],
        "primary": "var(--colors-primary, cornflowerblue)",
      },
    }
  `)
  expect(vars).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "--colors-primary": "cornflowerblue",
        "blue": Object {
          "--colors-blue-0": "cadetblue",
          "--colors-blue-1": "steelblue",
          "--colors-blue-2": "cornflowerblue",
        },
      },
    }
  `)
})
