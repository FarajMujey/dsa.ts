import { stdout } from 'process'
import readline from 'readline'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function hanoi(
  n: number,
  a: string,
  b: string,
  c: string,
  times: { times: number }
): void {
  if (n > 0) {
    if (times) times.times++
    hanoi(n - 1, a, c, b, times)
    stdout.write(`move ${a} to ${b}\n`)
    hanoi(n - 1, b, a, c, times)
  }
}

rl.question('How many plates do you wanna to move?', (question: string) => {
  let times = { times: 0 }
  hanoi(parseInt(question, 10), 'A', 'B', 'C', times)
  stdout.write(`moved ${times.times} times\n`)
  rl.close()
})
