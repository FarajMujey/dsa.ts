import { defaultToStringFunction } from '../util/defaultToStringFunction'
/**
 * 字典
 */
export default class Dictionary<K, V> {
  private toStrFn: Function
  private table: {} | any
  constructor(toStrFn: Function = defaultToStringFunction) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  set(key: K, value: V) {
    if (!(key && value)) throw new Error('Invalid Key or Value')
    this.table[this.toStrFn(key)] = new Entry(key, value)
  }

  hasKey(key: K): boolean {
    return this.table[this.toStrFn(key)] != null
  }

  remove(key: K): Entry<K, V> {
    const k = this.toStrFn(key)
    if (!this.hasKey(k)) return undefined
    let res = this.table[k]
    delete this.table[k]
    return res
  }

  get(key: K): V {
    let entry = this.table[this.toStrFn(key)]
    return entry == null ? undefined : entry.value
  }

  clear() {
    this.table = {}
  }

  entries(): Entry<K, V>[] {
    return Object.values(this.table)
  }

  size(): number {
    return this, this.entries().length
  }

  isEmpty(): boolean {
    return Object.is(this.table, {})
  }

  keys(): K[] {
    return this.entries().map((entry) => entry.key)
  }

  values(): V[] {
    return this.entries().map((entry) => entry.value)
  }

  foEach(fn: Function) {
    const entries = this.entries()
    for (let i = 0; i < entries.length; i++) {
      const res = fn(entries[i].key, entries[i].value)
      if (!res) break
    }
  }
}

export class Entry<K, V> {
  public key: K
  public value: V
  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  toString(): string {
    return `[${this.key.toString()}: ${this.value.toString()}]`
  }
}
