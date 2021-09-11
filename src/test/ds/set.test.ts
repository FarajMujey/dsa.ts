import MySet from '../../ds/set'

const set = new MySet<string>()

set.add('abc')
set.add('bbc')
set.add('ace')
set.add('foo')
set.add('baz')
set.del('foo')
set.add('foo')

const set2 = new MySet<string>()

set2.add('ab18asnb')
set2.add('fo18asb')
set2.add('ba18asb')
set2.del('fo18asb')
set2.add('baz')

const set3 = set.difference(set2)

console.log(set3.values())