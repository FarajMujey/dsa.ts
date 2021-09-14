export function defaultCompareFunction(a: any, b: any): Compare {
  if (a === b) return Compare.EQUAL
  return a > b ? Compare.LARGE_THAN : Compare.LESS_THAN
}

export enum Compare {
  LESS_THAN,
  LARGE_THAN,
  EQUAL,
}
