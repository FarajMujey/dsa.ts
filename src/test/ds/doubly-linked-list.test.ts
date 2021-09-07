import DoublyLinkedList from '../../ds/doubly-linked-list'

const dll = new DoublyLinkedList<string>()
dll.insert('foo', 0)
dll.insert('bar', 100)
dll.insert('bb', 2)
dll.push('bbb')
dll.push('via')

console.log(dll.removeAt(1))
console.log(dll.removeAt(0))
console.log(dll.removeAt(dll.size() - 1))
console.log(dll + '')
