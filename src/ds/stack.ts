/**
 * 使用一个对象来实现栈
 */
class Stack<T> {
  private items: {}
  private count: number
  constructor() {
    this.items = {}
    this.count = 0
  }

  push(element: T) {
    this.items[this.count++] = element
  }

  pop(): T {
    if (this.isEmpty()) return undefined
    this.count--
    const res = this.items[this.count]
    delete this.items[this.count]
    return res
  }

  peek(): T {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }

  isEmpty(): boolean {
    return this.count <= 0
  }

  clear(): void {
    this.items = {}
    this.count = 0
  }

  toString() {
    if (this.isEmpty()) return 'stack is empty!'
    let res = this.items[0].toString()
    for (let i = 1; i < this.count; i++) {
      res = `${res}, ${this.items[i].toString()}`
    }
    return res
  }
}

export default Stack
