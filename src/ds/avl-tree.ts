import { Compare, defaultCompareFunction } from '../util/defaultCompareFunction'
import BinarySearchTree, { Node } from './binary-search-tree'

/**
 * AVL树是一种自平衡树。
 * 添加或移除节点时，AVL树会尝试保持自平衡。
 * 任意一个节点（不论深度）的左子树和右子树高度最多相差1。
 * 添加或移除节点时，AVL树会尽可能尝试转换为完全树。
 */
export default class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn: Function = defaultCompareFunction) {
    super(compareFn)
  }

  /**
   * 获得树或子树的高度
   * @param node 子树的根节点
   * @returns 树或子树的高度
   */
  private getNodeHeight(node: Node<T>): number {
    if (node == null) return -1
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    )
  }

  /**
   * 获得树或子树的平衡因子
   * @param node 子树的根节点
   * @returns BalanceFactor
   */
  private getBalanceFactor(node: Node<T>) {
    let heightDiff =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDiff) {
      case -2:
        return BalanceFactor.UNBALANCE_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT
      case 2:
        return BalanceFactor.UNBALANCE_LEFT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  /**
   * 向右单旋转
   * @param node
   */
  rotationLL(node: Node<T>) {
    let tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  /**
   * 向左单旋转
   * @param node
   */
  rotationRR(node: Node<T>) {
    let tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  /**
   * 向右的双旋
   * @param node
   * @returns node
   */
  rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  /**
   * 像左的双旋转
   * @param node
   * @returns
   */
  rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  /**
   * 向AVL树插入节点
   * @param key: T
   */
  insert(key: T) {
    this.root = this.insertNode(this.root, key)
  }

  protected insertNode(node: Node<T>, key: T): Node<T> {
    if (node == null) return new Node(key)
    else if (this.compareFn(key, node.value) === Compare.LARGE_THAN)
      node.right = this.insertNode(node.right, key)
    else if (this.compareFn(key, node.value) === Compare.LESS_THAN)
      node.left = this.insertNode(node.left, key)
    else return node
    const balanceFactor = this.getBalanceFactor(node)
    switch (balanceFactor) {
      case BalanceFactor.UNBALANCE_LEFT:
        if (this.compareFn(key, node.left.value) === Compare.LESS_THAN)
          node = this.rotationLL(node)
        else return this.rotationLR(node)
      case BalanceFactor.UNBALANCE_RIGHT:
        if (this.compareFn(key, node.right.value) === Compare.LARGE_THAN)
          node = this.rotationRR(node)
        else return this.rotationRL(node)
    }
    return node
  }

  protected removeNode(node: Node<T>, key: T): Node<T> {
    node = super.removeNode(node, key)
    if (node == null) return node
    switch (this.getBalanceFactor(node)) {
      case BalanceFactor.UNBALANCE_LEFT:
        const balanceFactor_left = this.getBalanceFactor(node.left)
        if (
          balanceFactor_left === BalanceFactor.BALANCED ||
          balanceFactor_left === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT
        )
          return this.rotationLL(node)
        if (balanceFactor_left === BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT)
          return this.rotationLR(node.left)
      case BalanceFactor.UNBALANCE_RIGHT:
        const balanceFactor_right = this.getBalanceFactor(node.right)
        if (
          balanceFactor_right === BalanceFactor.BALANCED ||
          balanceFactor_right === BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT
        )
          return this.rotationRR(node.right)
        if (balanceFactor_right === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT)
          return this.rotationRL(node.right)
    }
    return node
  }
}

enum BalanceFactor {
  UNBALANCE_RIGHT,
  UNBALANCE_LEFT,
  SLIGHTLY_UNBALANCE_RIGHT,
  SLIGHTLY_UNBALANCE_LEFT,
  BALANCED,
}
