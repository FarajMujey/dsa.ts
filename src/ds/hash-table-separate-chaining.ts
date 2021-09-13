import { defaultToStringFunction } from '../util/defaultToStringFunction'
import { Entry } from './dictionary'
import HashTable from './hash-table'
import LinkedList from './linked-list'

export default class HashTableSeparateChaining<K, V> extends HashTable<K, V> {
  constructor(toStrFn: Function = defaultToStringFunction) {
    super(toStrFn)
  }

  /**
   * 添加一个新kv
   * @param key
   * @param value
   * @returns 是否添加成功
   */
  put(key: K, value: V) {
    if (!(key && value)) return false
    const hash = this.hashCode(key)
    if (this.table[hash] == null) this.table[hash] = new LinkedList()
    this.table[hash].push(new Entry(key, value))
    return true
  }

  get(key: K): V {
    const hash = this.hashCode(key),
      ll = this.table[hash] as LinkedList<any>
    if (!ll || ll.isEmpty()) return undefined
    let current = ll.getHead()
    while (current) {
      if (current.element.key === key) return current.element.value
      current = current.next
    }
    return undefined
  }

  remove(key: K): V {
    const list = this.table[this.hashCode(key)] as LinkedList<any>
    if (!list || list.isEmpty) return undefined
    let current = list.getHead()
    while (current) {
      if (current.element.key === key) {
        const res = current.element
        list.remove(current.element)
        return res.value
      }
    }
    return undefined
  }
}
