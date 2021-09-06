import Deque from '../../ds/deque'
export const palindromeChecker = (str: string): boolean => {
  if (!str) return false
  let head: string, tail: string
  let flag = true
  const deque = new Deque<string>()

  // 去除空格、转换成小写
  str = str.toLowerCase().trim().split(' ').join('')
  for (let char of str) {
    deque.addTail(char)
  }
  while (deque.size() > 1) {
    head = deque.getHead()
    tail = deque.getTail()
    if (head !== tail) {
      flag = false
      break
    }
  }
  return flag
}
