import Dictionary from '../../ds/dictionary'

let dic = new Dictionary<string, string>()

dic.set('key1', 'v1')
dic.set('key2', 'v2')
dic.set('key3', 'v3')

dic.set('key3', 'v4')
// dic.clear()
dic.remove('key2')

console.log(dic.values())

console.log(dic.get('key1'))

console.log(dic.entries())
