import CircularLinkedList from '../../ds/circular-linked-list'

const cll = new CircularLinkedList()

cll.insert('a', 0)
cll.insert('b', 1)
cll.insert('c', 0)
cll.push('d')

console.log('' + cll)

console.log(cll.removeAt(0))
console.log('' + cll)
