import AVLTree from '../../ds/avl-tree'

let avl = new AVLTree()

avl.insert(10)
avl.insert(15)
avl.insert(30)
avl.insert(35)
avl.insert(6)


avl.inOrderTraverse((val: number) => {
  console.log(val)
})
