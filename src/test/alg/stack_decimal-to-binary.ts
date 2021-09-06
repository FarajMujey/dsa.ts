import Stack from '../../ds/stack'
export const decimalToBinary = (decimal: number): string => {
  const stack = new Stack<string>()
  let n: number = decimal
  let binaryStr: string = ''
  while (n > 0) {
    stack.push((n % 2) + '')
    n = Math.floor(n / 2)
  }
  while (!stack.isEmpty()) {
    binaryStr += stack.pop()
  }
  return binaryStr
}
