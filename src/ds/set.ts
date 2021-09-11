export default class MySet<T> {
  private items: any

  constructor() {
    this.items = {}
  }

  /**
   * 判断element是否存在
   * @param element
   * @returns element是否存在
   */
  has(element: T | string): boolean {
    return this.items.hasOwnProperty(element)
    // same as
    // return element in this.items
  }

  /**
   * 在集合中添加元素
   * 如果集合中不存在，就会在集合中添加元素并且返回true
   * 如果集合中存在，就会直接返回false，不会添加在集合中
   * @param element 待添加的元素
   * @returns
   */
  add(element: T): boolean {
    if (typeof element === 'object') {
      if (!this.has(JSON.stringify(element))) {
        this.items[JSON.stringify(element)] = element
        return true
      }
    }
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  /**
   *
   * @param element 代删除的元素
   * @returns
   */
  del(element: T): boolean {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  /**
   * 清空集合内的所有元素
   */
  clear(): void {
    this.items = {}
  }

  /**
   * 返回集合内元素的数量
   * @returns 集合内元素的数量
   */
  size(): number {
    // es6或以上
    // return Object.keys(this.items).length
    let count = 0
    for (let key in this.items) if (this.items.hasOwnProperty(key)) count++
    return count
  }

  /**
   * return all of the values if the set with a Array []
   * @returns the array of the values in the set
   */
  values() {
    // es6及以上
    // return Object.keys(this.items)
    let arr = []
    for (let key in this.items)
      if (this.items.hasOwnProperty(key)) arr.push(this.items[key])
    return arr
  }

  /**
   * Return a new Set contains all of the value of this Set, and the argument's set
   * @param aSet which set should be union this this set
   * @returns a new Set contains all values of two sets
   */
  union(aSet: MySet<T>) {
    const resArray = new MySet<T>()
    this.values().forEach((val) => resArray.add(val))
    aSet.values().forEach((val) => resArray.add(val))
    return resArray
  }

  /**
   * 交集
   * @param MySet<T>
   * @returns
   */
  intersection(aSet: MySet<T>) {
    const thisValues = this.values(),
      thatValues = aSet.values(),
      res = new MySet<T>(),
      // old version
      // this.values().forEach((val) => {
      // })
      //   if (aSet.has(val)) res.add(val)
      biggerSet =
        thisValues.length > thatValues.length ? thisValues : thatValues,
      smallSet: any[] =
        thisValues.length < thatValues.length ? thisValues : thatValues
    biggerSet.forEach((val) => {
      if (smallSet.includes(val)) res.add(val)
    })
    return res
  }

  /**
   * 差集
   * @param MySet<T>
   * @returns a new set
   */
  difference(aSet: MySet<T>) {
    const res = new MySet<T>(),
      thatValues = aSet.values()
    this.values().forEach((val) => {
      if (!thatValues.includes(val)) {
        res.add(val)
      }
    })
    return res
  }

  toString() {
    return [...this.values()].join(', ')
  }
}
