import LinkedList from '../../ds/linked-list'

const linkedList = new LinkedList<string>()
linkedList.push('foo')
linkedList.push('bar')
linkedList.push('baz')
linkedList.push('gap')

linkedList.insert('bb', 2)
linkedList.insert('aa', 0)

linkedList.insert('asd', 100)
linkedList.removeAt(linkedList.size() - 1)
linkedList.remove('bb')

console.log('' + linkedList, linkedList.size())
