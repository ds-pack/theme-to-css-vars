export default function themeToCSSVars(
  theme: object,
  vars: object = {},
  providedKey: string | void = undefined,
): object {
  return Object.entries(theme).reduce((newTheme, [key, val]) => {
    let keyPath = providedKey ? `${providedKey}-${key}` : key
    if (typeof val === 'function') {
      let resultingVal = val.call(theme)
      if (typeof resultingVal === 'object' && !Array.isArray(resultingVal)) {
        vars[key] = {}
        return {
          ...newTheme,
          [key]: themeToCSSVars(resultingVal, vars[key], keyPath),
        }
      }
      if (Array.isArray(resultingVal)) {
        vars[key] = {}
        return {
          ...newTheme,
          [key]: resultingVal.map((v, idx) => {
            vars[key][`--${keyPath}-${idx}`] = v
            return `var(--${keyPath}-${idx}, ${v})`
          }),
        }
      }
      if (
        typeof resultingVal === 'string' ||
        typeof resultingVal === 'number'
      ) {
        vars[`--${keyPath}`] = resultingVal
        return {
          ...newTheme,
          [key]: `var(--${keyPath}, ${resultingVal})`,
        }
      }
    }
    if (typeof val === 'object' && !Array.isArray(val)) {
      vars[key] = {}
      return {
        ...newTheme,
        [key]: themeToCSSVars(val, vars[key], keyPath),
      }
    }
    if (Array.isArray(val)) {
      vars[key] = {}
      return {
        ...newTheme,
        [key]: val.map((v, idx) => {
          vars[key][`--${keyPath}-${idx}`] = v
          return `var(--${keyPath}-${idx}, ${v})`
        }),
      }
    }
    if (typeof val === 'string' || typeof val === 'number') {
      vars[`--${keyPath}`] = val
      return {
        ...newTheme,
        [key]: `var(--${keyPath}, ${val})`,
      }
    }
  }, {})
}
