type CSSVars = Array<[string, string | number]>

export default function themeToCSSVars(
  theme: object,
  vars: CSSVars = [],
  providedKey: string | void = undefined,
): CSSVars {
  Object.entries(theme).forEach(([key, val]) => {
    let keyPath = providedKey ? `${providedKey}-${key}` : key
    if (typeof val === 'function') {
      let resultingVal = val.call(theme)
      if (typeof resultingVal === 'object' && !Array.isArray(resultingVal)) {
        themeToCSSVars(resultingVal, vars, keyPath)
      }
      if (Array.isArray(resultingVal)) {
        resultingVal.forEach((v, idx) => {
          vars.push([`--${keyPath}-${idx}`, v])
        })
      }
      if (
        typeof resultingVal === 'string' ||
        typeof resultingVal === 'number'
      ) {
        vars.push([`--${keyPath}`, resultingVal])
      }
    }
    if (typeof val === 'object' && !Array.isArray(val)) {
      themeToCSSVars(val, vars, keyPath)
    }
    if (Array.isArray(val)) {
      val.forEach((v, idx) => {
        vars.push([`--${keyPath}-${idx}`, v])
      })
    }
    if (typeof val === 'string' || typeof val === 'number') {
      vars.push([`--${keyPath}`, val])
    }
  })

  return vars
}
