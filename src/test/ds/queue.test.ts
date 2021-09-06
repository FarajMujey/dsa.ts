import Queue from '../../ds/queue'

const queue = new Queue<string>()
queue.enqueue('foo')
queue.enqueue('bar')
queue.enqueue('baz')
queue.enqueue('fox')
queue.enqueue('bid')
queue.clear()

console.log(queue.toString())

queue.enqueue('foo')
queue.enqueue('bar')
queue.enqueue('baz')
queue.enqueue('fox')
queue.enqueue('bid')
queue.enqueue('foz')

console.log(queue.peek())
queue.dequeue()
queue.dequeue()

console.log(queue.toString())

import { hotPotato } from '../alg/queue_hot-potato'
let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
let result = hotPotato(names, 7)
result.eliminated.forEach(item => {
  console.log(`${item}在击鼓传法游戏中被淘汰`)
})

console.log(`胜利者:${result.winner}`)
