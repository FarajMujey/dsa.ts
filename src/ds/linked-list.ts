import { defaultEqualFunction } from '../util/defaultEqualFunction'

export default class LinkedList<T> {
  protected count: number
  protected head: Node<T>
  protected equalFn: Function

  constructor(equalFn = defaultEqualFunction) {
    this.count = 0
    this.head = undefined
    this.equalFn = equalFn
  }

  [Symbol.iterator]() {
    let current = this.head
    return {
      next() {
        if (current) {
          let res = current
          current = current.next
          return { done: false, value: res.element }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element
   */
  push(element: T) {
    let node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  /**
   * 在链表的指定位置插入一个新的元素
   * @param element
   * @param position
   */
  insert(element: T, position: number) {
    position = position > this.count ? this.count : position
    let newborn: Node<T>
    switch (true) {
      case position < 0:
        throw new Error('invalid position')
      case position === 0:
        newborn = new Node<T>(element, this.head)
        this.head = newborn
        this.count++
      case position === this.count:
        this.push(element)
        break
      default:
        let previous = this.getNodeAt(position - 1),
          current = previous.next
        newborn = new Node(element, current)
        previous.next = newborn
        this.count++
    }
  }

  /**
   * 获取第一个元素
   * @return T
   */
  getHead(): T {
    return this.head.element
  }

  /**
   * 返回链表中特点位置的元素。如果链表中不存在这样的元素，则返回undefined
   * @param index
   */
  getElementAt(index: number): T {
    if (index < 0 || index >= this.count) return undefined
    let current = this.head
    for (let i = 0; i < this.count && current; i++) {
      current = current.next
    }
    return current.element
  }

  /**
   * 从链表中移除一个元素
   * @param element
   */
  remove(element: T) {
    let current = this.head,
      previous: Node<T>
    while (current) {
      previous = current
      current = current.next
      if (this.equalFn(current.element, element)) break
    }
    previous.next = current.next
    this.count--
  }

  /**
   * 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @param element
   */
  indexOf(element: T) {
    let current = this.head
    for (let i = 0; i < this.count && current; i++) {
      if (this.equalFn(current.element, element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  /**
   * 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @param index
   * @return 移除的元素
   */
  removeAt(index: number): T {
    if (index < 0 || index >= this.count) return undefined
    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      let previous = this.getNodeAt(index - 1)
      current = previous.next
      // 将previous和current的下一项连接起来，跳过current
      previous.next = current.next
    }
    this.count--
    return current.element
  }

  /**
   * 返回链表是否为空
   * @return boolean
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 返回链表内包含的元素的个数
   * @return size
   */
  size(): number {
    return this.count
  }

  /**
   * 返回表示这个那个链表的字符串
   * @return string
   */
  toString() {
    return [...this].join(' -> ')
  }

  /**
   *  返回目标元素Node
   * @param index 元素的下标
   * @returns
   */
  protected getNodeAt(index: number): Node<T> {
    if (index < 0 || index >= this.count) return undefined
    let current = this.head
    for (let i = 0; i < index && current; i++) {
      current = current.next
    }
    return current
  }
}

export class Node<T> {
  public element: T
  public next: Node<T> | undefined
  constructor(element: T, next: Node<T> = undefined) {
    this.element = element
    this.next = next
  }
}
