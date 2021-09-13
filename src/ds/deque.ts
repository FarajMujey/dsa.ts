/**
 * 双端队列
 */
export default class Deque<T> {
  private items: any
  private lowestCount: number
  private count: number

  constructor() {
    this.items = {}
    this.lowestCount = 0
    this.count = 0
  }

  /**
   * 向队列的尾端添加元素
   * @param element
   * @returns size
   */
  addTail(element: T): number {
    this.items[this.count++] = element
    return this.size()
  }

  /**
   * 向队列头部添加元素
   * @param element
   * @returns size
   */
  addHead(element: T): number {
    if (this.count === 0) {
      this.addTail(element)
    } else if (this.lowestCount > 0) {
      this.items[--this.lowestCount] = element
    } else {
      for (let i = this.count; i > this.lowestCount; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.items[0] = element
    }
    return this.size()
  }

  /**
   * 返回队列尾部的元素
   * @returns T
   */
  getTail(): T {
    if (this.isEmpty()) return undefined
    this.count--
    const res = this.items[this.count]
    delete this.items[this.count]
    return res
  }

  /**
   * 返回头部元素
   * @returns T
   */
  getHead(): T {
    if (this.isEmpty()) return undefined
    const res = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return res
  }

  /**
   * 看一下队列首部的元素
   * @returns T
   */
  peekHead(): T {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }

  /**
   * 看一下队列尾部的元素
   * @return T
   */
  peekTail(): T {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }

  /**
   * 返回元素的个数
   * @returns number
   */
  size(): number {
    return this.count - this.lowestCount
  }

  /**
   * 判断队列是否为空
   */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /**
   * 清空队列
   */
  clear(): void {
    this.items = {}
    this.count = this.lowestCount = 0
  }

  toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    let res = this.items[this.lowestCount].toString()
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      res = `${res}, ${this.items[i].toString()}`
    }
    return res
  }
}
