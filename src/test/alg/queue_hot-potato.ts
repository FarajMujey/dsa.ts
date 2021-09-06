import Queue from '../../ds/queue'

export const hotPotato = (
  elementList: any[],
  num: number
): { eliminated: Array<any>; winner: any } => {
  // 创建一个队列
  const queue = new Queue()
  const eliminated = []

  // 将elementList按顺序放进队列中
  for (let element of elementList) {
    queue.enqueue(element)
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated.push(queue.dequeue())
  }
  return {
    eliminated,
    winner: queue.dequeue(),
  }
}
