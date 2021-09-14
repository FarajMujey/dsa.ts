import { Compare, defaultCompareFunction } from '../util/defaultCompareFunction'
/**
 * 二叉搜索树
 *  insert(key)：向树中插入一个新的键。
 *  search(key)：在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
 *  inOrderTraverse()：通过中序遍历方式遍历所有节点。
 *  preOrderTraverse()：通过先序遍历方式遍历所有节点。
 *  postOrderTraverse()：通过后序遍历方式遍历所有节点。
 *  min()：返回树中最小的值/键。
 *  max()：返回树中最大的值/键。
 *  remove(key)：从树中移除某个键。
 */
export default class BinarySearchTree<T> {
  private root: Node<T>
  private compareFn: Function

  constructor(compareFn: Function = defaultCompareFunction) {
    this.root = undefined
    this.compareFn = compareFn
  }

  /**
   * 向树中插入一个新的键
   * @param key
   */
  insert(key: T) {
    if (this.root == null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  protected insertNode(node: Node<T>, key: T) {
    if (this.compareFn(node.value, key) === Compare.LARGE_THAN) {
      // insert to left node
      if (node.left == null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      // insert to right node
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  /**
   * 在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
   * @param key
   * @returns 返回节点是否存在
   */
  search(key: T): boolean {
    return this.searchNode(this.root, key)
  }

  private searchNode(node: Node<T>, key: T): boolean {
    if (node == null) return false
    switch (this.compareFn(key, node.value)) {
      case Compare.LESS_THAN:
        return this.searchNode(node.left, key)
      case Compare.LARGE_THAN:
        return this.searchNode(node.right, key)
      case Compare.EQUAL:
        return true
    }
  }

  /**
   * 通过中序遍历方式遍历所有节点
   */
  inOrderTraverse(cb: Function) {
    this.doInOrderTraverse(this.root, cb)
  }

  private doInOrderTraverse(node: Node<T>, cb: Function) {
    if (node == null) return
    this.doInOrderTraverse(node.left, cb)
    cb(node.value)
    this.doInOrderTraverse(node.right, cb)
  }

  /**
   * 通过先序遍历方式遍历所有节点
   */
  preOrderTraverse(cb: Function) {
    this.doPreOrder(this.root, cb)
  }

  private doPreOrder(node: Node<T>, cb: Function) {
    if (node == null) return
    cb(node.value)
    this.doPreOrder(node.left, cb)
    this.doPreOrder(node.right, cb)
  }

  /**
   * 通过后序遍历方式遍历所有节点
   */
  postOrderTraverse(cb: Function) {
    this.doPostOrder(this.root, cb)
  }

  private doPostOrder(node: Node<T>, cb: Function) {
    if (node == null) return
    this.doPostOrder(node.left, cb)
    this.doPostOrder(node.right, cb)
    cb(node.value)
  }

  /**
   * 返回树中最小的值/键。
   * @returns min value
   */
  min(): T {
    return this.minNode(this.root)
  }

  private minNode(node: Node<T>): T {
    let current = node
    if (current != null && current.left != null) current = current.left
    return current.value
  }

  /**
   * 返回树中最大的值/键。
   * @returns max value
   */
  max(): T {
    return this.maxNode(this.root)
  }

  private maxNode(node: Node<T>): T {
    let current = node
    if (current != null && current.right != null) current = current.right
    return current.value
  }

  /**
   * 从树中移除某个键
   * @param key
   */
  remove(key: T) {
    this.root = this.removeNode(this.root, key)
  }

  private removeNode(node: Node<T>, key: T): Node<T> {
    if (node == null) return null
    switch (this.compareFn(key, node.value)) {
      case Compare.LARGE_THAN:
        node.right = this.removeNode(node.right, key)
        return node
      case Compare.LESS_THAN:
        node.left = this.removeNode(node.left, key)
        return node
      case Compare.EQUAL:
        if (node.right == null && node.left == null) {
          node = null
         return node
        }
        if (node.right == null) {
          node = node.left
          return node
        }
        if (node.left == null) {
          node = node.right
          return node
        }
        console.log(node)
        const aux = this.minNode(node.right)
        node.value = aux
        node.right = this.removeNode(node.right, aux)
        return node
    }
  }
}

export class Node<E> {
  public value: E
  public left: Node<E>
  public right: Node<E>

  constructor(value: E) {
    this.value = value
    this.left = null
    this.right = null
  }
}
