import HashTable from '../../ds/hash-table'

const hashTable = new HashTable<string, number>()

hashTable.set('foo', 200)
hashTable.set('bar', 400)
hashTable.set('baz', 18)

console.log(hashTable + '')
