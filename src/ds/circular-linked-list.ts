import { defaultEqualFunction } from './../util/defaultEqualFunction'
import LinkedList, { Node } from './linked-list'
export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(equalFn = defaultEqualFunction) {
    super(equalFn)
  }

  [Symbol.iterator]() {
    let current = this.head
    let _self = this
    let i = 0
    return {
      next() {
        if (i++ < _self.count) {
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
   * 在指定的位置插入元素
   * @param element 待插入的元素
   * @param position 插入元素的位置
   */
  insert(element: T, position: number) {
    if (position < 0) throw new Error('invalid positive')
    position = position > this.count ? this.count : position
    let current = this.head
    const newborn = new Node(element)
    switch (position) {
      case 0:
        if (this.head) {
          newborn.next = this.head
          current = this.getNodeAt(this.count - 1)
          this.head = newborn
          current.next = newborn
        } else {
          this.head = newborn
        }
        break
      default:
        const previous = this.getNodeAt(position - 1)
        current = previous.next
        newborn.next = current
        previous.next = newborn
    }
    this.count++
  }

  /**
   * 在链表末尾添加元素
   * @param element 待添加的元素
   */
  push(element: T) {
    this.insert(element, this.count)
  }

  /**
   * 移除任意位置的元素
   * @param position 位置
   */
  removeAt(position: number): T {
    if (position < 0 || position >= this.count)
      throw new Error('Invalid position')
    let current = this.head
    if (position === 0) {
      if (this.size() === 1) {
        this.head = undefined
      } else {
        const lastNode = this.getNodeAt(this.count - 1)
        lastNode.next = current.next
        this.head = current.next
      }
    } else {
      const previous = this.getNodeAt(position - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
    return current.element
  }
}
