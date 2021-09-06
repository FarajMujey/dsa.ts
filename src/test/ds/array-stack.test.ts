import ArrayStack from '../../ds/array-stack'

const stack1 = new ArrayStack<Number>()

for (let i = 0; i < 10; i++) stack1.push(i)

const stack2 = new ArrayStack()
stack2.push('BA')
stack2.push(['foo'])
stack2.push({ a: 'A' })
console.log(stack2)

const stack3 = new ArrayStack<string>()

stack3.push('foo', 'bar', 'baz')

stack3.push('Foo')
console.log(stack3)
