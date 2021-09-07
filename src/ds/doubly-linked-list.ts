import LinkedList, { Node } from './linked-list'
import { defaultEqualFunction } from '../util/defaultEqualFunction'

export default class DoublyLinkedList<T> extends LinkedList<T> {
  protected tail: DoublyNode<T>
  protected head: DoublyNode<T>
  constructor(equalFn = defaultEqualFunction) {
    super(equalFn)
    this.tail = undefined
    this.head = undefined
  }

  /**
   * 在任意位置插入元素
   * @param element 待插入的元素
   * @param position 任意位置
   * @returns 是否插入成功
   */
  insert(element: T, position: number): boolean {
    if (position < 0) throw new Error('Invalid position')
    position = position > this.count ? this.count : position
    const newborn = new DoublyNode(element)
    let current = this.head
    switch (true) {
      case !current:
        // 当链表为空时，直接将this.head设置为新生节点
        this.head = newborn
        this.tail = newborn
        break
      case position === 0:
        // 当添加的位置是第一个时
        current.prev = newborn
        newborn.next = current
        this.head = newborn
        break
      case position === this.count:
        current = this.tail
        current.next = newborn
        newborn.prev = current
        this.tail = newborn
        break
      default:
        // 在中间添加元素
        let previous = this.getNodeAt(position - 1) as DoublyNode<T>
        current = previous.next
        previous.next = newborn
        newborn.prev = previous
        newborn.next = current
        current.prev = newborn
    }
    // 链表数量++
    this.count++
    return true
  }

  removeAt(index: number): T {
    if (index < 0 || index >= this.count) throw new Error('invalid index')
    let current = this.head
    if (index === 0) {
      current = current
      this.head = current.next
      this.head.prev = undefined
    } else if (index === this.count - 1) {
      current = this.tail
      this.tail = current.prev
      this.tail.next = undefined
    } else {
      let previous = this.getNodeAt(index - 1)
      current = previous.next
      previous.next = current.next
      current.next.prev = previous
    }
    this.count--
    return current.element
  }

  push(element: T) {
    if (!this.head) {
      let newborn = new DoublyNode(element)
      this.head = newborn
      this.tail = newborn
    } else {
      let newborn = new DoublyNode(element, undefined, this.tail)
      this.tail.next = newborn
      this.tail = newborn
    }
    this.count++
  }

  /**
   *  返回目标元素Node
   * @param index 元素的下标
   * @returns
   */
  protected getNodeAt(index: number): DoublyNode<T> {
    if (index < 0 || index >= this.count) return undefined
    let current = this.count / 2 < index ? this.tail : this.head
    if (index > this.count / 2) {
      for (let i = this.count - 1; i > index && current; i--) {
        current = current.prev
      }
    } else {
      for (let i = 0; i < index && current; i++) {
        current = current.next
      }
    }
    return current
  }

  toString(): string {
    return [...this].join(' <-> ')
  }
}

export class DoublyNode<T> extends Node<T> {
  public prev: DoublyNode<T>
  public next: DoublyNode<T>
  constructor(
    element: T,
    next: DoublyNode<T> = undefined,
    prev: DoublyNode<T> = undefined
  ) {
    super(element, next)
    this.prev = prev
  }
}
