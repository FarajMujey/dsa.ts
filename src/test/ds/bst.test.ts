import BinarySearchTree from '../../ds/binary-search-tree'

let bst = new BinarySearchTree<number>()

bst.insert(20)
bst.insert(18)
bst.insert(11)
bst.insert(8)
bst.insert(5)
bst.insert(1)
bst.insert(15)
bst.insert(82)
bst.insert(6)

bst.remove(82)

let res = ''
bst.postOrderTraverse((val: number) => {
  res += val + ', '
})

res = res.substring(0, res.length - 2)

console.log(res)

console.log('min',bst.min())
console.log('max',bst.max())

console.log(bst.search(0))
