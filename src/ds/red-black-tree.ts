import { Compare } from '../util/defaultCompareFunction'
import BinarySearchTree, { Node } from './binary-search-tree'

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RBNode<T>
  insert(key: T) {
    if (this.root == null) {
      this.root = new RBNode(key)
      this.root.color = Color.BLACK
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
    }
  }

  insertNode(node: RBNode<T>, key: T): RBNode<T> {
    switch (this.compareFn(key, node.value)) {
      case Compare.LESS_THAN:
        if (node.left == null) {
          node.left = new RBNode(key)
          node.left.parent = node
          return node.left
        } else {
          return this.insertNode(node.left, key)
        }
      case Compare.LARGE_THAN:
        if (node.right == null) {
          node.right = new RBNode(key)
          node.right.parent = node
          return node.right
        } else {
          return this.insertNode(node.right, key)
        }
      default:
        // 相等的情况下插入到节点的右边
        return this.insertNode(node.right, key)
    }
  }

  fixTreeProperties(node: RBNode<T>) {}
}

export class RBNode<T> extends Node<T> {
  public color: Color
  public parent: RBNode<T>
  public left: RBNode<T>
  public right: RBNode<T>
  constructor(value: T) {
    super(value)
    this.color = Color.RED
    this.parent = null
  }
}

export enum Color {
  RED,
  BLACK,
}
