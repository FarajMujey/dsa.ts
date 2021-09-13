import { defaultToStringFunction } from '../util/defaultToStringFunction'
import { Entry } from './dictionary'

export default class HashTable<K, V> {
  private toStrFn: Function
  private table: any

  constructor(toStrFn: Function = defaultToStringFunction) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  /**
   * 在hashTable中加入新指
   * @param key
   * @param value
   * @returns 是否加入成功
   */
  set(key: K, value: V): boolean {
    if (!(key && value)) return false
    let hash = this.hashCode(key)
    this.table[hash] = new Entry(key, value)
    return true
  }

  /**
   * 返回key对应的value
   * @param key
   * @returns value
   */
  get(key: K): V {
    const entry = this.table[this.hashCode(key)]
    return entry == null ? undefined : entry.value
  }

  /**
   * 在哈希表中移除key对应的kv
   * @param key
   * @returns 被移除的value
   */
  remove(key: K): V {
    const hash = this.hashCode(key),
      entry = this.table[hash]
    if (entry != null) {
      delete this.table[hash]
      return entry.value
    }
    return undefined
  }

  /**
   * 散列函数
   * @param key
   * @returns hashCode
   */
  private loseLoseHashCode(key: any): number {
    if (typeof key === 'number') return key
    const tableKey: string = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  /**
   * 返回this.loseLoseHashCode
   * @param key
   * @returns hashCode
   */
  hashCode(key: K) {
    return this.loseLoseHashCode(key)
  }

  toString(): string {
    if (this.table === {}) return ''
    let res =  ''
    for(let prop in this.table) {
      if(this.table[prop] != null)
        res = `${res} ${this.table[prop].toString()}`
    }
    return `{${res}}`
  }
}
