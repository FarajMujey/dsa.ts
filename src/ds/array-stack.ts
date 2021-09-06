/**
 * 使用数组实现栈
 */
class ArrayStack<T> {
  private _array: T[]
  constructor() {
    this._array = []
  }

  push(...elements: T[]): void {
    this._array.push(...elements)
  }

  pop(): T {
    return this._array.pop()
  }

  peek(): T {
    let len = this._array.length
    return this._array[len - 1]
  }

  isEmpty(): boolean {
    return this._array.length <= 0
  }

  clear(): void {
    this._array.length = 0
  }

  size(): number {
    return this._array.length
  }
}

export default ArrayStack
